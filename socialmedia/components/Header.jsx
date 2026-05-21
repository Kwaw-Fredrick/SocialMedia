import React from 'react'
import css from "@/styles/header.module.css"
import Box from './Box/Box'
import Image from 'next/image'
import { Flex } from 'antd'
import { UserButton } from '@clerk/nextjs'
import ModeButton from './Box/ModeButton'
import SidebarButton from './SidebarButton'


const Header = () => {
    return (
        <div className={css.wrapper}>
            <Box style={{ height: "100%" }}>
                <div className={css.container}>

                    {/*sidebar Button*/}
                    <div className={css.sidebarButton}>
                        <SidebarButton/>
                    </div>

                    {/* logo left-side */}

                    <Image
                        src="/images/logo.png"
                        width={150}
                        height={40}
                        alt="logo"
                        className={css.logo}
                    />
                    {/* right side */}
                    <Flex gap={25} align="center">
                        {/* mode button */}
                        <ModeButton />
                        {/* user button */}
                        <UserButton afterSwitchSessionUrl='/sign-in' />
                    </Flex>
                </div>
            </Box>
        </div>
    )
}

export default Header