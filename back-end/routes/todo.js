const express = require('express')
const router = express.Router()

const User = require('./../models/user.model')

router.get('/', async (req, res) => {
    const email = req.body.email
    const note = req.body.note
    try {
        await User.findOneAndUpdate({ email: email }, { note: note })
    }
    catch (error) {
        res.json({ status: 'error', error: 'invalid token' })
    }
})

router.get('/:id', async (req, res) => {
    const email = req.body.email
    const note = req.body.note
    try {
        await User.findOneAndUpdate({ email: email }, { note: note })
    }
    catch (error) {
        res.json({ status: 'error', error: 'invalid token' })
    }
})

router.delete('/:id', async (req, res) => {
    const email = req.body.email
    try {
        await User.findOneAndDelete({ email: email }, { note: note })
    }
    catch (error) {
        res.json({ status: 'error', error: 'invalid token' })
    }
})

router.put('/', async (req, res) => {
    const email = req.body.email
    const note = req.body.note
    // console.log(email, note);
    try {
        const updatedUser = await Uesr.findOneAndUpdate({ email: email }, {
            $push: {
                notes: { note: note }
            }
        });
        res.send(updatedUser)
    }
    catch (error) {
        res.json({ status: 'error', error: 'invalid token' })
    }
})

module.exports = router;