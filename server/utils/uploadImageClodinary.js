import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET_KEY
})

const uploadImageClodinary = async(image)=>{
    if (!image) {
        throw new Error('No image file provided')
    }

    try {
        console.log('Cloudinary config:', {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY ? '✓ present' : '✗ missing',
            api_secret: process.env.CLOUDINARY_API_SECRET_KEY ? '✓ present' : '✗ missing'
        })

        const buffer = image?.buffer || Buffer.from(await image.arrayBuffer())

        const uploadImage = await new Promise((resolve,reject)=>{
            const uploadStream = cloudinary.uploader.upload_stream(
                { 
                    folder: "binkeyit",
                    resource_type: "auto"
                },
                (error,uploadResult)=>{
                    if(error){
                        console.error('Cloudinary upload error:', error)
                        return reject(error)
                    }
                    console.log('Cloudinary upload success:', {
                        public_id: uploadResult.public_id,
                        url: uploadResult.url,
                        secure_url: uploadResult.secure_url
                    })
                    return resolve(uploadResult)
                }
            )

            uploadStream.end(buffer)
        })

        return uploadImage
    } catch (error) {
        console.error('Cloudinary upload failed:', error)
        throw error
    }
}

export default uploadImageClodinary
