const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
  if(!user) {
    response.status(401).end()
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(await savedBlog.populate('user', { username: 1, name: 1 }))
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user

  if(!user) {
    response.status(401).end()
  } else {
    const blog = await Blog.findById(request.params.id)

    if(blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      user.blogs = user.blogs.filter(savedBlog => 
        savedBlog.toString() !== request.params.id
      )
      await user.save()
      response.status(204).end()
    } else {
      response.status(403).end()
    }
  }
})


blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }
  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  const updateBlog = await blog.save()
  response.json(await updateBlog.populate('user', { username: 1, name: 1 }))
})

module.exports = blogsRouter