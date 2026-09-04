const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const listWithNoBlog = [ ]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]

const listWithManyBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'https://example.com/canonical-string-reduction',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17fa',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    url: 'https://example.com/clean-code',
    likes: 8,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17fb',
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    url: 'https://example.com/clean-architecture',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17fc',
    title: 'Refactoring',
    author: 'Martin Fowler',
    url: 'https://example.com/refactoring',
    likes: 15,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17fd',
    title: 'Patterns of Enterprise Application Architecture',
    author: 'Martin Fowler',
    url: 'https://example.com/poeaa',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17fe',
    title: 'Patterns',
    author: 'Martin Fowler',
    url: 'https://example.com/poeaaa',
    likes: 1,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithNoBlog)
    assert.strictEqual(result, 0)
  })
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
  test('of a bigger list is calculated right ', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    assert.strictEqual(result, 58)
  })
})

describe('favorite blog', () => {
test('returns the blog with most likes', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)

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
    const result = listHelper.mostBlogs(listWithManyBlogs)

    assert.deepStrictEqual(result, {
      author: 'Martin Fowler',
      blogs: 3
    })
  })
})

describe('most likes', () => {
test('returns the author with most likes', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)

    assert.deepStrictEqual(result, {
      author: 'Martin Fowler',
      likes: 23
    })
  })
})