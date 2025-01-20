import verifyRefreshToken from "./verifyRefreshToken.js";
import userModel from '../models/userModel.js';
import userRefreshTokensModel from "../models/userRefreshTokens.js";
import generateTokens from "./generateTokens.js";
const refreshAccessToken = async (req, res) => {
    try {

        const oldRefreshToken = req.cookies.refreshToken;
        const { tokenDetails, error } = await verifyRefreshToken(oldRefreshToken);

        //Find user based on refresh token detail id
        const user = await userModel.findById(tokenDetails._id);
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "Unauthorized Access, user not found"
            })
        }

        const userRefreshToken = await userRefreshTokensModel.findOne({ userId: tokenDetails._id });
        
        if (oldRefreshToken !== userRefreshToken.token || userRefreshToken._blacklisted) {
            return res.status(401).json({
                status: "Failed",
                message: "Unauthorized Access"
            })
        }

        const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = await generateTokens(user);

        return {
            newAccessToken: accessToken,
            newRefreshToken: refreshToken,
            newAccessTokenExp: accessTokenExp,
            newRefreshTokenExp: refreshTokenExp
        };

    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: "Internal Server Error"
        })
    }
}

export default refreshAccessToken;