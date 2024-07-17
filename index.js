require('dotenv').config()

const express = require("express")
const cors = require("cors")
const app = express()
const { v4: uuidv4 } = require('uuid');
const Item = require('./item')

app.use(cors())
app.use(express.json())

let items = []

app.get('/api/items', (request, response) => {
	Item.find({}).then(items => {
	  response.json(items)
	})
})

app.get('/api/items/:id', (request, response) => {
	Item.findById(request.params.id).then(item => {
	  response.json(item)
	})
})

app.post('/api/items', (request, response) => {
	const body = request.body
  
	if (body.name === undefined) {
	  return response.status(400).json({ error: 'content missing' })
	}
  
	const item = new Item({
	  name: body.name,
	  year: body.year,
	  month: body.month,
	  day: body.day
	})
  
	item.save().then(savedItem => {
	  response.json(savedItem)
	})
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

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
