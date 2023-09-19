import { useForm, SubmitHandler } from "react-hook-form"
import axios from "axios";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'
import {Fade} from 'react-reveal';

type Inputs = {
  firstName:string,
  lastName:string,
  userName: string,
  email: string,
  gender:string,
  password:string,
}

//UNCOMMENT FOR ORIGINAL
// const Forms=()=> {
//   const navigate = useNavigate()
//   const {
//     register,
//     handleSubmit,
//    // watch,
//     reset,
//     formState: { errors },
//   } = useForm<Inputs>()

//   const onSubmit: SubmitHandler<Inputs> = (data) => {
//     axios.post("http://localhost:7000/api/user/register",data)
//     .then(res=>{
//       console.log(res.data)
//       toast.success(res.data,{theme:"dark"});
//       navigate('/login')
//     })
//     .catch(error=>{console.log(error)
//     toast.error("User already exists",{theme:"dark"})})
//     console.log(JSON.stringify(data))
//     reset();
//   }

//   return (
//     <Fade top>
//     <div className="sticky flex justify-center items-center h-full w-full">
//       <div className="fixed top-30 right-0 z"> <ToastContainer position="bottom-right"/>
//     </div>
//     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-[70%] sm:w-[35%]  border-2 border-[#888787] p-5 bg-[#706b6b] bg-opacity-10 shadow-[#121212] shadow-2xl">
//       <h2 className="text-[#7878b2] font-semibold">SIGN UP</h2>

//       <label className="text-[#ffffff] ">Fullname:</label>
//       <input defaultValue="" placeholder="Enter name" {...register("firstName",{required:true})} className="py-2 px-2 bg-opacity-20 text-[#c4c3c3] border-0  border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black" />
//       {errors.firstName && <span className="text-[#f34242]">{errors.firstName?.message}</span>}

//       <label className="text-[#ffffff] ">Username:</label>
//       <input defaultValue="" placeholder="Enter username" {...register("userName",{required:true})} className="py-2 px-2 bg-opacity-20 text-[#c4c3c3] border-0 border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black" />
//       {errors.userName && <span className="text-[#f34242]">This field is required</span>}
      
//       <label className="text-[#ffffff]">Email:</label>
//       <input placeholder="Enter email" {...register("email", { required: true,pattern:/^[\w\.-]+@[\w\.-]+\.\w+$/ })} className="py-2 px-2 bg-opacity-20 text-[#c4c3c3] border-0 border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black" />
//       {errors.email && <span className="text-[#f34242] ">Incorrect email</span>}

//       <label className="text-[#ffffff] ">Password:</label>
//       <input type="password" placeholder='Enter password' {...register('password', { required: 'Password is required',pattern:/^.{6,}$/ })} className=" mb-3 py-2 px-2 bg-opacity-20 text-[#c4c3c3] border-0 border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black w-full" />
//       {errors.password && <p className='text-red-400'>{errors.password.message}</p>}
      
//       <label className="text-[#ffffff]">Gender:</label>
//       <div className="flex justify-between text-[#ffffff]">
//         <div><input type="radio" value="male" className="checked:bg-slate-400 text-slate-400 focus:border-white" {...register("gender",{required:true})} /><span className="px-1">MALE</span></div>
//         <div><input type="radio" value="female" className="checked:bg-slate-400 text-slate-400 focus:border-white" {...register("gender",{required:true})} /><span className="px-1">FEMALE</span></div>
//         <div><input type="radio" value="other" className="checked:bg-slate-400 text-slate-400 border-0 focus:border-white" {...register("gender",{required:true})} /><span className="px-1">OTHER</span></div>
//       </div>

//       <input type="submit" className="border-2 border-[#888787] bg-[#7878b2] text-[#ffffff] w-full rounded-md px-2 py-2 cursor-pointer hover:shadow-md hover:shadow-white hover:border-0" />
//     </form>
//     </div>
//     </Fade>
//     // </div>
//   )
// }
//UP TO HERE

