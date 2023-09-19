import axios from 'axios';
import React, { useState} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import {Fade} from 'react-reveal'
import LoadingBar from 'react-top-loading-bar';
import {useDispatch,useSelector} from 'react-redux'
import {authenticate } from '../../features/showSlice';

type LoginFormInput = {
  userName: string;
  password: string;
};

//UNCOMMENT FOR DARK MODE

// const Login: React.FC = () => {

//   const dispatch = useDispatch()

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<LoginFormInput>();

//   const navigate = useNavigate()
//   const [progress,setProgress] =useState(0)

//   const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
//     setProgress(70)
//     await axios.post("http://localhost:7000/api/user/login",data)
//     .then(res=>{console.log(res.data.token)
//       localStorage.setItem("token",res.data.token)
//       toast.success(`Welcome ${data.userName}`,{theme:"dark"})
//       dispatch(authenticate())
//       navigate('/')
//     })
//     .catch(error=>{console.log(error)
//     toast.error("User not found",{theme:"dark"})})
//     setProgress(100)
//     reset();
//   };
//   return (
//     <>
//     <LoadingBar color="#7878bc"  progress={progress} onLoaderFinished={() => setProgress(0)} />
//     <Fade top cascade>
//       <div className="flex justify-center items-center h-full w-full pt-12">
      
//       <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 w-[70%] sm:w-[30%]  border-2 border-[#888787] p-5 bg-[#706b6b] bg-opacity-10 z-[89] shadow-[#121212] shadow-2xl'>
//       <h2 className="text-[#7878b2] font-semibold">LOG IN</h2>
//         <div>
//           <label className="text-[#ffffff] ">Username:</label>
//           <input type="text" placeholder='Enter name' {...register('userName', { required: 'Username is required'})} className=" mb-2 py-2 px-2 bg-opacity-20 text-[#c4c3c3] border-0 border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black w-full" />
//           {errors.userName && <p className='text-red-400'>{errors.userName.message}</p>}
//         </div>
//         <div>
//           <label className="text-[#ffffff] ">Password:</label>
//           <input type="password" placeholder='Enter password' {...register('password', { required: 'Password is required',pattern:/^.{6,}$/ })} className=" mb-3 py-2 px-2 bg-opacity-20 text-[#c4c3c3] border-0 border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black w-full" />
//           {errors.password && <p className='text-red-400'>{errors.password.message}</p>}
//         </div>
//         <a href='/forgetpassword' className='text-white'>Forget Password?</a>
//         <button type="submit" className="border-2 border-[#888787] bg-[#7878b2] text-[#ffffff] rounded-2xl px-2 py-2 hover:shadow-md hover:shadow-white hover:border-0">Login</button>
//         {/* <h2><Link to='/register'>Sign up</Link></h2> */}
//   </form>
//       </div>
//       </Fade>

//     </>
//   );
// };



//COMMENT FOR ORIGINAL
const Login: React.FC = () => {

  const dispatch = useDispatch()
  const theme = useSelector((state:any)=>{
    console.log(state.theme)
    return state.theme.dark
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInput>();

  const navigate = useNavigate()
  const [progress,setProgress] =useState(0)

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    setProgress(70)
    await axios.post("http://localhost:7000/api/user/login",data)
    .then(res=>{console.log(res.data.token)
      localStorage.setItem("token",res.data.token)
      toast.success(`Welcome ${data.userName}`,{theme:"dark"})
      dispatch(authenticate())
      navigate('/')
    })
    .catch(error=>{console.log(error)
    toast.error("User not found",{theme:"dark"})})
    setProgress(100)
    reset();
  };
  return (
    <>
    <LoadingBar color="#7878bc"  progress={progress} onLoaderFinished={() => setProgress(0)} />
    <div className='flex justify-center rounded-xl'>
      < div className='flex justify-center items-center w-[1000px] shadow-2xl shadow-[#555454] rounded-xl'>
        <div className={`border-0 rounded-l-xl flex flex-col text-white w-[30%] h-[550px] ${theme?'bg-[#2c2c2c]':'bg-white'}`}>
        <div className='h-[30%] bg-[#7878bc] w-full border-0 rounded-br-[20px] rounded-tl-xl'></div>
        <div className=' bg-[#7878bc] w-full flex items-end justify-end'><button className={`rounded-l-full ${theme?'bg-[#2c2c2c]':'bg-white'} pl-7 pr-5 py-3 text-[#7878bc] font-semibold`}>LOGIN</button></div>
        <div className="bg-[#7878bc] w-full flex items-end justify-end rounded-tr-[20px]"><button className="rounded-l-full rounded-tr-[20px] px-5 py-3 text-[#ffffff]"><Link to='/register'>SIGN UP</Link></button></div>
        <div className='h-full bg-[#7878bc] w-full border-0 text-end rounded-bl-xl'></div>
      </div>
      <Fade>
      <div className={`w-[70%] h-[550px] ${theme?'':'bg-hero-pattern bg-cover'} rounded-r-xl`}>
        {/* <div className='w-full h-full'></div> */}
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center px-20 gap-5 border-0 rounded-r-xl w-full h-full p-5 bg-transparent bg-opacity-10'>
      <h2 className="text-[#7878b2] font-semibold text-xl">LOG IN</h2>
        <div>
          <label className="text-[#d5d5d5]">Username:</label>
          <input type="text" placeholder='Enter name' {...register('userName', { required: 'Username is required'})} className=" mb-2 py-2 px-2 bg-opacity-20 text-[#c4c3c3] border-0 border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black w-full" />
          {errors.userName && <p className='text-red-400'>{errors.userName.message}</p>}
        </div>
        <div>
          <label className="text-[#d5d5d5]">Password:</label>
          <input type="password" placeholder='Enter password' {...register('password', { required: 'Password is required',pattern:/^.{6,}$/ })} className=" mb-3 py-2 px-2 bg-opacity-20 text-[#c4c3c3] border-0 border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black w-full" />
          {errors.password && <p className='text-red-400'>{errors.password.message}</p>}
        </div>
        <div className='flex justify-between'>
        <a href='/forgetpassword' className='text-[#d5d5d5] font-serif font-medium flex-1 hover:scale-105'>Forget Password?</a>
        <button type="submit" className="flex-1 border-2 border-[#888787] bg-[#7878b2] text-[#ffffff] rounded-2xl px-2 py-2 hover:shadow-md hover:shadow-white hover:border-0">Login</button>
        </div>
      </form>
      </div>
      </Fade>
      </div>
      </div>
    </>
  );
};

//COMMENT UPTO HERE

export default Login;
