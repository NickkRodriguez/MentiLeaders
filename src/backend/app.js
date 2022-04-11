const { app, server } = require("./server");
const { connectDB, disconnectDB } = require("./database");

app.listen();
connectDB();

//function that calls python script to upload excel file
function importData(pathToFile, uri)
{
    var spawn = require("child_process").spawn;
    var process = spawn('python', ["./parseExcel.py", pathToFile, uri])
}

//call to import data from 'Music-Quiz1.xlsx' into database
let source = process.env.ATLAS_CONNECTION
importData("./excel/Music-Quiz1.xlsx", source);