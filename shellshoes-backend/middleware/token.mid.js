const jwt = require('jsonwebtoken');
const AccountModel = require('../models/user.model');
const path = require('path');

const tokenMiddleware = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    res.status(403).json('Token is not valid!');
                }
                req.user = user;
                //req.userId = user.userId;
                next();
            });
        } else {
            res.status(401).json("You're not authenticated");
        }
    },
    verifyTokenAndUserAuthor: (req, res, next) => {
        verifyToken = tokenMiddleware.verifyToken;
        verifyToken(req, res, () => {
            if (req.user.id === req.params.id || req.user.isAdmin) {
                next();
            } else {
                return res.status(403).json('You are not allowed to do that');
            }
        });
    },
    verifyTokenAndUser: (req, res, next) => {
        const verifyToken = tokenMiddleware.verifyToken;
        verifyToken(req, res, () => {
            if (req.user.isAdmin) {
                return res.status(403).json({
                    message: 'You are admin or not authorized',
                });
            } else {
                next();
            }
        });
    },
    verifyTokenAndAdmin: (req, res, next) => {
        const verifyToken = tokenMiddleware.verifyToken;
        verifyToken(req, res, () => {
            //console.log(req.user);
            if (req.user.isAdmin) {
                next();
            } else {
                return res.status(403).json({
                    message: 'You are not allowed to do that!',
                });
            }
        });
    },
};
module.exports = tokenMiddleware;
