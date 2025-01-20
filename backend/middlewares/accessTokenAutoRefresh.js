import refreshAccessToken from "../utils/refreshAccessToken.js";
import setTokenCookies from "../utils/setTokensCookies.js";
import isTokenExpire from "../utils/isTokenExpire.js";
const accessTokenAutoRefresh = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        
        if (accessToken || !isTokenExpire(accessToken)) {
            req.headers['authorization'] = `Bearer ${accessToken}`;
        }

        if(!accessToken){
            const refreshToken = req.cookies.refreshToken;
            if(!refreshToken){
                throw new Error('Refresh Token is Missing')
            }

            const {newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp} = await refreshAccessToken(req,res)

            setTokenCookies(res, newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp);

            req.headers['authorization'] = `Bearer ${newAccessToken}`;
        }
        next();

    } catch (error) {
        console.log('Error adding access token to header : ', error.message);
    }
}

export default accessTokenAutoRefresh;
