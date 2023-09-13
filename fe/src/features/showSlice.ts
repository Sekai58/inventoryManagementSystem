// All of the logic to be passed to the reducer
import {createSlice} from "@reduxjs/toolkit"

const initialState ={value:false}
export const showSlice = createSlice({
    name: "show",
    initialState,
    reducers:{
        showAuthenticate:(state)=>{
            state.value = state.value
        },
        authenticate:(state)=>{
            state.value = true
        },
        unauthenticate:(state)=>{
            state.value = false
        },
    }
})

const itemState ={value:false}
export const itemSlice = createSlice({
    name: "item",
    initialState:itemState,
    reducers:{
        showItem:(state)=>{
            state.value = state.value
        },
        addItem:(state)=>{
            state.value = true
        }
    }
})

export const {showAuthenticate,authenticate,unauthenticate} = showSlice.actions
export const {showItem,addItem} = itemSlice.actions

export default {first:showSlice.reducer,second:itemSlice.reducer}