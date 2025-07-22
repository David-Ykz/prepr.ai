import { storeJobPosting } from './db/client.js';
import { queryLLM } from './llm/client.js';
import { jobPostingDeclaration } from './llm/declarations.js';
import express, { json } from 'express';
import cors from 'cors';

const app = express();
const PORT = 8000;


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


queryLLM(sampleUploadPrompt, jobPostingDeclaration).then(res => {
	storeJobPosting(res);
})

// POST /upload
// app.post('/upload', async (req, res) => {
// 	try {
//     	const { content } = req.body;

//     	if (!content || typeof content !== 'string') {
//     		return res.status(400).json({ error: 'Invalid content' });
//     	}

// 		res.json({ questions: ["Question 1", "Question 2", "Question 3"] });
// 	} catch (err) {
//     	console.error(err);
//     	res.status(500).json({ error: 'Server error' });
//   	}
// });

// // GET /list
// app.get('/list', async (req, res) => {
//   try {
//     const uploads = await Upload.find().sort({ timestamp: -1 });
//     res.json({ uploads });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });



