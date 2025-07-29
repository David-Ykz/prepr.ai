import React, { useState } from 'react';
import Upload from './views/Upload';
import Browse from './views/Browse';
import './App.css';
import BrowseJobPosting from './BrowseJobPosting';

function App() {
	const [activeView, setActiveView] = useState('upload');

  	return (
		<div>
			<BrowseJobPosting />
			Hello World!
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