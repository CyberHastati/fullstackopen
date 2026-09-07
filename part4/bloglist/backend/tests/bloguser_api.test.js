const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const testHelper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')


const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.init()
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ 
      username: 'root',
      name: 'superUser', 
      passwordHash,
    })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('ensure invalid users are not created: password too short', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      username: 'freshuser',
      name: 'Superuser',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await testHelper.usersInDb()
    assert(result.body.error.includes("password length shorter than 3"))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('ensure invalid users are not created: password missing', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      username: 'freshuser',
      name: 'Superuser',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await testHelper.usersInDb()
    assert(result.body.error.includes("password missing"))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
  test('ensure invalid users are not created: username too short', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'saawdf',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await testHelper.usersInDb()
    assert(result.body.error.includes("username length shorter than 3"))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('ensure invalid users are not created: username missing', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      name: 'Superuser',
      password: 'saawdf',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await testHelper.usersInDb()
    assert(result.body.error.includes("username missing"))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails if username is already taken', async () => {
    const usersAtStart = await testHelper.usersInDb()
    const newUser = {
      username: 'root',
      name: 'Another user',
      password: 'validpassword',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('expected `username` to be unique'))
    const usersAtEnd = await testHelper.usersInDb()
    assert.deepStrictEqual(usersAtEnd, usersAtStart)
  })
})


after(async ()=> {
    await mongoose.connection.close()
})
