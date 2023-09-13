// AddItemModal.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IItems } from '../../../types/User';
import axios from 'axios';
import {toast } from 'react-toastify';
import {Zoom} from 'react-reveal';
import { useSelector } from 'react-redux';

interface EditItemModalProps {
  onClose: () => void;
}

const EditItemModal: React.FC<EditItemModalProps> = ({onClose}) => {
  const itemValue = useSelector((state:any)=>{
    console.log("redux here",state.item)
    return state.item
  })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IItems>();

      const onSubmit: SubmitHandler<IItems> = async (data,e) => {
        e?.preventDefault()
        await axios.post("http://localhost:7000/api/admin/add-item",data)
        .then(res=>{console.log("Ack state",res.data)
          toast.success("Success")
          onClose()
        })
        .catch(error=>{console.log(error)
        toast.error(error.message)})
        console.log(data);
        reset();
      };

  return (
    <>
    <div className="fixed top-0 left-0 h-full w-full bg-black bg-opacity-80 z-[999] flex justify-center items-center">
    <div className='fixed top-50 left-50 z-20'>
    <div className='flex justify-between'>
      <p className="text-[#7878b2] font-semibold text-xl"><Zoom>Edit Item</Zoom></p>
      <button onClick={()=>onClose()} className='text-xl text-white bg-[#1c1b1b] px-2 hover:bg-red-500 rounded-t-sm'><i className="fa-solid fa-xmark"></i></button>
      </div>
    <form  className='flex flex-col gap-5 border-2 border-[#1c1b1b] p-5 bg-[#1c1b1b] shadow-[#000000] shadow-2xl rounded-sm' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-4 justify-between'>
        <label className="text-[#ffffff] ">Name:</label>
        <input type="text" defaultValue={itemValue.name} placeholder='Enter name' {...register('name', { required: 'Name is required'})} className=" mb-2 py-2 px-2 bg-opacity-20 text-[#c4c3c3] border-0 border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black" />
      </div>
      {errors.name && <p className='text-red-400'>{errors.name.message}</p>}
      <div className='flex gap-4 justify-between'>
        <label className="text-[#ffffff] ">Available:</label>
        <input type="number" value={itemValue.available} placeholder='Enter quantity' {...register('available', { required: 'Enter quantity'})} className=" mb-3 py-2 px-2 bg-opacity-20 text-[#c4c3c3] border-0 border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black" />
      </div>
      {errors.available && <p className='text-red-400'>{errors.available.message}</p>}
      <div className='flex gap-4 justify-between'>
        <label className="text-[#ffffff] ">Reserved:</label>
        <input type="number" value={itemValue.reserved} placeholder='Enter quantity' {...register('reserved', { required: 'Enter reserved'})} className=" mb-3 py-2 px-2 bg-opacity-20 text-[#c4c3c3] border-0 border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black" />
      </div>
      {errors.reserved && <p className='text-red-400'>{errors.reserved.message}</p>}
      <button type="submit" className="border-2 border-[#888787] bg-[#7878b2] text-[#ffffff] rounded-2xl px-2 py-2 hover:shadow-md hover:shadow-white hover:border-0">Edit Item</button>
    </form>
    </div>
    </div>
    </>
  );
};

export default EditItemModal;
