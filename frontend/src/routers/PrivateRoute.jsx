import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {

    const {currentUser,loading} = useAuth();

    if(loading) {
        return <div className='text-center mt-10'>Loading...</div>
    }
    if(currentUser){
        return children;
    } 
    else
    return  <Navigate to='/login' />
  
}

export default PrivateRoute