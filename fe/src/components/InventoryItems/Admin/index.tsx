import axios from "axios";
import { IItems } from "../../../types/User";
import {useEffect, useState} from 'react'
import {Fade} from 'react-reveal'
import img from '../../../assets/images/laptop.png'
import { toast } from "react-toastify";
import EditItemModal from '../../Model/EditItem';
import { useDispatch, useSelector } from "react-redux";
import { addItem, showItem } from "../../../features/showSlice";


const InventoryItemsAdmin = (props:any) => {
  const [items,setItems] = useState<IItems[]>([])
  const [del,setDel] = useState(false)
  const [showEditItem,setShowEditItem] = useState(false)

  const addItemState = useSelector((state:any)=>{
    return state.addItem
  })
  const itemValue = useSelector((state:any)=>{
    return state.item
  })

  //Get inventory data as items
  useEffect(()=>{
    axios.get('http://localhost:7000/api/admin/list-item')
    .then(res=>{setItems(res.data)})
    .catch(e=>console.log(e))
    setDel(false)
    dispatch(addItem(false))
  },[del,addItemState,itemValue])

  const handleDelete =(id:string)=>{
    axios.delete(`http://localhost:7000/api/admin/delete-item/${id}`)
    .then(response => {
        console.log(response.data)
        toast.success("Item successfully deleted",{theme:"dark"})
        setDel(true)
    })
    .catch(error => {
      console.error('Error:', error);
      toast.error("Unauthorized",{theme:"dark"})
    })
  }

  const handleEditClose =()=>{
    setShowEditItem(false)
  }

  const dispatch = useDispatch()
  const handleEdit =(value:IItems)=>{
    setShowEditItem(true)
    dispatch(showItem(value))
  }

  return (
  <div className="">
    <div className={`${showEditItem?'solid':'hidden'}`}>
      <EditItemModal onClose={()=>handleEditClose()}/>
    </div>
    {items.map((item,idx)=>{return<div key={idx}><div className={`flex justify-between items-center py-3 ${item.name.toLowerCase().includes(props.query.toLowerCase())?"solid":"hidden"}`}>
    <Fade>
    <img src={img} className="h-8 w-10 mr-2"/>
    <div className="flex-1">{item.name}</div>
    <div className="flex-1">{item.available}</div>
    <div className="flex-1">{item.reserved}</div>
    <div className="flex-1 flex gap-3">
      <button><i className="fa-solid fa-pen-to-square text-[#7878bc] opacity-60 hover:opacity-100 hover:scale-110" onClick={()=>handleEdit(item)}></i></button>
      <button><i className="fa-solid fa-delete-left text-[#fa4e4e] opacity-60 hover:opacity-100 hover:scale-110" onClick={()=>handleDelete(item._id)}></i></button></div>
    </Fade>
    </div>
    <div className={`h-[0.8px] bg-[#444444] ${item.name.toLowerCase().includes(props.query.toLowerCase())?"solid":"hidden"}`}></div>  
    </div>})}
  </div>
  );
};

export default InventoryItemsAdmin;
