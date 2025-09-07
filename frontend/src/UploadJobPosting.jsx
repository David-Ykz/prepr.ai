import React, { useState } from 'react';
import './UploadJobPosting.css'
import { uploadJobPosting } from './api';

const UploadJobPosting = function({ setSelectedPosting, setActiveView }) {
	const [jobPosting, setJobPosting] = useState("");

    async function onUploadButtonClick() {
        if (jobPosting === "") {
            return;
        }
        const response = await uploadJobPosting(jobPosting);
        if (response === "") {
            alert("Invalid posting. Please include all details relevant to the job, including skills required and some information about the role and company")
        } else {
            setActiveView('interview');
            setSelectedPosting(response);
        }
    }

	return (
		<div className="container">
            <p className="upload-title">Upload a job posting to get started</p>
            <textarea
                type="text"
                className="upload-input"
                value={jobPosting}
                onChange={e => setJobPosting(e.target.value)}
                placeholder="Paste your job posting here"
            />
            <button className="upload-button" onClick={onUploadButtonClick}>Upload</button>
		</div>
	)
};

export default UploadJobPosting;
