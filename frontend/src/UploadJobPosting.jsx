import React, { useState } from 'react';
import './UploadJobPosting.css'
import { uploadJobPosting } from './api';

const UploadJobPosting = function() {
	const [jobPosting, setJobPosting] = useState("");


    async function onUploadButtonClick() {
        if (jobPosting === "") {
            return;
        }
        const response = await uploadJobPosting(jobPosting);
        console.log(response);
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
