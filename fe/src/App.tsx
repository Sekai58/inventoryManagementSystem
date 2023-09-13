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
        console.log("redux state here",state.show.value)
        return state.show.value
    })

  return (
    <div className='p-4 pl-9 bg-gradient-to-r from-[#0b0b0b] via-[#383838] to-[#060606]'>
      <main className='py-20 min-h-screen'>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/*' element={<Home/>}></Route>
          <Route path="/register/*" element={<Forms/>}></Route>
          <Route path="/login/*" element={(data) ? <Navigate to="/" /> : <Login />} />
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
