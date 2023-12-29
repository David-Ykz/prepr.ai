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
        const query = `Give feedback on this response to the interview question \" ${lastPrompt} \" with the response: \" ${request.body.audioData} \"`;
        console.log(query);
        const gptResponse = " Overall, the response does not effectively answer the interview question and lacks clarity. Here are some specific points of improvement:\n" +
            "\n" +
            "1. Grammar and phrasing: The response contains multiple grammatical errors and lacks coherence. It's important to use proper grammar, punctuation, and sentence structure in your response to sound professional.\n" +
            "\n" +
            "2. Lack of clarity: It is unclear what the response means by \"write myself a hard worker\" and \"do it myself at 1:00.\" This sentence needs clarification to clearly communicate your work style.\n" +
            "\n" +
            "3. Lack of depth: The response only provides a vague statement about being a hard worker. To make your answer more meaningful, consider providing specific examples or behaviors that showcase how you approach your work or collaborate with others.     \n" +
            "\n" +
            "4. Missing information: The response briefly mentions enjoying challenges and overcoming difficulties, but it does not expand\n" +
            " on this aspect. It would be beneficial to provide concrete examples of how you handle challenges, problem-solving skills, or any other relevant work habits.\n" +
            "\n" +
            "A revised response could be: \"My work style can be described as proactive and results-oriented. I believe in taking ownership\n" +
            " of my tasks and striving to complete them efficiently. For example, I prioritize tackling challenging projects early in the \n" +
            "day as I find it helps me stay motivated and focused. I enjoy pushing the boundaries and finding innovative solutions when fa\n" +
            "ced with difficulties. I also value collaboration and believe in actively seeking input from team members to enhance our collective work. Overall, I am dedicated to delivering high-quality results and continuously improving my skills.\"\n";
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
