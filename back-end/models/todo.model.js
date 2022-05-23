const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    note: { type: String, required: true },
    isCompleted: { type: Boolean },
    userid: { type: String, required: true },
},
    { timestamps: true }
);

const model = mongoose.model('todos', todoSchema)

module.exports = model