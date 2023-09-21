export interface IItem{
    name:string
    available:number,
    reserved:number,
    url:string
}

export interface IItemRequested{
    userName:string,
    name:string
}