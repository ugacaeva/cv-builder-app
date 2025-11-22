//вместо этого будет картинка, а то треш

import React from 'react'
import { useResume } from '../../contexts/ResumeProvider'
import TemplateRenderer from './TemplateRenderer'

export default function TemplateThumbnail({ templateId, sampleData = {}, onClick = null }) {
    const { dispatch } = useResume()

    const handleClick = () => {
        if (typeof onClick === 'function') {
        onClick(templateId)
        } else {
        dispatch({ type: 'SET_TEMPLATE', payload: templateId })
        }
    }

    const tinyMeta = { template: templateId, themeColor: sampleData.meta?.themeColor || '#2563eb', fontFamily: sampleData.meta?.fontFamily || 'Inter', fontSizePt: 8 }

    return (
        <button
        onClick={handleClick}
        className="border rounded p-2 hover:shadow-sm bg-white text-left w-full"
        aria-label={`Выбрать шаблон ${templateId}`}
        type="button"
        >
        <div className="text-xs font-medium mb-2">Шаблон {templateId}</div>

        <div className="w-full h-28 overflow-hidden bg-gray-50 rounded">
            <div className="p-1 scale-[0.85] origin-top-left" style={{ transformOrigin: 'top left' }}>
            <TemplateRenderer templateId={templateId} data={sampleData} meta={tinyMeta} />
            </div>
        </div>

        <div className="mt-2 text-xs text-gray-400">Выбрать</div>
        </button>
    )
}
