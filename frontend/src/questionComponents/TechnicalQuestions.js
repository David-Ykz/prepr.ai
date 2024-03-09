import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import DisplayQuestions from "./DisplayQuestions";
import axios from "axios";
import {serverUrl} from "../urls";

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
            url: serverUrl + "technical_prompts",
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
