const defaultConfig = {
    apiURL: import.meta.env.VITE_API_BASE_URL
}
export const appConfig = (window.appconfig || defaultConfig);