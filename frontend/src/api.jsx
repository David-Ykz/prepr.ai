const BASE_URL = "https://y-backend.com:8000";

export async function listJobPostings(filters = { title: "", company: "", tags: [] }) {
    const response = await fetch(`${BASE_URL}/posting/list`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filters)
    });
    return await response.json();
}

export async function getJobPosting(id) {
    const response = await fetch(`${BASE_URL}/posting/get`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postingID: id })        
    });
    return await response.json();
}

export async function getAllTags() {
    const response = await fetch(`${BASE_URL}/posting/tags`);
    return await response.json();
}


export async function uploadJobPosting(posting) {
    const response = await fetch(`${BASE_URL}/posting/upload`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: posting })
    });
    return await response.json();
}

export async function getFeedback(audioBlob, question, posting) {
    const formData = new FormData();
	formData.append('audio', audioBlob, 'audio.webm');
	formData.append('question', JSON.stringify(question));
	formData.append('posting', JSON.stringify(posting));

    const response = await fetch(`${BASE_URL}/feedback/upload`, {
        method: 'POST',
        body: formData
    });

    return await response.json();
}

export async function getImageAnalysis(images) {
    const formData = new FormData();
    images.forEach((image, index) => {
        formData.append('images', image, `${index}.jpg`);
    });

    const response = await fetch(`${BASE_URL}/feedback/images`, {
        method: 'POST',
        body: formData
    });

    return await response.json();
}