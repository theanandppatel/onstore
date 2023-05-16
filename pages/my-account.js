import React, { useState, useEffect } from 'react'
import mongoose from "mongoose"
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
const jwt = require('jsonwebtoken');

const Myaccount = ({ logout, userdetail, user, token }) => {

    const [active, setActive] = useState('dashboard')
    const [name, setName] = useState(userdetail.name)
    const [email, setEmail] = useState(userdetail.email)
    const [phone, setPhone] = useState(userdetail.phone)
    const [password, setPassword] = useState('')
    const [passwordlen, setPasswordLen] = useState(userdetail.decrypttext)
    const [edit1, setEdit1] = useState(false)
    const [edit2, setEdit2] = useState(false)
    const [edit3, setEdit3] = useState(false)
    const [edit4, setEdit4] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (userdetail.success != true) {
            router.push('/')
        }
    }, [])


    const handleLogout = () => {
        logout()

        toast.success('Your successfully logged out', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const handleOrdersClick = () => {
        router.push('/orders?usertoken=' + token)
    }

    const handleChange = (e) => {
        if (e.target.name == 'name') {
            setName(e.target.value)
        } else if (e.target.name == 'phone') {
            setPhone(e.target.value)
        } else if (e.target.name == 'email') {
            setEmail(e.target.value)
        } else if (e.target.name == 'password') {
            setPassword(e.target.value)
        }
    }

    const handleCancel1 = () => {
        setName(userdetail.name)
        setEdit1(false)
    }

    const handleCancel2 = () => {
        setPhone(userdetail.phone)
        setEdit2(false)
    }
    const handleCancel3 = () => {
        setEmail(userdetail.email)
        setEdit3(false)
    }
    const handleCancel4 = () => {
        setEdit4(false)
    }

    const handleUpdate1 = async () => {
        let updateData = { oemail: userdetail.email, name, phone: userdetail.phone, email: userdetail.email, password: userdetail.password }

        let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ updateData: updateData })
        });

        let res = await data.json()
        if (res.success == true) {
            setEdit1(false)
            setName(res.name)
            toast.success('Your name is updated successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error('Some error occured, Try again!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const handleUpdate2 = async () => {
        let updateData = { oemail: userdetail.email, name: userdetail.name, phone, email: userdetail.email, password: userdetail.password }

        let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ updateData: updateData })
        });

        let res = await data.json()
        if (res.success == true) {
            setEdit2(false)
            setPhone(res.phone)
            toast.success('Your contact number is updated successfully ', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error('Some error occured, Try again!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    const handleUpdate3 = async () => {
        let updateData = { oemail: userdetail.email, name: userdetail.name, phone: userdetail.phone, email, password: userdetail.password }

        let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ updateData: updateData })
        });

        let res = await data.json()

        if (res.success == true) {
            setEdit3(false)
            setEmail(res.email)
            localStorage.clear()
            router.push('/')
            toast.success('Your email is updated successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error('Some error occured, Try again!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    const handleUpdate4 = async () => {
        let updateData = { oemail: userdetail.email, name: userdetail.name, phone: userdetail.phone, email: userdetail.email, password }

        let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ updateData: updateData })
        });

        let res = await data.json()

        if (res.success == true) {
            setEdit4(false)
            setPasswordLen(password.length)
            user.value = null
            toast.success('Your password is updated successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error('Some error occured, Try again!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <div className='mb-28'>
            <h1 className='text-4xl font-bold lg:ml-24 pt-32 ml-5'>My Account</h1>
            <div className='lg:flex lg:flex-row gap-48'>
                <div className="h-full p-3 lg:space-y-2 lg:w-60 lg:ml-24 lg:mt-20 mt-10 mb-16 w-full">
                    {/* <div className="flex items-center p-2 space-x-4">
                    <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-12 h-12 rounded-full " />
                    <div>
                        <h2 className="text-lg font-semibold">Leroy Jenkins</h2>
                        <span className="flex items-center space-x-1">
                            <a rel="noopener noreferrer" href="#" className="text-xs hover:underline ">View profile</a>
                        </span>
                    </div>
                </div>
                <div className="divide-y divide-gray-700">
                    <ul className="pt-2 pb-4 space-y-1 text-sm mt-6">
                        <li>
                            <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 opacity-75"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        {/* <li>
                            <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current ">
                                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                </svg>
                                <span>Search</span>
                            </a>
                        </li>
                        <li>
                            <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current ">
                                    <path d="M448.205,392.507c30.519-27.2,47.8-63.455,47.8-101.078,0-39.984-18.718-77.378-52.707-105.3C410.218,158.963,366.432,144,320,144s-90.218,14.963-123.293,42.131C162.718,214.051,144,251.445,144,291.429s18.718,77.378,52.707,105.3c33.075,27.168,76.861,42.13,123.293,42.13,6.187,0,12.412-.273,18.585-.816l10.546,9.141A199.849,199.849,0,0,0,480,496h16V461.943l-4.686-4.685A199.17,199.17,0,0,1,448.205,392.507ZM370.089,423l-21.161-18.341-7.056.865A180.275,180.275,0,0,1,320,406.857c-79.4,0-144-51.781-144-115.428S240.6,176,320,176s144,51.781,144,115.429c0,31.71-15.82,61.314-44.546,83.358l-9.215,7.071,4.252,12.035a231.287,231.287,0,0,0,37.882,67.817A167.839,167.839,0,0,1,370.089,423Z"></path>
                                    <path d="M60.185,317.476a220.491,220.491,0,0,0,34.808-63.023l4.22-11.975-9.207-7.066C62.918,214.626,48,186.728,48,156.857,48,96.833,109.009,48,184,48c55.168,0,102.767,26.43,124.077,64.3,3.957-.192,7.931-.3,11.923-.3q12.027,0,23.834,1.167c-8.235-21.335-22.537-40.811-42.2-56.961C270.072,30.279,228.3,16,184,16S97.928,30.279,66.364,56.206C33.886,82.885,16,118.63,16,156.857c0,35.8,16.352,70.295,45.25,96.243a188.4,188.4,0,0,1-40.563,60.729L16,318.515V352H32a190.643,190.643,0,0,0,85.231-20.125,157.3,157.3,0,0,1-5.071-33.645A158.729,158.729,0,0,1,60.185,317.476Z"></path>
                                </svg>
                                <span>Chat</span>
                            </a>
                        </li> */}
                    {/* <li>
                            <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current ">
                                    <path d="M203.247,386.414,208,381.185V355.4L130.125,191H93.875L16,355.4v27.042l4.234,4.595a124.347,124.347,0,0,0,91.224,39.982h.42A124.343,124.343,0,0,0,203.247,386.414ZM176,368.608a90.924,90.924,0,0,1-64.231,26.413h-.33A90.907,90.907,0,0,1,48,369.667V362.6l64-135.112L176,362.6Z"></path>
                                    <path d="M418.125,191h-36.25L304,355.4v27.042l4.234,4.595a124.347,124.347,0,0,0,91.224,39.982h.42a124.343,124.343,0,0,0,91.369-40.607L496,381.185V355.4ZM464,368.608a90.924,90.924,0,0,1-64.231,26.413h-.33A90.907,90.907,0,0,1,336,369.667V362.6l64-135.112L464,362.6Z"></path>
                                    <path d="M272,196.659A56.223,56.223,0,0,0,309.659,159H416V127H309.659a55.991,55.991,0,0,0-107.318,0H96v32H202.341A56.223,56.223,0,0,0,240,196.659V463H136v32H376V463H272ZM232,143a24,24,0,1,1,24,24A24,24,0,0,1,232,143Z"></path>
                                </svg>
                                <span>Orders</span>
                            </a>
                        </li> */}
                    {/* <li>
                            <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current ">
                                    <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                                </svg>
                                <span>Wishlist</span>
                            </a>
                        </li> */}
                    {/* <li>
                            <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current ">
                                    <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                                    <rect width="32" height="64" x="256" y="232"></rect>
                                </svg>
                                <span>Logout</span>
                            </a>
                        </li> */}
                    {/* </ul> */}
                    {/* <ul className="pt-4 pb-2 space-y-1 text-sm">
                        <li>
                            <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current ">
                                    <path d="M245.151,168a88,88,0,1,0,88,88A88.1,88.1,0,0,0,245.151,168Zm0,144a56,56,0,1,1,56-56A56.063,56.063,0,0,1,245.151,312Z"></path>
                                    <path d="M464.7,322.319l-31.77-26.153a193.081,193.081,0,0,0,0-80.332l31.77-26.153a19.941,19.941,0,0,0,4.606-25.439l-32.612-56.483a19.936,19.936,0,0,0-24.337-8.73l-38.561,14.447a192.038,192.038,0,0,0-69.54-40.192L297.49,32.713A19.936,19.936,0,0,0,277.762,16H212.54a19.937,19.937,0,0,0-19.728,16.712L186.05,73.284a192.03,192.03,0,0,0-69.54,40.192L77.945,99.027a19.937,19.937,0,0,0-24.334,8.731L21,164.245a19.94,19.94,0,0,0,4.61,25.438l31.767,26.151a193.081,193.081,0,0,0,0,80.332l-31.77,26.153A19.942,19.942,0,0,0,21,347.758l32.612,56.483a19.937,19.937,0,0,0,24.337,8.73l38.562-14.447a192.03,192.03,0,0,0,69.54,40.192l6.762,40.571A19.937,19.937,0,0,0,212.54,496h65.222a19.936,19.936,0,0,0,19.728-16.712l6.763-40.572a192.038,192.038,0,0,0,69.54-40.192l38.564,14.449a19.938,19.938,0,0,0,24.334-8.731L469.3,347.755A19.939,19.939,0,0,0,464.7,322.319Zm-50.636,57.12-48.109-18.024-7.285,7.334a159.955,159.955,0,0,1-72.625,41.973l-10,2.636L267.6,464h-44.89l-8.442-50.642-10-2.636a159.955,159.955,0,0,1-72.625-41.973l-7.285-7.334L76.241,379.439,53.8,340.562l39.629-32.624-2.7-9.973a160.9,160.9,0,0,1,0-83.93l2.7-9.972L53.8,171.439l22.446-38.878,48.109,18.024,7.285-7.334a159.955,159.955,0,0,1,72.625-41.973l10-2.636L222.706,48H267.6l8.442,50.642,10,2.636a159.955,159.955,0,0,1,72.625,41.973l7.285,7.334,48.109-18.024,22.447,38.877-39.629,32.625,2.7,9.972a160.9,160.9,0,0,1,0,83.93l-2.7,9.973,39.629,32.623Z"></path>
                                </svg>
                                <span>Settings</span>
                            </a>
                        </li>
                        
                    </ul> */}
                    {/* </div>  */}

                    <nav aria-label="Main Nav" className="flex flex-col bg-gray-100">
                        <button
                            className={`flex items-center gap-2 border-l-[3px] ${active == "dashboard" ? "border-blue-500 bg-blue-50 px-4 py-3 text-blue-700" : "border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700"}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                                <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                            </svg>

                            <span className="text-sm font-medium"> Dashboard </span>
                        </button>

                        <button onClick={handleOrdersClick} className={`flex items-center gap-2 border-l-[3px] ${active == "orders" ? "border-blue-500 bg-blue-50 px-4 py-3 text-blue-700" : "border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current ">
                                    <path d="M203.247,386.414,208,381.185V355.4L130.125,191H93.875L16,355.4v27.042l4.234,4.595a124.347,124.347,0,0,0,91.224,39.982h.42A124.343,124.343,0,0,0,203.247,386.414ZM176,368.608a90.924,90.924,0,0,1-64.231,26.413h-.33A90.907,90.907,0,0,1,48,369.667V362.6l64-135.112L176,362.6Z"></path>
                                    <path d="M418.125,191h-36.25L304,355.4v27.042l4.234,4.595a124.347,124.347,0,0,0,91.224,39.982h.42a124.343,124.343,0,0,0,91.369-40.607L496,381.185V355.4ZM464,368.608a90.924,90.924,0,0,1-64.231,26.413h-.33A90.907,90.907,0,0,1,336,369.667V362.6l64-135.112L464,362.6Z"></path>
                                    <path d="M272,196.659A56.223,56.223,0,0,0,309.659,159H416V127H309.659a55.991,55.991,0,0,0-107.318,0H96v32H202.341A56.223,56.223,0,0,0,240,196.659V463H136v32H376V463H272ZM232,143a24,24,0,1,1,24,24A24,24,0,0,1,232,143Z"></path>
                                </svg>

                                <span className="text-sm font-medium"> Orders </span>
                        </button>

                        <button onClick={handleLogout}
                            className={`flex items-center gap-2 border-l-[3px] ${active == "logout" ? "border-blue-500 bg-blue-50 px-4 py-3 text-blue-700" : "border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700"}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current ">
                                <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                                <rect width="32" height="64" x="256" y="232"></rect>
                            </svg>

                            <span className="text-sm font-medium"> Logout </span>
                        </button>
                    </nav>


                </div>
                <div className="overflow-hidden bg-white shadow sm:rounded-lg w-full lg:w-2/4 mt-10 lg:mt-24 mb-32 mx-5 lg:mx-0">

                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">User Details</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">You can update your name, email, contact number and password here.</p>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul role="list">
                                        <li className="md:flex items-center justify-between pr-4 text-sm">
                                            <div className="flex w-full md:w-0 flex-1 items-center">
                                                <span hidden={edit1 ? true : false} >{name}</span>
                                                <input hidden={edit1 ? false : true} onChange={handleChange} value={name} name='name' type="text" className='px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-500 leading-4 text-base placeholder-gray-600 py-2 w-72' placeholder='Enter your name here' />
                                            </div>
                                            <div className="ml-0 md:ml-4 flex-shrink-0 mt-4 md:mt-0">
                                                <button hidden={edit1 ? true : false} onClick={() => { setEdit1(true) }} className=" font-medium text-blue-600 hover:text-blue-500">
                                                    Edit
                                                </button>
                                                <button hidden={edit1 ? false : true} onClick={handleCancel1} className="mr-8 font-medium text-blue-600 hover:text-blue-500">
                                                    Cancel
                                                </button>
                                                <button hidden={edit1 ? false : true} onClick={handleUpdate1} className=" font-medium text-blue-600 hover:text-blue-500">
                                                    Update
                                                </button>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Contact Number</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul role="list">
                                        <li className="md:flex items-center justify-between pr-4 text-sm">
                                            <div className="flex w-full md:w-0 flex-1 items-center">
                                                <span hidden={edit2 ? true : false} >{phone}</span>
                                                <input hidden={edit2 ? false : true} onChange={handleChange} value={phone} name='phone' type="number" className='px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-500 leading-4 text-base placeholder-gray-600 py-2 w-72' placeholder='Enter your contact number here' />
                                            </div>
                                            <div className="ml-0 md:ml-4 flex-shrink-0 mt-4 md:mt-0">
                                                <button hidden={edit2 ? true : false} onClick={() => { setEdit2(true) }} className=" font-medium text-blue-600 hover:text-blue-500">
                                                    Edit
                                                </button>
                                                <button hidden={edit2 ? false : true} onClick={handleCancel2} className="mr-8 font-medium text-blue-600 hover:text-blue-500">
                                                    Cancel
                                                </button>
                                                <button hidden={edit2 ? false : true} onClick={handleUpdate2} className=" font-medium text-blue-600 hover:text-blue-500">
                                                    Update
                                                </button>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul role="list">
                                        <li className="md:flex items-center justify-between pr-4 text-sm">
                                            <div className="flex w-full md:w-0 flex-1 items-center">
                                                <span hidden={edit3 ? true : false} >{email}</span>
                                                <input hidden={edit3 ? false : true} onChange={handleChange} value={email} name='email' type="email" className='px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-500 leading-4 text-base placeholder-gray-600 py-2 w-72' placeholder='Enter your email here' />
                                            </div>
                                            <div className="ml-0 md:ml-4 flex-shrink-0 mt-4 md:mt-0">
                                                <button hidden={edit3 ? true : false} onClick={() => { setEdit3(true) }} className=" font-medium text-blue-600 hover:text-blue-500">
                                                    Edit
                                                </button>
                                                <button hidden={edit3 ? false : true} onClick={handleCancel3} className="mr-8 font-medium text-blue-600 hover:text-blue-500">
                                                    Cancel
                                                </button>
                                                <button hidden={edit3 ? false : true} onClick={handleUpdate3} className=" font-medium text-blue-600 hover:text-blue-500">
                                                    Update
                                                </button>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Password</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul role="list">
                                        <li className="md:flex items-center justify-between pr-4 text-sm">
                                            <div className="flex w-full md:w-0 flex-1 items-center">
                                                <span hidden={edit4 ? true : false} >{'*'.repeat(passwordlen)}</span>
                                                <input hidden={edit4 ? false : true} onChange={handleChange} value={password} name='password' type="password" className='px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-500 leading-4 text-base placeholder-gray-600 py-2 w-72' placeholder='Enter your password here' />
                                            </div>
                                            <div className="ml-0 md:ml-4 flex-shrink-0 mt-4 md:mt-0">
                                                <button hidden={edit4 ? true : false} onClick={() => { setEdit4(true) }} className=" font-medium text-blue-600 hover:text-blue-500">
                                                    Edit
                                                </button>
                                                <button hidden={edit4 ? false : true} onClick={handleCancel4} className="mr-8 font-medium text-blue-600 hover:text-blue-500">
                                                    Cancel
                                                </button>
                                                <button hidden={edit4 ? false : true} onClick={handleUpdate4} className=" font-medium text-blue-600 hover:text-blue-500">
                                                    Update
                                                </button>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </div>
                            {/* <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">$120,000</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">About</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                  qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                  pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                </dd>
              </div> */}
                            {/* <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <span className="ml-2 w-0 flex-1 truncate">resume_back_end_developer.pdf</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                          Download
                        </a>
                      </div>
                    </li>
                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <span className="ml-2 w-0 flex-1 truncate">coverletter_back_end_developer.pdf</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                          Download
                        </a>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div> */}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }

    let usertoken = context.query.usertoken

    let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/authuser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({ token: usertoken })
    });

    let res = await data.json()
    return {
        props: { userdetail: res, token: usertoken }, // will be passed to the page component as props
    }
}

export default Myaccount
