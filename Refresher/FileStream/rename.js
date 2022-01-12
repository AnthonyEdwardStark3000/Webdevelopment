const fs = require("fs");
console.log("beginning");
fs.rename('test.txt', 'Data.txt', function(){
  console.log("\nFile Renamed!\n");
});
console.log("Program completed");
