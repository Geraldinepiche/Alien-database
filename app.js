//const path = require("/app.js");
require(Geraldinepiche/Alien-database/app.js);
const express = require (path.join("express"));
const bodyParser = require(path.join("body-parser"));
const mongoose = require(path.join("mongoose"));
const { engine } = require(path.join("express-handlebars"));



const app = express();
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    age: Number,
    email: String
});

const User = mongoose.model("User", UserSchema);
const port = 3000;

//setup mangoose or whatever
mongoose.connect("mongodb://localhost/Alien-Database", {
    useNewURLParser: true,
    useUnifiedTopology: true,
});

//setup body parser and shit
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//setup handlebars i guess
app.engine("handlebars", engine({extname: '.hbs', defaultlayout: "main"}));
app.set("view engine", "handlebars");

//set up routes and whatnot
app.get("/",(req, res) => {
    res.render("home")});

//fetch data from database and send it as a response
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.listen(port), () => {console.log('Server is running on port${port}')};


