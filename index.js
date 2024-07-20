require('dotenv').config()

const express = require("express")
const cors = require("cors")
const app = express()
const User = require('./user')
const path = require("path");  // Import the path module


app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle all routes and serve the main HTML file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/users', (request, response) => {
	User.find({}).then(users => {
	  response.json(users)
	})
})

app.get('/api/users/:id', (request, response) => {
	User.findById(request.params.id).then(user => {
	  response.json(user)
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

app.delete('/api/users/:id', (request,response) => {
	const body = request.body
  
	const user = {
		username: body.username,
		password: body.password,
		items:body.items
	}

	User.findByIdAndDelete(request.params.id, user)
	  .then(removedUser => {
		response.json(removedUser)
	  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
