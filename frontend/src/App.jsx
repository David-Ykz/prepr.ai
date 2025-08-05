import React, { useState } from 'react';
import './App.css';
import BrowseJobPosting from './BrowseJobPosting';
import UploadJobPosting from './UploadJobPosting';
import Interview from './Interview';
import logoImage from './assets/logo.jpg';

function App() {
	const [activeView, setActiveView] = useState('browse');
	const [selectedPosting, setSelectedPosting] = useState({});

	function displayActiveView() {
		if (activeView === "browse") {
			return (<BrowseJobPosting setSelectedPosting={setSelectedPosting} setActiveView={setActiveView} />);
		} else if (activeView === "upload") {
			return (<UploadJobPosting setSelectedPosting={setSelectedPosting} setActiveView={setActiveView} />);
		} else if (activeView === "interview") {
			return (<Interview posting={selectedPosting} setActiveView={setActiveView}/>)
		}
	}

	return (
		<div>
			<div className="toolbar">
				<img onClick={() => setActiveView('browse')} src={logoImage} alt="Banner" className="toolbar-image" />
				<span onClick={() => setActiveView('browse')} className="toolbar-link">Browse job postings</span>
				<span onClick={() => setActiveView('upload')} className="toolbar-link">Upload a job posting</span>
			</div>
			{displayActiveView()}
		</div>
	);
}

export default App;