var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/login.js');


router.post('/login', function (req, res, next) {
    console.log(req.body)

    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not sign in user'
                });
            }
            res.status(200).json({
                status: 'Sign in successful!'
            });
        });
    })(req, res, next);
});


router.get('/logout', function (req, res) {
    req.logout();
    res.status(200).json({
        status: 'out'
    });
});


module.exports = router;