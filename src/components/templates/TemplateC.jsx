//современный
//еще не готов

import React from 'react'

export default function TemplateC({ data = {}, meta = {} }) {
    const { personal = {} } = data
    const style = {
        fontFamily: meta.fontFamily || 'Inter, system-ui, sans-serif',
        fontSize: meta.fontSizePt ? `${meta.fontSizePt}pt` : '11pt'
    }
    const accent = meta.themeColor || '#111827'

    const fullName = [
        personal.firstName && personal.firstName.trim(),
        personal.middleName && personal.middleName.trim(),
        personal.lastName && personal.lastName.trim()
    ].filter(Boolean).join(' ')

    return (
        <div className="w-full" style={style}>
        <div className="bg-white rounded shadow-sm p-4">
            <div className="flex items-center justify-between gap-4">
            <div>
                <div className="text-3xl font-extrabold" style={{ color: accent }}>
                {fullName || 'Имя Фамилия'}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                {personal.position || 'Желаемая позиция'}
                </div>
            </div>

            <div className="flex-shrink-0">
                {personal.photo ? (
                <img
                    src={personal.photo}
                    alt={fullName || 'Фото'}
                    className="w-24 h-24 rounded-full object-cover border-2"
                    style={{ borderColor: accent }}
                />
                ) : (
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">Фото</div>
                )}
            </div>
            </div>
        </div>
        </div>
    )
}
