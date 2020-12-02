import React from 'react'

const Notification = ({ message }) => {
    if (message[0] === null) {
      return null
    }
    if (message[1]) {
      return (
        <div className="success">
          {message[0]}
        </div>
      )
    } else {
      return (
        <div className="error">
          {message[0]}
        </div>
      )
    }
}

export default Notification