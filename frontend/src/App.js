import logo from './logo.svg';
import './App.css';

function sendData() {
    fetch("http://localhost:8000/message")
        .then((res) => res.json())
        .then((data) => setMessage(data.message));
}

function setMessage(message) {
    console.log(message);
}


function App() {
  return (
      <div className="App">
        <header className="App-header">
          <button onClick={sendData}>Send Data</button> {/** Add a button to call revertMove */}
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
  );
}

export default App;
