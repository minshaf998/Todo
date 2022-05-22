const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require('./../models/user.model')

router.post('/register', async (req, res) => {
    console.log('hi');
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
            // ...req.body
        })
        res.json({ status: 'ok' })
    }
    catch (err) {
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    })

    if (!user) {
        return res.json({ status: 'error', user: false })
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    if (isPasswordValid) {
        const token = jwt.sign({
            name: user.name,
            email: user.email
        }, 'secret123')
        return res.json({ status: 'ok', user: true, token: token })
    }
    else {
        return res.json({ status: 'error', user: false })
    }
})

router.get('/userinfo/:email', async (req, res) => {
    const email = req.params.email

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
        return res.sendStatus(404);
    }
    else {
        res.send(user)
    }
})

module.exports = router;