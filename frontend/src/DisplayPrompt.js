import { useState, useEffect } from "react";
import { Navbar, Card, Button } from "react-bootstrap";
import AudioRecorder from "./AudioRecorder";

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
    maxWidth: screen.width/2,
    // eslint-disable-next-line no-restricted-globals
    maxHeight: screen.height/3,
    width: '100%',
    // eslint-disable-next-line no-restricted-globals
    minHeight: screen.height/4,
    margin: '0 auto',
    marginTop: 100,
    borderRadius: 30,
    boxShadow: '0px 0px 5px #636f83ff',
    padding: '10px'
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
//    marginTop: 50,
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
                <Navbar.Brand>Website Name</Navbar.Brand>
            </Navbar>
            <Card style={cardStyle}>
                <p className="card-text" style={promptStyle}>{prompt}</p>
                <Button style={buttonStyle} onClick={getRandomPrompt}>Next Question</Button>
                <AudioRecorder returnFeedback={handleFeedback}/>
            </Card>
            <p>Feedback:</p>
            <p>{feedback}</p>
            </div>
    )
}

export default DisplayPrompt;
