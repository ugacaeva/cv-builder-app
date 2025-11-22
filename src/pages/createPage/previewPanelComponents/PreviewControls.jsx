import React from 'react'
import { useResume } from '../../../contexts/ResumeProvider'

const FONT_OPTIONS = ['Inter', 'Arial', 'Georgia']
const PALETTE = ['#111827', '#669f9fff', '#705a95ff', '#5f6f93ff', '#ad717eff', '#718c77ff']

export default function PreviewControls() {
    const { state, dispatch } = useResume()
    const { meta } = state

    const setColor = (c) => dispatch({ type: 'UPDATE_META', payload: { themeColor: c } })
    const setFont = (f) => dispatch({ type: 'UPDATE_META', payload: { fontFamily: f } })
    const setFontSize = (v) => dispatch({ type: 'UPDATE_META', payload: { fontSizePt: Number(v) } })

    return (
        <div className="flex items-center gap-4">
        <div>
            <div className="text-xs text-gray-500">Цвет шаблона</div>
            <div className="flex gap-2 mt-1">
            {PALETTE.map(c => (
                <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-6 h-6 rounded`}
                style={{ background: c, boxShadow: meta.themeColor === c ? '0 0 0 3px rgba(0,0,0,0.08)' : undefined }}
                aria-label={`Выбрать цвет ${c}`}
                />
            ))}
            </div>
        </div>

        <div>
            <div className="text-xs text-gray-500">Шрифт</div>
            <select
            className="mt-1 border rounded px-2 py-1 text-sm"
            value={meta.fontFamily}
            onChange={(e) => setFont(e.target.value)}
            >
            {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
        </div>

        <div>
            <div className="text-xs text-gray-500">Размер (pt)</div>
            <input
            type="number"
            min="8"
            max="20"
            step="1"
            value={meta.fontSizePt || 11}
            onChange={(e) => setFontSize(e.target.value)}
            className="mt-1 w-20 border rounded px-2 py-1 text-sm"
            />
        </div>
        </div>
    )
}
