import React, { useEffect, useState } from 'react'
import { listSnapshots, downloadJSON } from '../../utils/storage'
import { useResume } from '../../contexts/ResumeProvider'
import { useNavigate } from 'react-router-dom'

export default function SavedPage() {
    const [items, setItems] = useState([])
    const { dispatch } = useResume()
    const navigate = useNavigate()

    const refreshItems = () => setItems(listSnapshots())

    useEffect(() => {
        refreshItems()
    }, [])

    const openResume = (resume) => {
        dispatch({ type: 'LOAD_STATE', payload: resume.state })
        navigate('/create')
    }

    const deleteResume = (id) => {
        const key = `resume_builder_v1_snapshot_${id}`
        localStorage.removeItem(key)
        refreshItems()
    }

    const downloadResume = (resume) => {
        downloadJSON(resume.state, `${resume.name || `Resume_${resume.id}`}.json`)
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="pt-8 pb-12">
            <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Мои резюме</h1>
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 space-y-4">
            {items.length === 0 && (
                <div className="text-sm text-gray-500">Черновики не найдены</div>
            )}

            {items.map(it => (
                <div
                key={it.id}
                className="p-3 sm:p-4 border rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
                >
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <div className="font-medium text-sm sm:text-base">{it.name || `Резюме ${it.id}`}</div>
                    <div className="text-xs text-gray-500 mt-1 sm:mt-0">{new Date(it.id).toLocaleString()}</div>
                </div>

                <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                    <button
                    className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded"
                    onClick={() => openResume(it)}
                    >
                    Открыть
                    </button>
                    <button
                    className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded"
                    onClick={() => downloadResume(it)}
                    >
                    Скачать
                    </button>
                    <button
                    className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded text-red-600"
                    onClick={() => deleteResume(it.id)}
                    >
                    Удалить
                    </button>
                </div>
                </div>
            ))}
            </div>
        </section>
        </div>
    )
}
