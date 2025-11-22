import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'

export default async function exportPDF(
    elementIdOrNode,
    filename = 'resume.pdf',
    opts = {}
) {
    const { scale = 2, marginPt = 16, quality = 1.0 } = opts

    const element =
        typeof elementIdOrNode === 'string'
        ? document.getElementById(elementIdOrNode)
        : elementIdOrNode
    if (!element) throw new Error('Element not found for exportPDF')

    if (document.fonts && document.fonts.ready) await document.fonts.ready

    const pdf = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait' })
    const pageW = pdf.internal.pageSize.getWidth()
    const pageH = pdf.internal.pageSize.getHeight()
    const maxContentWidth = pageW - marginPt * 2
    const availablePageHeight = pageH - marginPt * 2

    const rect = element.getBoundingClientRect()
    const cssWidth = Math.round(rect.width)
    const cssHeight = Math.round(rect.height)

    const canvas = await html2canvas(element, {
        scale,
        useCORS: true,
        allowTaint: false,
        logging: false,
        letterRendering: true
    })

    const cssPxToPt = px => (px * 72) / 96
    let imgWidthPt = cssPxToPt(cssWidth)
    let imgHeightPt = cssPxToPt(cssHeight)

    const fitScale = imgWidthPt > maxContentWidth ? maxContentWidth / imgWidthPt : 1
    imgWidthPt *= fitScale
    imgHeightPt *= fitScale

    const imgData = canvas.toDataURL('image/jpeg', Math.min(Math.max(quality, 0.1), 1))

    if (imgHeightPt <= availablePageHeight) {
        const x = (pageW - imgWidthPt) / 2
        const y = marginPt
        pdf.addImage(imgData, 'JPEG', x, y, imgWidthPt, imgHeightPt)
        pdf.save(filename)
        return
    }

    const pxPerPt = canvas.width / (cssPxToPt(cssWidth) * fitScale)
    const pageHeightPx = Math.floor(availablePageHeight * pxPerPt)

    let posY = 0
    let pageIndex = 0
    while (posY < canvas.height) {
        const sliceH = Math.min(pageHeightPx, canvas.height - posY)
        const canvasPage = document.createElement('canvas')
        canvasPage.width = canvas.width
        canvasPage.height = sliceH
        const ctx = canvasPage.getContext('2d')
        ctx.drawImage(canvas, 0, posY, canvas.width, sliceH, 0, 0, canvas.width, sliceH)

        const pageImg = canvasPage.toDataURL('image/jpeg', Math.min(Math.max(quality, 0.1), 1))

        const sliceHpt = sliceH / pxPerPt
        const x = (pageW - imgWidthPt) / 2
        const y = marginPt

        if (pageIndex > 0) pdf.addPage()
        pdf.addImage(pageImg, 'JPEG', x, y, imgWidthPt, sliceHpt)

        posY += sliceH
        pageIndex += 1
    }

    pdf.save(filename)
}
