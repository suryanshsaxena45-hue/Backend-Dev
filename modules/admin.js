import fs from "fs";
import { StatusCodes } from "http-status-pro-js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export function reg(req, res) {
    try {
        let { name, email, password } = req.body;

        // Validate fields
        if (!name || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code: StatusCodes.BAD_REQUEST.code,
                message: "All fields are required",
                data: null
            });
        }

        // Hash password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // New user object
        const newUser = {
            id: Date.now(),
            name,
            email,
            password: hashedPassword,
            role: "admin"
        };

        let users = [];

        // If file exists → read data
        if (fs.existsSync("admin.json")) {
            const fileData = fs.readFileSync("admin.json", "utf-8");
            users = JSON.parse(fileData);

            // Check duplicate email
            const isUser = users.find(user => user.email === email);

            if (isUser) {
                return res.render("reg", {
                    error: "You already have an account with this email."
                });
            }
        }

        // Add new user
        users.push(newUser);

        // Write file (creates file automatically if not exists)
        fs.writeFileSync("admin.json", JSON.stringify(users, null, 2));

        // Redirect to login page
        return res.redirect("/login");

    } catch (error) {
        console.log("Register Error:", error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message,
            data: null
        });
    }
}

export default reg;