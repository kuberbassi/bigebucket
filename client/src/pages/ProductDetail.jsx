import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddToCartButton from '../components/AddToCartButton'
import { useSelector } from 'react-redux'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import { useGlobalContext } from '../provider/GlobalProvider'

const ProductDetail = () => {
  const { state } = useLocation();
  const { product, quantity = 1 } = state || {};
  const cart = useSelector(state => state.cartItem.cart)
  const { updateCartItem, deleteCartItem, fetchCartItem } = useGlobalContext()

  // Local qty state mirrors the cart entry so price updates immediately on this page
  const cartEntry = Array.isArray(cart) ? cart.find(item => item?.productId?._id === product?._id) : null
  const [qty, setQty] = useState(cartEntry?.quantity || 0)

  useEffect(()=>{
    setQty(cartEntry?.quantity || 0)
  },[cartEntry])

  const unitPrice = pricewithDiscount(product?.price, product?.discount)
  const displayPrice = DisplayPriceInRupees(qty > 0 ? unitPrice * qty : unitPrice)

  if (!product) {
    return <div className="text-center mt-10">Product not found.</div>;
  }

  const handleIncrease = async (e) => {
    e?.preventDefault?.()
    e?.stopPropagation?.()
    // If there's no cart entry yet, reuse AddToCartButton by dispatching an add via fetchCartItem after calling the Add endpoint
    if(!cartEntry){
      // fall back to letting the shared AddToCartButton handle adding via UI — call fetch so the store updates
      // As a simple approach here, just call fetchCartItem after a small delay to pick up the server-side created item
      // (the Add button already exists in the page and user can click it) — but try updating UI optimistically
      setQty(prev => (prev && prev > 0) ? prev + 1 : 1)
      // poll for cart update
      if(fetchCartItem){
        fetchCartItem()
        setTimeout(()=>fetchCartItem(),300)
      }
      return
    }

    try{
      const res = await updateCartItem(cartEntry._id, (cartEntry.quantity || 0) + 1)
      if(res && res.success){
        setQty(prev => prev + 1)
        if(fetchCartItem) fetchCartItem()
      }
    }catch(err){
      console.error('detail increase error', err)
    }
  }

  const handleDecrease = async (e) => {
    e?.preventDefault?.()
    e?.stopPropagation?.()
    if(!cartEntry) return

    if(qty === 1){
      try{
        await deleteCartItem(cartEntry._id)
        setQty(0)
        if(fetchCartItem) fetchCartItem()
      }catch(err){
        console.error('detail delete error', err)
      }
      return
    }

    try{
      const res = await updateCartItem(cartEntry._id, Math.max(0, (cartEntry.quantity || 1) - 1))
      if(res && res.success){
        setQty(prev => Math.max(0, prev - 1))
        if(fetchCartItem) fetchCartItem()
      }
    }catch(err){
      console.error('detail decrease error', err)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center w-full max-w-4xl lg:flex-row gap-8">
        <div className='flex-1'>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-contain mb-4 rounded-xl border"
          />
        </div>
        <div className='flex-1'>
          <h2 className="font-bold text-3xl mb-2">{product.name}</h2>
          <div className="text-green-600 font-bold text-2xl mb-2">{displayPrice}</div>
          <div className="mb-4 text-gray-700">Quantity: <span className="font-semibold">{qty > 0 ? qty : 1}</span></div>
          <div className="mb-4 text-gray-600">{product.description || "No description available."}</div>

          {/* Inline controls: show AddToCartButton (shared) and also local +/− if item already in cart */}
          {qty > 0 ? (
            <div className='flex items-center gap-3'>
              <button onClick={handleDecrease} className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded'><span className='text-lg'>−</span></button>
              <div className='font-semibold'>{qty}</div>
              <button onClick={handleIncrease} className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded'><span className='text-lg'>+</span></button>
            </div>
          ) : (
            <AddToCartButton data={product} />
          )}

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
