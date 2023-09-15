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

const editItem ={_id:'',name:'',available:0,reserved:0}
export const itemSlice = createSlice({
    name: "item",
    initialState:editItem,
    reducers:{
        showItem:(state,action)=>{
            // console.log("payload here",action.payload)
           state ={ ...state, ...action.payload}
        //    console.log("state here",state)
           return state
        },
    }
})

const initialaddItem:any = {value:false}
export const addItemSlice = createSlice({
    name:"addItem",
    initialState:initialaddItem,
    reducers:{
        addItem:(state,action)=>{
            state.value =  action.payload
            return state
        }
    }
})

export const {showAuthenticate,authenticate,unauthenticate} = showSlice.actions
export const {showItem} = itemSlice.actions
export const {addItem} = addItemSlice.actions


export default {first:showSlice.reducer,second:itemSlice.reducer,third:addItemSlice.reducer}