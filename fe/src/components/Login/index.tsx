import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {Navigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import {Fade} from 'react-reveal'
import LoadingBar from 'react-top-loading-bar';

type LoginFormInput = {
  userName: string;
  password: string;
};

const Login: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInput>();

  //const navigate = useNavigate()
  const [progress,setProgress] =useState(0)

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    setProgress(70)
    await axios.post("http://localhost:7000/api/user/login",data)
    .then(res=>{console.log(res.data.token)
      localStorage.setItem("token",res.data.token)
      toast.success("Success")
      setIsAuthenticated(true)
      //navigate('/auth')
      window.location.reload();
    })
    .catch(error=>{console.log(error)
    toast.error(error.message)})
    console.log(data);
    setProgress(100)
    reset();
  };
  return (
    <>
      {/* <div className="fixed top-30 right-0 "> <ToastContainer position="bottom-right" className=""/></div> */}
    <LoadingBar color="#7878bc"  progress={progress} onLoaderFinished={() => setProgress(0)} />
    {(isAuthenticated==false)?
    <Fade top>
    {/* <div className="fixed top-0 left-0 min-h-screen w-full bg-black bg-opacity-50 z-5"></div> */}
      <div className="flex justify-center items-center h-full w-full">
      
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 w-[70%] sm:w-[30%]  border-2 border-[#888787] p-5 bg-[#706b6b] bg-opacity-10 z-[89] shadow-[#121212] shadow-2xl'>
      <h2 className="text-[#7878b2] font-semibold">LOG IN</h2>
        <div>
          <label className="text-[#ffffff] ">Username:</label>
          <input type="text" placeholder='Enter name' {...register('userName', { required: 'Username is required'})} className=" mb-2 py-2 px-2 bg-opacity-20 text-[#c4c3c3] border-0 border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black w-full" />
          {errors.userName && <p className='text-red-400'>{errors.userName.message}</p>}
        </div>
        <div>
          <label className="text-[#ffffff] ">Password:</label>
          <input type="password" placeholder='Enter password' {...register('password', { required: 'Password is required',pattern:/^.{6,}$/ })} className=" mb-3 py-2 px-2 bg-opacity-20 text-[#c4c3c3] border-0 border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black w-full" />
          {errors.password && <p className='text-red-400'>{errors.password.message}</p>}
        </div>
        <a href='/forgetpassword' className='text-white'>Forget Password?</a>
        <button type="submit" className="border-2 border-[#888787] bg-[#7878b2] text-[#ffffff] rounded-2xl px-2 py-2 hover:shadow-md hover:shadow-white hover:border-0">Login</button>
  
        {/* <div className="flex items-center">
          <div className="h-px bg-gradient-to-r to-[#7878bc] from-[#ababab] flex-grow"></div>
          <span className="mx-2 text-white">Or</span>
          <div className="h-px bg-gradient-to-r from-[#7878bc] to-[#ababab] flex-grow"></div>
        </div> */}
  
        {/* <button className="border-2 border-[#888787] bg-transparent text-[#f7f7f7] rounded-2xl px-2 py-2 cursor-pointer hover:shadow-md hover:shadow-[#7878bc] hover:border-0">Continue with google</button>
        <button className="border-2 border-[#888787] bg-transparent text-[#f7f7f7] rounded-2xl px-2 py-2 cursor-pointer hover:shadow-md hover:shadow-[#7878bc] hover:border-0">Continue with facebook</button>
        <button className="border-2 border-[#888787] bg-transparent text-[#f7f7f7] rounded-2xl px-2 py-2 cursor-pointer hover:shadow-md hover:shadow-[#7878bc] hover:border-0">Login with email</button> */}
      </form>
      </div>
      </Fade>
    :<Navigate to="/auth"/>}
    </>
  );
};

export default Login;
