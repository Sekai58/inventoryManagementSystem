import { useEffect, useState } from 'react';
import axios from 'axios';
import { IUser } from '../../types/User';
import {Zoom} from 'react-reveal'
import { io } from 'socket.io-client';

import InventoryItemsUser from '../InventoryItems/User';
import InventoryItemsAdmin from '../InventoryItems/Admin';
import AddItemModal from '../Model';
import RequestedItems from './RequestedItems';

const ProtectedRoute = () => {
  const [data, setData] = useState<IUser>({userName:'',role:''});
  const [field,setField] = useState('allitems')
  const [query,setQuery] = useState('')
  const [showAddItem,setShowAddItem] = useState(false)
  const [refreshItem,setRefreshItem] = useState(false)
  const [socket,setSocket] = useState<any>(null)
  const [notification,setNotification] = useState('')
  const [showNotification,setShowNotification] = useState(true)

  const handleClose = ()=>{
    setShowAddItem(false)
    setRefreshItem(true)
  }

  const handleAdd = ()=>{
    setShowAddItem(true)
  }

  //Connection between user and Admin
  useEffect(()=>{
    const socket = io('http://localhost:7000')
    setSocket(socket)
    console.log(socket)

    socket?.emit('fromclient', 'Hello from the client!');

    socket?.on('fromserver', (message:any) => {
      console.log('Received message from server:', message);
    });
  },[])

  //Get notification and show in admin side
  useEffect(()=>{
    socket?.on('getMessage',(message:any)=>{console.log("notification from user",message)
    setNotification(message)
    setShowNotification(true)
    localStorage.setItem("count",JSON.stringify(1))
  })  
  })

  useEffect(() => {
    const fetchdata = async()=>{
      await axios.post('http://localhost:7000/api/user/auth',{}, {
        headers: {
          Authorization: `${(localStorage.getItem('token'))}`,
        },
      })
      .then(response => {
          console.log("user data here",response.data)
        setData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }

    if(!showAddItem){
      fetchdata()
      setShowAddItem(false)
      setRefreshItem(false)
    }
  }, [refreshItem,showAddItem,field]);

  console.log("here",refreshItem)
  return (
    <div className='sm:px-10'>
        <div className={`${showAddItem?'solid':'hidden'}`}>
          <AddItemModal onClose={handleClose}/>
        </div>
      <Zoom>
      <div className='min-h-[500px] bg-[rgba(34,33,33,0.5)] shadow-2xl shadow-black rounded-md'>
        <div className='w-full rounded-t-md flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center px-2 py-1'>
          <div className="relative text-[#818080]">
            <span className="absolute left-2 top-1"><i className="fa-solid fa-magnifying-glass"></i></span>
            <input type="text" className="pl-7 h-8 w-28 sm:w-56 border-1 bg-transparent text-[#929191] rounded-full transition-all duration-300 ease-in-out sm:focus:w-80 focus:w-full focus:border-2 focus:border-[#7878bc]" onChange={(e)=>setQuery(e.target.value)}/>
          </div>
          <div className='flex gap-3 mb-2'>
            <div className='relative'>
            <button><i className={`fa-regular fa-bell ${showNotification?'text-[#7878bc]':'text-[#ffffff]'} text-2xl`} onClick={()=>setShowNotification(!showNotification)}></i></button>
            <div className={`${(data.role=='ADMIN' && showNotification==true)?'solid':'hidden'} bg-black border-2 border-black bg-opacity-20 p-2 absolute top-7 right-0 text-white`}>{notification}</div>
            </div>
            <select className='border-x-2 border-y-0 border-[#555555] rounded-full text-[#7878bc] bg-transparent' defaultValue='Sekai'>
              <option className='text-[#c4c3c3] border-2 border-slate-500 bg-slate-700'>@{data.userName}</option>
              <option disabled className='text-[#c4c3c3] border-2 border-slate-500 bg-slate-700'>role:{data.role}</option>
            </select>
          </div>
        </div>

        <div className="flex items-center">
          <div className="h-[0.8px] bg-gradient-to-r from-[#1c1c1c] via-[#3c3c54] to-[#7878bc] flex-grow shadow-md shadow-white"></div>
          <span className="mx-2 text-white"><Zoom delay={800}>Inventory Items</Zoom></span>
          <div className="h-[0.8px] bg-gray-400 bg-gradient-to-r to-[#1c1c1c] via-[#3c3c54] from-[#7878bc] flex-grow"></div>
        </div>

        <div className='p-4'>
        <div className='flex text-[#8a8a8b] justify-between'>
          <div>
            <button className={`px-3 py-1 mr-2 rounded-t-md ${(field=='allitems')?'bg-[#232323]':'bg-[#24243b]'}`} onClick={()=>{setField("allitems")}}>All items</button>
            <button className={`px-3 py-1 rounded-t-md ${(field=='requested')?'bg-[#232323]':'bg-[#24243b]'}`} onClick={()=>{setField("requested")}}>Requested</button>
          </div>
          <div className={`${data.role==='ADMIN'?'solid':'hidden'}`}>
            <button className='px-2 py-[2px] border-2 rounded-md text-[#ffffff] border-[#7878bc] hover:scale-105 hover:bg-[#7878bc]' onClick={()=>handleAdd()}><span className='text-red-500'>&#10006;</span>Add Item</button>
          </div>          
        </div>

        {((field=='requested'&& showAddItem==false && data)?<>
        <div className='bg-[#232323] py-2 px-3 text-[#c3c3c4] rounded-b-md rounded-r-md'>
          <RequestedItems user={data} query={query}/>
        </div>
        </>
        :<>
          <div className='bg-[#232323] py-2 px-3 text-[#c3c3c4] rounded-b-md rounded-r-md'>
            <div className='flex justify-between pb-2'>
            <p className='flex-1'>Name</p>
            <p className='flex-1'>Available</p>
            <p className='flex-1'>Reserved</p>
            <p className='flex-1'>Action</p>
            </div>
            
            <div className="h-[0.8px] bg-gradient-to-r to-[#343434] via-[#7878bc] from-[#343434] mb-3"></div> 
            {(data.role=='ADMIN')?<InventoryItemsAdmin query={query} socket={socket}/>:<InventoryItemsUser query={query} user={data.userName} socket={socket} /> } 
               
          </div>
        </>
        )}
        </div>
      </div>
      </Zoom>
    </div>
  );
};

export default ProtectedRoute;
