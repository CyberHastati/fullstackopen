import { useState } from 'react'

const Blog = ({ user, blog, handleUpdateLikes, handleDeleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(true)
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const updateLikes = (event) => {
    event.preventDefault()
    handleUpdateLikes(blog.id)
  }
  const deleteBlog = (event) => {
    event.preventDefault()
    handleDeleteBlog(blog)
  }

  return (
    <div>
      {visible &&
        <div style={blogStyle}>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>{'view'}</button>
        </div>
      }
      {!visible &&
        <div style={blogStyle}>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>{'hide'}</button> <br/>
          {blog.url} <br/>
          likes {blog.likes} <button onClick={updateLikes}>{'like'}</button> <br/>
          {blog.user.name} <br/>
          {blog.user.id === user.id &&
          <button onClick={deleteBlog}>{'delete'}</button>
          }
        </div>
      }
    </div>

  )
}

const CreateBlog = ({ handleCreateBlog }) => {
  const [createTitle, setCreateTitle] = useState('')
  const [createAuthor, setCreateAuthor] = useState('')
  const [createUrl, setCreateUrl] = useState('')

  const handleAddBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: createTitle,
      author: createAuthor,
      url: createUrl,
      likes: 0
    }
    handleCreateBlog(newBlog)
    setCreateAuthor('')
    setCreateTitle('')
    setCreateUrl('')
  }

  return (
    <form onSubmit={handleAddBlog}>
      <div>
        <label>
          title
          <input
            type="text"
            value={createTitle}
            onChange={({ target }) => setCreateTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author
          <input
            type="text"
            value={createAuthor}
            onChange={({ target }) => setCreateAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url
          <input
            type="url"
            value={createUrl}
            onChange={({ target }) => setCreateUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )

}

export { Blog, CreateBlog }