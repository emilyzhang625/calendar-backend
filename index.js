const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())

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

  app.use(express.json())

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
	const item = request.body
	console.log(item)

	items = items.concat(item)
	response.json(item)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
