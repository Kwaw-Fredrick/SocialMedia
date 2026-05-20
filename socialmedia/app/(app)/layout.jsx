import { SettigsContextProvider } from '@/context/settings-provider'
import ThemeProvider from '@/lib/ThemeProvider'
import css from '@/styles/homeLayout.module.css'
import React from 'react'
import Header from '@/components/Header'
import Box from '@/components/Box/Box'
import Sidebar from '@/components/Sidebar'


const HomeLayout = ({ children }) => {
  return (
    <SettigsContextProvider>
      <ThemeProvider>
        <Box type="baseBg"
          style={{
            position: 'relative', 
            width: '100vw', 
            minHeight: '100vh',
            overflow: 'auto'
          }}
        >

          <div className={css.wrapper}>
            <Header/>
            <div className={css.container}>
              <Sidebar/>
              <div className={css.page_body}>
                {children}
              </div>
            </div>
          </div>
        </Box>
      </ThemeProvider>
    </SettigsContextProvider>
  )
}

export default HomeLayout