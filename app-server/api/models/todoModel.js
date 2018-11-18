const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    todoItem: String,
    isDone: Boolean
});

module.exports = mongoose.model('ToDo', todoSchema)