import fs from "fs";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const app = express();
app.use(express.json());













const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("server is connected");
});
