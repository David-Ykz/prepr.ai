from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv

load_dotenv()
MONGODB_CONNECTION_STRING = os.getenv('MONGODB_CONNECTION_STRING')

file = open("interview_questions_list", "r")

client = MongoClient(MONGODB_CONNECTION_STRING, server_api=ServerApi('1'))
db = client["InterviewQuestions"]
collection = db["GeneralQuestions"]

for line in file.readlines():
	line = line.strip()
	if (line != ""):
		line = line.replace("â€™","'")
		line = line.replace("â?\"","'-'")
		line = line.replace("â?", "'")
		line = line.replace("ƒ?Ý", "'")
		if ("###" in line):
			topic = line[line.find(" ") + 1:]
		else:
		    line = line[line.find(" ") + 1:]
		    print(line)
		    collection.insert_one({"question": line})