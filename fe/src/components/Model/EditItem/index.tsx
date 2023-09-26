// AddItemModal.tsx
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IItems } from '../../../types/User';
import axios from 'axios';
import {toast } from 'react-toastify';
import {Zoom} from 'react-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { showItem } from '../../../features/showSlice';

interface EditItemModalProps {
  onClose: () => void;
}

const EditItemModal: React.FC<EditItemModalProps> = ({onClose}) => {

    const theme = useSelector((state:any)=>{
      console.log(state.theme)
      return state.theme.dark
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IItems>();

      const itemValue = useSelector((state:any)=>{
        return state.item
      })

      useEffect(()=>{
        reset(itemValue)
      },[itemValue])

      const dispatch =useDispatch()
      const onSubmit: SubmitHandler<IItems> = async (data,e) => {
        e?.preventDefault()
        await axios.put("http://localhost:7000/api/admin/edit-item",{...data,"_id":itemValue._id})
        .then(res=>{console.log("Ack state",res.data)
          toast.success("Successfully edited",{theme:theme?'dark':'light'})
          onClose()
        })
        .catch(error=>{console.log(error)
        toast.error(error.message,{theme:theme?'dark':'light'})})
        dispatch(showItem({_id:'',name:'',available:0,reserved:0}))
        reset();
      };

      const handleClick =(state:string)=>{
        if(state="close")
        {
          onClose()
        }
      }

  return (
    <>
    <div className={`fixed top-0 left-0 h-full w-full z-[20] flex justify-center items-center`} onClick={()=>handleClick("close")}></div>
    <div className={`fixed top-48 right-12 z-[25] rounded-md ${theme?'shadow-[#3f3f3f]':'shadow-[#3b3b3b]'}  shadow-2xl`}>
    <div className={`flex justify-between ${theme?'bg-[#3d3d3d] border-[#575757]':'bg-[#f3f2f2] border-[#b1b0b0]'}  rounded-t-lg p-1`}>
      <p className={`${theme?'text-[#7878bc] bg-[#000000] bg-opacity-20':'text-[#7878bc] bg-[#d2d1d1]'} font-semibold text-xl px-2 py-[2px] rounded-tl-lg font-sans w-full`}><Zoom>EDIT ITEM</Zoom></p>
      <button onClick={()=>onClose()} className={`${theme?'text-white bg-[#3d3d3d]':'bg-[#f3f2f2] text-[#232323]'} text-xl  px-2 py-[1px] hover:bg-red-500 rounded-t-sm rounded-tr-lg`}><i className="fa-solid fa-xmark"></i></button>
      </div>
    <form  className={` ${theme?'border-[#575757] bg-[#3d3d3d]':'bg-[#f3f2f2] border-[#b1b0b0]'} flex flex-col gap-5 p-5 rounded-b-lg`} onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-4 justify-between items-center'>
        <label className={`${theme?'text-[#d6d6d6]':'text-[#555555]'}`}>Name:</label>
        <input type="text" defaultValue={itemValue.name} placeholder='Enter name' {...register('name', { required: 'Name is required'})} className={`${theme?'text-[#c4c3c3] bg-black border-[#888787]':'text-[#555555] bg-transparent border-[#b1b0b0]'} mb-2 py-2 px-2 bg-opacity-5 border-0 border-b-2 focus:border-[#888787] focus:border-b-0 `} />
      </div>
      {errors.name && <p className='text-red-400'>{errors.name.message}</p>}
      <div className='flex gap-4 justify-between items-center'>
        <label className={`${theme?'text-[#d6d6d6]':'text-[#555555]'}`}>Available:</label>
        <input type="number" defaultValue={itemValue.available} placeholder='Enter quantity' {...register('available', { required: 'Enter quantity'})} className={`${theme?'text-[#c4c3c3] bg-black border-[#888787]':'text-[#555555] bg-transparent border-[#b1b0b0]'} mb-3 py-2 px-2 bg-opacity-5  border-0 border-b-2  focus:border-[#888787] focus:border-b-0 `} />
      </div>
      {errors.available && <p className='text-red-400'>{errors.available.message}</p>}
      <div className='flex gap-4 justify-between items-center'>
        <label className={`${theme?'text-[#d6d6d6]':'text-[#555555]'}`}>Reserved:</label>
        <input type="number" defaultValue={itemValue.reserved} placeholder='Enter quantity' {...register('reserved', { required: 'Enter reserved'})} className={`${theme?'text-[#c4c3c3] bg-black border-[#888787]':'text-[#555555] bg-transparent border-[#b1b0b0]'} mb-3 py-2 px-2 bg-opacity-5 border-0 border-b-2  focus:border-[#888787] focus:border-b-0 `} />
      </div>
      {errors.reserved && <p className='text-red-400'>{errors.reserved.message}</p>}
      <button type="submit" className={`border-2 border-[#888787] bg-[#7878b2] text-[#ffffff] rounded-2xl px-2 py-2 hover:shadow-md ${theme?'hover:shadow-white':'hover:shadow-[#24243b]'} hover:border-0 font-sans`}>EDIT ITEM</button>
    </form>
    </div>
    {/* </div> */}
    </>
  );
};

export default EditItemModal;
