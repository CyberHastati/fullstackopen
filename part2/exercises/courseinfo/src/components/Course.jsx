const Course = ({ course }) => {
  const total = course.parts.reduce((sum, cur) => (sum + cur.exercises), 0)

  return (
    <div>
    <h2> {course.name} </h2>
    {course.parts.map(course => <p key={course.id}>{course.name} {course.exercises}</p>)}
    <p><strong>total of {total} exercises</strong></p>
  </div>
  )
}

export default Course