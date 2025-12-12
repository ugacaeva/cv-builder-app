import React from 'react'

export default function TemplateC({ data = {}, meta = {} }) {
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

    return (
        <div className="w-full text-black" style={style}>
            <div className="bg-white rounded shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-1">
                        <div className="text-3xl font-extrabold" style={{ color: accent }}>{fullName || 'Имя Фамилия'}</div>
                        <div className="text-sm text-gray-600 mt-1">{personal.position || 'Желаемая позиция'}</div>

                        <div className="mt-3 text-sm text-gray-700 space-y-1">
                            {personal.phone && <div>Телефон: {personal.phone}</div>}
                            {personal.email && <div>Почта: {personal.email}</div>}
                            {personal.location && <div>Город проживания: {personal.location}</div>}

                            {(personal.desiredSalary || personal.employment) && (
                                <div className="text-gray-600 text-sm">
                                    {personal.desiredSalary && <span>Желаемая з/п: {personal.desiredSalary}</span>}
                                    {personal.desiredSalary && personal.employment && <span className="mx-2">•</span>}
                                    {personal.employment && <span>Занятость: {personal.employment}</span>}
                                </div>
                            )}

                            {(personal.dateOfBirth || personal.gender || personal.maritalStatus) && (
                                <div className="text-xs text-gray-500 mt-1">
                                    {personal.dateOfBirth && <span>Родился: {personal.dateOfBirth}</span>}
                                    {personal.gender && <span className="mx-2">•</span>}
                                    {personal.gender && <span>{personal.gender}</span>}
                                    {personal.maritalStatus && <span className="mx-2">•</span>}
                                    {personal.maritalStatus && <span>{personal.maritalStatus}</span>}
                                </div>
                            )}
                        </div>

                        <div className="mt-4 text-gray-700">{summary || 'Краткое описание - расскажите о себе.'}</div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <div className="text-xs text-gray-500">Языки</div>
                                <div className="mt-1 text-gray-700">{languages.length ? languages.map(l => `${l.name} (${l.level})`).join(', ') : 'Не указано'}</div>
                            </div>

                            <div>
                                <div className="text-xs text-gray-500">Ключевые навыки</div>
                                <div className="mt-1 text-gray-700">{((professionalSkills.length ? professionalSkills : skills).slice(0,6)).length
                                    ? (professionalSkills.length ? professionalSkills : skills).slice(0,6).join(', ')
                                    : 'Не указано'}</div>
                            </div>

                            <div>
                                <div className="text-xs text-gray-500">Образование</div>
                                <div className="mt-1 text-gray-700">{sortedEducation.length ? sortedEducation.map((ed,i) => (
                                    <div key={i} className="mb-2">
                                        <div className="font-medium">{ed.institution}</div>
                                        <div className="text-xs text-gray-500">{ed.degree ? ed.degree + ' — ' : ''}{ed.start || ''}{ed.end ? ' — ' + ed.end : ''}</div>
                                    </div>
                                )) : 'Не указано'}</div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="text-sm font-semibold text-gray-800 mb-2">Опыт</div>
                            {sortedExperience.length ? sortedExperience.map((e,i) => (
                                <div key={i} className="mb-2 text-sm text-gray-700">
                                    <div className="font-medium">{e.position || 'Должность'}</div>
                                    {e.company && <div className="text-sm text-gray-600">{e.company}</div>}
                                    <div className="text-xs text-gray-500">{e.start || ''}{(e.start||e.end)?' — ':''}{e.end||''}</div>
                                    {e.description && <div className="mt-1">{e.description}</div>}
                                </div>
                            )) : <div className="text-sm text-gray-500">Опыт не добавлен</div>}
                        </div>
                    </div>

                    <div className="flex-shrink-0">
                        {personal.photo ? (
                            <img src={personal.photo} alt={fullName || 'Фото'} className="w-28 h-28 rounded-full object-cover border-2" style={{ borderColor: accent }} />
                        ) : (
                            <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">Фото</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
