import {useState, useEffect, useRef} from "react";
import {Card, Button, Row, Col} from "react-bootstrap";
import AudioRecorder from "./AudioRecorder";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import nextImg from './next.png';
import playImg from './play.png';
import pauseImg from './pause.png';
import microphoneImg from './microphone.png';
import {cardStyle, promptStyle, textButton, iconButton} from "./styles";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import axios from "axios";


var currentIndex = -1;


function DisplayQuestions({promptList}) {
    const [prompt, setPrompt] = useState(['Press Next To Start']);
    const [feedback, setFeedback] = useState("");
    const [displayFeedback, setDisplayMode] = useState(false);

    const {transcript, resetTranscript, listening} = useSpeechRecognition();
    const [feedbackButtonDisabled, setFeedbackButton] = useState(false);
    const mimeType = "audio/webm";
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);

//    position: 'absolute', top: '40%',

    const handleFeedback = (newFeedback) => {
        setDisplayMode(true);
        setFeedback(newFeedback);
    };


    function returnToPrompts () {
        setDisplayMode(false);
        setAudio(null);
    }

    function incrementPromptIndex() {
        console.log("clicked");
        currentIndex = currentIndex + 1;
        console.log(currentIndex);
        setPrompt(promptList[currentIndex]);
        returnToPrompts();
    }

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        resetTranscript();
        setRecordingStatus("recording");
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream, { type: mimeType });
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    };

    const stopRecording = () => {
        // eslint-disable-next-line no-unused-expressions
        SpeechRecognition.stopListening;
        setRecordingStatus("inactive");
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            setAudioChunks([]);
        };
    };

    function listenContinously() {
        SpeechRecognition.startListening({
            continuous: true
        })
    }

    function sendRecordingData() {
        console.log(transcript);
        setFeedbackButton(true);
        const postData = {audioData: transcript, prompt: prompt};
//        const postData = {audioData: "I would write myself a hard worker and that's why do it myself at 1:00 because I'm so he really likes to try and push the challenges and overcome difficulties"};

        axios({
            url: "http://localhost:8000/audiomessage",
//            url: "https://y-backend.com:8000/audiomessage",
            method: "POST",
            data: postData,
        })
            .then((res) => {
                console.log(res.data);
                handleFeedback(res.data);
                setFeedbackButton(false);
            })
            .catch((err) => {});
    }

    console.log(promptList.length);
    document.body.style = 'background: #edf0f5ff;';
    return (
        <div className="GeneralQuestions" >
            <Row className="justify-content-center">
                <Col md={8} className="d-flex justify-content-left">
                    <Card style={cardStyle} body>
                        <p className="card-text" style={promptStyle}>{prompt}</p>
                        {displayFeedback ? (
                            <div>
                                <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px', fontWeight: 'bold'}}>Feedback:</p>
                                <div style={{fontSize: '14px'}}>{feedback}</div>
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
                                    <Button onClick={returnToPrompts} style={textButton}>Try Again</Button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {currentIndex >= 0 ?
                                    <div style={{position: 'absolute', left: '84%', top: '80%'}}>
                                        {!permission ? (
                                            <Button onClick={getMicrophonePermission} style={iconButton}>
                                                <img src={microphoneImg} alt="play" style={{height: '25px', marginLeft: '-5px'}}/>
                                            </Button>
                                        ) : null}
                                        {permission && recordingStatus === "inactive" ? (
                                            <Button onClick={() => {startRecording(); listenContinously();}} style={iconButton}>
                                                <img src={playImg} alt="play" style={{height: '25px', marginLeft: '-5px'}}/>
                                            </Button>
                                        ) : null}
                                        {recordingStatus === "recording" ? (
                                            <Button onClick={() => {stopRecording(); SpeechRecognition.stopListening();}} style={iconButton}>
                                                <img src={pauseImg} alt="pause" style={{height: '25px', marginLeft: '-5px'}}/>
                                            </Button>
                                        ) : null}
                                    </div>
                                    :
                                    null
                                }
                                {audio ? (
                                    <div>
                                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '10px'}}>
                                            <audio src={audio} controls></audio>
                                        </div>
                                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <Button href={audio} target={'_blank'} style={{...textButton, marginRight: '10px'}}>Download Recording</Button>
                                            <Button onClick={sendRecordingData} style={textButton} disabled={feedbackButtonDisabled}>Get Feedback</Button>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        )}
                        <div style={{position: 'absolute', left: '5%', top: '80%'}}>
                            {currentIndex >= 0 ?
                                <div>
                                    {currentIndex + 1}/{promptList.length}
                                </div>
                                :
                                null
                            }
                        </div>
                        <div style={{position: 'absolute', left: '90%', top: '80%'}}>
                            {currentIndex < promptList.length - 1 ?
                                <Button style={iconButton} onClick={incrementPromptIndex}>
                                    <img src={nextImg} alt="Next" style={{height: '25px', marginLeft: '-5px'}}/>
                                </Button>
                                :
                                <Button href={'/'} style={textButton}>Back</Button>
                            }
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default DisplayQuestions;
