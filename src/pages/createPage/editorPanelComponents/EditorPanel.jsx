import React from 'react'
import PersonalEditor from './PersonalEditor'
import LanguagesEditor from './LanguagesEditor'
import SkillsEditor from './SkillsEditor'
import ExperienceEditor from './ExperienceEditor'
import EducationEditor from './EducationEditor'
import SummaryEditor from './SummaryEditor'
import { useResume } from '../../../contexts/ResumeProvider'

export default function EditorPanel() {

    const { dispatch } = useResume()

    const handleReset = () => {
        const ok = window.confirm('Все данные будут удалены и восстановлены значения по умолчанию.\nСохраните черновик, чтобы не потерять данные')
        if (!ok) return
        dispatch({ type: 'RESET' })
        localStorage.removeItem('resume_builder_v1_auto')
    }

    return (
        <div className="bg-white rounded-lg shadow p-6 min-h-[70vh] overflow-auto">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Редактор</h2>
                <div>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-3 py-1 bg-red-50 text-red-600 border rounded text-sm hover:bg-red-100"
                    >
                        Очистить данные
                    </button>
                </div>
            </div>

            <section className="space-y-6">
                <PersonalEditor />

                <hr className="my-6" />
                <LanguagesEditor />

                <hr className="my-6" />
                <SkillsEditor />

                <hr className="my-6" />
                <ExperienceEditor />

                <hr className="my-6" />
                <EducationEditor />

                <hr className="my-6" />
                <SummaryEditor />
            </section>
        </div>
    )
}
