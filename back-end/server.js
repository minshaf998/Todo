const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const startupDebugger = require('debug')('app:startup')//export DEBUG=app:startup
// const dbDebugger = require('debug')('app:db') //export DEBUG=app:db or export DEBUG= or export DEBUG=app:db, app:startup, or DEBUG=app:*

const todo = require("./routes/todo");
const auth = require("./routes/auth");
const config = require("./config/default");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/todo/", todo);
app.use("/api/auth", auth);

const dbUri = config.dbUri;
mongoose
  .connect(dbUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true,
    useFindAndModify: false,
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
  .then(() => console.log("connected to database by me ...."))
  .catch((error) => console.log("not connected to db by me ...  ", error));

const port = config.port;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
