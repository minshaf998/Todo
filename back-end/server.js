const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')

const config = require('./config/default')
const User = require('./src/models/user.model')

const app = express()

app.use(cors())
app.use(express.json())

app.post('/api/register', async (req, res) => {
    // console.log(req.body)
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
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
        password: req.body.password,
    })

    // console.log(user);
    if (user) {
        // console.log('ok')
        return res.json({ status: 'ok', user: true })
    }
    else {
        // console.log('not ok');
        return res.json({ status: 'error', user: false })
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