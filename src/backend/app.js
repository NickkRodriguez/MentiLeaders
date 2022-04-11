const { app, server } = require("./server");
const { connectDB, disconnectDB } = require("./database");

app.listen();
connectDB();
