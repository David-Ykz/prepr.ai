import {useRef, useState} from "react";
import {Button, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import DisplayQuestions from "./DisplayQuestions";
import {textButton} from "./styles";
import axios from "axios";

function TailoredQuestions() {
    const [prompts, setPrompts] = useState("");
//    const {jobTitleRef, jobDescriptionRef} = useRef(null);
    const jobTitleRef = useRef(null);
    const jobDescriptionRef = useRef(null);
    document.body.style = 'background: #edf0f5ff;';

    function unpackToArr(str) {
        const questionsArray = str.split("|");
        return questionsArray.map(question => question.trim());
    }

    function handleSubmit(event) {
        event.preventDefault();
        const jobTitle = jobTitleRef.current.value;
        const jobDescription = jobDescriptionRef.current.value;
        console.log("Job Title:", jobTitle);
        console.log("Job Description:", jobDescription);

        const postData = {jobTitle: jobTitle, jobDescription: jobDescription};

        axios({
            url: "http://localhost:8000/tailored_prompts",
//            url: "https://y-backend.com:8000/audiomessage",
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
        <div>
            {prompts === "" ?
            <div style={{position: 'absolute', top: '10%', left: '20%'}}>
                <Form onSubmit={handleSubmit} style={{width: '350%'}}>
                    <Form.Group>
                        <Form.Label style={{fontSize: '18px'}}>Enter Job Title (optional):</Form.Label>
                        <Form.Control ref={jobTitleRef}/>
                        <Form.Label style={{fontSize: '18px', marginTop: '5%'}}>Enter Job Description:</Form.Label>
                        <Form.Control as="textarea" ref={jobDescriptionRef} style={{height: '200px', caretColor: 'top'}} wrap="soft"/>
                    </Form.Group>

                    <Button type="submit" style={{...textButton, marginTop: '5%'}}>Submit</Button>
                </Form>
            </div>
            :
            <DisplayQuestions promptList={prompts}></DisplayQuestions>
            }
        </div>
    )
}

export default TailoredQuestions;
