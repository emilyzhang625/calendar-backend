const express = require("express")
const app = express()

app.use(express.json())

let items = [
	{
	  id: 1,
	  name: "breakfast",
	},
	{
	  id: 2,
	  name: "workout",
	},
	{
	  id: 3,
	  name: "work",
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

	if (!body) {
		return response.status(400).json({error: "content missing"})
	}

	//need to fix id
	const item = {
		content: body.content,
		id: 1
	}
	console.log(item)

	items = items.concat(item)
	response.json(item)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
