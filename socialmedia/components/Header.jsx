import React from 'react'
import {css} from "styles/header.module.css"
import Box from './Box/Box'
import Image from 'next/image'


const Header = () => {
  return (
    <div className={css.wrapper}>
        <Box style={{height: "100%"}}>
            <div className={css.header}>

                {/* logo left-side */}
                <Image src={"/images/logo.png"} 
                width={150}
                height={40}
                alt='logo'
                className={css.logo}
                
                />
            </div>
        </Box>
    </div>
  )
}

export default Header