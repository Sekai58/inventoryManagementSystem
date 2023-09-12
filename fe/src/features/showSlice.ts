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
        }
    }
})

export const {showAuthenticate,authenticate,unauthenticate} = showSlice.actions
export default showSlice.reducer