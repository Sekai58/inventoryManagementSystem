import { configureStore } from "@reduxjs/toolkit";
import addData from "../features/showSlice";

export const store = configureStore({
    reducer:{
        show:addData,
    }
})