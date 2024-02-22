import { useState, useEffect } from "react";
import {Navbar, Card, Button, Row, Col, Container} from "react-bootstrap";
import AudioRecorder from "./AudioRecorder";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import DisplayQuestions from "./DisplayQuestions";

function GeneralQuestions() {
    const [prompt, setPrompt] = useState("");
    const [feedback, setFeedback] = useState("");
    const [displayFeedback, setDisplayMode] = useState(false);
    function getRandomPrompt() {
        const url = "https://y-backend.com:8000/message";
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);
                setPrompt(data.message);
            })
    }

    const prompts = ["a", "b", "c"];
    return (
        <div className="DisplayPrompt">
            <DisplayQuestions promptList={prompts}></DisplayQuestions>
        </div>
    )
}

export default GeneralQuestions;
