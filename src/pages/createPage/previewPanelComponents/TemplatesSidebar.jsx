import React from 'react'
import TemplateThumbnail from '../../../components/templates/TemplateThumbnail'
import { useResume } from '../../../contexts/ResumeProvider'

export default function TemplatesSidebar ({ sample = { personal: { firstName: 'Иван', lastName: 'Иванов', position: 'Frontend' } } }) {
    const { dispatch } = useResume()
    const templates = ['A', 'B', 'C']

    return (
        <aside className="w-full lg:w-1/4">
        <div className="bg-white rounded-lg shadow p-4 sticky top-28">
            <h4 className="text-sm font-semibold mb-3">Шаблоны</h4>

            <div className="space-y-3">
            {templates.map(t => (
                <TemplateThumbnail
                key={t}
                templateId={t}
                sampleData={sample}
                onClick={(templateId) => dispatch({ type: 'SET_TEMPLATE', payload: templateId })}
                />
            ))}
            </div>
        </div>
        </aside>
    )
}
