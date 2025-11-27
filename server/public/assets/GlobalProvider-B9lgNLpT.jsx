import { createContext, useContext, useEffect, useState, useRef } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import { handleAddAddress } from "../store/addressSlice";
import { setOrder } from "../store/orderSlice";

export const GlobalContext = createContext(null)

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch()
  const [totalPrice, setTotalPrice] = useState(0)
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0)
  const [totalQty, setTotalQty] = useState(0)
  const cartItem = useSelector(state => state.cartItem.cart)
  const user = useSelector(state => state?.user)

  const fetchCartItem = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCartItem
      })
      const { data: responseData } = response

      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data))
        console.log(responseData)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const migrateLocalCartToServer = async (localCartItems) => {
    if (!localCartItems || localCartItems.length === 0) {
      return
    }

    console.log('Migrating local cart to server:', localCartItems.length, 'items')

    try {
      // Add each local cart item to server
      for (const item of localCartItems) {
        const productId = item?.productId?._id || item?.productId
        if (!productId) continue

        try {
          await Axios({
            ...SummaryApi.addTocart,
            data: { productId }
          })
          console.log('Migrated item:', productId)
        } catch (err) {
          // Continue even if one item fails
          console.warn('Failed to migrate item:', productId, err)
        }
      }

      // After migration, fetch the complete server cart
      await fetchCartItem()
      toast.success('Cart items restored!')
    } catch (error) {
      console.error('Cart migration error:', error)
    }
  }

  // If the cart contains guest/local entries where productId is only an _id
  // (added by client-side optimistic actions), fetch product details and
  // merge them into the cart so UI (image/price/name) can render dynamically.
  const enrichingRef = useRef(false)
  const enrichLocalCartItems = async () => {
    try {
      if (enrichingRef.current) return
      // find product ids missing details
      const missingIds = (cartItem || [])
        .map(it => it?.productId)
        .filter(Boolean)
        .filter(p => !p.name && !p.price && p._id)
        .map(p => p._id)
      const uniqueIds = [...new Set(missingIds)]
      if (!uniqueIds.length) return
      enrichingRef.current = true

      const updated = [...(cartItem || [])]
      for (const id of uniqueIds) {
        try {
          const res = await Axios({
            ...SummaryApi.getProductDetails,
            data: { productId: id }
          })
          const prod = res?.data?.data
          if (prod) {
            // merge the returned product object into any cart entries with that id
            for (let i = 0; i < updated.length; i++) {
              if (String(updated[i]?.productId?._id) === String(id)) {
                updated[i] = { ...updated[i], productId: prod }
              }
            }
          }
        } catch (e) {
          // ignore per-item failure
          console.warn('Failed to fetch product details for cart item', id, e)
        }
      }
      // replace the cart with enriched entries
      dispatch(handleAddItemCart(updated))
    } finally {
      enrichingRef.current = false
    }
  }

  const updateCartItem = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: {
          _id: id,
          qty: qty
        }
      })
      const { data: responseData } = response

      if (responseData.success) {
        // toast.success(responseData.message)
        fetchCartItem()
        return responseData
      }
    } catch (error) {
      AxiosToastError(error)
      return error
    }
  }
  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: {
          _id: cartId
        }
      })
      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        fetchCartItem()
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  useEffect(() => {
    const qty = cartItem.reduce((preve, curr) => {
      return preve + curr.quantity
    }, 0)
    setTotalQty(qty)

    const tPrice = cartItem.reduce((preve, curr) => {
      const price = Number(curr?.productId?.price) || 0
      const discount = Number(curr?.productId?.discount) || 0
      const priceAfterDiscount = pricewithDiscount(price, discount)

      return preve + (priceAfterDiscount * (Number(curr.quantity) || 0))
    }, 0)
    setTotalPrice(tPrice)

    const notDiscountPrice = cartItem.reduce((preve, curr) => {
      const price = Number(curr?.productId?.price) || 0
      return preve + (price * (Number(curr.quantity) || 0))
    }, 0)
    setNotDiscountTotalPrice(notDiscountPrice)
  }, [cartItem])

  const handleLogoutOut = () => {
    localStorage.clear()
    dispatch(handleAddItemCart([]))
  }

  const fetchAddress = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getAddress
      })
      const { data: responseData } = response

      if (responseData.success) {
        dispatch(handleAddAddress(responseData.data))
      }
    } catch (error) {
      // AxiosToastError(error)
    }
  }
  const fetchOrder = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getOrderItems,
      })
      const { data: responseData } = response

      if (responseData.success) {
        dispatch(setOrder(responseData.data))
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Track previous user state to detect login transitions
  const prevUserRef = useRef(null)

  useEffect(() => {
    // Fetch server-backed data on user change. Only fetch protected resources
    // when a user is logged in (user._id present). This avoids 401 errors
    // while the app initializes for anonymous visitors.
    const isLoggedIn = user && user._id
    const wasLoggedOut = !prevUserRef.current || !prevUserRef.current._id

    if (isLoggedIn) {
      // User just logged in - migrate local cart first
      if (wasLoggedOut && cartItem && cartItem.length > 0) {
        console.log('User logged in with local cart items, migrating...')
        const localCart = [...cartItem]
        migrateLocalCartToServer(localCart)
      } else {
        // Normal fetch when already logged in or no local cart
        fetchCartItem()
      }

      fetchAddress()
      fetchOrder()
    }

    // Update previous user reference
    prevUserRef.current = user
  }, [user])

  // When cart entries change (e.g., optimistic local adds), try to enrich items that only have productId._id
  useEffect(() => {
    if (!cartItem || !cartItem.length) return
    enrichLocalCartItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItem?.length])

  return (
    <GlobalContext.Provider value={{
      fetchCartItem,
      updateCartItem,
      deleteCartItem,
      fetchAddress,
      totalPrice,
      totalQty,
      notDiscountTotalPrice,
      fetchOrder,
      migrateLocalCartToServer
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider