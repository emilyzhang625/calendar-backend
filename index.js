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

itemSchema.set('toJSON', {
	transform: (document, returnedObject) => {
	  returnedObject.id = returnedObject._id.toString()
	  delete returnedObject._id
	  delete returnedObject.__v
	}
})

const Item = mongoose.model('Item', itemSchema)

const express = require("express")
const cors = require("cors")
const app = express()
const { v4: uuidv4 } = require('uuid');

app.use(cors())
app.use(express.json())

let items = []

app.get('/api/items', (request, response) => {
	Item.find({}).then(items => {
	  response.json(items)
	})
})

app.get("/api/items", (request, response) => {
	response.json(items)
})

app.get("/api/items/:id", (request, response) => {
	const id = (request.params.id)
	const item = items.find(item => item.id === id)

	if (item) {
		response.json(item)
	}
	else {
		response.status(404).end()
	}
})

app.post("/api/items", (request, response) => {
	const body = request.body
	const item = {name: body.name, id: uuidv4(), year: body.year, month:body.month, day:body.day}
	items = items.concat(item)
	response.json(item)
})

app.delete("/api/items/:id", (request,response) => {
	const id = (request.params.id)
	const item = items.find(item => item.id === id)
	items = items.filter(item => item.id !== id)
	if (item) {
		response.json(item);
	}
	else {
		response.status(204).end();
	}
})

app.put("/api/items/:id", (request,response) => {
	const id = request.params.id
	const index = items.findIndex(item => item.id === id)
	const item = request.body
	items[index] = item
	response.json(item)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
