import { Type } from '@google/genai';

export const jobPostingTemplate = {
	name: "create_job_posting_data",
	description: "Extracts structured data from a job posting. If the user has not provided sufficient information, leave all fields blank",
	parameters: {
		type: Type.OBJECT,
		properties: {
			title: {
				type: Type.STRING,
				description: "The title of the job position."
			},
			company: {
				type: Type.STRING,
				description: "The name of the company hiring."
			},
			tags: {
				type: Type.ARRAY,
				items: { type: Type.STRING },
				description: "A list of relevant technical skills or keywords. Do not include soft skills like leadership or communication. Be consistent with the way previous tags were named (ex. avoiding having both Node.js and Node tags). Aim for around 5 tags, with a maximum of 7"
			},
			questions: {
				type: Type.ARRAY,
				items: { type: Type.STRING },
				description: "A list of 7 generated interview questions based on the posting."
			}
		},
		required: ["title", "company", "tags", "questions"]
	}
};

// If you did not give a score of 5/5 for any of the categories (relevance, clarity, correctness, persuasiveness), explain why. 
export const feedbackTemplate = {
	name: "feedback",
	description: "A template for feedback",
	parameters: {
		type: Type.OBJECT,
		properties: {
			relevance: {
				type: Type.INTEGER,
				description: "A score out of 5 for how relevant the response was to the question/company. A score of 5 means the response was very relevant, while a score of 0 means the response was completely off-topic"
			},
			clarity: {
				type: Type.INTEGER,
				description: "A score out of 5 for how easy the response was to follow. A score of 5 means the response was well-articulated and concise, while a score of 0 means the response was confusing or vague"
			},
			correctness: {
				type: Type.INTEGER,
				description: "A score out of 5 for how factually correct the response was. A score of 5 means the candidate has a solid understanding of the topic discussed in the response, while a score of 0 means the response has many errors. Mainly applicable to technical or knowledge-based questions"
			},
			persuasiveness: {
				type: Type.INTEGER,
				description: "A score out of 5 for how persuasive the response was. A score of 5 indicates a compelling response, while a score of 0 indicates a response with no real argument. Mainly applicable to behavioural questions"
			},
			otherFeedback: {
				type: Type.STRING,
				description: "Feedback on the response. Give an overall summary on the quality of the response, then go into detail dissecting the response, focusing on both good and bad aspects. The response should be in 2nd person"
			},
		},
		required: ["relevance", "clarity", "otherFeedback"]
	}
};

export const imageTemplate = {
	name: "imageAnalysis",
	description: "A template for image analysis",
	parameters: {
		type: Type.OBJECT,
		properties: {
			eyeContact: {
				type: Type.INTEGER,
				description: "Number of images where the candidate is not looking at the camera"
			},
		},
		required: ["eyeContact"]
	}
};