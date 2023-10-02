const isAuthenticated = (req, res, next) => {
    
    if (req.isAuthenticated()) {
        next();
    }

    else {
        res.status(401).send("Not authenticated");
    }

}

module.exports = {isAuthenticated};