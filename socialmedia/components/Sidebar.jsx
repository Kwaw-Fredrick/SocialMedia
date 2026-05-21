'use client'
import React, { useCallback } from 'react'
import css from '@/styles/sideBar.module.css'
import { sideBarRoutes } from '@/lib/ThemeProvider/sideBarRoutes'
import Link from 'next/link'
import { Typography } from 'antd'
import { Icon } from '@iconify/react'
import Box from './Box/Box'
import { usePathname, useRouter } from 'next/navigation'
import { useClerk } from '@clerk/nextjs'
import cx from 'classnames'
import SidebarContainer from './SidebarContainer'
import { useSettingsContext } from '@/context/settings/settings-context'

const Sidebar = () => {
    const router = useRouter();
    const { signOut } = useClerk();
    const pathname = usePathname();

    const { settings: { isSidebarOpen }, setSettings } = useSettingsContext();

    const handleDrawerClose = useCallback(() => {
        setSettings((prev) => ({
            ...prev, 
            isSidebarOpen: false
        }
      ))
   }, [setSettings])

    const isActive = (route) => {
        if (route.route === pathname) { return css.active; }
    };

    const isActiveColor = (route) => {
        return isActive(route) && "var(--primary)";
    }
    return (
        <SidebarContainer isDrawerOpen={isSidebarOpen} setIsDrawerOpen={handleDrawerClose}>
            <div className={css.wrapper}>
                <Box className={css.container}>
                    {
                        sideBarRoutes().map((route, index) => (
                            <Link key={index} href={route.route} className={cx(css.item, isActive(route))}>

                                {/*icon*/}
                                <Typography className='typoSubtitle2' style={{
                                    color: isActiveColor(route),

                                }}>
                                    <Icon icon={route.icon} width={"20px"} display={"flex"} />
                                </Typography>

                                {/*name Routes*/}
                                <Typography
                                    style={{ color: isActiveColor(route) }}>
                                    {route.name}
                                </Typography>
                            </Link>
                        ))}

                    < Link href={""} onClick={() => { signOut(() => router.push("/sign-in")) }}
                        className={css.item}>
                        {/*logout  Icon*/}

                        <Typography>
                            <Icon icon="solar:logout-2-bold" width={"20px"} />
                        </Typography>


                        {/* name signout*/}
                        <Typography >Sign Out</Typography>
                    </Link>
                </Box >
            </div >
        </SidebarContainer>


    )
}

export default Sidebar