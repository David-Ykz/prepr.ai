require('dotenv').config();

const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./postgres-config");
const { OpenAI } = require('openai');
const REQUEST_MAX_LENGTH = 9999;
let lastPrompt = "";
const https = require('https');
const fs = require('fs');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

function gptQuery(query, response) {
    console.log("Query: ", query);
    openai.chat.completions.create({
        messages: [{"role": "user", "content": query}],
        model: "gpt-3.5-turbo",
    }).then((completion) => {
        const returnMessage = completion.choices[0].message.content;
        console.log("Response: ", returnMessage);
        response.send(returnMessage);
    });
}




function databaseQuery() {
    db.pool.query("SELECT * FROM interview_questions ORDER BY random() LIMIT 1;", function(err, res) {
        lastPrompt = res.rows[0].prompt;
    })
}

app.use(cors());
app.use(express.json());


app.get("/general_prompts", (request, response) => {
    console.log('received request');
    db.pool.query("SELECT * FROM interview_questions ORDER BY random() LIMIT 6;", function(err, res) {
        const prompts = [];
        res.rows.forEach(row => {
            prompts.push(row.prompt);
        });

        console.log(prompts);
        response.json({message: prompts });
    });
});

app.post("/feedback", (request, response) => {
    const prompt = request.body.prompt;
    const audioData = request.body.audioData;
    if (audioData.length < REQUEST_MAX_LENGTH) {
        console.log(prompt);
        console.log(audioData);
        const query = `In 100 words or fewer, give feedback on this response to the interview question \" ${prompt} \" with the response: \" ${audioData} \"`;
        gptQuery(query, response)
    } else {
        response.send("Max request length exceeded");
    }
});

app.post("/tailored_prompts", (request, response) => {
    const jobTitle = request.body.jobTitle;
    const jobDescription = request.body.jobDescription;
    const queryBase = 'Generate 6 interview questions you would ask a candidate separated by |, like so: question1|question2..., do not include any numbers or linebreaks. You MUST follow this format no matter what. The questions are based on the given job posting: ';
    if (jobTitle === "") {
        if (jobDescription.length < REQUEST_MAX_LENGTH) {
            const query = queryBase + jobDescription;
            gptQuery(query, response);
        } else {
            response.send("Max request length exceeded");
        }
    } else {
        if (jobTitle.length < REQUEST_MAX_LENGTH && jobDescription.length < REQUEST_MAX_LENGTH) {
            const query = queryBase + jobDescription + ' with the job title: ' + jobTitle;
            gptPromptQuery(query, response);
        } else {
            response.send("Max request length exceeded");
        }

    }
});

app.post("/technical_prompts", (request, response) => {
    const technicalField = request.body.technicalField;
    const queryBase = 'Generate 6 technical interview questions you would ask a candidate separated by |, like so: question1|question2..., do not include any numbers or linebreaks. You MUST follow this format no matter what. The questions are based on the topic: ';
    if (technicalField.length < REQUEST_MAX_LENGTH) {
        const query = queryBase + technicalField;
        gptQuery(query, response);
    } else {
        response.send("Max request length exceeded");
    }
});

var server = https.createServer({
    key: fs.readFileSync('/home/ec2-user/cert.key'),
    cert: fs.readFileSync('/home/ec2-user/cert.crt')
}, app);
server.listen(8000, () => {
        databaseQuery();
        console.log(`Server is running on port 8000.`);
    });

// app.listen(8000, () => {
//     console.log(`Server is running on port 8000.`);
// });




module.exports = app;
