const Blog = require("../models/blog")

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

const randomBlog = () => ({
  title: `Random Blog ${Math.floor(Math.random() * 10000)}`,
  author: `Author ${Math.floor(Math.random() * 1000)}`,
  url: `https://example.com/blog/${Math.floor(Math.random() * 100000)}`,
  likes: Math.floor(Math.random() * 100)
})

const blogsInDb = async () => {
    const blogs = await Blog.find({}) 
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    listWithNoBlog,
    listWithOneBlog,
    listWithManyBlogs,
    randomBlog,
    blogsInDb
}