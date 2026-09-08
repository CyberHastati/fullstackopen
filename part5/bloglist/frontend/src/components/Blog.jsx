const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author} {blog.url}
  </div>  
)

const CreateBlog = (props) => (
    <form onSubmit={props.handleCreateBlog}>
      <div>
        <label>
          title
          <input
            type="text"
            value={props.createTitle}
            onChange={({ target }) => props.setCreateTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author
          <input
            type="text"
            value={props.createAuthor}
            onChange={({ target }) => props.setCreateAuthors(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url
          <input
            type="url"
            value={props.createUrl}
            onChange={({ target }) => props.setCreateUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
)


export { Blog, CreateBlog }