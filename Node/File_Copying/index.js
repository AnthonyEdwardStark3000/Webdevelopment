const filesystem= require('fs');
var a=filesystem.copyFileSync("file_to_be_accessed.txt","file_that_is_copied.txt");
if(a!=0)
{
console.log("Process has been completed successfully");
}
else {
  console.log("Process has been terminated");
}
