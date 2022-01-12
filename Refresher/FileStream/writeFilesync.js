const fs = require("fs");
const content="Done";
fs.writeFileSync("test.txt",content,"utf8");
console.log("Done");
