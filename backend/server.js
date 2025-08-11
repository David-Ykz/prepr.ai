import { getAllTags, getJobPosting, listJobPosting, storeJobPosting } from './db/client.js';
import { queryLLM } from './llm/client.js';
import { jobPostingTemplate, feedbackTemplate, imageTemplate } from './llm/declarations.js';
import express, { json } from 'express';
import cors from 'cors';
import multer from 'multer';
import https from 'https';

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
        const base64Audio = file.buffer.toString('base64');
		const { question, posting } = req.body;
		const prompt = [
			{
				text: `You are interviewing a candidate for a ${posting.title} role at the company ${posting.company}. 
				Give feedback on their response to the question ${question}`
			},
			{
				inlineData: {
					mimeType: "audio/webm",
					data: base64Audio
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

app.post('/feedback/images', mediaUpload.array('images'), async (req, res) => {
	try {
		console.log("hit endpoint");
		const files = req.files;
		console.log("len:", files.length);
		const imageData = files.map(image => {
	        const base64Image = image.buffer.toString('base64');
			return {
    	    	"inlineData": {
					"mimeType": "image/jpeg",
					"data": base64Image
				}
	        };
		});

		const prompt = [
			{
				parts: [
					{
						text: `You are interviewing a candidate. You are given an array of ${files.length} images that contain snapshots
						of their response. For each image, determine if the candidate is looking at the camera and return the total number of images where the candidate is NOT looking at the camera`
					},
					...imageData
				]
			},
		];
		const eyeContact = await queryLLM(prompt, imageTemplate);
		eyeContact.total = files.length;
		res.json(eyeContact);
	} catch (err) {
		console.error("Error in /feedback/images: ", err);
		res.status(500).json({ error: 'Server error' });
	}
});


app.listen(PORT, () => {
	console.log("Started server on", PORT);
});

// var server = https.createServer({
//     key: fs.readFileSync('/home/ec2-user/cert.key'),
//     cert: fs.readFileSync('/home/ec2-user/cert.crt')
// }, app);
// server.listen(PORT, () => {
// 	console.log("Server is running on port ", PORT);
// });