const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost:27017/main")
	.then(() => console.log("MongoDB Connect Succesfully"))
	.catch((err) => console.log("MongoDB Connection FAILED: ", err));

const userSchema = mongoose.Schema({
	name: String,
	age: Number,
	course: String,
	imgURL: String,
});

module.exports = mongoose.model("user", userSchema);
