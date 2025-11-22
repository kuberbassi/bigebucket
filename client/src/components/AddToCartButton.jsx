import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import { store } from '../store/store'
import { handleAddItemCart, incrementItemQty, decrementItemQty, removeItemByProductId } from '../store/cartProduct'
import { FaMinus, FaPlus } from "react-icons/fa6";

const AddToCartButton = ({ data }) => {
    const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    const sameId = (a,b) => String(a) === String(b)
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    const [qty, setQty] = useState(0)
    const [cartItemDetails,setCartItemsDetails] = useState()
    const [isHover, setIsHover] = useState(false)

    const isGuest = !localStorage.getItem('accesstoken')

    const handleADDTocart = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        // Guest fallback: if no access token, operate on local Redux store so UI updates
        if (isGuest) {
            try {
                // optimistic local add
                store.dispatch(incrementItemQty(data._id))
                const current = store.getState().cartItem.cart || []
                const found = current.find(it => String(it?.productId?._id) === String(data._id))
                if (found) {
                    setCartItemsDetails(found)
                    setQty(found.quantity || 1)
                    setIsAvailableCart(true)
                } else {
                    // fallback if reducer didn't produce a full item
                    setQty(1)
                    setIsAvailableCart(true)
                }
                toast.success('Added to cart (local). Login to persist your cart.')
                return null
            } catch (err) {
                console.warn('local add to cart failed', err)
                AxiosToastError(err)
                return null
            }
        }

        try {
            setLoading(true)

            const response = await Axios({
                ...SummaryApi.addTocart,
                data: {
                    productId: data?._id
                }
            })

            const { data: responseData } = response
            console.debug('AddToCart response', responseData)

            if (responseData.success) {
                toast.success(responseData.message)
                // Optimistic update: if API returned the created cart item, use it
                if (responseData.data) {
                    setCartItemsDetails(responseData.data)
                    setQty(responseData.data.quantity || 1)
                    setIsAvailableCart(true)
                    // optimistic add: if the server returned a full cart item, dispatch a replace of the cart
                    try{
                        const current = store.getState().cartItem.cart || []
                        const added = [...current, responseData.data]
                        store.dispatch(handleAddItemCart(added))
                    }catch(e){ console.warn('optimistic add to cart failed', e) }
                } else {
                    // fallback: assume qty becomes at least 1
                    setQty(prev => (prev && prev > 0) ? prev + 1 : 1)
                    setIsAvailableCart(true)
                }
                // refresh global cart in background and poll store for created cart item
                if (fetchCartItem) {
                    fetchCartItem()
                    // poll the store directly to obtain the new cart item _id (avoids stale closure)
                    const waitForCartItem = async () => {
                        for (let i = 0; i < 12; i++) {
                            const s = store.getState().cartItem.cart || []
                            console.debug('poll cart attempt', i, s.length)
                            const found = s.find(it => it?.productId?._id === data._id)
                            if (found) {
                                setCartItemsDetails(found)
                                setQty(found.quantity || 1)
                                setIsAvailableCart(true)
                                return found
                            }
                            // wait 150ms then retry
                            await new Promise(r => setTimeout(r, 150))
                        }
                        return null
                    }
                    void waitForCartItem()
                }
                // return the created cart item if any for callers that want immediate sync
                return responseData.data || null
            }
        } catch (error) {
            // If unauthorized, fallback to local cart so UI still works
            const status = error?.response?.status
            if (status === 401) {
                try {
                    store.dispatch(incrementItemQty(data._id))
                    const current = store.getState().cartItem.cart || []
                    const found = current.find(it => String(it?.productId?._id) === String(data._id))
                    if (found) {
                        setCartItemsDetails(found)
                        setQty(found.quantity || 1)
                        setIsAvailableCart(true)
                    } else {
                        setQty(1)
                        setIsAvailableCart(true)
                    }
                    toast.success('Added to cart (local). Login to persist your cart.')
                    return null
                } catch (err) {
                    console.warn('local add fallback failed', err)
                }
            }
            AxiosToastError(error)
            return null
        } finally {
            setLoading(false)
        }

    }

    //checking this item in cart or not
    useEffect(() => {
        if (!data?._id || !cartItem) return;

        const checkingitem = cartItem.some(item => item?.productId?._id === data._id)
        setIsAvailableCart(checkingitem)

        const product = cartItem.find(item => item?.productId?._id === data._id)
        setQty(product?.quantity || 0)
        setCartItemsDetails(product)
    }, [data, cartItem])


    const increaseQty = async(e) => {
        e.preventDefault()
        e.stopPropagation()
       // If we don't yet have cartItemDetails, call add-to-cart endpoint which typically increments quantity
       if(!cartItemDetails?._id){
           // For guests, just local add
           if (isGuest) {
               try {
                   store.dispatch(incrementItemQty(data._id))
                   const current = store.getState().cartItem.cart || []
                   const found = current.find(it => String(it?.productId?._id) === String(data._id))
                   if(found){
                       setCartItemsDetails(found)
                       setQty(found.quantity || 1)
                       setIsAvailableCart(true)
                   } else {
                       setQty(1)
                       setIsAvailableCart(true)
                   }
                   return
               } catch (err) {
                   console.warn('guest increase failed', err)
               }
           }

           console.debug('increaseQty: missing cartItemDetails._id, calling add-to-cart as fallback')
           await handleADDTocart(e)
           // optimistic increment
           setQty(prev => (prev && prev > 0) ? prev + 1 : 1)
           setIsAvailableCart(true)
           // Dispatch optimistic increment by product id
           try{
               store.dispatch(incrementItemQty(data._id))
               const current = store.getState().cartItem.cart || []
               const found = current.find(it => String(it?.productId?._id) === String(data._id))
               if(found){
                   setCartItemsDetails(found)
                   setQty(found.quantity || 1)
               }
           }catch(e){console.warn('sync after add failed', e)}
           return
       }

       // Optimistic update immediately
       const prevQty = qty
       setQty(prev => prev + 1)
       setCartItemsDetails(prev => prev ? {...prev, quantity: (prev.quantity || 0) + 1} : prev)
       try{
           store.dispatch(incrementItemQty(data._id))
       }catch(e){ console.warn('optimistic cart update failed', e) }

       // Attempt server update; rollback on failure
       try {
           const response = await updateCartItem(cartItemDetails._id, prevQty + 1)
           console.debug('updateCartItem response', response)
           if(response && response.success){
               toast.success("Item added")
               if (fetchCartItem) fetchCartItem()
               return
           }
           // if response not successful, rollback
           throw new Error(response?.message || 'Update failed')
       } catch (err) {
           console.error('increaseQty error', err)
           // If unauthorized, apply local fallback
           const status = err?.response?.status
           if (status === 401) {
               toast('Added to cart (local). Login to persist your cart.')
               return
           }
           // rollback UI + redux
           setQty(prev => Math.max(0, prev - 1))
           setCartItemsDetails(prev => prev ? {...prev, quantity: Math.max(0, (prev.quantity || 1) - 1)} : prev)
           try{
               store.dispatch(decrementItemQty(data._id))
           }catch(e){console.warn('rollback dispatch failed', e)}
           AxiosToastError(err)
       }
    }

    const decreaseQty = async(e) => {
        e.preventDefault()
        e.stopPropagation()
        if(!cartItemDetails?._id){
            // If there's no server-side cart id, try local/store fallback so guests can decrement
            if (isGuest) {
                try {
                    if ((qty || 0) <= 1) {
                        // remove locally
                        store.dispatch(removeItemByProductId(data._id))
                        setQty(0)
                        setIsAvailableCart(false)
                        setCartItemsDetails(null)
                        toast('Removed from local cart')
                        return
                    } else {
                        // decrement locally
                        store.dispatch(decrementItemQty(data._id))
                        const current = store.getState().cartItem.cart || []
                        const found = current.find(it => String(it?.productId?._id) === String(data._id))
                        if (found) {
                            setCartItemsDetails(found)
                            setQty(found.quantity || 0)
                            setIsAvailableCart(true)
                        }
                        toast('Cart updated locally')
                        return
                    }
                } catch (err) {
                    console.warn('local decrement failed', err)
                }
            }
            // nothing to decrease for server-backed item
            setIsHover(false)
            return
        }

        if(qty === 1){
            try {
                // guest/local fallback: remove from local store
                if (isGuest) {
                    store.dispatch(removeItemByProductId(data._id))
                    setQty(0)
                    setIsAvailableCart(false)
                    setCartItemsDetails(null)
                    toast('Removed from local cart')
                    return
                }

                const res = await deleteCartItem(cartItemDetails._id)
                console.debug('deleteCartItem response', res)
                // deleteCartItem triggers global fetch; optimistically update
                setQty(0)
                setIsAvailableCart(false)
                setCartItemsDetails(null)
                // ensure redux store removes this item so price and counters update
                try{
                    store.dispatch(removeItemByProductId(data._id))
                }catch(e){console.warn('optimistic remove failed', e)}
                if (fetchCartItem) fetchCartItem()
            } catch (err) {
                const status = err?.response?.status
                if (status === 401) {
                    // fallback to local remove
                    try{
                        store.dispatch(removeItemByProductId(data._id))
                        setQty(0)
                        setIsAvailableCart(false)
                        setCartItemsDetails(null)
                        toast('Removed from local cart')
                        return
                    }catch(e){console.warn('local remove fallback failed', e)}
                }
                console.error('deleteCartItem error', err)
            }
        }else{
            try {
                // Optimistic decrement
                const prevQty = qty
                setQty(prev => Math.max(0, prev - 1))
                setCartItemsDetails(prev => prev ? {...prev, quantity: Math.max(0, (prev.quantity || 1) - 1)} : prev)
                try{
                    store.dispatch(decrementItemQty(data._id))
                }catch(e){ console.warn('optimistic cart update failed', e) }

                const response = await updateCartItem(cartItemDetails._id, Math.max(1, prevQty - 1))
                console.debug('updateCartItem response', response)
                if(response && response.success){
                    // reflect removal if necessary after server confirms
                    const after = store.getState().cartItem.cart || []
                    if(!after.find(it => String(it?.productId?._id) === String(data._id))){
                        setQty(0)
                        setIsAvailableCart(false)
                        setCartItemsDetails(null)
                    }
                    toast.success("Item removed")
                    if (fetchCartItem) fetchCartItem()
                    return
                }
                // rollback on failure
                throw new Error(response?.message || 'Update failed')
            } catch (err) {
                console.error('decreaseQty error', err)
                // If unauthorized, inform user and leave local state as-is
                const status = err?.response?.status
                if (status === 401) {
                    toast('Cart updated locally. Login to persist changes.')
                    return
                }
                // rollback: restore previous qty
                setQty(prev => prev + 1)
                setCartItemsDetails(prev => prev ? {...prev, quantity: (prev.quantity || 0) + 1} : prev)
                try{
                    store.dispatch(incrementItemQty(data._id))
                }catch(e){console.warn('rollback dispatch failed', e)}
                AxiosToastError(err)
            }
        }
    }
    // Handlers for hover-mode (+/- visible when not in cart)
    const handleMouseEnter = () => setIsHover(true)
    const handleMouseLeave = () => setIsHover(false)

    // When item not in cart and hovered, show compact control. Clicking + will add the item.
    const handleHoverDecrease = (e) => {
        e.preventDefault(); e.stopPropagation();
        // Not in cart -> cannot decrease; hide hover UI
        setIsHover(false)
    }

    const handleHoverIncrease = async (e) => {
        // Add item and transition to in-cart controls
        const created = await handleADDTocart(e)
        // If API returned the created item, use it immediately to show the full control and update qty
        if (created) {
            setCartItemsDetails(created)
            setQty(created.quantity || 1)
            setIsAvailableCart(true)
            // ensure redux store already contains the created item (handleADDTocart should have added it),
            // but try to sync just in case
            try{
                const current = store.getState().cartItem.cart || []
                const found = current.find(it => it?.productId?._id === data._id)
                if(!found){
                    store.dispatch(handleAddItemCart([...current, created]))
                }
            }catch(e){console.warn('post-add sync failed', e)}
            // hide hover and let the normal in-cart control render
            setIsHover(false)
            return
        }

        // Fallback: if we didn't get the created item, poll the store as before
        setIsHover(false)
        if (fetchCartItem) {
            fetchCartItem()
            const waitForCartItem = async () => {
                for (let i = 0; i < 12; i++) {
                    const s = store.getState().cartItem.cart || []
                    const found = s.find(it => it?.productId?._id === data._id)
                    if (found) {
                        setCartItemsDetails(found)
                        setQty(found.quantity || 1)
                        setIsAvailableCart(true)
                        return found
                    }
                    await new Promise(r => setTimeout(r, 150))
                }
                return null
            }
            void waitForCartItem()
        }
    }

    return (
        // prevent clicks inside this component from bubbling to parent link/card click handlers
        <div onClick={(e) => e.stopPropagation()} className='w-full max-w-[160px]'>
            {
                isAvailableCart ? (
                    <div className='flex w-full h-full overflow-hidden'>
                        <button onClick={decreaseQty} className='bg-green-600 hover:bg-green-700 active:bg-green-700 active:text-white text-white w-9 h-8 flex items-center justify-center rounded-l-md focus:outline-none focus:ring-0'><FaMinus /></button>

                        <div className='flex-1 flex items-center justify-center font-semibold px-2 py-1'>{qty}</div>

                        <button onClick={increaseQty} className='bg-green-600 hover:bg-green-700 active:bg-green-700 active:text-white text-white w-9 h-8 flex items-center justify-center rounded-r-md focus:outline-none focus:ring-0'><FaPlus /></button>
                    </div>
                ) : (
                    // Not in cart: show Add button normally, but show compact +/- on hover
                    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='inline-block'>
                        {!isHover ? (
                            <button onClick={handleADDTocart} className='add-to-cart-button uppercase tracking-wide border border-green-600 text-green-700 bg-transparent hover:bg-green-600 hover:text-white group-hover:bg-green-600 group-hover:text-white active:bg-green-700 active:text-white focus:outline-none focus:ring-0 px-4 h-9 min-w-[84px] rounded-md font-semibold flex items-center justify-center transition-colors duration-150 box-border'>
                                {loading ? <Loading /> : "Add"}
                            </button>
                        ) : (
                            <div className='add-to-cart-button inline-flex items-center bg-green-600 text-white rounded-md overflow-hidden select-none h-9 min-w-[84px]' onClick={e => e.stopPropagation()}>
                                <button onClick={handleHoverDecrease} className='w-9 h-9 text-white flex items-center justify-center hover:bg-green-700 bg-green-600 active:bg-green-700 active:text-white rounded-l-md transition-colors focus:outline-none focus:ring-0'><FaMinus /></button>
                                <div className='flex-1 flex items-center justify-center px-2 font-semibold text-white'>{qty && qty > 0 ? qty : 1}</div>
                                <button onClick={handleHoverIncrease} className='w-9 h-9 text-white flex items-center justify-center hover:bg-green-700 bg-green-600 active:bg-green-700 active:text-white rounded-r-md transition-colors focus:outline-none focus:ring-0'><FaPlus /></button>
                            </div>
                        )}
                    </div>
                )
            }

        </div>
    )
}

export default AddToCartButton
