import React, { createContext, useContext, useEffect, useReducer } from 'react'
import resumeReducer, { initialState } from './resumeReducer'
import { loadAuto } from '../utils/storage'

const ResumeContext = createContext(null)

export function ResumeProvider({ children }) {
    const [state, dispatch] = useReducer(resumeReducer, initialState)

    useEffect(() => {
        const saved = loadAuto()
        if (saved) {
        dispatch({ type: 'LOAD_STATE', payload: saved })
        }
    }, [])

    return (
        <ResumeContext.Provider value={{ state, dispatch }}>
        {children}
        </ResumeContext.Provider>
    )
}

export function useResume() {
    const ctx = useContext(ResumeContext)
    return ctx
}
