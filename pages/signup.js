import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from "jwt-decode"

const Signup = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [valuecheck, setValueCheck] = useState(false)
  const [passwordshow, setPasswordshow] = useState("true");
  const [passwordicon, setPasswordicon] = useState("true");
  const [confirmpasswordshow, setConfirmPasswordshow] = useState("true");
  const [confirmpasswordicon, setConfirmPasswordicon] = useState("true");
  const router = useRouter()
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  
  useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
        /* global google*/

        const handleCallbackRespnse = async (res) => {
            if (res) {
                let decoded_res = jwt_decode(res.credential)

                let pass = generatePassword();
                let data = { email: decoded_res.email, name: decoded_res.name, password: pass }

                try{
                let result = await fetch(`${NEXT_PUBLIC_HOST}/api/googlesignin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'

                    },
                    body: JSON.stringify(data)
                });

                let response = await result.json()

                if (response.success) {
                    localStorage.setItem("myuser", JSON.stringify({ token: response.token, email: response.email }))
                    toast.success('Successfully logged in', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
        
                    setTimeout(() => {
                        router.push('/')
                    }, 2000);
        
                }
                else {
                    toast.error('Invalid Credentials', {
                        position: "top-center",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }}
                catch(error){
                  toast.error('Error occured! Please try again after some time', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                }
            } else {
                toast.error('Error occured! Please try again after some time', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }

        google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            callback: handleCallbackRespnse
        });
        
        google.accounts.id.renderButton(
            document.getElementById("g_id_signin"),
            { theme: "filled_blue", size: "large" }
        )

        // eslint-disable-next-line
    }
}, [])


const generatePassword = () => {
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const specials = '!@#$%^&*()_+-={}[]|:;"<>,.?/';
  const passwordLength = 12; // Set the desired password length here

  let password = '';
  let lowercaseCount = 0;
  let uppercaseCount = 0;
  let numberCount = 0;
  let specialCount = 0;

  while (password.length < passwordLength) {
      const characterType = Math.floor(Math.random() * 4);
      let newCharacter = '';

      if (characterType === 0 && lowercaseCount < 1) {
          newCharacter = lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
          lowercaseCount++;
      } else if (characterType === 1 && uppercaseCount < 1) {
          newCharacter = uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
          uppercaseCount++;
      } else if (characterType === 2 && numberCount < 1) {
          newCharacter = numbers[Math.floor(Math.random() * numbers.length)];
          numberCount++;
      } else if (characterType === 3 && specialCount < 1) {
          newCharacter = specials[Math.floor(Math.random() * specials.length)];
          specialCount++;
      } else {
          newCharacter = String.fromCharCode(Math.floor(Math.random() * 94) + 33);
      }

      password += newCharacter;
  }

  return password;
}

  const handlePassShow = () => {
    setPasswordicon(!passwordicon);
    setPasswordshow(!passwordshow)
  }

  const handleConfirmPassShow = () => {
    setConfirmPasswordicon(!confirmpasswordicon);
    setConfirmPasswordshow(!confirmpasswordshow)
  }

  const handleChange = (e) => {
    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.name == 'confirmpassword') {
      setConfirmPassword(e.target.value)
    }
  }

  const fieldValueCheck = () =>{

    if(name.length<3){
      toast.error('Name length should be greater than 3', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else if(phone.length!=10){
      toast.error('Please enter a valid phone number', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else if(password!=confirmpassword){
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

    fieldValueCheck();

    if (valuecheck) {
      let data = { name, email, phone, password }

      let url = `${process.env.NEXT_PUBLIC_HOST}/api/signup`
      let res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'

        },
        body: JSON.stringify(data)
      });

      let response = await res.json()
      setName('')
      setEmail('')
      setPhone('')
      setPassword('')
      setConfirmPassword('')
      toast.success('Your account created successfully', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }
  return (
    // <div>
    //   <ToastContainer
    //     position="top-center"
    //     autoClose={4000}
    //     hideProgressBar={false}
    //     newestOnTop={false}
    //     closeOnClick
    //     rtl={false}
    //     pauseOnFocusLoss
    //     draggable
    //     pauseOnHover
    //   />
    //   <div className="relative flex flex-col justify-center h-[85vh] overflow-hidden">
    //     <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
    //       <h1 className="text-3xl font-semibold text-center text-green-700 underline">
    //         Sign up
    //       </h1>
    //       <form onSubmit={handleSubmit} className="mt-6">
    //         <div className="mb-2">
    //           <label
    //             htmlFor="name"
    //             className="block text-sm font-semibold text-gray-800"
    //           >
    //             Name
    //           </label>
    //           <input
    //             onChange={handleChange} value={name} type="text" name='name'
    //             className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
    //           />
    //         </div>
    //         <div className="mb-2">
    //           <label
    //             htmlFor="email"
    //             className="block text-sm font-semibold text-gray-800"
    //           >
    //             Email
    //           </label>
    //           <input
    //             onChange={handleChange} value={email} type="email" name='email'
    //             className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
    //           />
    //         </div>
    //         <div className="mb-2">
    //           <label
    //             htmlFor="phone"
    //             className="block text-sm font-semibold text-gray-800"
    //           >
    //             Contact Number
    //           </label>
    //           <input
    //             onChange={handleChange} value={phone} type="tel" name='phone'
    //             className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
    //           />
    //         </div>
    //         <div className="mb-2">
    //           <label
    //             htmlFor="password"
    //             className="block text-sm font-semibold text-gray-800"
    //           >
    //             Password
    //           </label>
    //           <div className="relative w-full">
    //             <div className="absolute inset-y-0 right-0 flex items-center px-4">
    //               {passwordicon ? <AiFillEye onClick={handlePassShow} className="cursor-pointer text-xl" /> : <AiFillEyeInvisible onClick={handlePassShow} className="cursor-pointer text-xl" />}
    //             </div>
    //             <input onChange={handleChange} value={password} name='password' className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40" id="password" type={passwordshow ? "password" : "text"} autoComplete="off"
    //             />
    //           </div>
    //         </div>
    //         <div className="mt-6">
    //           <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
    //             Sign Up
    //           </button>
    //         </div>
    //       </form>

    //       <p className="mt-8 text-xs font-normal text-center text-green-800">
    //         Already have an account?
    //         <Link href={'/login'}>
    //           <span className='font-bold cursor-pointer'>Sign in</span>
    //         </Link>
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <div className='pt-14 lg:pt-3'>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <link
        href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
        rel="stylesheet"
      />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,maximum-scale=1"
      />
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n      body {\n        font-family: "Inter", sans-serif;\n      }\n    '
        }}
      />
      <div className="max-w-screen m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                `url("https://firebasestorage.googleapis.com/v0/b/fir-243cd.appspot.com/o/Signup%2Fmyimage.svg?alt=media&token=70127163-0f3f-451e-b37a-d22b98eb1b7e")`
            }}
          />
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Sign Up
            </h1>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <div id="g_id_signin" className='g_id_signin social-google'> </div>
                {/* <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                    <div className="bg-white p-1 rounded-full">
                      <svg className="w-6" viewBox="0 0 32 32">
                        <path
                          fillRule="evenodd"
                          d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
                        />
                      </svg>
                    </div>
                    <span className="ml-4">Sign Up with GitHub</span>
                  </button> */}
              </div>
              <div className="my-6 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign up with e-mail
                </div>
              </div>
              <div className="mx-auto max-w-xs">
                <input onChange={handleChange} value={name} name='name'
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Name"
                />
                <input onChange={handleChange} value={email} name='email'
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="email"
                  placeholder="Email"
                />
                <input onChange={handleChange} value={phone} name='phone'
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="tel"
                  placeholder="Contact Number"
                />

                <input onChange={handleChange} value={password} name='password'
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type={passwordshow ? "password" : "text"}
                  placeholder="Password"
                />
                {passwordicon ? <AiFillEye onClick={handlePassShow} className="absolute -mt-9 ml-72 cursor-pointer text-xl" /> : <AiFillEyeInvisible onClick={handlePassShow} className="cursor-pointer text-xl absolute -mt-9 ml-72" />}
                <input onChange={handleChange} value={confirmpassword} name='confirmpassword'
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type={confirmpasswordshow ? "password" : "text"}
                  placeholder="Confirm Password"
                />
                {confirmpasswordicon ? <AiFillEye onClick={handleConfirmPassShow} className="absolute -mt-9 ml-72 cursor-pointer text-xl" /> : <AiFillEyeInvisible onClick={handleConfirmPassShow} className="cursor-pointer text-xl absolute -mt-9 ml-72" />}

                <button onClick={handleSubmit} className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy={7} r={4} />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>

                  <span className="ml-3">Sign Up</span>
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-3">
                  Already have an account? <span className="font-medium text-primary-600 hover:underline dark:text-primary-500"><Link href={'/login'}>Login here</Link></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
