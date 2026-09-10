import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Blog, CreateBlog } from './Blog'
import { describe } from 'vitest'


describe('<Blog />', () => {
  let blog
  let user
  let handleUpdateLikes
  let handleDeleteBlog

  beforeEach(() => {
    user = {
      username: 'root',
      name: 'Superuser',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
    }
    blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'testauthor',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      user: {
        username: 'root',
        name: 'Superuser',
        id: '6a9e70e6a5a25372c01eedda'
      },
      likes: 1,
      id: '6a9fb953e78a7f9fc1ebbafc'
    }
    handleUpdateLikes = vi.fn()
    handleDeleteBlog = vi.fn()
    render(<Blog
      user={user}
      blog={blog}
      handleUpdateLikes={handleUpdateLikes}
      handleDeleteBlog={handleDeleteBlog}
    />)
  })

  test('initial rendering only shows blog title and author', () => {
    // screen.debug()

    expect(screen.getByText(blog.title, { exact: false })).toBeVisible()
    expect(screen.getByText(blog.author, { exact: false })).toBeVisible()
    expect(
      screen.queryByText(blog.url, { exact: false })
    ).toBeNull()

    expect(
      screen.queryByText(`likes ${blog.likes}`, { exact: false })
    ).toBeNull()
  })

  test('show blog\'s URL and number of likes after clicking on \'view\'', async () => {
    // screen.debug()

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText(blog.url, { exact: false })).toBeVisible()
    expect(
      screen.getByText(`likes ${blog.likes}`, { exact: false })
    ).toBeVisible()
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice.', async () => {

    const user = userEvent.setup()
    await user.click(screen.getByText('view'))
    const likeButton  = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    // expect(handleUpdateLikes.mock.calls).toHaveLength(2)
    expect(handleUpdateLikes).toHaveBeenCalledTimes(2)
  })
})

describe('<CreateBlog />', () => {
  let blog
  let handleCreateBlog

  beforeEach(() => {
    blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'testauthor',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 0
    }
    handleCreateBlog = vi.fn()
    render(<CreateBlog
      handleCreateBlog={handleCreateBlog}
    />)
  })

  test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    // screen.debug()
    const user = userEvent.setup()

    await user.type(screen.getByPlaceholderText('write blog title here'), blog.title)
    await user.type(screen.getByPlaceholderText('write blog author here'), blog.author)
    await user.type(screen.getByPlaceholderText('write blog url here'), blog.url)

    await user.click(screen.getByText('create'))
    expect(handleCreateBlog).toHaveBeenCalledTimes(1)
    expect(handleCreateBlog).toHaveBeenCalledWith({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes
    })
    // expect(handleCreateBlog.mock.calls[0][0]).toEqual(blog)
  })


})