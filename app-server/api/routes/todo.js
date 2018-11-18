const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const todoSchema = require('../models/todoModel')
const checkAuth = require('../midleware/checkAuth')


router.get('/', checkAuth, (req, res, next) => {
    console.log('get todo');
    todoSchema.find().select('todoItem isDone _id').exec().then(docs => {
        res.status(200).json(docs);
    }).catch(err => {
        console.log('error in retriving list', err);
        res.status(500);
    })
})


router.post('/create', checkAuth, (req, res, next) => {
    console.log('create', req.body)
    const item = new todoSchema({
        _id: mongoose.Types.ObjectId(),
        todoItem: req.body.item,
        isDone: false
    })

    item.save()
        .then(() => {
            res.status(200).json({
                message: 'item created',
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500)
        })
})


router.put('/update/:id', checkAuth, (req, res, next) => {
    updateObj = {}
    console.log(req.body)
    Object.keys(req.body).forEach(element => {
        updateObj[element] = req.body[element]
    });
    todoSchema.update({ _id: req.params.id }, { $set: updateObj }).exec().then(result => {
        console.log(result)
        res.status(200).json({
            message: 'updated sucessfuly'
        })
    }).catch(err => {
        console.log('update', err)
        res.status(500)
    })
});

router.delete('/delete/:id', checkAuth, (req, res, next) => {
    console.log(req.params.id);
    todoSchema.remove({ _id: req.params.id })
        .exec()
        .then(result => {

            result.ok ? res.status(204).json({ 'msg': 'item deleted' }) : res.status(500)
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

module.exports = router