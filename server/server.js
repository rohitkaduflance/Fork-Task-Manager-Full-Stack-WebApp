import express from "express";
import cors from "cors";
import tasks from "./routes/tasks.js";

//for deployment on render - next 2 lines
const path = require("path");
app.use(express.static(path.join(__dirname, "build"))); // put this line of code in app.js

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/tasks", tasks);


// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
