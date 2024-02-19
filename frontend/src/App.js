import DisplayPrompt from './DisplayPrompt';
import SelectionScreen from './SelectionScreen';
import {Navbar} from "react-bootstrap";
import logo from "./logo.jpg";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

function App() {
    document.body.style = 'background: #edf0f5ff;';

    return (
        <div>
            <Navbar style={{backgroundColor: 'white', padding: '0px'}}>
                <Navbar.Brand className="mx-auto" >
                    <img src={logo} alt="Logo" className="center" height={40}/>
                </Navbar.Brand>
            </Navbar>
            <Router style={{backgroundColor: '70a6ffff'}}>
                <Routes>
                    <Route exact path="/" element={<SelectionScreen/>}/>
                    <Route path="/general" element={<DisplayPrompt/>}/>
                </Routes>
            </Router>

      </div>
  );
}

export default App;


