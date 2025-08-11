import React, { useState, useRef, useEffect } from 'react';
import './Interview.css'
import { getFeedback, getImageAnalysis } from './api';

const Interview = function({ posting, setActiveView }) {
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
	const imageCaptureInterval = useRef(null);
    const [mediaStream, setMediaStream] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [videoState, setVideoState] = useState(0); // start, stop, get feedback, save, next question
    const [questionIndex, setQuestionIndex] = useState(0);
	const [feedback, setFeedback] = useState({});
	const capturedImages = useRef([]);

	async function startupVideoStream() {
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

	useEffect(() => {
        startupVideoStream();
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

			imageCaptureInterval.current = setInterval(() => {
      			takeSnapshot();
    		}, 5000);
		} catch (err) {
			console.error("Error accessing camera/microphone", err);
		}
	}

	function takeSnapshot() {
		// console.log("Taking snapshot");
		const video = videoRef.current;
		const canvas = document.createElement('canvas');
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		const ctx = canvas.getContext('2d');
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

		canvas.toBlob((blob) => {
			if (blob) {
				capturedImages.current.push(blob);
			}
		}, 'image/jpeg', 0.9);
	};

	async function stopRecording() {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
		}
		if (imageCaptureInterval.current) {
    		clearInterval(imageCaptureInterval.current);
      		imageCaptureInterval.current = null;
    	}
    }

	async function getAndDisplayFeedback() {
		const audioBlob = new Blob(recordedChunks, { type: "audio/webm" });
        const response = await getFeedback(audioBlob, posting.questions[questionIndex], posting);
		const res = await getImageAnalysis(capturedImages.current);
		response.eyeContact = Math.round((1 - res.eyeContact/res.total) * 100);
		setFeedback(response);

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
		if (questionIndex === posting.questions.length - 1) {
			setActiveView('browse');
			return;
		}
		setQuestionIndex(questionIndex + 1);
		setRecordedChunks([]);
		startupVideoStream();
		capturedImages.current = [];
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
		setVideoState((videoState + 1) % 5);
	}

	function recordButtonText() {
		const endOfQuestions = questionIndex === posting.questions.length - 1;
		const text = ['Start', 'Stop', 'Get Feedback', 'Save', endOfQuestions ? 'Back' : 'Next Question'];
		return text[videoState > text.length - 1 ? text.length - 1 : videoState];
	}


    return (
        <div className="container">
            <p className="interview-question">Question {questionIndex + 1}: {posting.questions[questionIndex]}</p>
			{
				videoState < 3 ? (
					<video className="video-feed" ref={videoRef} autoPlay muted />
				) : (
					<div className="feedback-section">
						<p>Clarity: {feedback.clarity}</p>
						<p>Correctness: {feedback.correctness || "N/A"}</p>
						<p>Relevance: {feedback.relevance}</p>
						<p>Persuasiveness: {feedback.persuasiveness || "N/A"}</p>
						<p>Eye Contact: {feedback.eyeContact}%</p>
						<p>Feedback: {feedback.otherFeedback}</p>
					</div>
				)
			}
			<button className="record-button" onClick={onRecordButtonClicked}>{recordButtonText()}</button>
        </div>
    )
};

export default Interview;
