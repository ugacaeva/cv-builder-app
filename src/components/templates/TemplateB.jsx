import React from 'react'

export default function TemplateB({ data = {}, meta = {} }) {
    const {
        personal = {},
        summary,
        experience = [],
        education = [],
        languages = [],
        professionalSkills = [],
        skills = []
    } = data

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

    const parseTime = (d) => {
        if (!d) return 0
        const t = Date.parse(d)
        return Number.isNaN(t) ? 0 : t
    }

    const sortedExperience = [...experience].sort((a,b) => parseTime(b.end || b.start) - parseTime(a.end || a.start))
    const sortedEducation = [...education].sort((a,b) => parseTime(b.end || b.start) - parseTime(a.end || a.start))

    const skillsList = professionalSkills && professionalSkills.length ? professionalSkills : skills || []

    return (
        <div className="w-full text-black" style={style}>
        <div className="bg-white rounded shadow-sm overflow-hidden flex flex-col md:flex-row">
            <aside
            className="w-full md:w-48 p-5 flex-shrink-0 flex flex-col items-center gap-4"
            style={{ background: accent, color: 'white' }}
            >
            {personal.photo ? (
                <img src={personal.photo} alt={fullName || 'Фото'} className="w-24 h-24 object-cover rounded-full" />
            ) : (
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-sm">Фото</div>
            )}

            <div className="text-lg font-bold text-center break-words">{fullName || 'Имя Фамилия'}</div>
            <div className="text-xs text-center break-words">{personal.position || 'Желаемая позиция'}</div>

            <div className="mt-4 text-xs space-y-1 text-white/90 text-center">
                {personal.phone && <div className="break-words">Телефон: {personal.phone}</div>}
                {personal.email && <div className="break-words">Почта: {personal.email}</div>}
                {personal.location && <div className="break-words">Город проживания: {personal.location}</div>}
                {(personal.desiredSalary || personal.employment) && (
                <div className="break-words">
                    {personal.desiredSalary && <span>Желаемая з/п: {personal.desiredSalary}</span>}
                    {personal.desiredSalary && personal.employment && <span> • </span>}
                    {personal.employment && <span>Занятость: {personal.employment}</span>}
                </div>
                )}
            </div>
            </aside>

            <div className="flex-1 p-6 min-w-0">
            <div className="text-gray-700 mb-4 break-words">
                {summary || 'Краткое описание - расскажите о себе.'}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="min-w-0">
                <div className="text-xs text-gray-500">Языки</div>
                <div className="mt-1 text-gray-700">
                    {languages && languages.length ? (
                    <div className="flex flex-wrap gap-2 mt-1">
                        {languages.map((l) => (
                        <span key={l.id} className="text-sm px-2 py-1 bg-gray-100 rounded break-words">{`${l.name} (${l.level})`}</span>
                        ))}
                    </div>
                    ) : (
                    'Не указано'
                    )}
                </div>
                </div>

                <div className="min-w-0">
                <div className="text-xs text-gray-500">Ключевые навыки</div>
                <div className="mt-1 text-gray-700">
                    {skillsList && skillsList.length ? (
                    <div className="flex flex-wrap gap-2 mt-1">
                        {skillsList.slice(0, 12).map((s, idx) => (
                        <span key={idx} className="text-sm px-2 py-1 bg-gray-100 rounded break-words">{s}</span>
                        ))}
                    </div>
                    ) : (
                    'Не указано'
                    )}
                </div>
                </div>

                <div className="min-w-0">
                <div className="text-xs text-gray-500">Образование</div>
                <div className="mt-1 text-gray-700">
                    {sortedEducation && sortedEducation.length ? (
                    <div className="space-y-2">
                        {sortedEducation.map((ed, i) => (
                        <div key={ed.id || i} className="mb-0">
                            <div className="font-medium break-words">{ed.institution}</div>
                            <div className="text-xs text-gray-500 break-words">{ed.degree ? ed.degree + ' — ' : ''}{ed.start || ''}{ed.end ? ' — ' + ed.end : ''}</div>
                        </div>
                        ))}
                    </div>
                    ) : (
                    'Не указано'
                    )}
                </div>
                </div>
            </div>

            <div className="mt-6">
                <div className="text-sm font-semibold text-gray-800 mb-2">Опыт</div>
                {sortedExperience && sortedExperience.length ? (
                <div className="text-sm text-gray-700 space-y-3">
                    {sortedExperience.map((e, i) => (
                    <div key={e.id || i} className="mb-0">
                        <div className="font-medium break-words">{e.position || 'Должность'}</div>
                        {e.company && <div className="text-sm text-gray-600 break-words">{e.company}</div>}
                        <div className="text-xs text-gray-500">{e.start || ''}{(e.start||e.end)?' — ':''}{e.end||''}</div>
                        {e.description && <div className="mt-1 break-words">{e.description}</div>}
                    </div>
                    ))}
                </div>
                ) : (
                <div className="text-sm text-gray-500">Опыт не добавлен</div>
                )}
            </div>
            </div>
        </div>
        </div>
    )
}
