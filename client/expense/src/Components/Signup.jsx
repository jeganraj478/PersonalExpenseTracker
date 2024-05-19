import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [email,setEmail]=useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate=useNavigate();

    const[animate,setAnimate]=useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (email.trim()==='' || username.trim() === '' || password.trim() === '') {
                return toast.error("Enter Details")
            }
            setAnimate(true)
            const response = await axios.post("http://localhost:3001/signup",{email,username,password})
            const { token, id, message } = response.data
            localStorage.setItem("token", token)
            localStorage.setItem("userId", id)
    
            toast.success(message)
            setAnimate(false)
            setTimeout(()=>{
                navigate('/budget')

            },3000)
        } catch (error) {
            setAnimate(false)
            toast.error(error.message)
        }


    }
    return (
        <>
        <ToastContainer></ToastContainer>
        <div className='relative flex flex-col justify-center items-center h-screen bg-violet-200 overflow-hidden'>

            <div className='absolute flex z-10  w-96 flex-col rounded-lg bg-white bg-clip-border border-t-4 border-t-green-500 text-gray-700 shadow-md sm:w-5/6'>
                <h3 className="pt-2 pb-3 mx-7 my-4 text-center text-3xl font-bold text-green-500 border-b-2 border-gray-200 sm:text-sm">
                    SIGN UP
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 p-6">
                        <div className="relative h-11 w-full">
                            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}
                                className="peer h-full w-full rounded-md border border-blue-gray-200  bg-transparent px-3 py-3 sm:text-xs
                            text-sm  text-blue-gray-700 outline outline-0 transition-all 
                            placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px]  leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Username
                            </label>
                        </div>
                        <div className="relative h-11 w-full">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                className="peer h-full w-full rounded-md border border-blue-gray-200  bg-transparent px-3 py-3 text-sm  text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px]  leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Email
                            </label>
                        </div>
                        <div className="relative h-11 w-full">
                            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}
                                className="peer h-full w-full rounded-md border border-blue-gray-200  bg-transparent px-3 py-3 text-sm  text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px]  leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-grren-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Password
                            </label>
                        </div>
                    </div>
                    <div className="px-6 pt-0">
                        <button type="submit"
                            className="flex justify-center gap-2 w-full select-none rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 sm:py-2 px-6  text-xs  font-bold uppercase text-white shadow-md shadow-purple-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"

                            data-ripple-light="true"
                        > { animate && <svg className="animate-spin h-5 w-5  bg-inherit border-4 rounded-full border-x-blue-400 border-t-blue-400" viewBox="0 0 24 24">
                        </svg>  }
                            Sign Up
                        </button></div>
                </form>
                <div className="p-6 pt-0">
                    <p className="mt-6 flex justify-center text-sm font-light leading-normal text-inherit antialiased sm:text-xs">
                        Already have a Account ?
                        <Link to='/'
                            className=" ml-1 block text-sm sm:text-xs font-bold  cursor-pointer leading-normal text-green-500 antialiased"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Signup;