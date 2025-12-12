import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import TemplateRenderer from '../../../components/templates/TemplateRenderer'

const SHEET_WIDTH = 794
const SHEET_HEIGHT = 1123

export default function IframePreview({ templateId, data = {}, meta = {} }) {
    const containerRef = useRef(null)
    const iframeRef = useRef(null)
    const rootRef = useRef(null)
    const [scale, setScale] = useState(1)

    useEffect(() => {
        const iframe = iframeRef.current
        if (!iframe) return

        const doc = iframe.contentDocument
        if (!doc) return

        doc.open()
        doc.write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"/></head><body style="margin:0;padding:0;background:transparent;"></body></html>')
        doc.close()

        const parentHead = document.head
        const iframeHead = doc.head

        Array.from(iframeHead.querySelectorAll('[data-clone]')).forEach(n => n.remove())

        Array.from(parentHead.querySelectorAll('link[rel="stylesheet"], style')).forEach(node => {
        try {
            let cloned
            if (node.tagName.toLowerCase() === 'link' && node.href) {
            cloned = doc.createElement('link')
            cloned.rel = 'stylesheet'
            cloned.href = node.href
            } else if (node.tagName.toLowerCase() === 'style') {
            cloned = doc.createElement('style')
            cloned.textContent = node.textContent
            } else {
            return
            }
            cloned.setAttribute('data-clone', 'true')
            iframeHead.appendChild(cloned)
        } catch (e) {
        }
        })

        const sheetRoot = doc.createElement('div')
        sheetRoot.id = 'sheet-root'
        sheetRoot.style.width = `${SHEET_WIDTH}px`
        sheetRoot.style.height = `${SHEET_HEIGHT}px`
        sheetRoot.style.boxSizing = 'border-box'
        sheetRoot.style.background = 'white'
        sheetRoot.style.overflow = 'hidden'
        sheetRoot.style.padding = '0'
        sheetRoot.style.margin = '0'
        doc.body.style.background = 'transparent'
        doc.body.appendChild(sheetRoot)

        try {
        if (!rootRef.current) {
            rootRef.current = createRoot(sheetRoot)
        }
        rootRef.current.render(<TemplateRenderer templateId={templateId} data={data} meta={meta} />)
        } catch (e) {
        console.error('IframePreview: mount error', e)
        }

        return () => {
        try {
            if (rootRef.current) {
            const savedRoot = rootRef.current
            setTimeout(() => {
                try { savedRoot.unmount() } catch (e) {}
            }, 0)
            rootRef.current = null
            }
        } catch (e) {
        }
        try { doc.body.innerHTML = '' } catch (e) {}
        }
    }, [iframeRef.current])

    useEffect(() => {
        if (!rootRef.current) return
        try {
        rootRef.current.render(<TemplateRenderer templateId={templateId} data={data} meta={meta} />)
        } catch (e) {
        }
    }, [templateId, data, meta])

    useEffect(() => {
        const cont = containerRef.current
        if (!cont) return

        let ro = null
        const compute = () => {
        const cw = cont.clientWidth
        const ch = cont.clientHeight || window.innerHeight - 200
        const sx = cw / SHEET_WIDTH
        const sy = ch / SHEET_HEIGHT
        const s = Math.min(sx, sy, 1)
        setScale(s)
        }

        compute()
        ro = new ResizeObserver(compute)
        ro.observe(cont)
        window.addEventListener('resize', compute)

        return () => {
        if (ro) ro.disconnect()
        window.removeEventListener('resize', compute)
        }
    }, [])

    const iframeStyle = {
        width: `${SHEET_WIDTH}px`,
        height: `${SHEET_HEIGHT}px`,
        border: '0',
        transformOrigin: 'top left',
        transform: `scale(${scale})`,
        display: 'block',
        boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
        background: 'transparent'
    }

    return (
        <div ref={containerRef} className="w-full flex items-start justify-center" style={{ minHeight: '400px' }}>
        <div style={{ width: `${SHEET_WIDTH * Math.min(scale, 1)}px`, height: `${SHEET_HEIGHT * Math.min(scale, 1)}px`, overflow: 'hidden' }}>
            <iframe
            ref={iframeRef}
            title="resume-preview-iframe"
            style={iframeStyle}
            sandbox="allow-same-origin allow-scripts"
            />
        </div>
        </div>
    )
}
