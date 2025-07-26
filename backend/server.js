import { getJobPosting, listJobPosting, storeJobPosting } from './db/client.js';
import { queryLLM } from './llm/client.js';
import { jobPostingTemplate, feedbackTemplate } from './llm/declarations.js';
import express, { json } from 'express';
import cors from 'cors';
import multer from 'multer';

const app = express();
const PORT = 8000;
const mediaUpload = multer({ storage: multer.memoryStorage() });

const sampleUploadPrompt = `
222
marketplace facilitating IRL social experiences at local venues

Full-Stack Software Engineer
$110K - $180K
Location
New York, NY, US
Job Type
Full-time
Experience
1+ years
Visa
US citizen/visa only
Connect directly with founders of the best YC-funded startups.
Apply to role ›
Keyan Kazemian
Keyan Kazemian
Founder
About the role
about 222:
We’re an early stage startup working on building the future of social. We are not excited about a future where humans spend the majority of their day in a virtual world. By facilitating genuine human connections IRL, we're building a product that swings the pendulum in the other direction.

We’re backed by a word-class set of investors including General Catalyst, Y Combinator (W23), Upfront Ventures, NEA, Jaegermeister, 1517 Fund, Cory Levy (Z Fellows), the Founder of Dropbox (Arash Ferdowsi), the Founder of On Deck (Julian Weisser) & more.

what you’ll be doing:
You will be joining 222 as an early full-time engineering hire - spearheading all things web development, back-end APIs, system design, & automation. you’ll be working directly with the early engineering team to scale our back-end, enhance our front-end web applications, and to be part of a growing world-class engineering team.
who you are:
You’re incredibly thoughtful and meticulous about system design & long-lasting abstractions
You’re passionate about solving the problem 222 is tackling
You have experience building web apps in React/Next JS
You have experience working with Python Fast API
You have experience working with PostgreSQL
bonus: You’ve built and shipped an Android app
You have experience scaling the backend/infrastructure of a live software product
You have a strong stance on the ethics surrounding user psychology in social products
Regardless of personal experience, you’re excited about wearing different hats across front-end engineering, back-end engineering, & architecture
Demonstrated history of building outside of work/school (projects/products, applications, music, art, etc.)
skills & tools:
Back-end development: Python (Flask/Fast-API), PostgreSQL
Front-end web development: React/Next JS, HTML/CSS/Javascript, Node
Bonus: familiarity with shipping Android apps either natively or in React Native
we’re looking for this type of person:

🖌️  full-stack engineer with extensive web and backend algorithms design experience

🧠  first principles thinking

🏗️  history of building things from scratch

🙇‍♂️  strongly opinionated about our current social fabric and its future

About 222
222 is building the future of social by accelerating IRL chance encounters.`

app.use(cors());
app.use(json());

app.post('/posting/upload', async (req, res) => {
	try {
    	const { content } = req.body;
		console.log("content: ", content);
		const formattedJobPosting = await queryLLM(content, jobPostingTemplate);
		formattedJobPosting.originalPosting = content;
		await storeJobPosting(formattedJobPosting);
		res.json(formattedJobPosting);
	} catch (err) {
    	console.error("Error in /posting/upload: ", err);
    	res.status(500).json({ error: 'Server error' });
  	}
});

app.post('/posting/get', async (req, res) => {
	try {
		const { content } = req.body;
		const jobPosting = await getJobPosting(content);
		res.json(jobPosting);
	} catch (err) {
    	console.error("Error in /posting/get", err);
    	res.status(500).json({ error: 'Server error' });
	}
});

app.get('/posting/list', async (req, res) => {
	try {
		const jobPostings = await listJobPosting();
		res.json(jobPostings);
	} catch (err) {
    	console.error("Error in /posting/list", err);
    	res.status(500).json({ error: 'Server error' });
	}
});

app.post('/feedback/upload', upload.single('audio'), async (req, res) => {
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


