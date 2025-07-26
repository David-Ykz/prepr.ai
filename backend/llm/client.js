import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({});
const MODEL = "gemini-2.5-flash";

export async function queryLLM(prompt, declaration) {
	try {
		const response = await ai.models.generateContent({
			model: MODEL,
			contents: prompt,
			config: {
				thinkingConfig: {
					thinkingBudget: 0,
				},
				tools: [{
					functionDeclarations: [declaration]
				}]
			}
		});
		if (response.functionCalls && response.functionCalls.length > 0) {
			return response.functionCalls[0];
		}
		return response.text;
	} catch (err) {
		const errMessage = `Encountered error querying LLM with prompt: ${prompt} and error: ${err}`;
		console.log(errMessage);
		return errMessage;
	}
}