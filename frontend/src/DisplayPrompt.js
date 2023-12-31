import { useState, useEffect } from "react";
import {Navbar, Card, Button, Row, Col, Container} from "react-bootstrap";
import AudioRecorder from "./AudioRecorder";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.jpg';
import SpeechRecognition from "react-speech-recognition";

const navbarStyle = {
    backgroundColor: 'white',
    color: 'black',
    fontSize: '30px',
    fontFamily: "Segoe UI",
    padding: '10px'
}
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


function DisplayPrompt() {
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
            <Navbar style={navbarStyle}>
                <Navbar.Brand className="mx-auto" >
                    <img src={logo} alt="Logo" className="center" height={40}/>
                </Navbar.Brand>
            </Navbar>
            <Row className="justify-content-center">
                <Col md={8} className="d-flex justify-content-left">
                    <Card style={cardStyle} body>
                        <p className="card-text" style={promptStyle}>{prompt}</p>
                        {displayFeedback ? (
                            <div>
                                Feedback:
                                <br/>
                                {feedback}
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

export default DisplayPrompt;
