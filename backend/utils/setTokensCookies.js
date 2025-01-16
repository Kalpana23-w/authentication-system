
const setTokenCookies = async (res, accessToken, refreshToken, newAccessTokenExp, newRefreshTokenExp) => {

    // Calculate maxAge for cookies (in milliseconds)
    const accessTokenMaxAge = (newAccessTokenExp - Math.floor(Date.now() / 1000)) * 1000;  // Convert to milliseconds
    const refreshTokenMaxAge = (newRefreshTokenExp - Math.floor(Date.now() / 1000)) * 1000;  // Convert to milliseconds

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