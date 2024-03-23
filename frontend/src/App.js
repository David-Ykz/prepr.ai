import GeneralQuestions from './questionComponents/GeneralQuestions';
import SelectionScreen from './SelectionScreen';
import TailoredQuestions from './questionComponents/TailoredQuestions';
import {Button, Navbar} from 'react-bootstrap';
import logo from './images/logo.jpg';
import back from './images/back.png';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import TechnicalQuestions from "./questionComponents/TechnicalQuestions";
import ReactGA from 'react-ga';

const TRACKING_ID = "G-PXYLVPRD0E";
ReactGA.initialize(TRACKING_ID);

function App() {
    document.body.style = 'background: #edf0f5ff;';

    return (
        <Router>
            <Navbar style={{ backgroundColor: 'white', padding: '2px'}}>
                <img src={logo} alt="Logo" height={40} className="mx-auto"/>
            </Navbar>
            <Button href="/" style={{backgroundColor: 'white', position: 'absolute', left: '0px', top: '0px', height: '20px', border: 'none'}}>
                <img src={back} alt="Back" height={20}/>
            </Button>
            <Routes>
                <Route exact path="/" element={<SelectionScreen />} />
                <Route path="/general-questions" element={<GeneralQuestions />} />
                <Route path="/tailored-questions" element={<TailoredQuestions />} />
                <Route path='/dsa' element={<TechnicalQuestions promptType={'Data Structures & Algorithms'} />} />
                <Route path='/webdev' element={<TechnicalQuestions promptType={'Web Development'} />} />
                <Route path='/ml' element={<TechnicalQuestions promptType={'Data Science & Machine Learning'} />} />
            </Routes>
        </Router>
  );
}

export default App;


