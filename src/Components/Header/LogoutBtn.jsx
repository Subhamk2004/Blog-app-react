import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../Store/authSlice'

function LogoutBtn() {
    let dispatch = useDispatch()
    let logoutHandler = () => {
        authService.logout()
       .then(()=>{
        dispatch(logout())
       })
    }

  return (
    <button className=' rounded-xl inline-block p-2 to-blue-400'>
        Logout
    </button>
  )
}

export default LogoutBtn