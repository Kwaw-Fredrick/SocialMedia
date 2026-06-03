import { SettingsContextProvider } from '@/context/settings-provider'
import ThemeProvider from '@/lib/ThemeProvider'
import css from '@/styles/homeLayout.module.css'
import React from 'react'
import Header from '@/components/Header'
import Box from '@/components/Box/Box'
import Sidebar from '@/components/Sidebar'
import { Toaster } from 'react-hot-toast'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'


const HomeLayout = ({ children }) => {

  const queryClient = new QueryClient();
  return (
    <SettingsContextProvider>
      <ThemeProvider>
        <HydrationBoundary state ={dehydrate(queryClient)}>


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
          </HydrationBoundary>
        <Toaster/>
      </ThemeProvider>
    </SettingsContextProvider>
  )
}

export default HomeLayout