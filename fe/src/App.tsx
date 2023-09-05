import { BrowserRouter,Navigate,Route, Routes,} from 'react-router-dom'
import { useEffect, useState } from 'react';
import './App.css'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Forms from './components/Register'
import ProtectedRoute from './components/Inventory'
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  return (
    <div className='p-4 pl-9 bg-gradient-to-r from-[#0b0b0b] via-[#383838] to-[#060606]'>
    {/* // <div className='p-4 pl-9 bg-gradient-to-r from-[#1e1f1d] via-[#4c5349] to-[#1e1f1d]'> */}
    <Navbar />
      <main className='py-20 min-h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path="/register/*" element={<Forms/>}></Route>
          <Route path="/login/*" element={isAuthenticated ? <Navigate to="/auth" /> : <Login />} />
          {/* <Route path="/auth/*" element={isAuthenticated ? <ProtectedRoute /> : <Navigate to="/login" />} /> */}
          <Route path="/auth" element={<ProtectedRoute/>}/>
          <Route path="/logout" element={<Navigate to='/login' replace />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/resetpassword" element={<ResetPassword/>} />
        </Routes>
      </BrowserRouter>
      </main>
    </div>
  )
}

export default App
