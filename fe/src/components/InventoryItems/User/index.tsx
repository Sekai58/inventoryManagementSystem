import axios from "axios";
import { IItems } from "../../../types/User";
import {useEffect, useState} from 'react'
import { toast } from "react-toastify";
import { io } from 'socket.io-client';


const InventoryItemsUser = (props:any) => {
  const [items,setItems] = useState<IItems[]>([])
  const [request,setRequest] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:7000/api/admin/list-item')
    .then(res=>setItems(res.data))
    .catch(e=>console.log(e))
  },[])

  // useEffect(()=>{
  //   // const socket = io('http://localhost:7000')
  //   // console.log(socket)
  //   // socket?.emit("sendMessage","sekai58")
  // },[])

  const handleRequest =(name:string)=>{
    setRequest(name)
    axios.post('http://localhost:7000/api/user/requests',{"name":name,"userName":props.user})
    .then(response => {
        console.log(response.data)
        toast.success("Item successfully requested")
          const socket = io('http://localhost:7000')
          console.log(socket)
          const notify:string = `${props.user} requested ${name}`
          socket?.emit("sendMessage",notify)
    
    })
    .catch(error => {
      console.error('Error:', error);
      toast.error("Item already requested")
    });
  }

  return (
  <div className="">
    {items.map((item,idx)=>{return<div key={idx}>
      <div className={`flex justify-between items-center py-1 ${item.name.toLowerCase().includes(props.query.toLowerCase())?"solid":"hidden"}`}>
        <div className="flex-1">{item.name}</div>
        <div className="flex-1">{item.available}</div>
        <div className="flex-1">0</div>
        <div className="flex-1"><button className="px-2 py-1 bg-[#7878bc] rounded-full" onClick={()=>{handleRequest(item.name)}}>Request</button></div>
        <div  className="flex-1"><button className="px-2 py-1 bg-[#7878bc] rounded-full">View Details</button></div>
      </div>
      <div className="h-[0.8px] bg-[#444444]"></div>  
    </div>})}
  </div>
  );
};

export default InventoryItemsUser;
