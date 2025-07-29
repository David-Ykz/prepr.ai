const BASE_URL = "http://localhost:8000";

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