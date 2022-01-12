const fs = require("fs");
const content = fs.readFileSync("test.txt","utf8");
console.log(content);
console.log("From the synchronous file");
