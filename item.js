require('dotenv').config();

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)

const itemSchema = new mongoose.Schema({
	name: String,
	year: Number,
	month: Number,
	day: Number
})

const Item = mongoose.model('Item', itemSchema)

const item = new Item({
	name: "test3",
	year: 2024,
	month: 6,
	day: 11
})

//able to add year:2024 inside {} to only find certain items
Item.find({}).then(result => {
	result.forEach(item => {
		console.log(item)
	})
	mongoose.connection.close()
})

// item.save().then(result => {
//   console.log('item saved!')
//   mongoose.connection.close()
// })