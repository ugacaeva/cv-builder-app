import React from 'react'
import PhotoUploader from './PhotoUploader'
import { useResume } from '../../../contexts/ResumeProvider'

function Input({ label, value, onChange, placeholder = '', type = 'text' }) {
    return (
        <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            type={type}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2 text-sm"
            placeholder={placeholder}
        />
        </div>
    )
}

export default function PersonalEditor() {
    const { state, dispatch } = useResume()
    const { personal } = state

    const upd = (field, value) => dispatch({ type: 'UPDATE_PERSONAL', payload: { field, value } })

    return (
        <section>
        <PhotoUploader />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            <Input label="Фамилия" value={personal.lastName} onChange={(v) => upd('lastName', v)} />
            <Input label="Имя" value={personal.firstName} onChange={(v) => upd('firstName', v)} />
            <Input label="Отчество" value={personal.middleName} onChange={(v) => upd('middleName', v)} />
        </div>

        <div className="mt-3">
            <Input label="Желаемая позиция" value={personal.position} onChange={(v) => upd('position', v)} placeholder="Frontend Developer" />
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input label="Телефон" value={personal.phone} onChange={(v) => upd('phone', v)} type="tel" placeholder="+7 (XXX) XXX-XX-XX" />
            <Input label="E-mail" value={personal.email} onChange={(v) => upd('email', v)} type="email" />
            <Input label="Адрес" value={personal.location} onChange={(v) => upd('location', v)} />
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input label="Желаемая з/п" value={personal.desiredSalary} onChange={(v) => upd('desiredSalary', v)} placeholder="₽ / мес" />

            <div>
            <label className="block text-sm font-medium text-gray-700">Занятость</label>
            <select
                value={personal.employment || ''}
                onChange={(e) => upd('employment', e.target.value)}
                className="mt-1 block w-full border rounded px-3 py-2 text-sm"
            >
                <option value="">Не указано</option>
                <option value="Полная">Полная</option>
                <option value="Частичная">Частичная</option>
                <option value="Удалённая">Удалённая</option>
                <option value="Проектная">Проектная</option>
            </select>
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700">Дата рождения</label>
            <input
                type="date"
                value={personal.dateOfBirth || ''}
                onChange={(e) => upd('dateOfBirth', e.target.value)}
                className="mt-1 block w-full border rounded px-3 py-2 text-sm"
            />
            </div>
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
            <label className="block text-sm font-medium text-gray-700">Пол</label>
            <select value={personal.gender || ''} onChange={(e) => upd('gender', e.target.value)} className="mt-1 block w-full border rounded px-3 py-2 text-sm">
                <option value="">Не указано</option>
                <option value="Мужской">Мужской</option>
                <option value="Женский">Женский</option>
                <option value="Другой">Другой</option>
            </select>
            </div>

            <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Семейное положение</label>
            <select value={personal.maritalStatus || ''} onChange={(e) => upd('maritalStatus', e.target.value)} className="mt-1 block w-full border rounded px-3 py-2 text-sm">
                <option value="">Не указано</option>
                <option value="Не женат/Не замужем">Не женат/Не замужем</option>
                <option value="Женат/Замужем">Женат/Замужем</option>
                <option value="Разведён/Разведена">Разведён/Разведена</option>
            </select>
            </div>
        </div>
        </section>
    )
}
