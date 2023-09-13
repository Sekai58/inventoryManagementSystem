import axios from "axios";
import { IItems } from "../../../types/User";
import {useEffect, useState} from 'react'
import {Fade} from 'react-reveal'
import img from '../../../assets/images/laptop.png'

const InventoryItemsAdmin = (props:any) => {
  const [items,setItems] = useState<IItems[]>([])

  useEffect(()=>{
    axios.get('http://localhost:7000/api/admin/list-item')
    .then(res=>setItems(res.data))
    .catch(e=>console.log(e))
  },[])

  // const handleClick = (idx:number)=>{
  //   const updatedItems = [...items]
  //   if (updatedItems[idx].reserved >0) {
  //     updatedItems[idx].reserved -= 1;
  //     updatedItems[idx].available -= 1;
  //     setItems(updatedItems);
  //   }
  // }
  return (
  <div className="">
    {items.map((item,idx)=>{return<div key={idx}><div className={`flex justify-between items-center py-3 ${item.name.toLowerCase().includes(props.query.toLowerCase())?"solid":"hidden"}`}>
    <Fade>
    <img src={img} className="h-8 w-10 mr-2"/>
    <div className="flex-1">{item.name}</div>
    <div className="flex-1">{item.available}</div>
    <div className="flex-1">{item.reserved}</div>
    </Fade>
    {/* <div className="flex-1">{item.price}</div> */}
    {/* <div className="flex-1"><button className="px-2 py-1 bg-[#7878bc] rounded-full" onClick={()=>handleClick(idx)}>Approve</button></div> */}
    {/* <div  className="flex-1"><button className="px-2 py-1 bg-[#7878bc] rounded-full">View Details</button></div> */}
    </div>
    <div className={`h-[0.8px] bg-[#444444] ${item.name.toLowerCase().includes(props.query.toLowerCase())?"solid":"hidden"}`}></div>  
    </div>})}
  </div>
  );
};

export default InventoryItemsAdmin;
