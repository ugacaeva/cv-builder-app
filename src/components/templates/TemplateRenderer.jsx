import React from 'react'
import TemplateA from './TemplateA'
import TemplateB from './TemplateB'
import TemplateC from './TemplateC'

export default function TemplateRenderer({ templateId = 'A', data = {}, meta = {} }) {
    const props = { data, meta }
    switch (templateId) {
        case 'B': return <TemplateB {...props} />
        case 'C': return <TemplateC {...props} />
        case 'A':
        default:
        return <TemplateA {...props} />
    }
}
