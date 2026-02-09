
const console = require('console');
const fs = require('fs');
fs.writeFileSync('a.txt','hi this is a new file');

//sync function for result
function writeFile(date=12,data,name,type){
    let res = fs.writeFileSync("ab.txt",`this is my data from code ${date} and ${data} and name ${name} and ${type}`);
    return res;
}
function readFile(){
   fs.readFile("ab.txt","utf-8",(err) => {
        if(err) throw err
            console.log("file read", data);
   });
   console.log(res);
}
//to update a file you will use appendFileSync.
//Asyncronus task can be setTimeOut, eventloop, file handling,setInterval
function updateFile(){
    let res = fs.appendFileSync("ab.txt","\nThis is the updated text by export and import");
}
function deleteFile(){
    fs.unlink('unwanted-file.txt', (err) => {
        if (err) throw err
        console.log('File deleted');
    });
}

module.exports = {writeFile,readFile,updateFile,deleteFile};
