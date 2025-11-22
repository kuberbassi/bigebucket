import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: "cartItem",
    initialState: initialState,
    reducers: {
        // replace the whole cart (used by server responses)
        handleAddItemCart: (state, action) => {
            state.cart = [...(action.payload || [])]
        },
        // increment quantity for a product (optimistic)
        incrementItemQty: (state, action) => {
            const productId = action.payload
            const idx = state.cart.findIndex(it => String(it?.productId?._id) === String(productId))
            if (idx >= 0) {
                state.cart[idx].quantity = (state.cart[idx].quantity || 0) + 1
            } else {
                // If no cart item exists, we can't create full item here (server should create),
                // but push a minimal placeholder so UI updates (productId only)
                state.cart.push({ productId: { _id: productId }, quantity: 1 })
            }
        },
        // decrement quantity for a product (optimistic). If reaches 0, remove it.
        decrementItemQty: (state, action) => {
            const productId = action.payload
            const idx = state.cart.findIndex(it => String(it?.productId?._id) === String(productId))
            if (idx >= 0) {
                const newQty = Math.max(0, (state.cart[idx].quantity || 1) - 1)
                if (newQty <= 0) {
                    state.cart.splice(idx, 1)
                } else {
                    state.cart[idx].quantity = newQty
                }
            }
        },
        // remove item by product id
        removeItemByProductId: (state, action) => {
            const productId = action.payload
            state.cart = state.cart.filter(it => String(it?.productId?._id) !== String(productId))
        }
    }
})

export const { handleAddItemCart, incrementItemQty, decrementItemQty, removeItemByProductId } = cartSlice.actions

export default cartSlice.reducer