const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const testHelper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')


const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ 
    username: 'root',
    name: 'superUser', 
    passwordHash,
  })

  await user.save()
})


test('adding a blog fails with 401 if token is not provided', async () => {
  const blogsAtStart = await testHelper.blogsInDb()
  const newBlog = {
    title: 'Test blog',
    author: 'Alice',
    url: 'https://example.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const blogsAtEnd = await testHelper.blogsInDb()
  assert.deepStrictEqual(blogsAtEnd, blogsAtStart)
})
after(async ()=> {
    await mongoose.connection.close()
})
