import { SettigsContextProvider } from '@/context/settings-provider'
import React from 'react'


const HomeLayout = ({children}) => {
  return (
    <SettigsContextProvider>
      <themeProvider>
      <div>{children}</div>
      </themeProvider>
    </SettigsContextProvider>
  )
}

export default HomeLayout