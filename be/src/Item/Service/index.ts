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

export const deleteItem = (item:any)=>{
    try{
        return UserRepository.deleteItem(item)
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