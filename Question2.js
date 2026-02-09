//capatalizing String
const fs = require('fs');
function wordCap(){
    fs.readFile("ab.txt","UTF-8",(err,data)=>{
        if(err) throw err
            let res = data.toUpperCase();
            fs.writeFileSync("ab.txt",`\n${res}`);
    })
}
//reversing string
function revStr(){
    fs.readFile("ab.txt","UTF-8",(err,data)=>{
        if(err) throw err
            let res = data;
            let rev = "";
            for(let i = res.length-1; i>=0;i--){
                rev = rev + res[i];
            }
            fs.writeFileSync("ab.txt",`${rev}`);
    })
}
//counting vowels
function countVowels(){
    fs.readFile("ab.txt","UTF-8",(err,data)=>{
        if(err) throw err
        const vowels = ['a','e','i','o','u'];
        let count = 0;
        for(let character of data.toLowerCase()){
            if(vowels.includes(character)){
                count++;
            }
        }
        fs.writeFileSync("countedVowels.txt",` total vowels count: ${count}`);
    })
}
module.exports={wordCap,revStr,countVowels};