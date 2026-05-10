import React from 'react'
import css from "@/styles/authLayout.module.css"

export const metadata={
  title : "Authentication"
}


const AuthLayout = ({children}) => {
    return (
      <div className={css.wrapper}>
        {children}
      </div>
    )
}

export default AuthLayout