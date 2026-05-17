'use-client'
import { createContext, useContext } from "react"

export const SettigsContext = createContext({});

export const useSettingsContext = () => {
    const context = useContext(SettigsContext);

    if(!context){
        throw new Error("useSettingsContext must be used within a themeProvider");       
    }
    return context;
}