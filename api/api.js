const express = require('express');
const cors = require('cors');
const path = require('path');

const logRoutes = require('./middleware/logger');
const postRouter = require('./routers/post');
const userRouter = require('./routers/user');

const api = express();

api.use(cors());
api.use(express.json());
api.use(logRoutes);

api.get("/", (req, res) => {
    res.json({
        name: "Discretion",
        description: "Send and receive private messages."
    })
})
// api.use(express.static(__dirname));
// sendFile will go here
// api.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', '/client/index.html'));
//   });

api.use("/posts", postRouter);
api.use("/users", userRouter);

module.exports = api;


