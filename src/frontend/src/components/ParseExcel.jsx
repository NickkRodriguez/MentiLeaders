import React, { Component, useState } from 'react';
import { readFile, utils } from 'xlsx';

export const ParseExcel = () => {
    const [fileName, setFileName] = useState(null);
    
    const handleFile = async (e) => {
        const file = e.target.files[0];
        setFileName(file.name);
        const data = await file.arrayBuffer();
        const workbook = readFile(data);

        const worksheet1 = workbook.Sheets[workbook.SheetNames[0]];
        var range = utils.decode_range(worksheet1['!ref']);
        var numStudents = range.e.r - range.s.r - 2;
        //console.log(numStudents);

        //var range = J.utils.decode_range(worksheet['!ref']);
        //range.s.r += 2;
        //worksheet['!ref'] = J.utils.encode_range(range);

        const worksheet2 = workbook.Sheets[workbook.SheetNames[1]];
        const jsonData = utils.sheet_to_json(worksheet2, { header: 1, defval: "" });
        console.log(jsonData);
        var col1 = jsonData.map(function(value,index) { return value[0]; });
        var lb_start = col1.lastIndexOf("Position");

        for(var i = 1; i <= numStudents; i++)
        {
            console.log(jsonData[0][lb_start + i] + jsonData[1][lb_start + i] + jsonData[2][lb_start + i]);
        }

        //console.log(jsonData[lb_start + 1][1]);
        console.log(lb_start);
    };
    
    return (
        <div>
            <h1>ParseExcel</h1>
            {fileName && (
                <p>
                    FileName: <span>{fileName}</span>
                </p> 
            )}
            <input type='file' onChange={(e) => handleFile(e)} />
        </div>
    );
};

