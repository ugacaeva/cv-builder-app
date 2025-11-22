import React, { useState } from 'react'
import { useResume } from '../../../contexts/ResumeProvider'

export default function LanguagesEditor() {
    const { state, dispatch } = useResume()
    const { languages } = state

    const [name, setName] = useState('')
    const [level, setLevel] = useState('Средний')

    const addLanguage = () => {
        const nm = (name || '').trim()
        if (!nm) return
        dispatch({ type: 'ADD_LANGUAGE', payload: { name: nm, level } })
        setName('')
        setLevel('Средний')
    }

    const remove = (id) => dispatch({ type: 'REMOVE_LANGUAGE', payload: id })

    return (
        <section>
        <h3 className="text-lg font-medium mb-2">Языки</h3>

        <div className="flex gap-2 items-center">
            <input className="border rounded px-2 py-1 text-sm" placeholder="Язык" value={name} onChange={(e) => setName(e.target.value)} />
            <select className="border rounded px-2 py-1 text-sm" value={level} onChange={(e) => setLevel(e.target.value)}>
            <option>Низкий</option>
            <option>Средний</option>
            <option>Высокий</option>
            <option>Родной</option>
            </select>
            <button type="button" onClick={addLanguage} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Добавить</button>
        </div>

        <div className="mt-3 space-y-2">
            {languages.length === 0 && <div className="text-sm text-gray-500">Языки не добавлены</div>}
            {languages.map(l => (
            <div key={l.id} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                <div className="text-sm">{l.name} — <span className="text-gray-500 text-xs">{l.level}</span></div>
                <div>
                <button type="button" onClick={() => remove(l.id)} className="text-xs text-red-600">Удалить</button>
                </div>
            </div>
            ))}
        </div>
        </section>
    )
}
