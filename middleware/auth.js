import jwt from "jsonwebtoken";

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        req.userId = userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid UserID';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({
            error: new Error('Invalid request!'),
        })
    }
}