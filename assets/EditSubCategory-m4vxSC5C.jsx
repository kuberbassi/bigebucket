import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import getUploadUrl from '../utils/getUploadUrl'

const EditSubCategory = ({close,data,fetchData}) => {
    const initial = {
        _id: data?._id || null,
        name: data?.name || '',
        image: Array.isArray(data?.image) ? data.image : (data?.image ? [data.image] : null),
        category: data?.category || []
    }
    const [subCategoryData,setSubCategoryData] = useState(initial)
    const [localPreview, setLocalPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const allCategory = useSelector(state => state.product.allCategory)


    const handleChange = (e)=>{
        const { name, value} = e.target 

        setSubCategoryData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleUploadSubCategoryImage = async(e) => {
        const file = e.target.files[0]
        if (!file) return

        try {
            setLoading(true)
            // Show preview immediately
            try {
                const preview = URL.createObjectURL(file)
                setLocalPreview(preview)
            } catch(e) {
                console.warn('Preview creation failed:', e)
            }

            const response = await uploadImage(file)
            console.debug('Upload response:', response?.data)
            
            const url = getUploadUrl(response)
            console.debug('Extracted URL:', url)
            
            if (url) {
                setSubCategoryData(prev => ({
                    ...prev,
                    image: [url]
                }))
                toast.success('Image uploaded successfully')
                if (localPreview) {
                    URL.revokeObjectURL(localPreview)
                    setLocalPreview(null)
                }
            } else {
                toast.error('Upload succeeded but URL was missing')
                console.error('Upload response missing URL:', response?.data)
            }
        } catch (err) {
            console.error('Upload failed:', err)
            toast.error(err.message || 'Image upload failed')
        } finally {
            setLoading(false)
        }
    }

    const handleRemoveCategorySelected = (categoryId)=>{
        const index = subCategoryData.category.findIndex(el => el._id === categoryId )
        subCategoryData.category.splice(index,1)
        setSubCategoryData((preve)=>{
            return{
                ...preve
            }
        })
    }

    const handleSubmitSubCategory = async(e) => {
        e.preventDefault()
        
        if (!subCategoryData.name || !subCategoryData.image || !subCategoryData.category[0]) {
            toast.error('Please fill all required fields')
            return
        }

        try {
            setSubmitting(true)
            console.debug('Submitting update with payload:', subCategoryData)
            
            const response = await Axios({
                ...SummaryApi.updateSubCategory,
                data: subCategoryData
            })

            const { data: responseData } = response
            console.debug('Update response:', responseData)

            if (responseData.success) {
                toast.success(responseData.message || 'Updated successfully')
                if (close) close()
                if (fetchData) fetchData()
            } else {
                toast.error(responseData.message || 'Update failed')
            }
        } catch (error) {
            console.error('Update failed:', error)
            AxiosToastError(error)
        } finally {
            setSubmitting(false)
        }
    }

  return (
    <section className='fixed top-0 right-0 bottom-0 left-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center p-4'>
        <div className='w-full max-w-5xl bg-white p-4 rounded'>
            <div className='flex items-center justify-between gap-3'>
                <h1 className='font-semibold'>Edit Sub Category</h1>
                <button onClick={close}>
                    <IoClose size={25}/>
                </button>
            </div>
            <form className='my-3 grid gap-3' onSubmit={handleSubmitSubCategory}>
                    <div className='grid gap-1'>
                        <label htmlFor='name'>Name</label>
                        <input 
                            id='name'
                            name='name'
                            value={subCategoryData.name}
                            onChange={handleChange}
                            className='p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded '
                        />
                    </div>
                    <div className='grid gap-1'>
                        <p>Image</p>
                        <div className='flex flex-col lg:flex-row items-center gap-3'>
                            <div className='border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center'>
                                {
                                    !(localPreview || (subCategoryData.image && (Array.isArray(subCategoryData.image) ? subCategoryData.image[0] : subCategoryData.image))) ? (
                                            <p className='text-sm text-neutral-400'>No Image</p>
                                        ) : (
                                            <img
                                                alt='subCategory'
                                                src={localPreview || (Array.isArray(subCategoryData.image) ? subCategoryData.image[0] : subCategoryData.image)}
                                                className='w-full h-full object-scale-down'
                                            />
                                        )
                                }
                            </div>
                            <label htmlFor='uploadSubCategoryImage'>
                                <div className='px-4 py-1 border border-primary-100 text-primary-200 rounded hover:bg-primary-200 hover:text-neutral-900 cursor-pointer  '>
                                    Upload Image
                                </div>
                                <input 
                                    type='file'
                                    id='uploadSubCategoryImage'
                                    className='hidden'
                                    onChange={handleUploadSubCategoryImage}
                                />
                            </label>
                            
                        </div>
                    </div>
                    <div className='grid gap-1'>
                        <label>Select Category</label>
                        <div className='border focus-within:border-primary-200 rounded'>
                            {/*display value**/}
                            <div className='flex flex-wrap gap-2'>
                                {
                                    subCategoryData.category.map((cat,index)=>{
                                        return(
                                            <p key={cat._id+"selectedValue"} className='bg-white shadow-md px-1 m-1 flex items-center gap-2'>
                                                {cat.name}
                                                <div className='cursor-pointer hover:text-red-600' onClick={()=>handleRemoveCategorySelected(cat._id)}>
                                                    <IoClose size={20}/>
                                                </div>
                                            </p>
                                        )
                                    })
                                }
                            </div>

                            {/*select category**/}
                            <select
                                className='w-full p-2 bg-transparent outline-none border'
                                onChange={(e)=>{
                                    const value = e.target.value
                                    const categoryDetails = allCategory.find(el => el._id == value)
                                    
                                    setSubCategoryData((preve)=>{
                                        return{
                                            ...preve,
                                            category : [...preve.category,categoryDetails]
                                        }
                                    })
                                }}
                            >
                                <option value={""}>Select Category</option>
                                {
                                    allCategory.map((category,index)=>{
                                        return(
                                            <option value={category?._id} key={category._id+"subcategory"}>{category?.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || submitting || !subCategoryData?.name || !subCategoryData?.image || !subCategoryData?.category[0]}
                        className={`px-4 py-2 border font-semibold
                            ${loading || submitting ? 'bg-gray-200 cursor-not-allowed' :
                            subCategoryData?.name && subCategoryData?.image && subCategoryData?.category[0] 
                                ? "bg-primary-200 hover:bg-primary-100" 
                                : "bg-gray-200 cursor-not-allowed"}`}
                    >
                        {loading ? 'Uploading...' : submitting ? 'Saving...' : 'Submit'}
                    </button>
                    
            </form>
        </div>
    </section>
  )
}

export default EditSubCategory

