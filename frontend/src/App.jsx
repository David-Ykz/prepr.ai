import React, { useState } from 'react';
import './App.css';
import BrowseJobPosting from './BrowseJobPosting';
import UploadJobPosting from './UploadJobPosting';
import Interview from './Interview';

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
			{displayActiveView()}
		</div>
	);
}

export default App;