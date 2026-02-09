const OS = require('os');
const fs = require('fs');
console.log(OS);
console.log(OS.cpus());
console.log(OS.cpus().length)
console.log(OS.freemem());
let count = 0;
let fileReader = setInterval(()=>{
    fs.readFile("./ab.txt","UTF-8",(err,data)=>{
        if(err) throw err
         console.log("File read",data);
    });
    count++;
    if(count ==10){
        clearInterval(fileReader)
    }
},1000)