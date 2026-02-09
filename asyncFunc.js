const console = require('console');
const fs = require('fs');
fs.writeFileSync('a.txt','hi this is a new file');

function createFile(date, data, name, type){
    fs.writeFile("new.txt","hi this is a new file using async function",(err)=>{
        if(err) throw err
            console.log("file write", data)
    })
}
function readFile(){
   fs.readFile("ab.txt","utf-8",(err,data) => {
        if(err) throw err
            console.log("file read", data);
   });
   console.log(res);
}
function updateFile(){
    fs.appendFile("ab.txt","\nThis is the updated text by export and import",(err)=>{
        if(err) throw err
            console.log("file read", data);
    });
}
module.exports = {updateFile};