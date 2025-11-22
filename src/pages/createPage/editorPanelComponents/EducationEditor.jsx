import React, { useState } from 'react'
import { useResume } from '../../../contexts/ResumeProvider'

export default function EducationEditor() {
    const { state, dispatch } = useResume()
    const { education } = state

    const [form, setForm] = useState({ institution: '', degree: '', start: '', end: '', description: '' })

    const add = () => {
        if (!form.institution || !form.institution.trim()) return
        dispatch({ type: 'ADD_EDUCATION', payload: form })
        setForm({ institution: '', degree: '', start: '', end: '', description: '' })
    }

    const remove = (id) => dispatch({ type: 'REMOVE_EDUCATION', payload: id })

    return (
        <section>
        <h3 className="text-lg font-medium mb-2">Образование</h3>

        <div className="space-y-2">
            {education.length === 0 && <div className="text-sm text-gray-500">Образование не добавлено</div>}
            {education.map(ed => (
            <div key={ed.id} className="p-3 border rounded">
                <div className="flex justify-between">
                <div>
                    <div className="font-medium">{ed.institution}</div>
                    <div className="text-xs text-gray-500">{ed.degree} — {ed.start} — {ed.end}</div>
                </div>
                <div>
                    <button type="button" onClick={() => remove(ed.id)} className="text-xs text-red-600">Удалить</button>
                </div>
                </div>
                {ed.description && <div className="mt-2 text-sm text-gray-700">{ed.description}</div>}
            </div>
            ))}
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input placeholder="Учебное заведение" value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} className="border rounded px-2 py-1 text-sm" />
            <input placeholder="Специальность / Степень" value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} className="border rounded px-2 py-1 text-sm" />
            <input placeholder="Начало" type="date" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} className="border rounded px-2 py-1 text-sm" />
            <input placeholder="Окончание" type="date" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} className="border rounded px-2 py-1 text-sm" />
            <div>
            <button type="button" onClick={add} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Добавить образование</button>
            </div>
        </div>
        </section>
    )
}
