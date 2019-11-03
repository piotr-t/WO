var app = require("http").createServer(handler);
var io = require("socket.io")(app);
var fs = require("fs");

let port = process.env.PORT;
if (port == null || port == "") {
  port = 800;
}
app.listen(port);

function handler(req, res) {
  fs.readFile(__dirname + "/index.html", function(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end("Error loading index.html");
    }

    res.writeHead(200);
    res.end(data);
  });
}
let c = 0;
io.on("connection", function(socket) {
  setTimeout(() => {
    ++c;
    io.emit("news", c);
  }, 1000);

  socket.on("my other event", function(data) {
    console.log(data);
    var clients = io.sockets.clients();
    console.log(clients.adapter.nsp.name);
  });
});
