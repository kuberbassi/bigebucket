import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import getUploadUrl from '../utils/getUploadUrl'
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError';

const EditCategory = ({close, fetchData,data : CategoryData}) => {
    // defensive defaults in case CategoryData is not provided immediately
    const initial = {
        _id: CategoryData?._id || null,
        name: CategoryData?.name || '',
        // image can be string or array in other components; normalize to array
        image: Array.isArray(CategoryData?.image) ? CategoryData.image : (CategoryData?.image ? [CategoryData.image] : null)
    }

    const [data,setData] = useState(initial)
    const [loading,setLoading] = useState(false)
    const [localPreview, setLocalPreview] = useState(null)

    const handleOnChange = (e)=>{
        const { name, value} = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()


        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateCategory,
                data : data
            })
            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                close()
                fetchData()
            }
        } catch (error) {
            AxiosToastError(error)
        }finally{
            setLoading(false)
        }
    }
    const handleUploadCategoryImage = async(e)=>{
        const file = e.target.files[0]

        if(!file){
            return
        }
        setLoading(true)
        // show immediate local preview while upload is in progress
        try{
            const preview = URL.createObjectURL(file)
            setLocalPreview(preview)
        }catch(e){ console.warn('preview creation failed', e) }

        try{
            const response = await uploadImage(file)
            setLoading(false)

            // log response for debugging
            console.debug('uploadImage response', response)

            const url = getUploadUrl(response)
            console.debug('extracted upload url', url)
            if(url){
                setData((preve)=>({ ...preve, image: [url] }))
                toast.success('Image uploaded')
                // revoke local preview to free memory
                if(localPreview) { try{ URL.revokeObjectURL(localPreview) }catch(e){} setLocalPreview(null) }
            } else {
                // keep local preview but notify user
                toast.error('Upload succeeded but server returned unexpected response')
            }
        }catch(err){
            setLoading(false)
            console.error('upload failed', err)
            toast.error('Image upload failed')
            // keep local preview so user sees selected file
        }
    }
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
    <div className='bg-white max-w-4xl w-full p-4 rounded'>
        <div className='flex items-center justify-between'>
            <h1 className='font-semibold'>Update Category</h1>
            <button onClick={close} className='w-fit block ml-auto'>
                <IoClose size={25}/>
            </button>
        </div>
        <form className='my-3 grid gap-2' onSubmit={handleSubmit}>
            <div className='grid gap-1'>
                <label id='categoryName'>Name</label>
                <input
                    type='text'
                    id='categoryName'
                    placeholder='Enter category name'
                    value={data.name}
                    name='name'
                    onChange={handleOnChange}
                    className='bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded'
                />
            </div>
            <div className='grid gap-1'>
                <p>Image</p>
                <div className='flex gap-4 flex-col lg:flex-row items-center'>
                    <div className='border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded'>
                        {
                            // prefer local preview while uploading, otherwise show stored image
                            (localPreview || (data.image && (Array.isArray(data.image) ? data.image[0] : data.image))) ? (
                                <img
                                    alt='category'
                                    src={localPreview || (Array.isArray(data.image) ? data.image[0] : data.image)}
                                    className='w-full h-full object-scale-down'
                                />
                            ) : (
                                <p className='text-sm text-neutral-500'>No Image</p>
                            )
                        }
                        
                    </div>
                    <label htmlFor='uploadCategoryImage'>
                        <div  className={`
                        ${!data.name ? "bg-gray-300" : "border-primary-200 hover:bg-primary-100" }  
                            px-4 py-2 rounded cursor-pointer border font-medium
                        `}>
                            {
                                loading ? "Loading..." : "Upload Image"
                            }
                           
                        </div>

                        <input disabled={!data.name} onChange={handleUploadCategoryImage} type='file' id='uploadCategoryImage' className='hidden'/>
                    </label>
                    
                </div>
            </div>

            <button
                className={`
                ${data.name && data.image ? "bg-primary-200 hover:bg-primary-100" : "bg-gray-300 "}
                py-2    
                font-semibold 
                `}
            >Update Category</button>
        </form>
    </div>
    </section>
  )
}

export default EditCategory
