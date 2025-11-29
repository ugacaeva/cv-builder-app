import React from 'react'

export default function CreateToolbar({ mode, onModeChange, onSave }) {
    return (
        <div className="fixed top-16 left-0 right-0 bg-white z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-12 flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <button
                    className={`px-4 py-1 rounded-md text-sm font-medium ${mode === 'edit' ? 'bg-indigo-600 text-white' : 'text-indigo-600 border border-indigo-600'}`}
                    onClick={() => onModeChange('edit')}
                    >
                    РЕДАКТИРОВАТЬ
                    </button>

                    <button
                    className={`px-4 py-1 rounded-md text-sm font-medium ${mode === 'template' ? 'bg-indigo-600 text-white' : 'text-gray-700'}`}
                    onClick={() => onModeChange('template')}
                    >
                    ИЗМЕНИТЬ ШАБЛОН
                    </button>

                    <button
                    className="px-4 py-1 rounded-md text-sm font-medium text-gray-700 border border-gray-200"
                    onClick={() => onSave()}
                    >
                    СОХРАНИТЬ
                    </button>
                </div>
            </div>
        </div>
        </div>
    )
}
