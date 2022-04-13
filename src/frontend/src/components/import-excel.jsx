import React, { Component, useEffect, useState } from 'react';
import { readFile, utils } from 'xlsx';
import UserDataService from "../services/user";

export const ImportExcel = () => {
    const [file, setFile] = useState(null);
    const [courseName, setCourseName] = useState(null);
    //const [studentsInClass, setStudentsInClass] = useState([null]);
    const [studentName, setStudentName] = useState(null);
    const [student, setStudent] = useState(null);

    useEffect( () => {
        retrieveStudent(studentName);
    }, [studentName]);

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

    // 
    //const retrieveClass = () => {
    //    UserDataService.getClass(courseName)
    //      .then((response) => {
    //        console.log(response.data);
    //        setStudentsInClass(response.data.users);
    //      })
    //      .catch((e) => {
    //        console.log(e);
    //      });
    //};

    //
    const retrieveStudent = (name) => {
        UserDataService.getUser(name)
          .then((response) => {
              console.log(response.data);
              setStudent(response.data);
          })
          .catch((e) => {
              console.log(e);
          });
    }; 
    
    // function that submits new quiz data to database
    const handleSubmit = async (e) => {
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
        for(var i = 1; i <= numStudents; i++)
        {
            console.log(jsonData[lb_start + i][0] + " " + jsonData[lb_start + i][1] +  " " + jsonData[lb_start + i][3]);
        }
        //console.log("students in course: " + courseName);
        setStudentName("First Post");
        console.log(student);

        //let student = await UserDataService.getUser("First Post");
        //console.log(student);
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