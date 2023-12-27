import { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const AudioRecorder = () => {
    const microphoneButtonStyle = {
        backgroundColor: '#70a6ffff',
        color: 'white',
        borderRadius: '7px',
        border: 'none',
        fontSize: '16px',
    }


    const mimeType = "audio/webm";
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);

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
        setRecordingStatus("inactive");
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            console.log(audio);
            setAudioChunks([]);
        };
    };
    function sendRecordingData() {
        const postData = {audioData: audio};

        axios({
            url: "http://localhost:8000/audiomessage",
            method: "POST",
            data: postData,
        })
            .then((res) => {
                console.log("returned message");
            })
            .catch((err) => {});
    }



    return (
        <div>
            <div className="audio-controls">
                {!permission ? (
                    <Button onClick={getMicrophonePermission} style={microphoneButtonStyle}>
                        Get Microphone
                    </Button>
                ) : null}
                {permission && recordingStatus === "inactive" ? (
                    <Button onClick={startRecording} style={microphoneButtonStyle}>
                        Start Recording
                    </Button>
                ) : null}
                {recordingStatus === "recording" ? (
                    <Button onClick={stopRecording} style={microphoneButtonStyle}>
                        Stop Recording
                    </Button>
                ) : null}
                {audio ? (
                    <div className="audio-container">
                        <Button onClick={sendRecordingData} style={microphoneButtonStyle}>
                            Send Audio Data
                        </Button>
                        <audio src={audio} controls></audio>
                        <a download href={audio}>
                            Download Recording
                        </a>
                    </div>
                ) : null}
            </div>
        </div>
    );
};
export default AudioRecorder;