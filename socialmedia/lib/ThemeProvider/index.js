"use client"
import React, { useCallback } from 'react'

const ThemeProvider = ({ children }) => {
    const { settings: { theme: globalTheme }, } = useSettingsContext();
    const BoxBg = useCallback(() => {
        return globalTheme === "dark" ? "rgb(33,43, 54" : "white";
    }, [globalTheme]);

    const BaseBg = useCallback(() => {
        return globalTheme === "dark" ? "black" : "#F4F6F8";
    }, [globalTheme]);
    return (
        <div>{children}</div>
    )
}

export default ThemeProvider