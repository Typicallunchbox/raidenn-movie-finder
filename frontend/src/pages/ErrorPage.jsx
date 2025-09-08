import React from 'react'
import Meta from "../components/MetaTag/MetaTag";

function ErrorPage(props) {
  const {title} = props;

  return (
    <div className='error-page'>
      <Meta title={`Raidenn ${'- '+ title || ''}`} />
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
