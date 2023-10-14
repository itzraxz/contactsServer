const express = require("express");
const app = express();
const logger = require("./middleware/logger");
const contactsApiRouter = require("./routes/api/contacts");
const rootRouter = require("./routes/root");
const cors = require("cors");

//env Variable
const PORT = process.env.PORT || 3500;

//white List for cors request
const whileList = ["http://localhost:3500"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whileList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
};

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log("Server Request Arrived");
  logger(req.method, req.url, req.headers.origin, "requestLog.txt");
  next();
});

app.use("^/$", rootRouter);

app.use("/contacts", contactsApiRouter);

app.use("*", (req, res) => {
  res.status(404);
  res.send("Error: 404 not found  ");
});

app.use((err, req, res) => {
  if (err) {
    logger(req.method, req.path, req.headers.origin, "errorLog.txt");
    res.status(200)
    res.send({message: err.message})
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`Server running on port ${PORT}...`);
});
