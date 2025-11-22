import React, { useState } from 'react'
import { useResume } from '../../contexts/ResumeProvider'
import { saveToLocal, downloadJSON } from '../../utils/storage'
import exportPDF from '../../utils/exportPDF'

export default function SaveModal({ open = false, onClose = () => {} }) {
    const { state, dispatch } = useResume()
    const [loading, setLoading] = useState(false)

    if (!open) return null

    const handleSaveLocal = () => {
        saveToLocal(state)
        dispatch({ type: 'SET_LAST_SAVED_AT', payload: new Date().toISOString() })
        onClose()
    }

    const handleDownloadJson = () => {
        downloadJSON(state, `resume_${state.personal.firstName || 'me'}.json`)
    }

    const handleDownloadPdf = async () => {
        setLoading(true)
        try {
        await exportPDF('resume-preview', `resume_${state.personal.firstName || 'me'}.pdf`)
        } catch (err) {
        console.error(err)
        } finally {
        setLoading(false)
        onClose()
        }
    }

    return (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow p-6 w-[480px]">
            <h3 className="text-lg font-semibold mb-4">Сохранить резюме</h3>

            <div className="space-y-3">
            <button onClick={handleSaveLocal} className="w-full px-4 py-2 bg-indigo-600 text-white rounded">Сохранить черновик</button>
            <button onClick={handleDownloadJson} className="w-full px-4 py-2 border rounded">Скачать JSON</button>
            <button onClick={handleDownloadPdf} disabled={loading} className="w-full px-4 py-2 border rounded">
                {loading ? 'Генерируется PDF...' : 'Скачать PDF'}
            </button>

            <div className="pt-3 text-sm text-gray-500">
                Автосохранение работает автоматически при редактировании.
            </div>

            <div className="mt-3 flex justify-end">
                <button onClick={onClose} className="px-3 py-2 text-sm text-gray-600">Отмена</button>
            </div>
            </div>
        </div>
        </div>
    )
}
