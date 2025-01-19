
const setTokenCookies = async (res, accessToken, refreshToken, newAccessTokenExp, newRefreshTokenExp) => {

     // Calculate maxAge for cookies (in milliseconds)
     const currentTimeInSeconds = Math.floor(Date.now() / 1000);
     const accessTokenMaxAge = Math.max(0, (newAccessTokenExp - currentTimeInSeconds) * 1000);
     const refreshTokenMaxAge = Math.max(0, (newRefreshTokenExp - currentTimeInSeconds) * 1000);

    //Cookies for access token
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: accessTokenMaxAge
    })

    //Cookies for refresh token
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: refreshTokenMaxAge
    })
}

export default setTokenCookies;