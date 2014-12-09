var path = require('path');
var express = require("express");
var io = require("socket.io");

var bodyParser = require("body-parser");


var Registration = (function () {
    function Registration(registration) {
        this.salutation = registration.salutation;
        this.name = registration.name;
        this.age = registration.age;
    }
    Registration.prototype.isValid = function () {
        return this.age >= 18;
    };
    return Registration;
})();

// Sample repository of registrations (for demo purposes just in memory
var registrations = new Array();
registrations.push({ salutation: "Mr.", name: "Tom Tailorxxxx", age: 20 }, { salutation: "Mr.", name: "Max Muster", age: 19 });

var app = express();
var srv = require("http").Server(app);
var ioServer = io(srv);

app.use(bodyParser());
app.use(express.static("../Client"));

// Uncommend this line to demo basic auth
// app.use(express.basicAuth((user, password) => user == "user2" && password == "password"));
// Implement web API
app.get("/api/registrations", function (req, res) {
    console.log("/api/registration:");

    // Get all registrations
    res.send(registrations);
});

// Register
app.post("/api/register", function (req, res) {
    console.log("/api/register");
    console.dir(req.body);
    var registration = new Registration(req.body);
    if (registration.isValid()) {
        registrations.push(registration);
        res.send(201);
    } else {
        res.send(400);
    }
});

app.get("/", function (req, res) {
    //res.send("<h1>Hello World</h1>");
    res.sendFile(path.join(__dirname, "index.html"));
});

ioServer.on("connection", function (socket) {
    console.log("a user connected");
    socket.on("disconnect", function () {
        console.log("a user disconnected");
    });

    socket.on("chat message", function (msg) {
        console.log("message:" + msg);
        ioServer.emit("bc", "from Server:" + msg);
    });
});

//srv.listen(process.env.PORT || 3000, () => {
srv.listen(3000, function () {
    console.log("listening on *:" + 3000);
});
//# sourceMappingURL=app.js.map
