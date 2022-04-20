import { React, useState } from 'react';
import { readFile, utils } from 'xlsx';

import UserDataService from "../services/user";

export const ImportExcel = () => {
    const [file, setFile] = useState(null);
    const [courseName, setCourseName] = useState(null);
    const [message, setMessage] = useState("");

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
        if(file === null && (courseName === null || courseName === ""))
        {
            setMessage("Please select a file and enter a Course Name.")
            return;
        }
        else if(file === null)
        {
            setMessage("Please select a file.")
            return;
        }
        else if(courseName === null || courseName === "")
        {
            setMessage("Please enter a Course Name.")
            return;
        }
        setMessage("Success.")
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

            if(response.data.total_results !== 0) // user already exists in DB
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
                    if(courses[i] === courseName)
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

    <div className="submit-form">
    <form>
    <div className="d-flex flex-row">
        <div className="p-2">
            <label htmlFor="course">Course Name</label>
            <input type="text" className="form-control" id="course" onChange={(e) => handleTextChange(e)} />
        </div>
        <div class="p-2">
            <label htmlFor="file-upload">Select a File</label>
            <br />
            <input type="file" className="form-control-file form-control-sm" id="file-upload" onChange={(e) => handleFileChange(e)} />
        </div>
    </div>
    <div class="d-flex flex-row">
        <div class="p-2">
            <button onClick={handleSubmit} className="btn btn-success">
                Upload
            </button>
        </div>
        <div class="pl-1 pr-2 py-2 my-auto">
            <label> {message} </label>
        </div>
    </div>
    </form>
    </div>
    );
};