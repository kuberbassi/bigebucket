import axios from "axios";
import SummaryApi from "../common/SummaryApi";
// Removed: import { baseURL } from "../common/SummaryApi";

// --- START: CHANGES APPLIED HERE ---
// 1. Remove the dynamic baseURL check.
// 2. Set baseURL to the relative path '/api'. 
//    This works because .htaccess redirects /api to the Node server on port 8080.
const Axios = axios.create({
    baseURL : '/api', 
    withCredentials : true
})

// --- START: DELETED CODE (loadRuntimeConfig and its logic) ---
/*
let runtimeConfigPromise = null
const loadRuntimeConfig = () => {
    if (runtimeConfigPromise) return runtimeConfigPromise
    runtimeConfigPromise = fetch('/runtime-config')
        .then(r => r.ok ? r.json() : null)
        .catch(() => null)
        .then(cfg => {
            if (cfg && cfg.apiBaseUrl !== undefined && cfg.apiBaseUrl !== null) {
                // empty string means same-origin relative requests
                Axios.defaults.baseURL = cfg.apiBaseUrl || ''
            }
            return cfg
        })
    return runtimeConfigPromise
}
*/
// --- END: DELETED CODE ---


//sending access token in the header
Axios.interceptors.request.use(
    async(config)=>{
        // DELETED: await loadRuntimeConfig() logic is no longer needed

        const accessToken = localStorage.getItem('accesstoken')
        if(accessToken){
            config.headers = config.headers || {}
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

// extend the life span of access token using refresh token
// NOTE: this is a response interceptor (was incorrectly attached as a request interceptor earlier)
Axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        try {
            const originRequest = error.config
            // some errors (network) may not have a response
            const status = error?.response?.status

            if (status === 401 && originRequest && !originRequest._retry) {
                originRequest._retry = true
                const refreshToken = localStorage.getItem('refreshToken')
                if (refreshToken) {
                    const newAccessToken = await refreshAccessToken(refreshToken)
                    if (newAccessToken) {
                        originRequest.headers = originRequest.headers || {}
                        originRequest.headers.Authorization = `Bearer ${newAccessToken}`
                        return Axios(originRequest)
                    }
                }
            }
        } catch (e) {
            console.error('Error in response interceptor:', e)
        }
        return Promise.reject(error)
    }
)


const refreshAccessToken = async (refreshToken) => {
    try {
        // use plain axios to avoid recursive interceptors
        // NOTE: If SummaryApi is using a base URL, this must be verified, but for now we trust the original logic.
        const axiosLib = await import('axios').then(m => m.default)
        const response = await axiosLib({
            url: SummaryApi.refreshToken.url,
            method: SummaryApi.refreshToken.method,
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        })

        const accessToken = response.data?.data?.accessToken
        if (accessToken) {
            localStorage.setItem('accesstoken', accessToken)
            return accessToken
        }
        return null
    } catch (error) {
        console.error('refreshAccessToken error', error)
        return null
    }
}

export default Axios