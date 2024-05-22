const express = require("express");
const path = require("path");
const userModel = require("./models/user.model.js");

const app = express();
const PORT = 8080;

//setting up for public directory
app.use(express.static(path.join(__dirname, "public")));

//setting up parser for form reading
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setting up for ejs engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//getting all the users
app.get("/", async (req, res) => {
	const users = await userModel.find({});
	res.render("index", { users });
});

//route for redirecting to new user form page
app.get("/new-user", (req, res) => {
	res.render("new-user.ejs");
});

//creating new user
app.post("/users", async (req, res) => {
	const { name, age, course, imgURL } = req.body;
	const createdUser = await userModel.create({ name, age, course, imgURL });
	res.redirect("/");
});

//edit form page
app.get("/edit/:id", async (req, res) => {
	let user = await userModel.findOne({ _id: req.params.id });
	res.render("edit.ejs", { user });
});

//actually updating the user and redirected to users routes
app.post("/update/:id", async (req, res) => {
	const { name, age, course, imgURL } = req.body;
	const user = await userModel.updateOne(
		{ _id: req.params.id },
		{ $set: { name, age, course, imgURL } }
	);
	res.redirect("/");
});

//deleting user with id
app.get("/users/:id", async (req, res) => {
	const id = req.params.id;
	const user = await userModel.deleteOne({ _id: id });
	console.log(user);
	res.redirect("/");
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
