const http = require("http");
const WebSocket = require("ws");
const { SocketLogger} = require("../libs/logs/winston");
const { NewRoom } = require("./types/Room");

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const room = NewRoom();

wss.on("connection", (ws, req) => {
    // cookie에서 user 정보 가져오기
    const cookie = req.headers.cookie;
    const [_, user] = cookie.split("=");

    room.join(ws);

    ws.on("message", (msg) => {
        // message가 들어오면, 해당 메시지를 다른 client에도 브로드 캐스팅
        const jsonMsg = JSON.parse(msg);
        jsonMsg.Name = user;

        room.forwardMessage(jsonMsg);

        console.log("msg", msg);
    });

    ws.on("close", () => {
        // client 접속이 끊기면, client 제거
        room.leave(ws);

        console.log("close");
    })
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    SocketLogger.info(`Server Started on port = ${PORT}`);
})