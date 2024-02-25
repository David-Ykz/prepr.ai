import { useState, useEffect } from "react";
import {Navbar, Card, Button, Row, Col, Container} from "react-bootstrap";
import AudioRecorder from "./AudioRecorder";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import DisplayQuestions from "./DisplayQuestions";

function GeneralQuestions() {
    const [prompts, setPrompts] = useState([]);
    useEffect(() => {
        getRandomPrompts();
    }, []);


    function getRandomPrompts() {
        console.log("called");
//        const url = "https://y-backend.com:8000/message";
        const url = "http://localhost:8000/message";
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);
                setPrompts(data.message);
            })
    }
    return (
        <div className="DisplayPrompt">
            <DisplayQuestions promptList={prompts}></DisplayQuestions>
        </div>
    )
}

export default GeneralQuestions;
