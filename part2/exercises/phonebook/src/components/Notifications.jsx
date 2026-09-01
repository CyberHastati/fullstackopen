const Notification = ({ message }) => {
  const notificationStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
  }
  if (message === null) {
    return null
  } else if (message.type === 'success'){
    notificationStyle.color = 'green'
  } else if (message.type === 'failure'){
    notificationStyle.color = 'red'
  }

  return (
    <div style={notificationStyle}>
      {message.message}
    </div>
  )
}

export default Notification

