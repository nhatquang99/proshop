import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userSchema.js'

const protect = asyncHandler(async(req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized - token failed')
        }
    } else {
        res.status(401);
        throw new Error('Not authorized - no token was found');
    }

    next()
})

const admin = asyncHandler(async(req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized - you do not have rights to use this functionaility')
    }
})

export {
    protect,
    admin
}