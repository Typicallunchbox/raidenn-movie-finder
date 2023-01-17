import React from 'react'

function ErrorPage() {
  return (
    <div className='error-page'>
      <div className='absolute left-2/4 top-2/4 -translate-x-2/4'>
        <h2>
          Nothing can found along this path. 
        </h2>
        <a href='/'>Return back home</a>
        </div>
    </div>
  )
}

export default ErrorPage
