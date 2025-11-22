import React from 'react'
import { useResume } from '../../../contexts/ResumeProvider'

export default function SummaryEditor() {
    const { state, dispatch } = useResume()
    const { summary } = state

    return (
        <section>
        <label className="block text-sm font-medium text-gray-700">Сопроводительное письмо</label>
        <textarea
            value={summary || ''}
            onChange={(e) => dispatch({ type: 'UPDATE_SUMMARY', payload: e.target.value })}
            rows={4}
            className="mt-1 block w-full border rounded px-3 py-2 text-sm"
            placeholder="Кратко опишите себя"
        />
        </section>
    )
}
