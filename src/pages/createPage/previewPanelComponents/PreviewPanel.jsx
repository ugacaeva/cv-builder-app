import React from 'react'
import { useResume } from '../../../contexts/ResumeProvider'
import TemplateRenderer from '../../../components/templates/TemplateRenderer'
import PreviewControls from './PreviewControls'

export default function PreviewPanel({ expanded = false }) {
    const { state } = useResume()

    return (
        <div className="bg-white rounded-lg shadow p-6 min-h-[70vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Превью</h2>

        <div id="resume-preview" className="border border-gray-100 rounded p-6 min-h-[40vh]">
            <TemplateRenderer templateId={state.meta.template} data={state} meta={state.meta} />
        </div>

        <div className="mt-6">
            <PreviewControls />
        </div>
        </div>
    )
}
