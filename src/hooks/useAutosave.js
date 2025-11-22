import { useEffect, useRef } from 'react'
import { useResume } from '../contexts/ResumeProvider'
import { saveAuto } from '../utils/storage'

export default function useAutosave(delay = 800) {
    const { state, dispatch } = useResume()
    const timer = useRef(null)
    const prevStateRef = useRef({})

    useEffect(() => {
        const snapshot = { ...state, meta: { ...state.meta, lastSavedAt: undefined } }
        const isDifferent = JSON.stringify(snapshot) !== JSON.stringify(prevStateRef.current)
        if (!isDifferent) return

        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => {
        try {
            saveAuto(state)
            dispatch({ type: 'SET_LAST_SAVED_AT', payload: new Date().toISOString() })
            prevStateRef.current = snapshot
        } catch (e) {
            console.error('Autosave failed', e)
        }
        }, delay)

        return () => {
        if (timer.current) clearTimeout(timer.current)
        }
    }, [state, dispatch, delay])
}
