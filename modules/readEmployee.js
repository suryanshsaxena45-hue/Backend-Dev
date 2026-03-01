import fs from "fs";
import { StatusCodes } from "http-status-pro-js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
function login(req, res) {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    if (!fs.existsSync("Employee.json")) {
      return res.status(404).send("No users found");
    }

    const fileData = JSON.parse(fs.readFileSync("Employee.json", "utf-8"));
    const users = fileData ? JSON.parse(fileData) : [];
    let hasPassword = bcrypt.compareSync(password,user.password)
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).send("Email or password is wrong");

    }
    if(!hasPassword){
      return res.status(StatusCodes.UNAUTHORIZED.code).json(({message: StatusCodes.UNAUTHORIZED.message}))
    }


    let token = jwt.sign({id:user.id}, process.env.TOKEN, {expiresIn:"5h"})
    res.status(201).json({
      code :200,
      message:"user login",
      data:{user, token}
    });
  }
    catch(error){
        console.log(error);
        logger("error", StatusCodes.INTERNAL_SERVER_ERROR.message)
        
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message,
            data: null
        })
    }
}

export default login;
