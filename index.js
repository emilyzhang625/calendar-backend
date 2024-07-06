const express = require("express")
const cors = require("cors")
const app = express()
const { v4: uuidv4 } = require('uuid');

app.use(cors())
app.use(express.json())


let items = [
	{
	  id: 1,
	  name: "breakfast",
	  year:2024,
	  month:1,
	  day:1
	},
	{
	  id: 2,
	  name: "workout",
	  year:2024,
	  month:1,
	  day:1
	},
	{
	  id: 3,
	  name: "work",
	  year:2024,
	  month:1,
	  day:1
	}
  ]


app.get("/api/items", (request, response) => {
	response.json(items)
})

app.get("/api/items/:id", (request, response) => {
	const id = Number(request.params.id)
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
	const item = {name: body.name, id: uuidv4(), year: body.year, month:body.month + 1, day:body.day}
	console.log(item)
	items = items.concat(item)
	response.json(item)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
