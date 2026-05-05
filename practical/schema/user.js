import mongoose from "../config/db.js";

// user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50   
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        match: [
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/
        ],
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true

    }

}, {
    timestamps: true 
});

// export model
export default mongoose.model("user", userSchema);