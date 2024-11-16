import './App.css'
import LoadingSpinner from './components/LoadingSpinner'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VerfiyEmail from './pages/VerfiyEmail'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useCheckAuthQuery } from './store/auth'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthData } from './store/AuthReducer'
function App() {

  const dispatch = useDispatch()
  const { error, isSuccess, data,isLoading } = useCheckAuthQuery()
  const user = useSelector(state => state.Auth.user)
  


  useEffect(() => {
    dispatch(setAuthData(data))

  }, [isSuccess])




  const CheckAuth = ({ children }) => {


    if (!user) {
      return <Navigate to='/signin' />
    } else {
      return children
    }


  }
  const CheckNotAuth = ({ children }) => {
    if (user) {
      return <Navigate to='/' />
    } else {
      return (children)
    }
  }


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

            {isLoading&&<LoadingSpinner />}

            <Routes>

              <Route path='/' element={<CheckAuth><Home /></CheckAuth>} />

              <Route path='/signup' element={<CheckNotAuth><Signup /></CheckNotAuth>} />

              <Route path='/signin' element={<CheckNotAuth><Login /></CheckNotAuth>} />

              <Route path='/verfiy-email' element={<CheckNotAuth><VerfiyEmail /></CheckNotAuth>} />

              <Route path='/forgot-password' element={<ForgotPassword />} />




            </Routes>

          </BrowserRouter  >

        </div>

      </div >
    </>
  )
}

export default App
