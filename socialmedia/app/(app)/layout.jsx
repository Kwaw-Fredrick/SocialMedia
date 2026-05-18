import { SettigsContextProvider } from '@/context/settings-provider'
import ThemeProvider from '@/lib/ThemeProvider'
import {css} from '../../styles/homeLayout.module.css'
import React from 'react'
import Box from '@/components/Box/Box'
import Header from '@/components/Header'


const HomeLayout = ({ children }) => {
  return (
    <SettigsContextProvider>
      <ThemeProvider>
        <Box type="baseBg"
          style={{
            position: 'relative', 
            width: '100vw', 
            height: '100vh'
          }}
        >

          <div className={css.wrapper}>
            <Header/>
          </div>
        </Box>
      </ThemeProvider>
    </SettigsContextProvider>
  )
}

export default HomeLayout