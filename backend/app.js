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


app.get("/message", (request, response) => {
    console.log('received request');
    db.pool.query("SELECT * FROM interview_questions ORDER BY random() LIMIT 6;", function(err, res) {
        const prompts = [];
        res.rows.forEach(row => {
            prompts.push(row.prompt);
        });

        console.log(prompts);
        response.json({message: prompts });
    });
    // db.pool.query("SELECT * FROM interview_questions ORDER BY random() LIMIT 6;", function(err, res) {
    //     console.log(res.rows[0]);
    //     console.log(res.rows[0].prompt);
    //     response.json({ message: res.rows[0].prompt });
    //     lastPrompt = res.rows[0].prompt;
    // })
});


app.post("/audiomessage", (request, response) => {
    console.log(request.body.audioData);
    if (request.body.audioData.length < REQUEST_MAX_LENGTH) {
        const query = `In 100 words or fewer, give feedback on this response to the interview question \" ${lastPrompt} \" with the response: \" ${request.body.audioData} \"`;
        gptQuery(query, response)
    } else {
        response.send("Max request length exceeded");
    }
});



// var server = https.createServer({
//     key: fs.readFileSync('/home/ec2-user/cert.key'),
//     cert: fs.readFileSync('/home/ec2-user/cert.crt')
// }, app);
// server.listen(8000, () => {
//         databaseQuery();
//         console.log(`Server is running on port 8000.`);
//     });

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});




module.exports = app;
