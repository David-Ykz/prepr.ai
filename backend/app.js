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

app.post("/audiomessage", (request, response) => {
    console.log("received data");
    console.log(request.body);
    response.send(request.body);
});



app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});





module.exports = app;
