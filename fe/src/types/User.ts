export interface IUser{
    userName:string,
    role:string
}

export interface IItems{
    _id:string
    name:string,
    available:number,
    reserved:number,
    price:number
}

export interface IRequest{
    userName:string,
    name:string
}