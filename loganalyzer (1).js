const fs = require("fs");
const readline = require("readline");

// Create read stream
const fileStream = fs.createReadStream("app.log");

// Create readline interface
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

// Counters
let totalLogs = 0;
let errorCount = 0;
let infoCount = 0;
let warnCount = 0;

// Read file line by line
rl.on("line", (line) => {
  totalLogs++;

  if (line.includes("ERROR")) {
    errorCount++;
  } else if (line.includes("INFO")) {
    infoCount++;
  } else if (line.includes("WARN")) {
    warnCount++;
  }
});

// When file reading is complete
rl.on("close", () => {
  console.log("Log Summary Report");
  console.log("--------------------");
  console.log("Total Logs:", totalLogs);
  console.log("INFO Logs:", infoCount);
  console.log("WARN Logs:", warnCount);
  console.log("ERROR Logs:", errorCount);
});
