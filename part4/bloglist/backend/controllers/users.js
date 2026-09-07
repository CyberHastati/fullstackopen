const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

const { application } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password) {
    response.status(400).json({
      error: "password missing"
    })
  } else if (password.length < 3) {
    response.status(400).json({
      error: "password length shorter than 3"
    })
  } else if (!username) {
    response.status(400).json({
      error: "username missing"
    })
  } else if (username.length < 3) {
    response.status(400).json({
      error: "username length shorter than 3"
    })
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const newUser = {
      username,
      name,
      passwordHash
    }

    const user = new User(newUser)
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }


})

// usersRouter.delete('/:id', async (request, response) => {
//   await Blog.findByIdAndDelete(request.params.id)
//   response.status(204).end()
// })


// usersRouter.put('/:id', async (request, response) => {
//   const { title, author, url, likes } = request.body

//   const blog = await Blog.findById(request.params.id)
//   if (!blog) {
//     return response.status(404).end()
//   }
//   blog.title = title
//   blog.author = author
//   blog.url = url
//   blog.likes = likes

//   const updateBlog = await blog.save()
//   response.json(updateBlog)
// })

module.exports = usersRouter