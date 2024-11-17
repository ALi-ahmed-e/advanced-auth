import React from 'react'
import { useLogoutMutation } from '../store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthData } from '../store/AuthReducer'

const Home = () => {
  const [Logout, { data, error, isLoading }] = useLogoutMutation()
  const {user} = useSelector(state => state.Auth)
  const dispatch = useDispatch()


  const logout = async () => {

    await Logout()

    dispatch(clearAuthData())
  }

  return (
    <div>

      <h1 className=' text-white tex-t-2xl m-5'>Hello {user?.name}</h1>

      <button className=' py-2 px-4 bg-red-600 hover:bg-red-800 text-white rounded-md' onClick={logout}>
        logout
      </button>

    </div>
  )
}

export default Home