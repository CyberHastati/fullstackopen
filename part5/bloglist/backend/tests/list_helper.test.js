const { test, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')

const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(testHelper.listWithNoBlog)
    assert.strictEqual(result, 0)
  })
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(testHelper.listWithOneBlog)
    assert.strictEqual(result, 5)
  })
  test('of a bigger list is calculated right ', () => {
    const result = listHelper.totalLikes(testHelper.listWithManyBlogs)
    assert.strictEqual(result, 58)
  })
})

describe('favorite blog', () => {
test('returns the blog with most likes', () => {
    const result = listHelper.favoriteBlog(testHelper.listWithManyBlogs)

    assert.deepStrictEqual(result, {
      _id: '5a422aa71b54a676234d17fc',
      title: 'Refactoring',
      author: 'Martin Fowler',
      url: 'https://example.com/refactoring',
      likes: 15,
      __v: 0
    })
  })
})

describe('most blogs', () => {
test('returns the author with most blogs', () => {
    const result = listHelper.mostBlogs(testHelper.listWithManyBlogs)

    assert.deepStrictEqual(result, {
      author: 'Martin Fowler',
      blogs: 3
    })
  })
})

describe('most likes', () => {
test('returns the author with most likes', () => {
    const result = listHelper.mostLikes(testHelper.listWithManyBlogs)

    assert.deepStrictEqual(result, {
      author: 'Martin Fowler',
      likes: 23
    })
  })
})