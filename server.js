const express = require("express");
const moment = require("moment");
const cors = require("cors");
const log = console.log;
const app = express();
const router = express.Router();
const PORT = 8080;
const dbConnector = require("./db");

app.use(
  express.urlencoded({
    extend: false,
  })
);
app.use(express.json());
app.use(cors());

app.post("/post_feedback", (req, res) => {
  console.log("Feedback Data: ", req.body);
  const { Uname, Feedback } = req.body;
  const data = {
    user_name: Uname,
    feedback: Feedback,
    timestamp: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
  };
  const insFunc = async () => {
    const InsQ = `INSERT INTO feedback_data SET ?`;
    const insertFeedback = await dbConnector.query(InsQ, data);
    if (insertFeedback.affectedRows === 1) {
      console.log("Data inserted");
    }
  };
  insFunc();
  res.send("Feedback Stored Succesfully");
});

app.get("/get_feedback", function (req, res) {
  const getFunc = async () => {
    const GetQ = `SELECT * FROM feedback_data`;
    const insertFeedback = await dbConnector.query(GetQ);
    console.log("insertFeedback", insertFeedback);
    if (insertFeedback !== undefined) {
      res.send(insertFeedback);
    }
  };
  getFunc();
});

app.listen(PORT, () => log("Server is starting on PORT,", 8080));
