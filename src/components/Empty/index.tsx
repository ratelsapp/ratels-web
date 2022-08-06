import React from 'react'
import './_style.scss'

const Empty = () => {
  return (
    <div className='empty'>
      <img className="empty_img" src={require('assets/images/empty.png').default} alt='' />
      <div className="empty_text">No data</div>
    </div>
  )
}

export default Empty
