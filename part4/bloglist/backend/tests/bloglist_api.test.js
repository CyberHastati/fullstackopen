const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const testHelper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const blog = require('../models/blog')


const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(testHelper.listWithManyBlogs)
})

test('all blogs are returned', async () => {
  const allBlogs = await api
    .get(`/api/blogs`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(testHelper.listWithManyBlogs.length, allBlogs.body.length)
})

test('the unique identifier property of the blog posts is named id with toJSON() transform', async () => {
  const response = await api
    .get(`/api/blogs`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const allBlogs = response.body
  assert(allBlogs.every(blog => blog.id))
  assert(allBlogs.every(blog => blog._id === undefined))
})

test('successfully creates a new blog post', async () => {
  const exampleBlog = testHelper.randomBlog()
  // post
  const response = await api
    .post(`/api/blogs`)
    .send(exampleBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // assert length
  const allBlogs = await testHelper.blogsInDb()
  assert.strictEqual(allBlogs.length, testHelper.listWithManyBlogs.length + 1)
  // assert record
  const addedBlog = allBlogs.find(blog => blog.id === response.body.id)
  assert(addedBlog)
  delete(addedBlog.id)
  assert.deepStrictEqual(exampleBlog, addedBlog)
})

test('if the likes property is missing from the request, it will default to the value 0', async () => {
  const exampleBlog = testHelper.randomBlog()
  delete(exampleBlog.likes)
  // post
  const response = await api
    .post(`/api/blogs`)
    .send(exampleBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // assert record
  const allBlogs = await testHelper.blogsInDb()
  const addedBlog = allBlogs.find(blog => blog.id === response.body.id)
  assert(addedBlog.likes === 0)
})

test('if the title property is missing from the request data, responds to the request with the status code 400.', async () => {
  const BlogWithoutTitle = testHelper.randomBlog()
  delete(BlogWithoutTitle.title)
  await api
    .post(`/api/blogs`)
    .send(BlogWithoutTitle)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('if the url property is missing from the request data, responds to the request with the status code 400.', async () => {
  const BlogWithoutUrl = testHelper.randomBlog()
  delete(BlogWithoutUrl.url)
  await api
    .post(`/api/blogs`)
    .send(BlogWithoutUrl)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('successfully deletes a blog post', async () => {
  const allBlogs = await testHelper.blogsInDb()
  const idToDelete = allBlogs[Math.floor(Math.random()*testHelper.listWithManyBlogs.length)].id
  // delete
  await api
    .delete(`/api/blogs/${idToDelete}`)
    .expect(204)

  // assert length
  const allBlogsChanged = await testHelper.blogsInDb()
  assert.strictEqual(allBlogsChanged.length, allBlogs.length - 1)
  // make sure doesn't exist
  assert(!allBlogsChanged.find(blog => blog.id === idToDelete))
})

test('successfully updates a blog post', async () => {
  const updateBlogContent = testHelper.randomBlog()
  const updateBlog = testHelper.listWithManyBlogs[Math.floor(Math.random()*testHelper.listWithManyBlogs.length)]
  const idToUpdate = updateBlog._id
  // put
  const response = await api
    .put(`/api/blogs/${idToUpdate}`)
    .send(updateBlogContent)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const allBlogs = await testHelper.blogsInDb()
  // assert record
  const updatedBlog = allBlogs.find(blog => blog.id === response.body.id)
  assert(updatedBlog)
  delete(updatedBlog.id)
  assert.deepStrictEqual(updateBlogContent, updatedBlog)
})


after(async ()=> {
    await mongoose.connection.close()
})