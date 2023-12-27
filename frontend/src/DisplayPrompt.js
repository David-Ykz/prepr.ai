import { useState } from "react";
import { Navbar } from "react-bootstrap";

const headingStyle = {
    color: "black",
//    padding: "10px",
    fontSize: "30px",
    fontFamily: "Segoe UI"
}
const navbarStyle = {
    backgroundColor: 'white',
    color: 'black',
    fontSize: '30px',
    fontFamily: "Segoe UI",
    padding: '10px',
}

function DisplayPrompt() {
    document.body.style = 'background: #edf0f5ff;';

    return (
        <div className="DisplayPrompt">
            <Navbar expand="lg" style={navbarStyle}>
                <Navbar.Brand>Website Name</Navbar.Brand>
            </Navbar>
            <p>zkjhsdjkfsdhfsdjkfshdfkh</p>
        </div>
    )
}

export default DisplayPrompt;