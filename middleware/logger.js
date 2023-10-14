const fs = require("node:fs/promises");
const path = require("node:path");
const uuid = require("uuid").v4;
const format = require("date-fns").format;

const logger = async (reqMethod, reqPath, reqOrigin , fileName) => {
  //Creating Date
  const date = new Date();
  const dateTime = format(date, "PPPppp");
  //Generating logId
  const logId = uuid();

  try {
    await fs.appendFile(
      path.join(__dirname, "..", "logs", fileName),
      `id:${logId} \t requested at ${dateTime} \t ${reqOrigin} \t ${reqMethod} ${reqPath} \n`,
      "utf-8"
    );
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

module.exports =  logger;
