import mongoose from "mongoose";

const userRefreshTokensShema = new mongoose.Schema({
    userId :{ type: mongoose.Schema.Types.ObjectId, required: true },
    token:{ type: String, required: true },
    blacklist: { type: String, default: false },
    createdAt:{ type: String, default: Date.now(), expires:"2d"}
});

const userRefreshTokensModel = new mongoose.model('userRefreshTokens', userRefreshTokensShema);

export default userRefreshTokensModel;