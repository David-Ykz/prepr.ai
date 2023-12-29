import { useState, useEffect } from "react";
import {Navbar, Card, Button, Row, Col, Container} from "react-bootstrap";
import AudioRecorder from "./AudioRecorder";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    fontFamily: 'Times New Roman',
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
    function getRandomPrompt() {
        const url = "http://localhost:8000/message";
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);
                setPrompt(data.message);
            })
    }
    const handleFeedback = (newFeedback) => {
        setFeedback(newFeedback)
    };
    useEffect(() => {
        getRandomPrompt();
    }, []);
    document.body.style = 'background: #edf0f5ff;';
    return (
        <div className="DisplayPrompt">
            <Navbar style={navbarStyle}>
                <Navbar.Brand className="mx-auto" >Website Name</Navbar.Brand>
            </Navbar>
            <Row className="justify-content-center">
                <Col md={8} className="d-flex justify-content-left">
                    <Card style={cardStyle} body>
                        <p className="card-text" style={promptStyle}>{prompt}</p>
                        <Button style={buttonStyle} onClick={getRandomPrompt}>Next Question</Button>
                        <AudioRecorder returnFeedback={handleFeedback} />
                    </Card>
                </Col>
            </Row>
                <p>Feedback:</p>
                <p>{feedback}</p>

            </div>
    )
}

export default DisplayPrompt;
