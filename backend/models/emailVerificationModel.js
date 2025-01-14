import mongoose from "mongoose";

//Schema
const EmailVerificationSchema = new mongoose.Schema({
userId:{ type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
otp:{ type:String, required:true},
createdAt :{ type:Date, default: Date.now(), exprires:'5m' }
});

//model
const EmailVerificationModel = mongoose.model('EmailVarification', EmailVerificationSchema);

export default EmailVerificationModel;