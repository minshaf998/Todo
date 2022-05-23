// const { array, object } = require('joi');
const { mongo } = require('mongoose')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},
    { timestamps: true }
)

const model = mongoose.model('UserDataInshaf', userSchema)

module.exports = model