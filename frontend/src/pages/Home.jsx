import React from 'react'
import { useLogoutMutation } from '../store/auth'
import { useDispatch } from 'react-redux'
import { clearAuthData } from '../store/AuthReducer'

const Home = () => {
  const [Logout, { data, error, isLoading }] = useLogoutMutation()
  const dispatch = useDispatch()


  const logout = async () => {

    await Logout()

    dispatch(clearAuthData())
  }

  return (
    <div>

      <button onClick={logout}>
        logout
      </button>

    </div>
  )
}

export default Home