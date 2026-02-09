const console = require('console');
const fs = require('fs');
fs.writeFileSync('a.txt','hi this is a new file');

function checkExist(){
    fs.access("new.txt", (err) =>{
        if(err) throw err
    })
    console.log("File Exit");
}
//file rename
function changeName(){
    fs.access("a.txt",(err) =>{
        fs.rename("new.txt","updated.txt",(err) => {
            if (err) throw err
                console.log("rename completed");
        })
    })

}
function readFileStream(){
    let fileStream = fs.createReadStream("updated.txt");
    fileStream.on("data", (chunk) =>{
        console.log(chunk.toString());
    })

    fileStream.on("end", () =>{
        console.log("file end");
    })

}
module.exports = {checkExist,changeName,readFileStream};