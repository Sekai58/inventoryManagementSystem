// AddItemModal.tsx
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IItems } from '../../types/User';
import axios from 'axios';
import { toast } from 'react-toastify';

interface AddItemModalProps {
  onClose: (close:boolean) => void;
}


const AddItemModal: React.FC<AddItemModalProps> = ({onClose}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IItems>();

      const onSubmit: SubmitHandler<IItems> = async (data,e) => {
        e?.preventDefault()
        await axios.post("http://localhost:7000/api/admin/add-item",data)
        .then(res=>{console.log(res.data.token)
          toast.success("Success")
          //onClose(true)
        })
        .catch(error=>{console.log(error)
        toast.error(error.message)})
        console.log(data);
        reset();
      };

  return (
    <>
    <div className="fixed top-0 left-0 min-h-screen w-full bg-black bg-opacity-90 z-[999] flex justify-center items-center">
    <div className='fixed bottom-[30%] right-[5%] z-20'>
    <div className='flex justify-between'>
      <p className="text-[#7878b2] font-semibold text-xl">Add Item</p>
      <button onClick={()=>onClose(true)} className='text-2xl text-red-500'>X</button>
      </div>
    <form  className='flex flex-col gap-5 border-2 border-[#888787] p-5 bg-[#1c1b1b] shadow-[#000000] shadow-2xl rounded-sm' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-4'>
        <label className="text-[#ffffff] ">Name:</label>
        <input type="text" placeholder='Enter name' {...register('name', { required: 'Name is required'})} className=" mb-2 py-2 px-2 bg-opacity-20 text-[#c4c3c3] border-0 border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black w-full" />
      </div>
      {errors.name && <p className='text-red-400'>{errors.name.message}</p>}
      <div className='flex gap-4'>
        <label className="text-[#ffffff] ">Available:</label>
        <input type="number" placeholder='Enter quantity available' {...register('available', { required: 'Enter a value'})} className=" mb-3 py-2 px-2 bg-opacity-20 text-[#c4c3c3] border-0 border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black w-full" />
      </div>
      {errors.available && <p className='text-red-400'>{errors.available.message}</p>}
      <button type="submit" className="border-2 border-[#888787] bg-[#7878b2] text-[#ffffff] rounded-2xl px-2 py-2 hover:shadow-md hover:shadow-white hover:border-0">Add Item</button>
    </form>
    </div>
    </div>
    </>
  );
};

export default AddItemModal;
