import uploadImageClodinary from "../utils/uploadImageClodinary.js"

const uploadImageController = async(request,response)=>{
    try {
        console.log('Upload request received:', {
            file: request.file ? '✓ present' : '✗ missing',
            contentType: request.file?.mimetype,
            size: request.file?.size
        })

        const file = request.file
        if (!file) {
            return response.status(400).json({
                message: 'No file uploaded',
                error: true,
                success: false
            })
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
        if (!allowedTypes.includes(file.mimetype)) {
            return response.status(400).json({
                message: 'Invalid file type. Please upload a JPEG, PNG, or WebP image.',
                error: true,
                success: false
            })
        }

        // Validate file size (10MB limit)
        const maxSize = 10 * 1024 * 1024 // 10MB
        if (file.size > maxSize) {
            return response.status(400).json({
                message: 'File too large. Maximum size is 10MB.',
                error: true,
                success: false
            })
        }

        const uploadImage = await uploadImageClodinary(file)
        console.log('Cloudinary upload successful:', uploadImage)

        const normalized = {
            url: uploadImage?.secure_url || uploadImage?.url || null,
            secure_url: uploadImage?.secure_url || uploadImage?.url || null,
            raw: uploadImage
        }

        if (!normalized.url) {
            console.error('Upload successful but no URL returned:', uploadImage)
            return response.status(500).json({
                message: 'Upload succeeded but no URL was returned',
                error: true,
                success: false
            })
        }

        return response.json({
            message: "Upload successful",
            data: normalized,
            success: true,
            error: false
        })
    } catch (error) {
        console.error('Upload failed:', error)
        return response.status(500).json({
            message: error.message || 'Upload failed',
            error: true,
            success: false
        })
    }
}

export default uploadImageController