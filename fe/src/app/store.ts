import { configureStore } from "@reduxjs/toolkit";
import showAuthenticate from "../features/showSlice";

export const store = configureStore({
    reducer:{
        show:showAuthenticate.first,
        item:showAuthenticate.second
    }
})