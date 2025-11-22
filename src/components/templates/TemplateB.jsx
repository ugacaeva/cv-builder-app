// строгий
// еще не готов, просто для вида

import React from 'react'

export default function TemplateB({ data = {}, meta = {} }) {
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
        <div className="bg-white rounded shadow-sm overflow-hidden">
            <div className="flex">

            <div className="w-40 p-4" style={{ background: accent, color: 'white' }}>
                <div className="flex flex-col items-start gap-3">
                {personal.photo ? (
                    <img src={personal.photo} alt={fullName || 'Фото'} className="w-20 h-20 object-cover rounded" />
                ) : (
                    <div className="w-20 h-20 bg-white/20 rounded flex items-center justify-center text-sm">Фото</div>
                )}

                <div className="text-sm font-semibold leading-tight">
                    {fullName || 'Имя Фамилия'}
                </div>

                <div className="text-xs opacity-90">
                    {personal.position || 'Желаемая позиция'}
                </div>
                </div>
            </div>

            <div className="flex-1 p-5">
            </div>
            </div>
        </div>
        </div>
    )
}
