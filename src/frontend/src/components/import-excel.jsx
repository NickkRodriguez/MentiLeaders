import { React, useState } from 'react';
import { readFile, utils } from 'xlsx';

import UserDataService from "../services/user";
import User from './user';

export const ImportExcel = () => {
    const [file, setFile] = useState(null);
    const [courseName, setCourseName] = useState(null);

    // function that updates the excel file that is inputted into form
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    // function that updates the text that is inputted into form
    const handleTextChange = async (e) => {
        const courseName = e.target.value;
        setCourseName(courseName);
    };

    // function that submits new quiz data to database
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(file == null)
        {
            return;
        }
        const data = await file.arrayBuffer();
        const workbook = readFile(data);

        // determines the number of students that participated in mentimeter quiz
        const students_worksheet = workbook.Sheets[workbook.SheetNames[0]];
        var range = utils.decode_range(students_worksheet['!ref']);
        var numStudents = range.e.r - range.s.r - 2;

        // loads leaderboard from excel worksheet, determines row where leaderboard begins
        const leaderboard_worksheet = workbook.Sheets[workbook.SheetNames[1]];
        const jsonData = utils.sheet_to_json(leaderboard_worksheet, { raw: true, header: 1 , blankrows: false});
        var col = jsonData.map(function(value,index) { return value[0]; });
        var lb_start = col.lastIndexOf("Position");

        // loops through every student in leaderboard to add scores from excel worksheet to the database
        for(var i = 1; i <= numStudents; i++)
        {
            console.log(jsonData[lb_start + i][0] + " " + jsonData[lb_start + i][1] +  " " + jsonData[lb_start + i][3]);
            const response = await UserDataService.getUser(jsonData[lb_start + i][1]);

            if(response.data.total_results != 0) // user already exists in DB
            {
                console.log(jsonData[lb_start + i][1] + " is in DB");
                var student = response.data.users[0];
                var name = student.username;
                var courses = student.classes;

                var updatedStudent = {
                    "username" : name,
                    "score" : jsonData[lb_start + i][3],
                    "scores" : student.scores,
                    "classname" : courseName,
                    "classes" : courses,
                    //"date" : null,
                }

                // determining if user has a previous score from course entered into form
                var found = false;
                for(let i = 0; i < courses.length; i++)
                {
                    if(courses[i] == courseName)
                    {
                        found = true;
                        break;
                    }
                }      
                 
                if(found) // user already has a score for specified course
                {
                    console.log(name + " is in course " + courseName);
                    const result = await UserDataService.updateUserScore(updatedStudent); 
                    console.log(result.data);
                }
                else // user does not yet have a score for specified course
                {
                    console.log(name + " is not in course " + courseName);
                    const result = await UserDataService.updateUserClass(updatedStudent);
                    console.log(result.data);
                }
            }
            else // user does not exist in DB
            {
                console.log(jsonData[lb_start + i][1] + "is not in DB");
                var newStudent = {
                    "username" : jsonData[lb_start + i][1],
                    "score" : jsonData[lb_start + i][3],
                    "classname" : courseName,
                    //"date" : null,
                }
                const result = await UserDataService.createUser(newStudent);
                console.log(result.data);
            }
        }
    };

    return (
        <div>
            <form>
            <h1>Excel File Upload</h1>
            <input type='file' onChange={(e) => handleFileChange(e)} />
            <label>
                Enter course code: <input type='text' onChange={(e) => handleTextChange(e)} />
            </label>
            <button type="submit" onClick={(e) => handleSubmit(e)}>Upload</button>
            </form>
        </div>
    );
};