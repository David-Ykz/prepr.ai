import { getAllTags, getJobPosting, listJobPosting, storeJobPosting } from './db/client.js';
import { queryLLM } from './llm/client.js';
import { jobPostingTemplate, feedbackTemplate } from './llm/declarations.js';
import express, { json } from 'express';
import cors from 'cors';
import multer from 'multer';

const app = express();
const PORT = 8000;
const mediaUpload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(json());

app.post('/posting/upload', async (req, res) => {
	try {
    	const { content } = req.body;
		const tags = await getAllTags();
		content += `\n here are a list of existing tags: ${tags}`
		const formattedJobPosting = await queryLLM(content, jobPostingTemplate);
		await storeJobPosting(formattedJobPosting);
		res.json(formattedJobPosting);
	} catch (err) {
    	console.error("Error in /posting/upload: ", err);
    	res.status(500).json({ error: 'Server error' });
  	}
});

app.post('/posting/get', async (req, res) => {
	try {
		const { postingID } = req.body;
		const jobPosting = await getJobPosting(postingID);
		res.json(jobPosting);
	} catch (err) {
    	console.error("Error in /posting/get", err);
    	res.status(500).json({ error: 'Server error' });
	}
});

app.post('/posting/list', async (req, res) => {
	try {
		const { title, company, tags } = req.body;
		const jobPostings = await listJobPosting(title, company, tags);
		res.json(jobPostings);
	} catch (err) {
    	console.error("Error in /posting/list", err);
    	res.status(500).json({ error: 'Server error' });
	}
});

app.get('/posting/tags', async (req, res) => {
	try {
		const tags = await getAllTags();
		res.json(tags);
	} catch (err) {
    	console.error("Error in /posting/list", err);
    	res.status(500).json({ error: 'Server error' });
	}
});

app.post('/feedback/upload', mediaUpload.single('audio'), async (req, res) => {
	try {
		const file = req.file;
		const { content } = req.body;
		const question = content.question;
		const posting = content.posting;
		const prompt = [
			{
				text: `You are interviewing a candidate for a ${posting.title} role at the company ${posting.company}. 
				Give feedback on their response to the question ${question}`
			},
			{
				inlineData: {
					mimeType: "audio/mp3",
					data: file
				}
			}
		];
		const feedback = await queryLLM(prompt, feedbackTemplate);
		res.json(feedback);
	} catch (err) {
		console.error("Error in /feedback/upload: ", err);
		res.status(500).json({ error: 'Server error' });
	}
});


app.listen(PORT, () => {
	console.log("Started server on", PORT);
});
