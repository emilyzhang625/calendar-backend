require('dotenv').config()

const express = require("express")
const cors = require("cors")
const app = express()
const User = require('./helpUser')

app.use(cors())
app.use(express.json())

app.get('/api/users', (request, response) => {
	User.find({}).then(users => {
	  response.json(users)
	})
})

app.post('/api/users', (request, response) => {
	const body = request.body

	const user = new User({
		username: body.username,
		password: body.password,
		items:body.items
	})
  
	user.save().then(savedUser => {
	  response.json(savedUser)
	})
})

app.put('/api/users/:id', (request, response) => {
	const body = request.body
  
	const user = {
		username: body.username,
		password: body.password,
		items:body.items
	  }
  
	User.findByIdAndUpdate(request.params.id, user)
	  .then(updatedUser => {
		response.json(updatedUser)
	  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
