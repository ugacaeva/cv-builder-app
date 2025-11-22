import React, { useState } from 'react'
import { useResume } from '../../../contexts/ResumeProvider'

export default function ExperienceEditor() {
  const { state, dispatch } = useResume()
  const { experience } = state

  const [form, setForm] = useState({ company: '', position: '', start: '', end: '', description: '' })

  const add = () => {
    const company = (form.company || '').trim()
    const position = (form.position || '').trim()
    const start = (form.start || '').trim()
    const end = (form.end || '').trim()
    const description = (form.description || '').trim()

    if (!company && !position) return

    const payload = { company, position, start, end, description }
    dispatch({ type: 'ADD_EXPERIENCE', payload })

    setForm({ company: '', position: '', start: '', end: '', description: '' })
  }

  const remove = (id) => dispatch({ type: 'REMOVE_EXPERIENCE', payload: id })

  return (
    <section>
      <h3 className="text-lg font-medium mb-2">Опыт работы</h3>

      <div className="space-y-2">
        {experience.length === 0 && <div className="text-sm text-gray-500">Опыт не добавлен</div>}
        {experience.map(e => (
          <div key={e.id} className="p-3 border rounded">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">
                  {e.position || 'Должность'}
                </div>
                { (e.company) && <div className="text-sm text-gray-600">{e.company}</div> }

                <div className="text-xs text-gray-500">{e.start || ''}{(e.start || e.end) ? ' — ' : ''}{e.end || ''}</div>
              </div>

              <div>
                <button type="button" onClick={() => remove(e.id)} className="text-xs text-red-600">Удалить</button>
              </div>
            </div>

            {e.description && <div className="mt-2 text-sm text-gray-700">{e.description}</div>}
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input placeholder="Компания" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="border rounded px-2 py-1 text-sm" />
        <input placeholder="Должность" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className="border rounded px-2 py-1 text-sm" />
        <input placeholder="Начало" type="date" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} className="border rounded px-2 py-1 text-sm" />
        <input placeholder="Окончание" type="date" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} className="border rounded px-2 py-1 text-sm" />
        <input placeholder="Краткое описание" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="col-span-1 sm:col-span-2 border rounded px-2 py-1 text-sm" />
        <div>
          <button type="button" onClick={add} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Добавить опыт</button>
        </div>
      </div>
    </section>
  )
}
