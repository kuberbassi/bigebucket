import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import imageEmpty from '../assets/empty_cart.webp'
import toast from 'react-hot-toast'
import { normalizeImageArray } from '../utils/normalizeImageUrl'

const DisplayCartItem = ({close}) => {
    const { notDiscountTotalPrice, totalPrice ,totalQty} = useGlobalContext()
    // Delivery / handling config (keep in sync with CheckoutPage)
    const DELIVERY_FREE_THRESHOLD = 500 // rupees
    const DELIVERY_FEE = 30 // rupees
    const HANDLING_PERCENT = 2 // percent

    const deliveryCharge = Number(totalPrice) >= DELIVERY_FREE_THRESHOLD ? 0 : DELIVERY_FEE
    const handlingCharge = Math.ceil((Number(totalPrice) * HANDLING_PERCENT) / 100)
    const finalTotal = Number(totalPrice) + Number(deliveryCharge) + Number(handlingCharge)
    const cartItem  = useSelector(state => state.cartItem.cart || [])
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const location = useLocation()

    const redirectToCheckoutPage = ()=>{
        if(user?._id){
            navigate("/checkout")
            if(close){
                close()
            }
            return
        }
        // redirect to login page and preserve the intended next route
        navigate('/login', { state: { from: location.pathname || '/' } })
        toast("Please Login to continue")
    }
  return (
    <section className='bg-neutral-900 fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 z-50'>
        <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
            <div className='flex items-center p-4 shadow-md gap-3 justify-between'>
                <h2 className='font-semibold'>Cart</h2>
                <Link to={"/"} className='lg:hidden'>
                    <IoClose size={25}/>
                </Link>
                <button onClick={close} className='hidden lg:block'>
                    <IoClose size={25}/>
                </button>
            </div>

            <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4'>
                {/***display items */}
                {
                    cartItem[0] ? (
                        <>
                            <div className='flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full'>
                                    <p>Your total savings</p>
                                    <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice )}</p>
                            </div>
                            <div className='bg-white rounded-lg p-4 grid gap-5 overflow-auto'>
                                    {
                                        cartItem.length > 0 ? (
                                            cartItem.map((item,index)=>{
                                                // productId should be populated by the backend (see server controller .populate('productId'))
                                                const product = item?.productId || {}
                                                if(!product || !product._id){
                                                    console.warn('DisplayCartItem: cart item productId not populated', item)
                                                }
                                                const rawImage = product?.image
                                                const normalizedSrc = (normalizeImageArray(rawImage)[0] || '')
                                                return(
                                                    <div key={(item?._id || index) + "_cartItemDisplay"} className='flex  w-full gap-4'>
                                                        <div className='w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded overflow-hidden flex items-center justify-center'>
                                                            <img
                                                                src={(normalizedSrc || imageEmpty)}
                                                                alt={product?.name || 'product image'}
                                                                className='w-full h-full object-contain'
                                                                onError={(e) => { e.currentTarget.src = imageEmpty; e.currentTarget.onerror = null }}
                                                                loading="lazy"
                                                            />
                                                        </div>
                                                        <div className='w-full max-w-sm text-xs'>
                                                            <p className='text-xs text-ellipsis line-clamp-2'>{product?.name || 'Unknown product'}</p>
                                                            <p className='text-neutral-400'>{product?.unit || ''}</p>
                                                            <p className='font-semibold'>{DisplayPriceInRupees(pricewithDiscount(Number(product?.price) || 0, Number(product?.discount) || 0))}</p>
                                                        </div>
                                                        <div>
                                                            <AddToCartButton data={product}/>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        ) : null
                                    }
                            </div>
                            <div className='bg-white p-4'>
                                <h3 className='font-semibold'>Bill details</h3>
                                <div className='flex gap-4 justify-between ml-1'>
                                    <p>Items total</p>
                                    <p className='flex items-center gap-2'><span className='line-through text-neutral-400'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span><span>{DisplayPriceInRupees(totalPrice)}</span></p>
                                </div>
                                <div className='flex gap-4 justify-between ml-1'>
                                    <p>Quantity total</p>
                                    <p className='flex items-center gap-2'>{totalQty} {totalQty === 1 ? 'item' : 'items'}</p>
                                </div>
                                <div className='flex gap-4 justify-between ml-1'>
                                    <p>Delivery Charge</p>
                                    <p className='flex items-center gap-2'>
                                        {deliveryCharge === 0 ? (
                                            <span>Free</span>
                                        ) : (
                                            <span>{DisplayPriceInRupees(deliveryCharge)}</span>
                                        )}
                                    </p>
                                </div>
                                <div className='flex gap-4 justify-between ml-1'>
                                    <p>Handling charge</p>
                                    <p className='flex items-center gap-2'>{DisplayPriceInRupees(handlingCharge)}</p>
                                </div>
                                <div className='font-semibold flex items-center justify-between gap-4'>
                                    <p >Grand total</p>
                                    <p>{DisplayPriceInRupees(finalTotal)}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='bg-white flex flex-col justify-center items-center'>
                            <img
                                src={imageEmpty}
                                className='w-full h-full object-scale-down' 
                            />
                            <Link onClick={close} to={"/"} className='block bg-green-600 px-4 py-2 text-white rounded'>Shop Now</Link>
                        </div>
                    )
                }
                
            </div>

            {
                cartItem[0] && (
                    <div className='p-2'>
                        <div className='bg-green-700 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between'>
                            <div>
                                {DisplayPriceInRupees(totalPrice)}
                            </div>
                            <button onClick={redirectToCheckoutPage} className='flex items-center gap-1'>
                                Proceed
                                <span><FaCaretRight/></span>
                            </button>
                        </div>
                    </div>
                )
            }
            
        </div>
    </section>
  )
}

export default DisplayCartItem
