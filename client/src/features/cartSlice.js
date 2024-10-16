import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartPrice: 0
}




const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { prodId, prodPrice } = action.payload;
            const existingProduct = state.cartItems.find(item => item.id === prodId)
            if (existingProduct) {
                existingProduct.quantity += 1;
            }
            else {
                state.cartItems.push({ id: prodId, price: prodPrice, quantity: 1 })
            }
        },
        getCartPrice: (state) => {
            let cartTotalPrice = 0;
            for (const item of state.cartItems) {
                if (item.quantity > 0) {
                    cartTotalPrice += (item.quantity) * (item.price)
                }
            }
            state.cartPrice = cartTotalPrice;
        },
        incrementCartItemCount: (state, action) => {
            const productId = action.payload;
            const itemIndex = state.cartItems.findIndex(item => item.id == productId);
            if (itemIndex !== -1) {
                const item = state.cartItems[itemIndex]
                if (item.quantity > 0) {
                    state.cartItems[itemIndex] = { ...item, quantity: item.quantity + 1 }
                }
                else {
                    state.cartItems = state.cartItems.filter(item => item.id != productId);
                }
            }
        },
        decrementCartItemCount: (state, action) => {
            const productId = action.payload;
            const itemIndex = state.cartItems.findIndex(item => item.id == productId);
            if (itemIndex !== -1) {
                const item = state.cartItems[itemIndex]
                if (item.quantity > 1) {
                    state.cartItems[itemIndex] = { ...item, quantity: item.quantity - 1 }
                }
                else {
                    state.cartItems = state.cartItems.filter(item => item.id != productId);
                }
            }
        }

    }
})

export const { addToCart, getCartPrice, incrementCartItemCount, decrementCartItemCount } = cartSlice.actions;

export default cartSlice.reducer;