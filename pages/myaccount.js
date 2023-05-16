import React, { useState, useEffect } from 'react'
import mongoose from "mongoose"
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const jwt = require('jsonwebtoken');

const Myaccount = ({ userdetail,user }) => {
  const router = useRouter()
  const [name, setName] = useState(userdetail.name)
  const [email, setEmail] = useState(userdetail.email)
  const [phone, setPhone] = useState(userdetail.phone)
  const [password, setPassword] = useState('')
  const [passwordlen, setPasswordLen] = useState(userdetail.decrypttext)
  const [edit1, setEdit1] = useState(false)
  const [edit2, setEdit2] = useState(false)
  const [edit3, setEdit3] = useState(false)
  const [edit4, setEdit4] = useState(false)

  useEffect(() => {
    if (userdetail.success != true) {
      router.push('/')
    }
  }, [])

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
    let updateData = { oemail: userdetail.email, name, phone: userdetail.phone, email: userdetail.email,password:userdetail.password }

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
    }else{
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
    let updateData = { oemail: userdetail.email, name: userdetail.name, phone, email: userdetail.email, password:userdetail.password }

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
    }else{
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
    let updateData = { oemail: userdetail.email, name: userdetail.name, phone: userdetail.phone, email,password:userdetail.password }

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
    }else{
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
    let updateData = { oemail: userdetail.email, name: userdetail.name, phone: userdetail.phone, email: userdetail.email,password }

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
      user.value=null
      toast.success('Your password is updated successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }else{
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
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="heading mt-10"><h2 className="text-xl text-center font-bold leading-7 text-gray-900  sm:text-3xl sm:tracking-tight">
        My Account
      </h2></div>
      <div className="m-5 mt-10 md:mt-20 md:m-14 px-0 md:px-5 md:mb-40">

        <div className="overflow-hidden bg-white shadow sm:rounded-lg">

          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">User Details</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and delivery address.</p>
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
                        <button hidden={edit1 ? true : false} onClick={() => { setEdit1(true) }} className=" font-medium text-green-600 hover:text-green-500">
                          Edit
                        </button>
                        <button hidden={edit1 ? false : true} onClick={handleCancel1} className="mr-8 font-medium text-green-600 hover:text-green-500">
                          Cancel
                        </button>
                        <button hidden={edit1 ? false : true} onClick={handleUpdate1} className=" font-medium text-green-600 hover:text-green-500">
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
                        <button hidden={edit2 ? true : false} onClick={() => { setEdit2(true) }} className=" font-medium text-green-600 hover:text-green-500">
                          Edit
                        </button>
                        <button hidden={edit2 ? false : true} onClick={handleCancel2} className="mr-8 font-medium text-green-600 hover:text-green-500">
                          Cancel
                        </button>
                        <button hidden={edit2 ? false : true} onClick={handleUpdate2} className=" font-medium text-green-600 hover:text-green-500">
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
                        <button hidden={edit3 ? true : false} onClick={() => { setEdit3(true) }} className=" font-medium text-green-600 hover:text-green-500">
                          Edit
                        </button>
                        <button hidden={edit3 ? false : true} onClick={handleCancel3} className="mr-8 font-medium text-green-600 hover:text-green-500">
                          Cancel
                        </button>
                        <button hidden={edit3 ? false : true} onClick={handleUpdate3} className=" font-medium text-green-600 hover:text-green-500">
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
                        <button hidden={edit4 ? true : false} onClick={() => { setEdit4(true) }} className=" font-medium text-green-600 hover:text-green-500">
                          Edit
                        </button>
                        <button hidden={edit4 ? false : true} onClick={handleCancel4} className="mr-8 font-medium text-green-600 hover:text-green-500">
                          Cancel
                        </button>
                        <button hidden={edit4 ? false : true} onClick={handleUpdate4} className=" font-medium text-green-600 hover:text-green-500">
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
    </>
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
    props: { userdetail: res }, // will be passed to the page component as props
  }
}

export default Myaccount

