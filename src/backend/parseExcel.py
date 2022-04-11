import pandas as pd
import pymongo
import sys

# reading in command-line arguments from app.js
excel_file = sys.argv[1]
uri = sys.argv[2]

# reading excel file and extracting leaderboard from Mentimeter quiz
df = pd.read_excel(excel_file)
numStudents = df.shape[0] - 2
df = pd.read_excel(excel_file, sheet_name="Session 1", usecols="A,B,D", header=None, names=["Position","Name","Score"], index_col=None)
s = df.iloc[:,0]
leaderboard_start = s.where(s=="Position").last_valid_index() + 1
leaderboard = df[leaderboard_start:leaderboard_start+numStudents]
print(leaderboard)

# connecting client to MongoDB cluster
client = pymongo.MongoClient(uri)
mydatabase = client["mentileaders"]
students = mydatabase["students"]

# looping through leaderboard to update values for each student in database
for index, row in leaderboard.iterrows():
   student = row["Name"]
   place = row["Position"]
   score = row["Score"]

   query = {"name":student}
   found = students.find_one(query)
   print(found)
   
   if found == None:
       # creates new student document for insertion into database
       new_student={
       "name":student, 
       "place":place, 
       "score":score, 
       "attendance": 1 
       }
       students.insert_one(new_student)
   else:
       # updates existing student's score, attendance, and best placement
       score += found["score"]
       attendance = found["attendance"] + 1
       if(place >= found["place"]):
           place = found["place"]
       updates = {"$set":{"score":score, "attendance":attendance, "place":place}}
       students.update_one(query, updates)


# testing that 'mentileaders' database with 'students' collection has been created by inserting test student 

#student={
#"name":"test", 
#"place":-1, 
#"score":-1, 
#"attendance": -1 
#}
#
#students.insert_one(student)
#
#list_of_db = client.list_database_names()
#
#print(list_of_db)
#
#if "mentileaders" in list_of_db:
#    print("Exists !!")