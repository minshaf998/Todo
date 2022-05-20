const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const config = require('./config/default')
const User = require('./src/models/user.model')

const app = express()

app.use(cors())
app.use(express.json())

app.post('/api/register', async (req, res) => {
    // console.log(req.body)
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        })
        res.json({ status: 'ok' })

    }
    catch (err) {
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

app.post('/api/login', async (req, res) => {
    // console.log(req.body.email);

    const user = await User.findOne({
        email: req.body.email,
    })

    if (!user) {
        return res.json({ status: 'error', user: false })
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    // console.log(user);
    if (isPasswordValid) {
        const token = jwt.sign({
            name: user.name,
            email: user.email
        }, 'secret123')
        // console.log('ok')
        return res.json({ status: 'ok', user: true, token: token })
    }
    else {
        // console.log('not ok');
        return res.json({ status: 'error', user: false })
    }
})



app.get('/api/userinfo', async (req, res) => {
    // res.json('from dashboard route')
    const token = req.headers['x-access-token']
    // console.log(token);
    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        // console.log(email);
        const user = await User.find({ email: email })
        // console.log(user);
        return res.json(user)
    }
    catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }

})

app.get('/api/dashboard', async (req, res) => {
    // res.json('from dashboard route')
    const token = req.headers['x-access-token']
    // console.log(token);
    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        // console.log(email);
        const user = await User.find({ email: email })
        // console.log(user);
        return res.json(user)
    }
    catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }

})


const dbUri = config.dbUri;
mongoose
    .connect(dbUri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        autoIndex: true,
    })
    .then(() => console.log("connected to database by me ...."))
    .catch((error) => console.log("not connected to db by me ...  ", error));


const port = config.port;
app.listen(port, () => {
    console.log("Server listening on port " + port);
});