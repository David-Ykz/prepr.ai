import React, { useState, useRef, useEffect } from 'react';
import './Interview.css'
import RecordingComponent from './VideoRecorder';
import { getFeedback } from './api';

const Interview = function({ posting }) {
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [mediaStream, setMediaStream] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [videoState, setVideoState] = useState(0); // start, stop, get feedback, save, next question
    const [questionIndex, setQuestionIndex] = useState(0);

    useEffect(() => {
        async function startRecording() {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            setMediaStream(stream);

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        }
        startRecording();
    }, []);

	async function startRecording() {
		try {
			const mediaRecorder = new MediaRecorder(mediaStream);
			mediaRecorderRef.current = mediaRecorder;
			const chunks = [];
			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					chunks.push(event.data);
				}
			};

			mediaRecorder.onstop = () => {
				setRecordedChunks(chunks);
			};

			mediaRecorder.start();
		} catch (err) {
			console.error("Error accessing camera/microphone", err);
		}
	}

	async function stopRecording() {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
		}
		// if (mediaStream) {
		// 	mediaStream.getTracks().forEach(track => track.stop());
		// }
    }

	async function getAndDisplayFeedback() {
		const audioBlob = new Blob(recordedChunks, { type: "audio/webm" });
        const response = await getFeedback(audioBlob, posting.questions[questionIndex], posting);
		console.log(response);
	}

	function saveRecording() {
		const blob = new Blob(recordedChunks, { type: "video/webm" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "recording.webm";
		a.click();
	}

	function nextQuestion() {
		setQuestionIndex(questionIndex + 1);
		setRecordedChunks([]);
		setVideoState(0);
	}

	async function onRecordButtonClicked() {
		if (videoState === 0) {
			startRecording();
		} else if (videoState === 1) {
			stopRecording();
		} else if (videoState === 2) {
			getAndDisplayFeedback();
		} else if (videoState === 3) {
			saveRecording();
		} else {
			nextQuestion();
		}
		setVideoState(videoState + 1);
	}

	function recordButtonText() {
		const text = ['Start', 'Stop', 'Get Feedback', 'Save', 'Next Question'];
		return text[videoState > text.length - 1 ? text.length - 1 : videoState];
	}


    return (
        <div className="container">
            <p className="interview-question">Question {questionIndex + 1}: {posting.questions[questionIndex]}</p>
			<video className="video-feed" ref={videoRef} autoPlay muted />
			<button className="record-button" onClick={onRecordButtonClicked}>{recordButtonText()}</button>
        </div>
    )
};

export default Interview;
