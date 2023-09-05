import {ObjectId } from 'mongodb';

export enum IGender{
    'MALE',
    'FEMALE'
}

export interface IUser{
    firstName:string,
    lastName:string,
    userName:string,
    email:string,
    password:string,
    gender:IGender,
    role:string
}

export interface IItem{
    name:string
    available:number,
    reserved:number
}

export interface IItemRequested{
    userName:string,
    name:string
}