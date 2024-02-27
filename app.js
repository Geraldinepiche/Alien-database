const path = require("path");
const express = require (path.join(__dirname,"src", "express"));
const bodyParser = require(path.join(__dirname, "src", "body-parser"));
const mongoose = require(path.join(__dirname, "src", "mongoose"));
const exphbs = require(path.join(__dirname,"src","express-handlebars"));
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
mongoose.connect("mongodb://localhost/my_database", {
    useNewURLParser: true,
    useUnifiedTopology: true,
});

//setup body parser and shit
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//setup handlebars i guess
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//set up routes and whatnot
app.get("/",(req, res) => {
    res.render("home")});
    


const User = mongoose.model("User", UserSchema);

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


