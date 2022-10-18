import React from 'react'

const Loader = ({size = 20, weight = 3}) => {
  return (
    <div className='loader'
        style={{
            width: `${size}px`,
            height: `${size}px`,
            borderWidth: `${weight}px`
        }}
    ></div>
  )
}

export default Loader