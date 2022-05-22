// const { array, object } = require('joi');
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // notes: [{ note: { type: String }, isCompleted: { type: Boolean } }],
    notes: { Object }
},
    { timestamps: true }
)

module.exports = userSchema