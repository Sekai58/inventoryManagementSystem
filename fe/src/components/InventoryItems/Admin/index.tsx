import axios from "axios";
import { IItems } from "../../../types/User";
import {useEffect, useState} from 'react'

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
    {items.map((item,idx)=>{return<div><div key={idx} className={`flex justify-between items-center py-1 ${item.name.toLowerCase().includes(props.query.toLowerCase())?"solid":"hidden"}`}>
    <div className="flex-1">{item.name}</div>
    <div className="flex-1">{item.available}</div>
    <div className="flex-1">0</div>
    {/* <div className="flex-1">{item.price}</div> */}
    {/* <div className="flex-1"><button className="px-2 py-1 bg-[#7878bc] rounded-full" onClick={()=>handleClick(idx)}>Approve</button></div> */}
    {/* <div  className="flex-1"><button className="px-2 py-1 bg-[#7878bc] rounded-full">View Details</button></div> */}
    </div>
    <div className="h-[0.8px] bg-[#444444]"></div>  
    </div>})}
  </div>
  );
};

export default InventoryItemsAdmin;
