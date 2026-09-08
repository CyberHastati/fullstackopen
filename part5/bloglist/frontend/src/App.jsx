import { useState, useEffect } from 'react'
import { Blog, CreateBlog } from './components/Blog'
import Notification from './components/Notification'
import { LoginForm, LoginStatus } from './components/Auth'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [createTitle, setCreateTitle] = useState('')
  const [createAuthor, setCreateAuthor] = useState('')
  const [createUrl, setCreateUrl] = useState('')
  
  const [user, setUser] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [notifyMessage, setNotifyMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username)
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch {
      setNotifyMessage({message: 'wrong username or password', type: 'failure'})
      setTimeout(() => {
        setNotifyMessage(null)
      }, 5000)
    }
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    console.log('Creating blog with', user.name)

    const newBlog = {
      title: createTitle,
      author: createAuthor,
      url: createUrl,
      likes: 0
    }

    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      setCreateAuthor('')
      setCreateTitle('')
      setCreateUrl('')
      setNotifyMessage({message: `a new blog ${createTitle} by ${createAuthor}`, type: 'success'})
      setTimeout(() => {
        setNotifyMessage(null)
      }, 5000)
    } catch {
      setNotifyMessage({message: 'create blog failed', type: 'failure'})
      setTimeout(() => {
        setNotifyMessage(null)
      }, 5000)
    }


  }

  return (
    <div>
      {!user && (
        <div>
          <h2>log in to application</h2>
          <Notification message={notifyMessage}/>
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
            <Notification message={notifyMessage}/>
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
            <h2>create new</h2>
            <CreateBlog 
              createTitle={createTitle}
              createAuthor={createAuthor}
              createUrl={createUrl}
              setCreateTitle={setCreateTitle}
              setCreateAuthors={setCreateAuthor}
              setCreateUrl={setCreateUrl}
              
              handleCreateBlog={handleCreateBlog}
            />
          </div>
          <div>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
          </div>
        </div>
       
      )}

    </div>
  )
}
  
export default App