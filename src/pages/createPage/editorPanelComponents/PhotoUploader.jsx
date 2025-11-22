import React from 'react'
import { useResume } from '../../../contexts/ResumeProvider'

function resizeFile(file, maxWidth = 800, quality = 0.8) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        const reader = new FileReader()
        reader.onload = (e) => {
        img.onload = () => {
            const scale = Math.min(1, maxWidth / img.width)
            const canvas = document.createElement('canvas')
            canvas.width = img.width * scale
            canvas.height = img.height * scale
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            canvas.toBlob((blob) => {
            const r = new FileReader()
            r.onload = () => resolve(r.result)
            r.onerror = reject
            r.readAsDataURL(blob)
            }, 'image/jpeg', quality)
        }
        img.onerror = reject
        img.src = e.target.result
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

export default function PhotoUploader() {
    const { state, dispatch } = useResume()
    const photo = state.personal.photo

    const onFile = async (e) => {
        const f = e.target.files?.[0]
        if (!f) return
        try {
        const dataUrl = await resizeFile(f, 800, 0.8)
        dispatch({ type: 'SET_PHOTO', payload: dataUrl })
        } catch (err) {
        console.error('Ошибка при изменении размера', err)
        }
    }

    const removePhoto = () => {
        dispatch({ type: 'SET_PHOTO', payload: null })
    }

    return (
        <div>
        <label className="block text-sm font-medium text-gray-700">Фото</label>
        <div className="mt-2 flex items-center gap-3">
            {photo ? (
            <>
                <img src={photo} alt="photo" className="w-20 h-20 object-cover rounded" />
                <div className="flex flex-col">
                <button className="px-3 py-1 bg-red-50 text-red-600 rounded text-sm" onClick={removePhoto}>Удалить</button>
                </div>
            </>
            ) : (
            <div className="flex items-center gap-3">
                <label
                htmlFor="file-upload"
                className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded cursor-pointer text-sm"
                >
                Выбрать файл
                </label>
                <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={onFile}
                className="sr-only"
                />
                <span className="text-sm text-gray-500">Файл не выбран</span>
            </div>
            )}
        </div>
        </div>
    )
}
