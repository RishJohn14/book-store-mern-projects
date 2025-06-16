import { createSlice } from "@reduxjs/toolkit";
import  Swal from "sweetalert2";

const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (!existingItem) {
                state.cartItems.push(action.payload);
                Swal.fire({
                    position: 'top-center',
                    title: "Book Added",
                    text: "To cart successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });
            } 
            else {
                Swal.fire({
                    position: 'top-center',
                    title: "Book Already In Cart", 
                    text: "Kindly Continue Browsing ",
                    icon: "warning",
                    showConfirmButton: true,
                    timer: 1500
                });
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
            Swal.fire({
                position: 'top-center',
                title: "Book Removed from Cart",
                text: "Kindly Continue Browsing!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });
        },
        clearCart: (state) => {
            state.cartItems = [];
            Swal.fire({
                position: 'top-center',
                title: "Cart Cleared",
                text: "All items have been removed from the cart.",
                icon: "info",
                showConfirmButton: true,
                timer: 1500
            });
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


