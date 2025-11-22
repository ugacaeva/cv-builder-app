import React from 'react'
import PersonalEditor from './PersonalEditor'
import LanguagesEditor from './LanguagesEditor'
import SkillsEditor from './SkillsEditor'
import ExperienceEditor from './ExperienceEditor'
import EducationEditor from './EducationEditor'
import SummaryEditor from './SummaryEditor'

export default function EditorPanel() {
    return (
        <div className="bg-white rounded-lg shadow p-6 min-h-[70vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Редактор</h2>

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
