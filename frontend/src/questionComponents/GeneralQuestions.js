import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import DisplayQuestions from "./DisplayQuestions";
import {serverUrl} from "../urls";

function GeneralQuestions() {
    const [prompts, setPrompts] = useState([]);
    useEffect(() => {
        getRandomPrompts();
    }, []);


    function getRandomPrompts() {
        console.log("called");
        const url = serverUrl + "general_prompts";
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);
                setPrompts(data.message);
            })
    }
    return (
        <DisplayQuestions promptList={prompts}></DisplayQuestions>
    )
}

export default GeneralQuestions;
