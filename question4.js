
const console = require('console');
const fs = require('fs');
fs.writeFileSync('fileToBeDeleted.txt','hi this is a new file');

function writeFile(date=12,data,name,type){
    let res = fs.writeFileSync("ab.txt",`this is my data from code ${date} and ${data} and name ${name} and ${type}`);
    return res;
}
function readFile(){
   fs.readFile("ab.txt","utf-8",(err,data) => {
        if(err) throw err
            console.log("file read", data);
   });
}
function updateFile(){
    let res = fs.appendFileSync("ab.txt","\nThis is the updated text by export and import");
}
function deleteFile(){
    fs.unlink('fileToBeDeleted.txt', (err) => {
        if (err) throw err
        console.log('File deleted');
    });
}

module.exports = {writeFile,readFile,updateFile,deleteFile};