import { configureStore } from "@reduxjs/toolkit";
import showSlice from "../features/showSlice";

export const store = configureStore({
    reducer:{
        show:showSlice.first,
        item:showSlice.second,
        addItem:showSlice.third,
        role:showSlice.role,
        theme:showSlice.theme,
        count:showSlice.count
    }
})