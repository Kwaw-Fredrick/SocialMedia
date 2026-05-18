'use client'
import { useState } from "react"
import { SettigsContext } from "./settings/settings-context";

export const SettigsContextProvider= ({children})=>{
    const [settings, setSettings] = useState({
        theme: "light", 
        isSidebarOpen: false});
    return(
        <SettigsContext.Provider value={{settings, setSettings}}>
            {children}
        </SettigsContext.Provider>
    )
}