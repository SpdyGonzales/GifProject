const mongoose = require('mongoose')
const Category = require('./models/category');

const category = [

	{
		title: "Queen - I Want to Break Free",
		genre: "Music" 
	},
	{
		title: "Michael Jackson - Thriller",
		genre: "Music" 
	},
	{
		title: "Led Zeppelin - Black Dog",
		genre: "Music" 
	},
	{
		title: "Kanye West - Touch the Sky",
		genre: "Music"
	},
	{
		title: "The Beatles - Ticket to Ride",
		genre: "Music"
	},
	{
		title: "The Beach Boys - God Only Knows",
		genre: "Music"
	}


];

mongoose.connect('mongodb://localhost/categories');

categories.map(data => {

	const category = new Category(data);

	category.save();
})
