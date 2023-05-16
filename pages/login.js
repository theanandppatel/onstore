import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { getToken } from "next-auth/jwt"
import Head from 'next/head'
import jwt_decode from "jwt-decode"

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordshow, setPasswordshow] = useState("true")
    const [passwordicon, setPasswordicon] = useState("true")
    const [user, setUser] = useState()

    useEffect(() => {
        if (localStorage.getItem('myuser')) {
            router.push('/')
        }
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

                    let result = await fetch(`http://localhost:3000/api/googlesignin`, {
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

            google.accounts.id.renderButton(
                document.getElementById("g_id_signin"),
                { theme: "filled_blue", size: "large" }
            )
            google.accounts.id.initialize({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                callback: handleCallbackRespnse
            });

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

    const handleSignIn = async () => {
    }

    const callHandleSignIn = async (e) => {
        e.preventDefault();
        let data1 = await handleGoogleSignIn(e);

        if (data1) {

            const data = { email: session.user.email, name: session.user.name };

            let result = await fetch(`http://localhost:3000/api/googlesignin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify(data)
            });
            let response = await result.json()

            alert(response);
        } else {
            alert("Oh")
        }
    }
    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        let res = await signIn("google");
        // if (response && response.success) {
        //   console.log(response.message);
        //   // Do something with the message
        // } else {
        //   console.error('Sign-in failed.');
        // }
        // wrap the signIn function in a Promise







        // if(session){
        //     let res = await fetch(`http://localhost:3000/api/googlesignin`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'

        //         },
        //         body: JSON.stringify(data)
        //     });

        //     let response = await res.json()
        //     console.log("Ola")

        //     if (response.success) {
        //         localStorage.setItem("myuser", JSON.stringify({ token: response.token, email: response.email }))
        //         toast.success('Successfully logged in', {
        //             position: "top-center",
        //             autoClose: 2000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });

        //         setTimeout(() => {
        //             router.push('/')
        //         }, 2000);

        //     }
        //     else {
        //         console.log("Hello")
        //         toast.error('Invalid Credentials', {
        //             position: "top-center",
        //             autoClose: 4000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });
        //     }
        // }
    }

    const handleCallbackRespones = () => {
    }

    const handlePassShow = () => {
        setPasswordicon(!passwordicon);
        setPasswordshow(!passwordshow)
    }

    const handleChange = (e) => {
        if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let data = { email, password }


        let res = await fetch(`http://localhost:3000/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(data)
        });

        let response = await res.json()
        setEmail('')
        setPassword('')
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
        }
    }
    return (
        // <div>
        // <ToastContainer
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
        //   <div className="relative flex flex-col justify-center h-[80vh] overflow-hidden">
        //         <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        //             <h1 className="text-3xl font-semibold text-center text-green-700 underline">
        //                Sign in
        //             </h1>
        //             <form onSubmit={handleSubmit} className="mt-6">
        //                 <div className="mb-2">
        //                     <label
        //                         htmlFor="email"
        //                         className="block text-sm font-semibold text-gray-800"
        //                     >
        //                         Email
        //                     </label>
        //                     <input
        //                         onChange={handleChange} type="email" name='email' value={email}
        //                         className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
        //                     />
        //                 </div>
        //                 <div className="mb-2">
        //                     <label
        //                         htmlFor="password"
        //                         className="block text-sm font-semibold text-gray-800"
        //                     >
        //                         Password
        //                     </label>
        //                     <input
        //                         onChange={handleChange} type="password" name='password' value={password}
        //                         className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
        //                     />
        //                 </div>
        //                 <Link href={'/forgotpassword'}>
        //                     Forgot Password?
        //                 </Link>
        //                 <div className="mt-6">
        //                     <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
        //                         Login
        //                     </button>
        //                 </div>
        //             </form>

        //             <p className="mt-8 text-xs font-normal text-center text-green-700">
        //                 Don&apos;t have an account?
        //                 <Link href={'/signup'}>
        //                 <span className='font-bold cursor-pointer'>Sign up</span>
        //                 </Link>
        //             </p>
        //         </div>
        //     </div>
        // </div>
        <div className='pt-14 lg:pt-3'>
            <Head>
                <Script src="https://accounts.google.com/gsi/client" ></Script>
            </Head>
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

            <Script
                href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
                rel="stylesheet"
            />
            <Script
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
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="mt-5 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Login
                        </h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="flex flex-col items-center" id='sign-with-google'>
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
                                    Or login with e-mail
                                </div>
                            </div>
                            <div className="mx-auto max-w-xs">
                                <input onChange={handleChange} name='email' value={email}
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email"
                                    placeholder="Email"
                                />
                                <input onChange={handleChange} name='password' value={password}
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type={passwordshow ? "password" : "text"}
                                    placeholder="Password"
                                />
                                {passwordicon ? <AiFillEye onClick={handlePassShow} className="absolute -mt-9 ml-72 cursor-pointer text-xl" /> : <AiFillEyeInvisible onClick={handlePassShow} className="cursor-pointer text-xl absolute -mt-9 ml-72" />}
                                <p className='text-blue-700 text-sm mt-3'><Link href={'/forgotpassword'}>Forgot Password?</Link></p>
                                <button onClick={handleSubmit} className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    {/* <svg
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
      </svg> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                                    <span className="ml-3">Log In</span>
                                </button>
                                <p className="text-sm font-light text-gray-500 mt-2">
                                    Don’t have an account yet? <span className="font-medium text-primary-600 hover:underline"><Link href={'/signup'} >Sign up</Link></span>
                                </p>
                                {/* <p className="mt-6 text-xs text-gray-600 text-center">
                                    I agree to abide by templatana's
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Terms of Service
                                    </a>
                                    and its
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Privacy Policy
                                    </a>
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                'url("https://firebasestorage.googleapis.com/v0/b/fir-243cd.appspot.com/o/Signup%2Flogin-image.svg?alt=media&token=6a0128d1-a4e4-46b0-80d4-165d474f3953")'
                        }}
                    />
                </div>
            </div>

        </div>
    )
}

export default Login
