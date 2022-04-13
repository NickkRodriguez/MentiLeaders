const { app } = require("./server");
const { connectDB } = require("./database");

app.listen();
connectDB();
