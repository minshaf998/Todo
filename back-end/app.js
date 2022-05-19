const express = require("express");
const mongoose = require("mongoose");

const config = require('./config/default');

const app = express();

const dbUri = config.dbUri;

mongoose
    .connect(dbUri)
    .then(() => console.log("connected to database by me ...."))
    .catch((error) => console.log("not connected to db by me ...  ", error));



const port = config.port;

app.listen(port, () => {
    console.log("Server listening on port " + port);
});