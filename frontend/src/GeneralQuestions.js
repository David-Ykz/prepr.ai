import { useState, useEffect } from "react";
import {Navbar, Card, Button, Row, Col, Container} from "react-bootstrap";
import AudioRecorder from "./AudioRecorder";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import logo from './logo.jpg';
import SpeechRecognition from "react-speech-recognition";

const cardStyle = {
    backgroundColor: 'white',
    // eslint-disable-next-line no-restricted-globals
    maxHeight: screen.height/2,
    width: '100%',
    // eslint-disable-next-line no-restricted-globals
    minHeight: screen.height/2,
//    margin: '0 auto',
    marginTop: 75,
    borderRadius: 30,
    boxShadow: '0px 0px 5px #636f83ff',
}
const promptStyle = {
    color: 'black',
    fontSize: '20px',
    fontFamily: 'Segoe UI',
    alignSelf: 'flex-end',
    minHeight: 100
}
const buttonStyle = {
    backgroundColor: '#70a6ffff',
    color: 'white',
    borderRadius: '7px',
    border: 'none',
    fontSize: '16px',
}
const feedbackStyle = {
    fontSize: '14px',
}


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
    const handleFeedback = (newFeedback) => {
        setDisplayMode(true);
        setFeedback(newFeedback);
    };
    function returnToPrompts () {
        setDisplayMode(false);
    }

    useEffect(() => {
        getRandomPrompt();
    }, []);
    document.body.style = 'background: #edf0f5ff;';
    return (
        <div className="DisplayPrompt">
            <Row className="justify-content-center">
                <Col md={8} className="d-flex justify-content-left">
                    <Card style={cardStyle} body>
                        <p className="card-text" style={promptStyle}>{prompt}</p>
                        {displayFeedback ? (
                            <div>
                                Feedback:
                                <br/>
                                <div style={feedbackStyle}>
                                    {feedback}
                                </div>
                                <br/>
                                <br/>
                                <Button onClick={returnToPrompts} style={buttonStyle}>
                                    Go Back
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Button style={buttonStyle} onClick={getRandomPrompt}>Next Question</Button>
                                <AudioRecorder returnFeedback={handleFeedback} />
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default GeneralQuestions;
