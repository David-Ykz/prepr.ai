import { useState } from "react";
import { Navbar, Card } from "react-bootstrap";

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
}
let prompt = getRandomPrompt();

function getRandomPrompt() {
    const url = "http://localhost:8000/message";
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.message);
            prompt = data.message;

        })
}





function DisplayPrompt() {
    document.body.style = 'background: #edf0f5ff;';

    return (
        <div className="DisplayPrompt">
            <Navbar style={navbarStyle}>
                <Navbar.Brand>Website Name</Navbar.Brand>
            </Navbar>
            <Card style={cardStyle}>
                <p className="card-text" style={promptStyle}>{prompt}</p>
            </Card>
            <p>Other text</p>
        </div>
    )
}

export default DisplayPrompt;