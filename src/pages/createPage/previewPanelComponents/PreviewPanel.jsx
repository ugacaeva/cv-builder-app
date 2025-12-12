import React from 'react'
import { useResume } from '../../../contexts/ResumeProvider'
import IframePreview from './IframePreview'
import PreviewControls from './PreviewControls'

export default function PreviewPanel({ expanded = false }) {
    const { state } = useResume()

    return (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 min-h-[70vh] overflow-hidden">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Превью</h2>

        <div id="resume-preview" className="border border-gray-100 rounded p-2 bg-gray-50">
            <IframePreview templateId={state.meta.template} data={state} meta={state.meta} />
        </div>

        <div className="mt-4 sm:mt-6">
            <PreviewControls />
        </div>
        </div>
    )
}
