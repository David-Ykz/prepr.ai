import React, { useState } from 'react';
import './App.css';
import BrowseJobPosting from './BrowseJobPosting';
import UploadJobPosting from './UploadJobPosting';
import Interview from './Interview';

function App() {
	const [activeView, setActiveView] = useState('upload');
	const examplePosting = {
		_id: "68882a8af856d03bcdc21044",
		title: "Senior Software Engineer",
		questions: [
			"How would you approach scaling our core systems to handle 100M+ participants?",
			"Can you describe your experience with critical infrastructure like email or auth?",
			"How do you approach evolving existing services to handle greater scale or complexity?",
			"Can you discuss a time you led with technical vision, identifying opportunities for improvement?",
			"How do you approach designing reusable systems and clear abstractions at scale?",
			"Describe your experience with JavaScript/TypeScript and how you would apply it here.",
			"What is your experience with distributed systems patterns (e.g., microservices, event-driven architecture)?"
		],
		company: "Rally UXR",
		tags: ["Backend", "Node.js", "TypeScript", "AWS", "Kafka"]
	};
  	return (
		<div>

      <Interview posting={examplePosting}/>
			{/* <BrowseJobPosting /> */}
			{/* <UploadJobPosting /> */}
		</div>


    // <div className="bg-gray-900 text-white min-h-screen font-sans">
    //   <nav className="bg-gray-800 p-4 flex justify-center space-x-4">
    //     <button
    //       onClick={() => setActiveView('upload')}
    //       className={`px-4 py-2 rounded-md ${activeView === 'upload' ? 'bg-indigo-600' : 'bg-gray-700'}`}
    //     >
    //       Upload
    //     </button>
    //     <button
    //       onClick={() => setActiveView('browse')}
    //       className={`px-4 py-2 rounded-md ${activeView === 'browse' ? 'bg-indigo-600' : 'bg-gray-700'}`}
    //     >
    //       Browse
    //     </button>
    //   </nav>
    //   <main className="p-8">
    //     {activeView === 'upload' ? <Upload /> : <Browse />}
    //   </main>
    // </div>
  );
}

export default App;