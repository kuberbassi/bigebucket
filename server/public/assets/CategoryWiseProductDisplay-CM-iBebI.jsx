import React, { useEffect, useRef, useState } from 'react'
import { Link, } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'

const CategoryWiseProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef()
    const subCategoryData = useSelector(state => state.product.allSubCategory)
    const loadingCardNumber = new Array(6).fill(null)

    const getId = (v) => {
        if (!v && v !== 0) return null
        if (typeof v === 'string') return v
        if (typeof v === 'number') return String(v)
        if (v._id) return v._id
        if (v.$oid) return v.$oid
        if (v.toString && typeof v.toString === 'function') return v.toString()
        return null
    }

    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProductByCategory,
                data: {
                    id: id
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                setData(responseData.data)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategoryWiseProduct()
    }, [])

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200
    }

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200
    }

    const handleRedirectProductListpage = () => {
        const subcategory = subCategoryData.find(sub => {
            return Array.isArray(sub.category) && sub.category.some(c => getId(c) === getId(id))
        })
        const url = `/${valideURLConvert(name)}-${getId(id)}/${valideURLConvert(subcategory?.name)}-${getId(subcategory?._id)}`

        return url
    }

    const redirectURL = handleRedirectProductListpage()

    return (
        <div className="mb-8">
            <div className='container mx-auto px-4 flex items-center justify-between gap-4 mb-4'>
                <h3 className='font-bold text-xl md:text-2xl text-gray-800'>{name}</h3>
                <Link to={redirectURL} className='text-green-600 hover:text-green-700 font-semibold transition-colors'>See All</Link>
            </div>
            <div className='relative flex items-center group/row'>
                <div className='flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-auto scrollbar-none scroll-smooth py-4' ref={containerRef}>
                    {loading &&
                        loadingCardNumber.map((_, index) => {
                            return (
                                <CardLoading key={"CategorywiseProductDisplay123" + index} />
                            )
                        })
                    }

                    {
                        data.map((p, index) => {
                            return (
                                <div key={p._id + "CategorywiseProductDisplay" + index} className="flex-none">
                                    <CardProduct data={p} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className='w-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between pointer-events-none'>
                    <button onClick={handleScrollLeft} className='pointer-events-auto z-10 bg-white hover:bg-gray-100 shadow-lg text-lg p-3 rounded-full opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 -ml-4'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleScrollRight} className='pointer-events-auto z-10 bg-white hover:bg-gray-100 shadow-lg p-3 text-lg rounded-full opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 -mr-4'>
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryWiseProductDisplay
