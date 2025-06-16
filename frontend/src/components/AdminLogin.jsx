import React, { useState } from 'react'

import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import getBaseUrl from '../utils/baseURL';


const AdminLogin = () => {

    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    const { 
            register,
            handleSubmit,
            watch, 
            formState: { errors },
        
        } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
            try{
                const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                    }}
                );
                const auth = response.data;

                if(auth.token){
                    localStorage.setItem('token', auth.token);
                    setTimeout(() => {
                        localStorage.removeItem('token');
                        alert("Session expired. Please login again.");
                        navigate("/admin");
                    }, 3600000); 
                    navigate("/dashboard");
                }

                console.log("Response:", response.data);
                navigate("/dashboard");
              
            }
            catch(error){
              console.error("Login error:", error);
              setMessage("Login failed. Please provide valid email and password");
            }
          };
  return (
    <div className='h-screen flex items-center justify-center'>
        <div className='w-full max-w-sm mx-auto bg-white rounded px-8 pt-6 pb-8 mb-4 shadow-md'>
            <h2 className='text-xl font-semibold mb-4'>Admin Dashboard Login</h2>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'> Username</label>
                    <input 
                    {...register("username", { required: true})}
                    type='text' name='username' id='username' placeholder='Username' className='shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'> Password</label>
                    <input 
                    {...register("password", { required: true})}
                    type='password' name='password' id='password' placeholder='Password' className='shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
                </div>
                { message && <p className='text-red-500 text-sx italic mb-3'>{message}</p>}



                <div className=' items-center justify-between'> 
                    <button type="submit" className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline' >
                        Login
                    </button>
                </div>
            </form>

            {/* <p className='align-baseline mt-4 text-sm'> Haven't an Account? Please <Link to={'/register'} className='text-blue-500 hover:text-blue-800'>Register</Link></p>
             */}
 
        </div>
    </div>
  )
}

export default AdminLogin