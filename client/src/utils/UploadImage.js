import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'

const uploadImage = async(image) => {
    const formData = new FormData()
    formData.append('image', image)

    const response = await Axios({
        ...SummaryApi.uploadImage,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    if (!response.data?.success) {
        throw new Error(response.data?.message || 'Upload failed')
    }

    return response
}

export default uploadImage