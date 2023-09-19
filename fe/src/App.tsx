import { BrowserRouter,Navigate,Route, Routes,} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Forms from './components/Register'
import ProtectedRoute from './components/Inventory'
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import Home from './components/Home';
import {useSelector,useDispatch} from 'react-redux'
import { authenticate } from './features/showSlice'


function App() {

  const token = localStorage.getItem("token")
  const dispatch = useDispatch()
  if(token){
    dispatch(authenticate())
  }

  const data = useSelector((state:any)=>{
        return state.show.value
    })
  
  const theme = useSelector((state:any)=>{
     return state.theme.dark
   })

  return (
    <div className={`p-4 pl-9 ${theme?'bg-gradient-to-r from-[#0b0b0b] via-[#383838] to-[#060606]':'bg-slate-50'}`}>
    {/* <div className='p-4 pl-9 bg-[#f6f5f5]'> */}
    {/* // <div className='p-4 pl-9 bg-hero-pattern bg-cover'> */}
      <main className='py-20 min-h-screen'>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/*' element={(data)?<Home/>:<Navigate to='/login'/>}></Route>
          <Route path="/register/*" element={<Forms/>}></Route>
          <Route path="/login/*" element={(data) ? <Navigate to="/auth" /> : <Login />} />
          <Route path="/auth/*" element={data ? <ProtectedRoute /> : <Navigate to="/login" />} />
          <Route path="/logout" element={<Navigate to='/login' replace />} />
          <Route path="/forgetpassword/*" element={<ForgetPassword />} />
          <Route path="/resetpassword/*" element={<ResetPassword/>} />
        </Routes>
      </BrowserRouter>
      </main>
    </div>
  )
}

export default App
