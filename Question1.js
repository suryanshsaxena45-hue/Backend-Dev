const fs = require('fs');
function wordCount(){
   fs.readFile("updated.txt","UTF-8",(err,data)=>{
    if(err) throw err
        let res = data.split(" ");
        let count = res.length;
        fs.writeFileSync("countNote.txt",`${count}`);
   });

}
module.exports = {wordCount};