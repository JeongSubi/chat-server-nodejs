// const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");
const {SocketLogger} = require("./logs/winston");

// const app = express();

// app.use(
//     cors({
//         origin:"*"
//     }),
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended:false }));

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    SocketLogger.info(`Server Started on port = ${PORT}`);
})