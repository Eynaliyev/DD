const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const cpuRouter = require("./routes/cpuLoad");
app.use("/", cpuRouter);
app.use("/cpuLoad", cpuRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
