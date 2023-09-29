import * as UserRepository from '../Repository'
import { IItem} from '../Repository/Item.types'

export const addItem = (item:IItem)=>{
    try{
        return UserRepository.addItem(item)
    }
    catch(e){
        console.log(e)
    }
}

export const listItems = ()=>{
    try{
        return UserRepository.listItems()
    }
    catch(e){
        console.log(e)
    }
}

export const requestItem = (item:any)=>{
    try{
        return UserRepository.requestItem(item)
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const listRequestedItem = ()=>{
    try{
        return UserRepository.listRequestedItem()
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const approveItem = (item:any)=>{
    try{
        return UserRepository.approveItem(item)
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const listApprovedItem = ()=>{
    try{
        return UserRepository.listApprovedItem()
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const declineItem = (item:any)=>{
    try{
        return UserRepository.declineItem(item)
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const countItems = ()=>{
    try{
        return UserRepository.countItems()
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const editItem = (item:any)=>{
    try{
        return UserRepository.editItem(item)
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const deleteItem = (item:string)=>{
    try{
        return UserRepository.deleteItem(item)
    }
    catch(e){
        throw e
        console.log(e)
    }
}