//White mode
const Forms=()=> {
  const navigate = useNavigate()

  const theme = useSelector((state:any)=>{
    console.log(state.theme)
    return state.theme.dark
  })

  const {
    register,
    handleSubmit,
   // watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios.post("http://localhost:7000/api/user/register",data)
    .then(res=>{
      console.log(res.data)
      toast.success(res.data,{theme:"dark"});
      navigate('/login')
    })
    .catch(error=>{console.log(error.message)
    toast.error("User already exists",{theme:"dark"})})
    console.log(JSON.stringify(data))
    reset();
  }

  return (
    <div className="flex justify-center rounded-xl">
    < div className='flex justify-center items-center w-full lg:w-[1000px] shadow-2xl shadow-[#555454] rounded-xl'>
      <div className={`border-0 rounded-xl hidden lg:flex flex-col text-white w-[30%] h-[550px] ${theme?'bg-[#2c2c2c]':'bg-white'}`}>
        <div className='h-[30%] bg-[#7878bc] w-full border-0 rounded-tl-xl'></div>
        <div className=' bg-[#7878bc] w-full flex items-end justify-end rounded-br-[20px] '><button className='rounded-br-[20px] px-5 py-3 text-[#ffffff]'><Link to='/login'>LOGIN</Link></button></div>
        <div className="bg-[#7878bc] w-full flex items-end justify-end"><button className={`${theme?'bg-[#2c2c2c]':'bg-white'} rounded-l-full px-5 py-3 text-[#7878bc] font-semibold`}>SIGN UP</button></div>
        <div className='h-full bg-[#7878bc] w-full rounded-tr-[20px] border-0 text-end rounded-bl-xl'></div>
      </div>
    <Fade>
    {/* <div className="sticky flex justify-center items-center h-full w-full"> */}
    <div className={`${theme?'':'bg-hero-pattern bg-cover'} w-full lg:w-[70%] h-[550px] rounded-r-xl`}>
      {/* <div className="fixed top-30 right-0 z"> <ToastContainer position="bottom-right"/>
    </div> */}
    {/* <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-[70%] sm:w-[35%]  border-2 border-[#888787] p-5 bg-[#706b6b] bg-opacity-10 shadow-[#121212] shadow-2xl"> */}
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center px-20 gap-3 border-0 rounded-r-xl w-full h-full p-5'>
      
      <h2 className="text-[#7878b2] font-semibold text-xl">SIGN UP</h2>

      <div>
      <label className="text-[#d5d5d5]">Fullname:</label>
      <input defaultValue="" placeholder="Enter name" {...register("firstName",{required:true})} className="py-2 px-2 bg-opacity-20 text-[#191919] border-0  border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black w-full" />
      {errors.firstName && <span className="text-[#f34242]">{errors.firstName?.message}</span>}
      </div>

      <div>
      <label className="text-[#d5d5d5]">Username:</label>
      <input defaultValue="" placeholder="Enter username" {...register("userName",{required:true})} className="py-2 px-2 bg-opacity-20 text-[#191919] border-0 border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black w-full" />
      {errors.userName && <span className="text-[#f34242]">This field is required</span>}
      </div>
      
      <div>
      <label className="text-[#d5d5d5]">Email:</label>
      <input placeholder="Enter email" {...register("email", { required: true,pattern:/^[\w\.-]+@[\w\.-]+\.\w+$/ })} className="py-2 px-2 bg-opacity-20 text-[#fffdfd] border-0 border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black w-full" />
      {errors.email && <span className="text-[#f34242] ">Incorrect email</span>}
      </div>

      <div>
      <label className="text-[#d5d5d5]">Password:</label>
      <input type="password" placeholder='Enter password' {...register('password', { required: 'Password is required',pattern:/^.{6,}$/ })} className=" mb-3 py-2 px-2 bg-opacity-20 text-[#191919] border-0 border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black w-full" />
      {errors.password && <p className='text-red-400'>{errors.password.message}</p>}
      </div>
      
      <div>
      <label className="text-[#d5d5d5]">Gender:</label>
      <div className="flex justify-between text-[#d5d5d5]">
        <div><input type="radio" value="male" className="checked:bg-slate-400 text-slate-400 focus:border-white" {...register("gender",{required:true})} checked /><span className="px-1">MALE</span></div>
        <div><input type="radio" value="female" className="checked:bg-slate-400 text-slate-400 focus:border-white" {...register("gender",{required:true})} /><span className="px-1">FEMALE</span></div>
        <div><input type="radio" value="other" className="checked:bg-slate-400 text-slate-400 border-0 focus:border-white" {...register("gender",{required:true})} /><span className="px-1">OTHER</span></div>
      </div>
      </div>

      <div className="w-full flex justify-center mt-5">
      <input type="submit" value='Sign Up' className="border-2 border-[#888787] w-1/2 bg-[#7878b2] text-[#ffffff] rounded-2xl px-2 py-2 cursor-pointer hover:shadow-md hover:shadow-white hover:border-0" />
      </div>

    </form>
    </div>
    </Fade>
    </div>
    </div>
  )
}
//upto here for white mode

export default Forms