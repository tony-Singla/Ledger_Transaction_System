import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Plz enter the username for account "]
    },
    password: {
        type: String,
        minlength: [8, "Minimum Length is of 8 characters"],
        select: false,
        required: [true, "password is required for creating an account"],
    },
    systemUser: {
        type: Boolean,
        default: false,
        immutable: true,
        select: false
    }, 
    email: {
        type: String,
        required: [true, "Email is required for creating a user"],
        trim: true,
        lowercase: true,
        match: [ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email address" ],
        unique: [true, "Email already exists."]
    }
}, { 
    timestamps: true 
});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

userSchema.methods.comparePassword = async function (password) {
    console.log(password, this.password);
    return await bcrypt.compare(password, this.password);
};


const User = mongoose.model("User", userSchema);
export default User;