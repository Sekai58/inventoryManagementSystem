import axios from "axios";
import { IItems } from "../../../types/User";
import {useEffect, useState} from 'react'
import {Fade} from 'react-reveal'
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import EditItemModal from '../../Model/EditItem';
import { useDispatch, useSelector } from "react-redux";
import { addItem, showItem } from "../../../features/showSlice";


const InventoryItemsAdmin = (props:any) => {
  const [items,setItems] = useState<IItems[]>([])
  const [loading,setLoading] = useState(true)
  const [del,setDel] = useState(false)
  const [showEditItem,setShowEditItem] = useState(false)

  const theme = useSelector((state:any)=>{
    return state.theme.dark
  })

  const addItemState = useSelector((state:any)=>{
    return state.addItem
  })
  const itemValue = useSelector((state:any)=>{
    return state.item
  })

  //Get inventory data as items
  useEffect(()=>{
    const fetch = async()=>{
    await axios.get('http://localhost:7000/api/admin/list-item')
      .then(res=>{setItems(res.data || [])
    setLoading(false)
    })
    .catch(e=>console.log(e))
    setDel(false)
    dispatch(addItem(false))
    }
    fetch()
    console.log("items here",items)
  },[del,addItemState,itemValue,items])

  const handleDelete =(id:string)=>{
    const confirmDelete = confirm("Are you sure you want to delete this item?");
    if(confirmDelete){
      axios.delete(`http://localhost:7000/api/admin/delete-item/${id}`)
      .then(response => {
          console.log(response.data)
          toast.success("Item successfully deleted",{theme:theme?"dark":"light"})
          setDel(true)
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error("Unauthorized",{theme:theme?"dark":"light"})
      })
    }
    else{
      return
    }
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
  <div className={`h-[400px] overflow-auto scrollbar-thin ${theme?'scrollbar-thumb-[#24243b]':'scrollbar-thumb-[#c3c3c4]'}  scrollbar-track-[#7878bc] overflow-x-hidden`}>
    <div className={`${showEditItem?'solid':'hidden'}`}>
      <EditItemModal onClose={()=>handleEditClose()}/>
    </div>
    {!loading?(items && items.map((item,idx)=>{return<div key={idx}><div className={`flex justify-between items-center py-4 ${item.name.toLowerCase().includes(props.query.toLowerCase())?"solid":"hidden"}  ${theme?'hover:bg-[#3a3a3a]':'hover:bg-[#e9e9fe]'}`}>
    <Fade>
    <div className="flex-1 flex"><img src={item.url} className="h-8 w-10 mr-2"/>{item.name}</div>
    <div className="flex-1">{item.available}</div>
    <div className="flex-1">{item.reserved}</div>
    <div className="flex-1 flex gap-3">
      <button><i className={`fa-solid fa-pen-to-square text-[#7878bc]  ${theme?'opacity-60':'opacity-90'} hover:opacity-100 hover:scale-110`} onClick={()=>handleEdit(item)}></i></button>
      <button><i className={`fa-solid fa-delete-left text-[#fa4e4e] ${theme?'opacity-60':'opacity-90'} hover:opacity-100 hover:scale-110`} onClick={()=>handleDelete(item._id)}></i></button></div>
    </Fade>
    </div>
    <div className={`h-[0.8px] ${theme?'bg-[#444444]':'bg-[#c3c3c4]'} ${item.name.toLowerCase().includes(props.query.toLowerCase())?"solid":"hidden"}`}></div>  
    </div>}))
    :
    <div className="h-full flex justify-center items-center">
    <ClipLoader
      color='#7878bc'
      loading={loading}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
    </div>
    }
  </div>
  );
};

export default InventoryItemsAdmin;
