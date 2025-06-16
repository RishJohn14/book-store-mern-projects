import React, { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';



const Login = () => {
    const [message, setMessage] = useState('');
    const { 
        register,
        handleSubmit,
        watch, 
        formState: { errors },
    
    } = useForm()

    const {loginUser, googleUser} = useAuth();
    const navigate = useNavigate();


    const onSubmit = async (data) => {
      try{
        await loginUser(data.email, data.password);
        alert("Login successful.");
        navigate("/");
      }
      catch(error){
        console.error("Login error:", error);
        setMessage("Login failed. Please provide valid email and password");
      }
    };

    const handleGoogleSignIn = async () => {
      // Implement Google Sign-In logic here
      try{
        await googleUser();
        alert("Google Sign-In successful.");
        navigate("/");
      }
      catch(error){
        alert("Google Sign-In failed. Please try again.");
        console.error("Google Sign-In error:", error);
        setMessage("Google Sign-In failed. Please try again.");
      }
      console.log("Google Sign-In clicked");
    } 


  return (
    <div className='h-[calc(100vh-120px)] flex items-center justify-center'>
        <div className='w-full max-w-sm mx-auto bg-white rounded px-8 pt-6 pb-8 mb-4 shadow-md'>
            <h2 className='text-xl font-semibold mb-4'>Please Login</h2>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'> Email</label>
                    <input 
                    {...register("email", { required: true})}
                    type='email' name='email' id='email' placeholder='Email Address' className='shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'> Password</label>
                    <input 
                    {...register("password", { required: true})}
                    type='password' name='password' id='password' placeholder='Password' className='shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
                </div>
                { message && <p className='text-red-500 text-sx italic mb-3'>{message}</p>}



                <div> 
                    <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline' >
                        Login
                    </button>
                </div>
            </form>

            <p className='align-baseline mt-4 text-sm'> Haven't an Account? Please <Link to={'/register'} className='text-blue-500 hover:text-blue-800'>Register</Link></p>
            
            {/* Google Sign in 
             */}

             <div className='mt-8'>
                <button 
                onClick={handleGoogleSignIn}
                
                className='flex cursor-pointer flex-wrap items-center justify-center gap-2 bg-[#0D0842] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4'>
                    <FaGoogle className='mr-2' />
                    Sign in with Google
                </button>
             </div>

             <p className='mt-5 text-center text-gray-500 text-xs '> @2025 Book Store. All rights reserved</p>

 
        </div>
    </div>
  )
}

export default Login