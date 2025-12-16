const authorization = (...roles) => {
    return (req, res, next) => {
        const user = req.user;

        if (!user) {
            return res.status(401).render("errors/401");
        }

        if (!roles.includes(user.role)) {
            return res.status(401).render("errors/401");
        }
        next();
    }
}

export { authorization };