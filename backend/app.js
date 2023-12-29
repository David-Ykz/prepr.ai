require('dotenv').config();

const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./postgres-config");
const { OpenAI } = require('openai');
const REQUEST_MAX_LENGTH = 9999;
let lastPrompt = "";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function gptQuery(query) {
    console.log("Query: ", query);
    const completion = await openai.chat.completions.create({
        messages: [{"role": "user", "content": query}],
        model: "gpt-3.5-turbo",
    });
    const returnMessage = completion.choices[0]
    console.log("Response: ", returnMessage.message.content);
    return returnMessage.message.content;
}

function databaseQuery() {
    db.pool.query("SELECT * FROM interview_questions ORDER BY random() LIMIT 1;", function(err, res) {
        lastPrompt = res.rows[0].prompt;
    })
}

app.use(cors());
app.use(express.json());


app.get("/message", (request, response) => {
    db.pool.query("SELECT * FROM interview_questions ORDER BY random() LIMIT 1;", function(err, res) {
        response.json({ message: res.rows[0].prompt });
        lastPrompt = res.rows[0].prompt;
    })
});


app.post("/audiomessage", (request, response) => {
    console.log("received data");
    console.log(request.body.audioData);
    console.log(request.body.audioData.length);
    if (request.body.audioData.length < REQUEST_MAX_LENGTH) {
        const query = `In 100 words or fewer, give feedback on this response to the interview question \" ${lastPrompt} \" with the response: \" ${request.body.audioData} \"`;
        console.log(query);
        const gptResponse = "Response lacks clarity and depth. Grammar errors hinder coherence. Clarify ambiguous statements like 'write myself a hard worker' and 'do it myself at 1:00.' Expand on handling challenges with specific examples. Consider: 'I prioritize challenging tasks early for focus, value collaboration, and enjoy innovating in adversity. Dedicated to high-quality results and ongoing skill improvement.'";
        response.send(gptResponse);
        //        response.send(gptQuery(query));
    } else {
        response.send("Max request length exceeded");
    }
});



app.listen(8000, () => {
    databaseQuery();
    console.log(`Server is running on port 8000.`);

});





module.exports = app;
