const os = require('os');
const fs = require('fs');
function logOS(){
    let res = setInterval(()=>{
        let cpuDetails = os.cpus();
        let memDetails = os.freemem();
        let platDetails = os.platform();
        fs.appendFileSync("cpuLog.txt",`${cpuDetails}`);
        fs.appendFileSync("cpuLog.txt",`\n${memDetails}`);
        fs.appendFileSync("cpuLog.txt",`\n${platDetails}`);
    },5000);
}
module.exports={logOS}
