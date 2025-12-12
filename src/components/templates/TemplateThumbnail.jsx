// src/components/templates/TemplateThumbnail.jsx
import React from 'react'
import { useResume } from '../../contexts/ResumeProvider'

import TemplateAImg from '/TemplateA.png'
import TemplateBImg from '/TemplateB.png'
import TemplateCImg from '/TemplateC.png'

const templateImages = {
  A: TemplateAImg,
  B: TemplateBImg,
  C: TemplateCImg,
}

export default function TemplateThumbnail({ templateId, onClick = null }) {
    const { dispatch } = useResume()

    const handleClick = () => {
        if (typeof onClick === 'function') {
            onClick(templateId)
        } else {
            dispatch({ type: 'SET_TEMPLATE', payload: templateId })
        }
    }

    return (
        <button
            onClick={handleClick}
            className="border rounded-lg p-3 hover:shadow transition bg-white text-left w-full"
            aria-label={`Выбрать шаблон ${templateId}`}
            type="button"
        >
            <div className="text-xs font-medium mb-2">Шаблон {templateId}</div>

            <div className="w-full h-28 overflow-hidden bg-gray-50 rounded flex items-center justify-center">
                <img
                    src={templateImages[templateId]}
                    alt={`Шаблон ${templateId}`}
                    className="object-contain max-h-full"
                />
            </div>

            <div className="mt-2 text-xs text-gray-400">Выбрать</div>
        </button>
    )
}
