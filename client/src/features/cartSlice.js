import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import useGetToken from "../hooks/useGetToken";

const initialState = {
    cartItems: [],
    cartPrice: 0
}

export const checkout = createAsyncThunk(
    "cart/checkout",
    async ({ headers }, { getState }) => {
        const cartItems = getState().cart.cartItems;
        const userId = localStorage.getItem("userID")
        try {
            const res = await axios.post(`http://localhost:8080/shop/${userId}/checkout`,
                { cartItems }, {
                headers
            });
            return res.data;
        } catch (err) {
            console.log(`Some Error Occured: ${err}`);
        }
    }
)


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

    },
    extraReducers: (builder) => {
        builder.addCase(checkout.fulfilled, (state, action) => {
            state.cartItems = [];

        })
    }
})

export const { addToCart, getCartPrice, incrementCartItemCount, decrementCartItemCount } = cartSlice.actions;

export default cartSlice.reducer;