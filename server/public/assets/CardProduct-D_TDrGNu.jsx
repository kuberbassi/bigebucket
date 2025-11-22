import React from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { useNavigate } from 'react-router-dom'
import { valideURLConvert } from '../utils/valideURLConvert'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from './AddToCartButton'
import { normalizeImageArray } from '../utils/normalizeImageUrl'
import { useSelector } from 'react-redux'

const CardProduct = ({ data }) => {
  const navigate = useNavigate()
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`

  const normalizedImages = normalizeImageArray(data.image)
  const imageSrc = Array.isArray(normalizedImages) ? (normalizedImages[0] || '') : normalizedImages
  const timeText = (data.deliveryTime || 8) + ' mins'

  const cart = useSelector(state => state.cartItem.cart)
  const sameId = (a, b) => String(a) === String(b)
  const cartEntry = Array.isArray(cart) ? cart.find(item => sameId(item?.productId?._id, data._id)) : null
  const unitPrice = pricewithDiscount(data.price, data.discount)
  const qtyInCart = cartEntry?.quantity || 0
  const displayPrice = DisplayPriceInRupees(qtyInCart > 0 ? unitPrice * qtyInCart : unitPrice)

  const handleCardClick = (e) => {
    if (e.target.closest('.add-to-cart-button') || e.target.closest('button')) return
    navigate(url)
  }

  return (
    <div
      className="group relative flex flex-col bg-white rounded-xl border-2 border-gray-100 p-4 transition-all duration-300 hover:shadow-2xl hover:border-teal-200 hover:-translate-y-2 cursor-pointer w-full max-w-[220px] h-full mx-auto overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/0 to-teal-100/0 group-hover:from-teal-50/30 group-hover:to-teal-100/20 transition-all duration-300 rounded-xl pointer-events-none" />

      {/* Product Image Container */}
      <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-3 flex-shrink-0">
        <img
          src={imageSrc || '/placeholder.png'}
          alt={data.name}
          onError={(e) => { e.currentTarget.src = '/placeholder.png'; e.currentTarget.onerror = null }}
          className="max-h-36 object-contain transition-transform duration-300 group-hover:scale-110"
        />

        {/* Discount Badge */}
        {data?.discount > 0 && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
            {data.discount}% OFF
          </div>
        )}

        {/* Delivery Time Badge */}
        <div className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-full text-xs font-semibold px-3 py-1.5 text-teal-700 bg-white/95 backdrop-blur-sm shadow-md border border-teal-100">
          <span className="inline-block w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span className="uppercase tracking-wide">{timeText}</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="relative z-10 flex-1 flex flex-col">
        <h3 className="text-sm leading-5 font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-teal-700 transition-colors min-h-[2.5rem]">
          {data.name}
        </h3>
        <p className="text-gray-500 text-xs mb-3">{data.unit}</p>

        {/* Price and Add to Cart */}
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <div className="font-bold text-lg text-gray-900">{displayPrice}</div>
            {data?.discount > 0 && (
              <div className="text-xs text-gray-400 line-through">{DisplayPriceInRupees(data.price)}</div>
            )}
          </div>

          <div className="add-to-cart-button">
            {data.stock == 0 ? (
              <div className="text-red-500 text-xs font-semibold bg-red-50 px-3 py-2 rounded-lg">
                Out of Stock
              </div>
            ) : (
              <AddToCartButton data={data} />
            )}
          </div>
        </div>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
      </div>
    </div>
  )
}

export default CardProduct
