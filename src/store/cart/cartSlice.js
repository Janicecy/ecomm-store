import { createSlice } from '@reduxjs/toolkit'

// helper function to calculate the subtotal of cart 
function calSubTotal(cartItems) {
  return cartItems.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0
  );
}

/* 
 https://react-redux.js.org/tutorials/quick-start
  Creating a slice requires a string name to identify the slice, an initial state value, 
  and one or more reducer functions to define how the state can be updated. Once a slice 
  is created, we can export the generated Redux action creators and the reducer 
  function for the whole slice.
 */
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    subtotal: 0
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes.
    // Also, no return statement is required from these functions.
    addToCart: (state, action) => {
      state.cartItems.push({
        product: action.payload,
        quantity: 1
      })
      state.subtotal = calSubTotal(state.cartItems)
    },
    updateProductQuantity: (state, action) => {
      for (let cartItem of state.cartItems) {
        if (cartItem.product.id === action.payload.productId) {
          cartItem.quantity = action.payload.quantity
          break
        }
      }
      state.subtotal = calSubTotal(state.cartItems)
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(({ product }) => {
        return product.id !== action.payload.productId
      })
      state.subtotal = calSubTotal(state.cartItems)
    },
    clearCart: (state) => {
      state.cartItems = []
      state.subtotal = 0
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  addToCart,
  updateProductQuantity,
  removeFromCart,
  clearCart
} = cartSlice.actions

export default cartSlice.reducer