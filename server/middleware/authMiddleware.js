const jwt = require('jsonwebtoken');

const authMiddleware = async(req,res,next) => {
    try {
        const token = req.header('token');
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        if (!verifyToken){
            res.status(401).json({msg: ' You are not authorized !'})
        }
        req.userId = verifyToken.id;
        next();
    } catch (error) {
        
    }
}
module.exports = authMiddleware;