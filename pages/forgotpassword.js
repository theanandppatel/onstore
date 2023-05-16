import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'

const Forgotpassword = () => {
  const [email, setEmail] = useState('')
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem("myuser")) {
      router.push('/')
    }
  }, [])

  const handleChange = (e) => {
    if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/sendresetlink`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'

      },
      body: JSON.stringify({ email: email })
    });

    let res = await data.json()

    if (res.success == true) {
      setEmail('')
      toast.success(res.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setEmail('')
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
      <div className="relative flex flex-col justify-center h-[85vh] overflow-hidden pt-24 mb-20">
        <section>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full p-6 bg-white rounded-lg md:mt-0 sm:max-w-md  sm:p-8">
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                Forgot Password
              </h2>
              <p className='text-gray-500 text-center mb-14'>Enter your email and we'll send you a link to reset your password.</p>
              <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <input onChange={handleChange} value={email}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required=""
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Send Reset Password Link
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

export default Forgotpassword

