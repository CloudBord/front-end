const defaults = {
    NEXT_PUBLIC_API_URL: 'localhost:7276'
}

const env = { ...defaults, ...process.env }

export default env;