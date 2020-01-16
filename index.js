var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

server.listen(8080);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

users = [];
connections = [];

io.sockets.on("connection", function (socket) {
    console.log("Successfully connected");
    connections.push(socket);

    socket.on("disconnect", function (data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Successfully disconnected");
    });

    socket.on("sendMess", function (data) {
        io.sockets.emit("addMess", { message: data.message, name: data.name });
    });
});