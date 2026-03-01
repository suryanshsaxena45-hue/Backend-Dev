import fs from  "fs"
function updateUser(req, res) {
  try {
    let { id } = req.params;        
    id = Number(id.slice(1));

    const { name,department,salary } = req.body;  
    console.log(req.body);
    console.log(req.params);

    if (!id || !email || !name) {
      return res.status(400).send("ID, email, and name are required");
    }
    
    if (!fs.existsSync("user.json")) {
      return res.status(404).send("No users found");
    }

    const users = JSON.parse(fs.readFileSync("user.json", "utf-8"));

    const userIndex = users.findIndex(user => user.id == id);

    if (userIndex === -1) {
      return res.status(404).send("Employee not found");
    }
    users[userIndex].department = department;
    users[userIndex].name = name;
    users[userIndex].salary = salary;

    
    fs.writeFileSync("Empolyee.json", JSON.stringify(users, null, 2));

    res.status(200).send("Employee updated successfully");

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

export default updateUser