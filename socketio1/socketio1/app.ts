import path = require('path');
import express = require("express");
import io = require("socket.io");
import http = require("http");
var bodyParser = require("body-parser");

// Business logic and data structures
interface IRegistration {
    salutation: string;
    name: string;
    age: number;
}

class Registration implements IRegistration {
    public salutation: string;
    public name: string;
    public age: number;

    constructor(registration: IRegistration) {
        this.salutation = registration.salutation;
        this.name = registration.name;
        this.age = registration.age;
    }

    public isValid() {
        return this.age >= 18;
    }
}

// Sample repository of registrations (for demo purposes just in memory
var registrations = new Array<IRegistration>();
registrations.push(
    { salutation: "Mr.", name: "Tom Tailorxxxx", age: 20 },
    { salutation: "Mr.", name: "Max Muster", age: 19 });
 
var app: express.Application = express();
var srv: http.Server = require("http").Server(app);
var ioServer: SocketIO.Server = io(srv);

app.use(bodyParser());
app.use(express.static("../Client"));

// Uncommend this line to demo basic auth
// app.use(express.basicAuth((user, password) => user == "user2" && password == "password"));


// Implement web API
app.get("/api/registrations", (req: express.Request, res: express.Response) => {
    console.log("/api/registration:");
    // Get all registrations
    res.send(registrations);
});

// Register
app.post("/api/register", (req: express.Request, res: express.Response) => {
    console.log("/api/register");
    console.dir(req.body);
    var registration = new Registration(<IRegistration>req.body);
    if (registration.isValid()) {
        registrations.push(registration);
        res.send(201);
    }
    else {
        res.send(400);
    }
});

app.get("/", (req: express.Request, res: express.Response) => {
    //res.send("<h1>Hello World</h1>");
    res.sendFile(path.join(__dirname, "index.html"));
});

ioServer.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("a user disconnected");
    });

    socket.on("chat message", (msg) => {
        console.log("message:" + msg);
        ioServer.emit("bc", "from Server:" + msg);
    });
});

//srv.listen(process.env.PORT || 3000, () => {
srv.listen(3000, () => {
    console.log("listening on *:" + 3000);
});
