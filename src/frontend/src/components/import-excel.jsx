import React, { useEffect, useState } from 'react';
import { readFile, utils } from 'xlsx';

import UserDataService from "../services/user";
import User from './user';

//for debuggin
//import http from "../http-common";

export const ImportExcel = () => {
    const [file, setFile] = useState(null);
    const [courseName, setCourseName] = useState(null);
    const [studentName, setStudentName] = useState(null);
    const [students, setStudents] = useState([]);

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

        // loads excel worksheet with leaderboard, determines row where leaderboard begins
        const leaderboard_worksheet = workbook.Sheets[workbook.SheetNames[1]];
        const jsonData = utils.sheet_to_json(leaderboard_worksheet, { raw: true, header: 1 , blankrows: false});
        var col = jsonData.map(function(value,index) { return value[0]; });
        var lb_start = col.lastIndexOf("Position");

        // loops through every student in leaderboard,
        //var lb = Array.from(Array(numStudents), () => new Array(3));
        for(var i = 1; i <= numStudents; i++)
        {
            console.log(jsonData[lb_start + i][0] + " " + jsonData[lb_start + i][1] +  " " + jsonData[lb_start + i][3]);
            //lb[i - 1][0] = jsonData[lb_start + i][0];
            //lb[i - 1][1] = jsonData[lb_start + i][1];
            //lb[i - 1][2] = jsonData[lb_start + i][2];
            const response = await  UserDataService.getUser(jsonData[lb_start + i][1]);
            console.log(response.data)
            if(response.data.total_results != 0) // user already exists in DB
            {
                var username = response.data.users[0].username;
                //console.log(username);
                var courses = response.data.users[0].classes;
                var found = false;
                var index = -1;
                for(let i = 0; i < courses.length; i++)
                {
                    if(courses[i] == courseName)
                    {
                        found = true;
                        index = i;
                        break;
                    }
                }       
                if(found) // user already has a score for specified course
                {
                    console.log(username + " is in course " + courseName);
                    response.data.users[0].scores[index] += jsonData[lb_start + i][3];
                    console.log(response.data.users[0].scores[index]);
                    
                    const result = await UserDataService.updateUser(response.data); 
                    console.log(result.data);
                }
                else // user does not yet have a score for specified course
                {
                    console.log(username + " is not in course " + courseName);
                }
            }
            else // user does exist in DB
            {
                console.log("Not found in DB");
            }
            //UserDataService.getUser(jsonData[lb_start + i][1])
            //.then((response) => {
                //handleStudent(response, i, lb_start, jsonData);
                //console.log(response.data)
                //if(response.data.total_results != 0) // user already exists in DB
                //{
                //    var username = response.data.users[0].username;
                //    //console.log(username);
                //    var courses = response.data.users[0].classes;
                //    var found = false;
                //    var index = -1;
                //    for(let i = 0; i < courses.length; i++)
                //    {
                //        if(courses[i] == courseName)
                //        {
                //            found = true;
                //            index = i;
                //            break;
                //        }
                //    }       
                //   if(found) // user already has a score for specified course
                //    {
                //        console.log(username + " is in course " + courseName);
                //        response.data.users[0].scores[index] += jsonData[lb_start + i][3];
                //        console.log(response.data.users[0].scores[index]);
                //    }
                //    else // user does not yet have a score for specified course
                //    {
                //        console.log(username + " is not in course " + courseName);
                //    }
                //}
                //else // user does exist in DB
                //{
                //    console.log("Not found in DB");
                //}
            //}); 
        }
        //setLeaderboard(lb);
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