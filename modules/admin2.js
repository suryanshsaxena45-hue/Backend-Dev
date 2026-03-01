import fs from "fs";
import { StatusCodes } from "http-status-pro-js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";



export function login(req,res){
    let{email,password} = req.body;
    
    try{
        if(!email || !password){
             return res.status(StatusCodes.BAD_REQUEST.code).json({
            code:StatusCodes.BAD_REQUEST.code,
            message:StatusCodes.BAD_REQUEST.message,
            data:null
        })
        }
        if(!fs.existsSync("admin.json")){
            return res.status(StatusCodes.NOT_FOUND.code).json({
            code:StatusCodes.NOT_FOUND.code,
            message:StatusCodes.NOT_FOUND.message,
            data:null
        })
        }
       
        let data =JSON.parse(fs.readFileSync("admin.json","utf-8"));
        let isEmp = data.find((value)=> value.email == email  )
        
         if(!isEmp){
            //   return res.status(StatusCodes.NOT_FOUND.code).json({
            //     code:StatusCodes.NOT_FOUND.code,
            //     message:StatusCodes.NOT_FOUND.message,
            //     data:null
            //     })
            return res.render("login", { error: "Invalid Email or Password" });
           }
           let checkpass = bcrypt.compareSync(password,isEmp.password);
           if(!checkpass){
            return res.render("login",{error:"password wrong"});
           }
    let token = jwt.sign({id:isEmp.id}, process.env.TOKEN,{expiresIn:"7d"})
        //     res.status(StatusCodes.OK.code).json({
        //     code:StatusCodes.OK.code,
        //     message:StatusCodes.OK.message,
        //     data: {isEmp:isEmp,token}
        // })
        res.cookie("token", token, { 
            httpOnly: true,          
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        });
        res.redirect("/");
    }catch(err){
        console.log("login admin",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

export default login