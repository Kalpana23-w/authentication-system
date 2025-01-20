import jwt from'jsonwebtoken'
import userRefreshTokensModel from '../models/userRefreshTokens.js';

const generateTokens = async (user)=>{
    try {

        if (!user || !user._id || !user.role) {
            throw new Error('Invalid user object');
        }
        
        const payload = {_id:user._id, role:user.role};

        //Access Token
        const accessTokenExp = Math.floor(Date.now() / 1000) + 100 ; // 100sec
        const accessToken = jwt.sign(
            {...payload, exp: accessTokenExp},
        process.env.JWT_ACCESS_TOKEN_SECRET_KEY);

        //Refresh Token
        const refreshTokenExp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2; // 2 days
        const refreshToken = jwt.sign(
            {...payload, exp:refreshTokenExp},
            process.env.JWT_REFRESH_TOKEN_SECRET_KEY
        );

        const userRefreshToken = await userRefreshTokensModel.findOneAndDelete({userId:user._id})

        //Save refresh token
        await new userRefreshTokensModel({userId:user._id, token: refreshToken}).save();

        return{
            accessToken, refreshToken, accessTokenExp, refreshTokenExp
        }

    } catch (error) {
        return res.status(505).json({
            status:"Failed",
            message:"Tokens are not generating"
        })
    }
}

export default generateTokens;