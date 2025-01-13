import mongoose from "mongoose";

//Schema
const userSchema = new mongoose.Schema({
firstName:{ type: String, required: true, trim:true},
lastName:{ type: String, required: true, trim:true},
email:{ type: String, required: true, trim:true, lowercase:true, unique:true},
password:{ type: String, required: true, trim:true},
is_verified:{type: Boolean, default: false},
role:{type:[String], enum:["user", "admin"], default:["user"] }
})

//model
const userModel = mongoose.model('user', userSchema);

export default userModel;