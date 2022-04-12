import React, { Component, useState } from 'react';
import { readFile, utils } from 'xlsx';

export const ParseExcel = () => {
    const [fileName, setFileName] = useState(null);
    
    const handleFile = async (e) => {
        const file = e.target.files[0];
        setFileName(file.name);
        const data = await file.arrayBuffer();
        const workbook = readFile(data, { sheetRows: 3});

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        //var range = J.utils.decode_range(worksheet['!ref']);
        //range.s.r += 2;
        //worksheet['!ref'] = J.utils.encode_range(range);

        const jsonData = utils.sheet_to_json(worksheet);

        console.log(jsonData);
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

