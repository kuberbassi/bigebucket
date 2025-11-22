import Axios from "./Axios"
import SummaryApi from "../common/SummaryApi"

const fetchUserDetails = async()=>{
    try {
        const response = await Axios({
            ...SummaryApi.userDetails
        })
        // Always return the axios response data shape so callers can safely
        // access `.data` and `.success`. If response is missing, return
        // a safe default.
        return response?.data || { success: false, data: null }
    } catch (error) {
        console.error('fetchUserDetails error', error && (error.message || error))
        return { success: false, data: null }
    }
}

export default fetchUserDetails