import React from "react";
import { useNavigate } from "react-router-dom";
import AddToCartButton from './AddToCartButton'
import { useSelector } from 'react-redux'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { pricewithDiscount } from '../utils/PriceWithDiscount'

const ProductCard = ({ product, onBuy }) => {
  const navigate = useNavigate();
  const cart = useSelector(state => state.cartItem.cart)
  const sameId = (a,b) => String(a) === String(b)
  const cartEntry = Array.isArray(cart) ? cart.find(item => sameId(item?.productId?._id, product._id)) : null
  const unit = pricewithDiscount(product.price, product.discount)
  const qty = cartEntry?.quantity || 0
  const displayPrice = DisplayPriceInRupees(qty > 0 ? unit * qty : unit)

  const handleCardClick = (e) => {
    // allow clicks on interactive elements like the AddToCartButton to work without navigating
    if (e.target.closest('.add-to-cart-button') || e.target.closest('button')) return;
    navigate(`/product/${product.id || product.name}`);
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition hover:scale-105 border border-gray-100 relative w-full"
      style={{ width: '220px', minHeight: '340px', margin: '0 auto' }}
      onClick={handleCardClick}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-24 h-24 object-contain rounded-xl mb-3 border-2 border-green-100 shadow"
        style={{ background: '#fff' }}
      />
      <span className="text-base font-bold text-gray-800 text-center mt-2 mb-1" style={{width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{product.name}</span>
      <span className="text-xs text-gray-500 mb-1">{product.unit || '500 ml'}</span>
      <span className="text-green-600 font-bold text-lg mb-2">{displayPrice}</span>

      <div className="mt-auto w-full flex items-center justify-center">
        {product.stock === 0 ? (
          <p className='text-red-500 text-sm text-center'>Out of stock</p>
        ) : (
          <div className="w-full flex items-center justify-center">
            <AddToCartButton data={product} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;