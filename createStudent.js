import fs from "fs"
function createStudent(name,id,classes){
    try{
        let studentJson = [];
        let ob = {
            name,id,classes
        }
        if(fs.existsSync("student.json")){
            let data = fs.readFileSync("student.json","UTF-8");
            console.log(data);
            if(data){
                studentJson= JSON.parse(data);
                console.log(data);
            }
        }
        studentJson.push(ob)
        fs.writeFileSync("student.json",JSON.stringify(studentJson,null,2))
        return "Student create successfull"
    } catch(error){
        console.log("Error from create student", error);
    }
}
export default createStudent