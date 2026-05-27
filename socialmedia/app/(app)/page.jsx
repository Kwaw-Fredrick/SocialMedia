import React from 'react'
import css from '@/styles/homeView.module.css' 
import PostGenerator from '@/components/PostGenerator'

export const metadata = {
  title: `socialFredy's - Home`,
  description: 'Welcome to the home page of our social media app!',
}

const MainPage = () => {
  return ( 
    <div className={css.wrapper}>
      <div className={css.postsArea}>
        <PostGenerator/>
        <span>Posts</span>
      </div>

      <div className={css.right}>
      <span>Trending Section</span>
      <span>Follow suggestion</span>  
      </div>
    </div>
  )
}

export default MainPage;