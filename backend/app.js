const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./postgres-config");

app.use(cors());
app.use(express.json());


app.get("/message", (request, response) => {
    db.pool.query("SELECT * FROM interview_questions ORDER BY random() LIMIT 1;", function(err, res) {
        response.json({ message: res.rows[0].prompt });
    })

});

// app.get("/message", (req, res) => {
//     res.json({ message: getRandomPrompt() });
// });

app.listen(8000, () => {
    db.pool.query("SELECT * FROM interview_questions ORDER BY random() LIMIT 1;", function(err, res) {
        console.log(res.rows[0].prompt);
    })

    console.log(`Server is running on port 8000.`);
});

// function getRandomPrompt() {
//     db.pool.query("SELECT * FROM interview_questions ORDER BY random() LIMIT 1;", function(err, res) {
//         return res.rows[0].prompt);
//     })
//     return db.pool.query("SELECT * FROM interview_questions ORDER BY random() LIMIT 1;").then();
// }





module.exports = app;
