const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/userModel')

router.post('/signup', (req, res, next) => {
    console.log('sign in point', req.body);
    userSchema.findOne({ email: req.body.email })
        .exec().then((result) => {
            if (result && result.length) {
                res.status(409).json({
                    message: 'user exists'
                })
            } else {
                bCrypt.hash(req.body.password, 11, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        })
                    } else {

                        newUser = new userSchema({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            userName: req.body.userName
                        })

                        newUser.save().then(result => {
                            res.status(201).json({
                                message: 'Successfuly signed in'
                            })
                        }).catch(err => {
                            console.log('signinErr', err)
                            res.status(500).json({
                                error: err
                            })
                        })
                    }
                })
            }
        }).catch(err => {
            if (err) {
                console.log('catch', err)
                res.status(500).json({
                    error: err
                })
            }
        })

})

router.post('/login', (req, res, next) => {
    console.log('sasdsdsds', req.body);
    userSchema.find({ email: req.body.email })
        .exec()
        .then(result => {
            console.log(result);
            if (result.length) {
                bCrypt.compare(req.body.password, result[0].password, (err, reslt) => {
                    if (reslt) {
                        const token = jwt.sign({
                                email: result[0].email,
                                id: result[0]._id
                            }, 'helloewKey',
                            //  {
                            //     expiresIn: '10h'
                            // }
                        )
                        console.log('genetrated Token ---:', token)
                        return res.status(200).json({
                            token: token,
                            userName: result[0].userName
                        })
                    } else {
                        return res.status(401).json({
                            message: "Unauthorized"
                        })
                    }
                })
            } else {
                res.status(401).json({
                    message: "Unauthorized"
                })
            }
        })
})

module.exports = router