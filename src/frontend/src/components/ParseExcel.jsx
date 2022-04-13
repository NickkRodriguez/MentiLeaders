import React, { Component, useState } from 'react';
import { readFile, utils } from 'xlsx';

export const ParseExcel = () => {
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
        console.log("this is for course: " + courseName);
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

//<h1>Import Excel File</h1>
//{fileName && (
//    <p>
//        Filename: <span>{fileName}</span>
//    </p> 
//)}
//<input type='file' onChange={(e) => handleFile(e)} />