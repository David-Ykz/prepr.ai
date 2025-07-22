import { Type } from '@google/genai';

export const jobPostingDeclaration = {
	name: "create_job_posting_data",
	description: "Extracts structured data from a job posting.",
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
				description: "A list of relevant skills or keywords. Limit it to max 5"
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