import React, { useState } from 'react'
import { useResume } from '../../../contexts/ResumeProvider'

export default function SkillsEditor() {
    const { state, dispatch } = useResume()
    const { professionalSkills } = state

    const [input, setInput] = useState('')

    const add = () => {
        const s = (input || '').trim()
        if (!s) return
        dispatch({ type: 'ADD_PROFESSIONAL_SKILL', payload: s })
        setInput('')
    }
    const remove = (s) => dispatch({ type: 'REMOVE_PROFESSIONAL_SKILL', payload: s })

    return (
        <section>
        <h3 className="text-lg font-medium mb-2">Ключевые навыки</h3>
        <div className="flex gap-2">
            <input className="border rounded px-2 py-1 text-sm" placeholder="Добавить навык" value={input} onChange={(e) => setInput(e.target.value)} />
            <button type="button" onClick={add} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Добавить</button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
            {professionalSkills.map((s, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded text-sm">
                <span>{s}</span>
                <button type="button" onClick={() => remove(s)} className="text-xs text-red-600">×</button>
            </div>
            ))}
        </div>
        </section>
    )
}
