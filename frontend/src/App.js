import GeneralQuestions from './GeneralQuestions';
import SelectionScreen from './SelectionScreen';
import TailoredQuestions from './TailoredQuestions';
import {Button, Nav, Navbar} from 'react-bootstrap';
import logo from './logo.jpg';
import back from './back.png';
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";

function App() {
    document.body.style = 'background: #edf0f5ff;';

    return (
        <Router>
            <Navbar style={{ backgroundColor: 'white', padding: '0px' }}>
                <img src={logo} alt="Logo" height={40} className="mx-auto"/>
            </Navbar>
            <Button href="/" style={{backgroundColor: 'white', position: 'absolute', left: '0px', top: '-2px', height: '20px', border: 'none'}}>
                <img src={back} alt="Back" height={20}/>
            </Button>
            <Routes>
                <Route exact path="/" element={<SelectionScreen />} />
                <Route path="/general-questions" element={<GeneralQuestions />} />
                <Route path="/tailored-questions" element={<TailoredQuestions />} />
            </Routes>
        </Router>
  );
}

export default App;


