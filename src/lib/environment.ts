const defaults = {
    API_URL: process.env.API_URL
}

const env = { ...defaults, ...process.env }

export default env;
