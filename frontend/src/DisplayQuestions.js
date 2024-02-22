import { useState, useEffect } from "react";
import {Navbar, Card, Button, Row, Col, Container} from "react-bootstrap";
import AudioRecorder from "./AudioRecorder";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import next from './next.png';
import {textButton, iconButton} from "./styles";


const cardStyle = {
    backgroundColor: 'white',
    // eslint-disable-next-line no-restricted-globals
    maxHeight: screen.height/2,
    width: '100%',
    // eslint-disable-next-line no-restricted-globals
    minHeight: screen.height/2,
    margin: '0 auto',
    marginTop: 75,
    borderRadius: 30,
    boxShadow: '0px 0px 5px #636f83ff',
}
const promptStyle = {
    color: 'black',
    fontSize: '20px',
    fontFamily: 'Segoe UI',
    display: 'flex',
    justifyContent: 'center',
    minHeight: 100
}

const feedbackStyle = {
    fontSize: '14px',
}
var currentIndex = 0;


function DisplayQuestions({promptList}) {
    const [prompt, setPrompt] = useState(promptList[0]);
    const [feedback, setFeedback] = useState("");
    const [displayFeedback, setDisplayMode] = useState(false);
    const handleFeedback = (newFeedback) => {
        setDisplayMode(true);
        setFeedback(newFeedback);
    };
    function returnToPrompts () {
        setDisplayMode(false);
    }

    function incrementPromptIndex() {
        console.log("clicked");
        currentIndex = currentIndex + 1;
        console.log(currentIndex);
        setPrompt(promptList[currentIndex]);
    }

    document.body.style = 'background: #edf0f5ff;';
    return (
        <div className="GeneralQuestions">
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
                                <Button onClick={returnToPrompts} style={textButton}>
                                    Go Back
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <div style={{position: 'relative', left: '90%', top: '150px'}}>
                                    {currentIndex < promptList.length ?
                                        <Button style={iconButton} onClick={incrementPromptIndex}>
                                            <img src={next} alt="Next" style={{height: '25px', marginLeft: '-5px'}}/>
                                        </Button>
                                        :
                                        <Button href={'/'} style={textButton}>Back</Button>
                                    }
                                </div>

                                <AudioRecorder returnFeedback={handleFeedback} />
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default DisplayQuestions;
