import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./features/cartSlice";
import { filterReducer } from "./features/filterSlice";
// import servicesReducer from "./slices/servicesSlice";
// import recordsReducer from "./slices/recordSlice";
import ordersReducer from "./slices/ordersSlice";
import adminReducer from "./slices/adminSlice";
import reviewsReducer from "./slices/reviewsSlice";
import categoriesReducer from "./slices/categoriesSlice";
import itemsReducer from "./slices/itemsSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        filterReducer,
        categoriesReducer,
        ordersReducer,
        reviewsReducer,
        adminReducer,
        itemsReducer
    },
});