import axios from "axios";
import { IItems} from "../../../types/User";
import {useEffect, useState} from 'react'
import { toast } from "react-toastify";
import { io } from 'socket.io-client';
import img from '../../../assets/images/laptop.png'

const InventoryItemsUser = (props:any) => {
  const [items,setItems] = useState<IItems[]>([])
  const [request,setRequest] = useState(false)
  const [data,setData] = useState<any[]>([])
  const [filteredData,setfilteredData] = useState<string[]>([])

  // useEffect(()=>{
  //   axios.get('http://localhost:7000/api/admin/list-item')
  //   .then(res=>{setItems(res.data)
  //     console.log("before request",res.data)
  //   })
  //   .catch(e=>console.log(e))
  // },[])

  useEffect(()=>{
    axios.get('http://localhost:7000/api/admin/list-item')
    .then(res=>{setItems(res.data)
      // console.log("after request",res.data)
    })
    .catch(e=>console.log(e))
    setRequest(false)
  },[request])

  // useEffect(()=>{
  //   // const socket = io('http://localhost:7000')
  //   // console.log(socket)
  //   // socket?.emit("sendMessage","sekai58")
  // },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/list-requested-item');
        setData(response.data)
        // console.log("to filter",data)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
    // console.log("data arrived",data)
    setfilteredData(data.filter(item=>item.userName===props.user).map(a=>a.productInfo.name))
    console.log("filtered data",filteredData)

  }, [items,request]);

  const handleRequest =(id:string,name:string,available:number)=>{
    // setRequest(!request)
    console.log("id here",id)
    if(available<=0)return 0
    axios.post('http://localhost:7000/api/user/requests',{"id":id,"userName":props.user})
    .then(response => {
        console.log(response.data)
        toast.success("Item successfully requested",{theme:"dark"})
        const socket = io('http://localhost:7000')
        console.log(socket)
        const notify:string = `${props.user} requested ${name}`
        socket?.emit("sendMessage",notify)
        setRequest(true)
    })
    .catch(error => {
      console.error('Error:', error);
      toast.error("Item already requested",{theme:"dark"})
    }),[]
  }

  return (
  <div className="">
    {items.map((item,idx)=>{return<div key={idx}>
      <div className={`flex justify-between items-center py-3 ${(item.name.toLowerCase().includes(props.query.toLowerCase()))?"solid":"hidden"}`}>
        <img src={img} className="h-8 w-10 mr-2"/>
        <div className="flex-1">{item.name}</div>
        <div className="flex-1">{item.available}</div>
        <div className="flex-1">{item.reserved}</div>
        <div className="flex-1"><button className={`px-2 py-1  bg-opacity-10 border-2  ${(filteredData.includes(item.name) || item.available<=0)?'border-[#862a2a] bg-[#e9585f] bg-opacity-30':'bg-[#3de97c] border-[#1b662d]'} rounded-md hover:bg-opacity-30 hover:text-white`} onClick={()=>{handleRequest(item._id,item.name,item.available)}}>Request</button></div>
        {/* <div  className="flex-1"><button className="px-2 py-1 bg-[#e9585f] bg-opacity-10 border-2 border-[#862a2a] rounded-md hover:bg-opacity-30 hover:text-white">View Details</button></div> */}
      </div>
      <div className="h-[0.8px] bg-[#444444]"></div>  
    </div>})}
  </div>
  );
};

export default InventoryItemsUser;
