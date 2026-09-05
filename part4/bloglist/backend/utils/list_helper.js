const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length !== 0
    ? blogs.reduce(sum, 0)
    : 0

}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const max = (max, item) => {
    return max.likes >= item.likes ? max : item
  }
  return blogs.reduce(max, blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const collectAuthors = (authorEntries, item) => {
    authorEntries[item.author] = (authorEntries[item.author] || 0) + 1
    return authorEntries
  }
  const authorBlogsEntries = blogs.reduce(collectAuthors, {})
  const [author, count] = Object.entries(authorBlogsEntries)
    .reduce((max, item) => max[1] >= item[1] ? max : item, ["", 0])
  return {
    author: author,
    blogs: count
  }
}

const mostLikes  = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const authorBlogs = lodash.groupBy(blogs, 'author')
  const authorLikesEntries = Object.fromEntries(Object.entries(authorBlogs)
    .map(([author, blogs]) => [
      author, 
      lodash.sumBy(blogs, 'likes')
    ]
  )
)
  const authorWithMostLikes = lodash.maxBy(
    Object.keys(authorLikesEntries), 
    author => authorLikesEntries[author]
  )
  return {
    author: authorWithMostLikes,
    likes: authorLikesEntries[authorWithMostLikes]
  }
}

module.exports = {
  dummy,
  totalLikes, 
  favoriteBlog,
  mostBlogs,
  mostLikes
}