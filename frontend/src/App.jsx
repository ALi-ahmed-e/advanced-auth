import './App.css'
import LoadingSpinner from './components/LoadingSpinner'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VerfiyEmail from './pages/VerfiyEmail'
import { BrowserRouter, Routes, Route } from "react-router-dom"
function App() {

  return (
    <>
      <div className='  min-h-screen  bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 relative overflow-hidden '>



        <div className='test min-h-screen  bg-gradient-to-br from-gray-900/25 via-green-900/25 to-emerald-900/25 flex items-center justify-center relative overflow-hidden'>

          <BrowserRouter
            future={{
              v7_relativeSplatPath: true,
              v7_startTransition: true,
            }}
          >

            {/* <LoadingSpinner /> */}

            <Routes>

              <Route path='/' element={<Home />} />

              <Route path='/signup' element={<Signup />} />

              <Route path='/signin' element={<Login />} />

              <Route path='/verfiy-email' element={<VerfiyEmail />} />

              <Route path='/forgot-password' element={<ForgotPassword />} />




            </Routes>

          </BrowserRouter  >

        </div>

      </div >
    </>
  )
}

export default App
