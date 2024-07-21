import React from 'react'

import BlogData from '../components/BlogData';


function HomePage() {

  return (
    <div>
        <img className='home_image' src='/Assets/Title_image.jpg' alt='image' />    
        <div className='fade_bottom'></div>    
        <BlogData />
    </div>
  )
}

export default HomePage