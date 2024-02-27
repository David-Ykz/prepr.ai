import { useState, useEffect } from "react";
import {Navbar, Card, Button, Row, Col, Container} from "react-bootstrap";
import AudioRecorder from "./AudioRecorder";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import DisplayQuestions from "./DisplayQuestions";
import axios from "axios";

function TechnicalQuestions({promptType}) {
    const [prompts, setPrompts] = useState([]);
    useEffect(() => {
        console.log('use effect');
        getPrompts(promptType);
    }, []);

    function unpackToArr(str) {
        const questionsArray = str.split("|");
        return questionsArray.map(question => question.trim());
    }

    function getPrompts() {
        console.log("called");
        const postData = {technicalField: promptType};
        axios({
//            url: "http://localhost:8000/technical_prompts",
            url: "https://y-backend.com:8000/technical_prompts",
            method: "POST",
            data: postData,
        })
            .then((res) => {
                console.log(res.data);
                setPrompts(unpackToArr(res.data));
            })
            .catch((err) => {});
    }
    return (
        <DisplayQuestions promptList={prompts}></DisplayQuestions>
    )
}

export default TechnicalQuestions;
