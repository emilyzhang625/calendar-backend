require('dotenv').config()

const express = require("express")
const cors = require("cors")
const app = express()
const User = require('./helpUser')

app.use(cors())
app.use(express.json())

app.get('/api/users', (request, response) => {
	console.log("here")
	User.find({}).then(users => {
	  response.json(users)
	})
})

app.post('/api/users', (request, response) => {
	const body = request.body

	const user = new User({
		username: body.username,
		password: body.password
	})
  
	user.save().then(savedUser => {
	  response.json(savedUser)
	})
})

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
