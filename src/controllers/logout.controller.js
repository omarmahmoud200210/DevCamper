const handleLogout = (req, res) => {
    const cookies = req.cookies;
    if (!cookies) res.sendStatus(204);
    
    const cookieOption = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    }

    res.clearCookie("accessToken", cookieOption);
    res.clearCookie("refreshToken", cookieOption);

    res.redirect("/api/v1/login");
}

export { handleLogout }