import React, { useState,useEffect } from 'react'
import mongoose from "mongoose"
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'

const Forgotpassword = ({tokenverify}) => {
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')
  const [valuecheck, setValueCheck] = useState(false)
  const router = useRouter()
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  useEffect(() => {
    if(localStorage.getItem("myuser")){
      router.push('/')
    }
    if(tokenverify.success!=true){
        router.push('/')
    }
  }, [])
  
  const handleChange = (e) => {
    if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
    if (e.target.name == 'cpassword') {
        setCPassword(e.target.value)
      }
  }

  const inputValueCheck = (e) =>{
    if(password!=cpassword){
      toast.error('Password are not match', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else if(!regex.test(password)){
      toast.error('Please enter a strong password', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else{
      setValueCheck(true)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    inputValueCheck()

    if(valuecheck){
      let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/resetpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
  
        },
        body: JSON.stringify({token:tokenverify.token, email: tokenverify.useremail,password:cpassword })
      });
  
      let res = await data.json()
  
      if (res.success == true) {
        setPassword('')
        setCPassword('')
        router.push('/login')
        toast.success(res.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }else{
        setPassword('')
        setCPassword('')
        toast.error(res.message, {
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
  }

  return (
    <div>
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
      <div className="relative flex flex-col justify-center h-[85vh] overflow-hidden">
        <section>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full p-6 bg-white rounded-lg md:mt-0 sm:max-w-md  sm:p-8">
              <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center mb-24">
                Reset Your Password
              </h2>
              <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    New Password
                  </label>
                  <input onChange={handleChange} type="password" value={password} name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required=""
                  />
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 mt-5"
                  >
                    Confirm New Password
                  </label>
                  <input onChange={handleChange} type="password" value={cpassword} name="cpassword"
                    id="cpassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required=""
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Reset Password
                </button>
              </form>
              <p className="text-sm font-light text-gray-700 mt-3">
                Return to login? <span className="font-medium text-primary-600 hover:underline"><Link href={'/login'} >Sign in</Link></span>
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI)
    }
  
    let token = context.query.resettoken
    let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/authtoken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
  
        },
        body: JSON.stringify({ token: token })
      });
        
      let res = await data.json()
  
    // let res = await data.json()
    return {
      props: { tokenverify:res }, // will be passed to the page component as props
    }
  }

export default Forgotpassword