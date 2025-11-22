import React, { useState } from 'react'
import CreateToolbar from './CreateToolbar'
import EditorPanel from './editorPanelComponents/EditorPanel'
import PreviewPanel from './previewPanelComponents/PreviewPanel'
import SaveModal from './SaveModal'
import TemplatesSidebar from './previewPanelComponents/TemplatesSidebar'
import useAutosave from '../../hooks/useAutosave'

export default function CreatePage() {
    const [mode, setMode] = useState('edit')
    const [isSaveOpen, setSaveOpen] = useState(false)

    return (
        <CreateInner
            mode={mode}
            setMode={setMode}
            isSaveOpen={isSaveOpen}
            setSaveOpen={setSaveOpen}
        />
    )
}

function CreateInner({ mode, setMode, isSaveOpen, setSaveOpen }) {
    useAutosave()

    const sample = { personal: { firstName: 'Иван', lastName: 'Иванов', position: 'Frontend' } }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <CreateToolbar
            mode={mode}
            onModeChange={(m) => {
            setMode(m)
            }}
            onSave={() => setSaveOpen(true)}
        />

        <section className="pt-6 pb-12">
            {mode === 'template' ? (
            <div className="flex gap-6">
                <div className="w-3/4">
                <PreviewPanel expanded />
                </div>
                <TemplatesSidebar sample={sample} />
            </div>
            ) : (
            <div className="flex gap-6">
                <div className="w-full lg:w-1/2">
                <EditorPanel />
                </div>
                <div className="w-full lg:w-1/2">
                <PreviewPanel />
                </div>
            </div>
            )}
        </section>

        <SaveModal open={isSaveOpen} onClose={() => setSaveOpen(false)} />
        </div>
    )
}
