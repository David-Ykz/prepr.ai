file = open("interview_questions_list", "r")

topic = ""
insert_query = "INSERT INTO interview_questions(prompt, topic) values({},{});"
apostrophe = "\'"

for line in file.readlines():
	line = line.strip()
	if (line != ""):
		line = line.replace("â€™","''")
		line = line.replace("â?\"","'-'")
		line = line.replace("â?", "''")
		line = line.replace("ƒ?Ý", "''")
		if ("###" in line):
			topic = line[line.find(" ") + 1:]

		else:
			line = line[line.find(" ") + 1:]
			print(insert_query.format(apostrophe + line + apostrophe, apostrophe + topic + apostrophe))








#topic = input("Enter the topic: ")
#questions = []
#readDataMode = True

#while (readDataMode):
#	string = input()
#	if string == "exit":
#		readDataMode = False;
#	elif string != "":
#		questions.append(string)




#for entry in questions:
#	entry = entry[entry.find(" ") + 1:]

#	print("INSERT INTO interview_questions(prompt, topic) values(\'" + entry + "\', \'" + topic + "\');")

