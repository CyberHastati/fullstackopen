import { useState, useEffect, useRef } from 'react'
import { Blog, CreateBlog } from './components/Blog'
import Notification from './components/Notification'
import { LoginForm, LoginStatus } from './components/Auth'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const sortBlogs = (blog1, blog2) => blog2.likes - blog1.likes
  const [user, setUser] = useState(() => {
    const loggedUserJSON =
      window.localStorage.getItem('loggedNoteappUser')

    return loggedUserJSON
      ? JSON.parse(loggedUserJSON)
      : null
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [notifyMessage, setNotifyMessage] = useState(null)
  const setupNotifyMessage = ({ message, type }) => {
    setNotifyMessage({ message: message, type: type })
    setTimeout(() => {
      setNotifyMessage(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort(sortBlogs))
    )
  }, [])

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
    }
  }, [user])
  const newBlogRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username)
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch {
      setupNotifyMessage({ message: 'wrong username or password', type: 'failure' })
    }
  }

  const handleCreateBlog = async (newBlog) => {
    console.log('Creating blog with', user.name)
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog).sort(sortBlogs))
      newBlogRef.current.toggleVisibility()
      setupNotifyMessage({
        message: `a new blog ${newBlog.title} by ${newBlog.author}`,
        type: 'success'
      })
    } catch {
      setupNotifyMessage({ message: 'create blog failed', type: 'failure' })
    }
  }

  const handleUpdateLikes = async (id) => {
    const blog = blogs.find((n) => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      const returnedBlog = await blogService.update(id, changedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog).sort(sortBlogs))
    } catch (error) {
      console.log({ error: error })
      setupNotifyMessage({
        message: `Blog '${blog.title}' was already deleted from server`,
        type: 'failure'
      })
      setBlogs(blogs.filter((n) => n.id !== id).sort(sortBlogs))
    }
  }

  const handleDeleteBlog = async (delBlog) => {
    try {
      const result = window.confirm(`Remove blog ${delBlog.title}`)
      if (result) {
        await blogService.del(delBlog.id)
        setBlogs(blogs.filter(blog => blog.id !== delBlog.id).sort(sortBlogs))
        setupNotifyMessage({
          message: `Successfully deleted blog ${delBlog.title}.`,
          type: 'success'
        })
      }
    } catch (error) {
      console.log({ error: error })
    }
  }

  return (
    <div>
      {!user && (
        <div>
          <h2>log in to application</h2>
          <Notification message={notifyMessage} />
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </div>
      )}

      {user && (
        <div>
          <div>
            <h2>blogs</h2>
            <Notification message={notifyMessage} />
            <LoginStatus
              name={user.name}
              onClick={() => {
                window.localStorage.removeItem('loggedNoteappUser')
                setUser('')
                blogService.setToken('')
              }}
            />
          </div>
          <div>
            <Togglable showButtonLabel={'create new blog'} hideButtonLabel={'cancel'} ref={newBlogRef}>
              <h2>create new</h2>
              <CreateBlog
                handleCreateBlog={handleCreateBlog}
              />
            </Togglable>
          </div>
          <div>
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                user={user}
                blog={blog}
                handleUpdateLikes={handleUpdateLikes}
                handleDeleteBlog={handleDeleteBlog}
              />
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default App