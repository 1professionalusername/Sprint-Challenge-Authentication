const express = require("express");

const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");
const jokesRouter = require("./jokes/jokes-router");

const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const restrict = require("./auth/authenticate-middleware");

const server = express();
const PORT = process.env.PORT || 3300;

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(cookieParser());
server.use("/auth", authRouter);
server.use("/users", usersRouter);
server.use("/jokes", restrict(), jokesRouter);

server.get("/", (req, res, next) => {
    res.json({
        message: "Hello, World",
    });
});

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: "Server Error",
    });
});

if (!module.parent) {
    server.listen(PORT, () => {
        console.log(`\n=== Server listening on port ${PORT} ===\n`);
    })
}
module.exports = server;

