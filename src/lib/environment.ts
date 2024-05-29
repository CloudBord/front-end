const defaults = {
    NEXT_PUBLIC_API_URL: 'http://localhost:7276/api'
}

const env = { ...defaults, ...process.env }

export default env;