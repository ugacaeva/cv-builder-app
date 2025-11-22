const AUTO_KEY = 'resume_builder_v1_auto'
const SNAPSHOT_PREFIX = 'resume_builder_v1_snapshot_'

export function saveAuto(state) {
    try {
        localStorage.setItem(AUTO_KEY, JSON.stringify(state))
        console.log('[saveAuto] full state saved', new Date().toISOString())
    } catch (e) {
        console.error('saveAuto error', e)
    }
}

export function loadAuto() {
    try {
        const raw = localStorage.getItem(AUTO_KEY)
        if (!raw) return null
        const parsed = JSON.parse(raw)
        if (parsed && (parsed.meta || parsed.personal)) return parsed
        return parsed
    } catch (e) {
        console.error('loadAuto error', e)
        return null
    }
}

export function saveToLocal(state, name = null) {
    try {
        const id = Date.now()
        const key = `${SNAPSHOT_PREFIX}${id}`
        localStorage.setItem(key, JSON.stringify({ id, name, state }))
        return key
    } catch (e) {
        console.error('saveToLocal error', e)
    }
}

export function listSnapshots() {
    try {
        return Object.keys(localStorage)
        .filter(k => k.startsWith(SNAPSHOT_PREFIX))
        .map(k => {
            try { return JSON.parse(localStorage.getItem(k)) } catch { return null }
        })
        .filter(Boolean)
        .sort((a, b) => b.id - a.id)
    } catch (e) {
        console.error('listSnapshots error', e)
        return []
    }
}

export function downloadJSON(state, filename = 'resume.json') {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
}
