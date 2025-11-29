export const initialState = {
    meta: {
        template: 'A',
        themeColor: '#1f2937',
        fontFamily: 'Inter',
        fontScale: 1.0,
        fontSizePt: 11,
        lastSavedAt: null
    },
    personal: {
        firstName: '',
        middleName: '',
        lastName: '',
        position: '',
        photo: null,
        email: '',
        phone: '',
        location: '',
        desiredSalary: '',
        employment: '',
        dateOfBirth: '',
        gender: '',
        maritalStatus: ''
    },
    summary: '',
    languages: [],
    professionalSkills: [],
    experience: [],
    education: [],
    skills: []
}

export default function resumeReducer(state, action) {
    switch (action.type) {

        case 'UPDATE_PERSONAL':
        return { ...state, personal: { ...state.personal, [action.payload.field]: action.payload.value } }

        case 'SET_PHOTO':
        return { ...state, personal: { ...state.personal, photo: action.payload } }

        case 'UPDATE_SUMMARY':
        return { ...state, summary: action.payload }

        case 'SET_TEMPLATE':
        return { ...state, meta: { ...state.meta, template: action.payload } }

        case 'UPDATE_META':
        return { ...state, meta: { ...state.meta, ...action.payload } }

        case 'ADD_LANGUAGE': {
        const item = { id: Date.now().toString(), ...action.payload }
        return { ...state, languages: [...state.languages, item] }
        }
        case 'UPDATE_LANGUAGE': {
        return { ...state, languages: state.languages.map(l => l.id === action.payload.id ? { ...l, ...action.payload } : l) }
        }
        case 'REMOVE_LANGUAGE':
        return { ...state, languages: state.languages.filter(l => l.id !== action.payload) }

        case 'ADD_PROFESSIONAL_SKILL':
        return { ...state, professionalSkills: [...state.professionalSkills, action.payload] }
        case 'REMOVE_PROFESSIONAL_SKILL':
        return { ...state, professionalSkills: state.professionalSkills.filter(s => s !== action.payload) }
        case 'SET_PROFESSIONAL_SKILLS':
        return { ...state, professionalSkills: action.payload }

        case 'ADD_EXPERIENCE': {
        const item = { id: Date.now().toString(), ...action.payload }
        return { ...state, experience: [...state.experience, item] }
        }
        case 'UPDATE_EXPERIENCE':
        return { ...state, experience: state.experience.map(e => e.id === action.payload.id ? { ...e, ...action.payload } : e) }
        case 'REMOVE_EXPERIENCE':
        return { ...state, experience: state.experience.filter(e => e.id !== action.payload) }

        case 'ADD_EDUCATION': {
        const item = { id: Date.now().toString(), ...action.payload }
        return { ...state, education: [...state.education, item] }
        }
        case 'UPDATE_EDUCATION':
        return { ...state, education: state.education.map(ed => ed.id === action.payload.id ? { ...ed, ...action.payload } : ed) }
        case 'REMOVE_EDUCATION':
        return { ...state, education: state.education.filter(ed => ed.id !== action.payload) }

        case 'ADD_SKILL':
        return { ...state, skills: [...state.skills, action.payload] }
        case 'REMOVE_SKILL':
        return { ...state, skills: state.skills.filter(s => s !== action.payload) }
        case 'SET_SKILLS':
        return { ...state, skills: action.payload }

        case 'LOAD_STATE':
        return { ...initialState, ...action.payload }

        case 'SET_LAST_SAVED_AT':
        return { ...state, meta: { ...state.meta, lastSavedAt: action.payload } }

        case 'RESET':
        return { ...initialState }

        default:
        return state
    }
}
