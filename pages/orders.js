import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import mongoose from "mongoose"
// import Order from '../models/Order'
// import mongoose from "mongoose"
import Link from 'next/link'

const Orders = ({ logout, token }) => {
    const router = useRouter()
    const [orders, setOrders] = useState([])
    const [active, setActive] = useState('orders')

    useEffect(() => {
        const fetchOrders = async () => {
            const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token })
            })
            let res = await data.json()
            setOrders(res.userOrders)

        }

        if (!localStorage.getItem('myuser')) {
            router.push('/')
        }
        else {
            fetchOrders()
        }
    }, [])

    const capitalizeFirstLetter = (str) => {
        const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

        return capitalized;
    }

    const handleUserDashboard = () =>{
        router.push('/my-account?usertoken='+token)
    }

    const handleLogout = () => {
        logout()
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const date = ["0", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]

    const dateFormat = (d) => {
        var t = new Date(d);
        return (t.getDate() < 10 ? date[t.getDate()] : t.getDate()) + ' ' + monthNames[t.getMonth()] + ', ' + t.getFullYear();
    }


    return (
        <div>
            <div className="mb-5">
                <h1 className='text-4xl font-bold lg:ml-24 pt-32 ml-5'>Order history</h1>
                <p className='lg:ml-24 mt-3 text-gray-500 ml-5'>Check the status of recent and old orders</p>
                <div className='lg:flex lg:flex-row'>
                    <div className="h-full p-3 lg:space-y-2 lg:w-60 lg:ml-24 lg:mt-10 mt-10 mb-16">
                        <nav aria-label="Main Nav" className="flex flex-col bg-gray-100">
                            <button onClick={handleUserDashboard}
                                className={`flex items-center gap-2 border-l-[3px] ${active == "dashboard" ? "border-blue-500 bg-blue-50 px-4 py-3 text-blue-700" : "border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700"}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                                    <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                                </svg>

                                <span className="text-sm font-medium"> Dashboard </span>
                            </button>

                            <button className={`flex items-center gap-2 border-l-[3px] ${active == "orders" ? "border-blue-500 bg-blue-50 px-4 py-3 text-blue-700" : "border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700"}`}>
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
                    <div className="bg-white sm:rounded-lg w-full lg:w-4/5 mt-10 lg:mt-24 mb-32 lg:mx-0 px-5">
                        {
                            orders.length == 0 ? <div className='text-gray-500 text-lg text-center pb-44 pt-8'>You have not placed any order yet</div> :
                                // <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                                //     <table className="w-full text-sm text-left text-gray-500 ">
                                //         <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                //             <tr>
                                //                 <th scope="col" className="py-3 px-6 pl-3 md:pl-28">
                                //                     #Order Id
                                //                 </th>
                                //                 <th scope="col" className="py-3 px-6">
                                //                     Product name
                                //                 </th>
                                //                 <th scope="col" className="py-3 px-6">
                                //                     Amount
                                //                 </th>
                                //                 <th scope="col" className="py-3 px-6">
                                //                     Payment Status
                                //                 </th>
                                //                 <th scope="col" className="py-3 px-6">
                                //                     Action
                                //                 </th>
                                //             </tr>
                                //         </thead>
                                //         <tbody>
                                //             {orders.map((item) => {
                                //                 return item.status !== 'Pending' && <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                                //                     <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap pl-3 md:pl-28">
                                //                         {item.orderId}
                                //                     </th>
                                //                     <td scope="row" className="py-4 px-6 whitespace-nowrap">{
                                //                         Object.keys(item.products).length == 1 ? Object.keys(item.products).map((k) => {
                                //                             return <span key={k}>{`${item.products[k].name} ${(item.products[k].category != 'stickers' && item.products[k].category != 'mugs') ? '(' + item.products[k].size + '/' + item.products[k].variant + ')' : ''}`}</span>
                                //                         }) : Object.keys(item.products).map((k) => {

                                //                             return <ol key={k}><li>
                                //                                 {`${item.products[k].name} ${(item.products[k].category != 'stickers' && item.products[k].category != 'mugs') ? '(' + item.products[k].size + '/' + item.products[k].variant + ')' : ''}`}
                                //                             </li></ol>
                                //                         })
                                //                     }
                                //                     </td>
                                //                     <td className="py-4 px-6">
                                //                         ₹{item.amount}
                                //                     </td>
                                //                     <td className="py-4 px-6">
                                //                         {item.status}
                                //                     </td>
                                //                     <td className="py-4 px-6 ">
                                //                         <Link href={'/order?id='+item.orderId}><a className="font-medium text-blue-600 hover:underline">Details</a></Link>
                                //                     </td>
                                //                 </tr>
                                //             })}

                                //         </tbody>
                                //     </table>
                                // </div>
                                <div>
                                    {orders.map((item) => {
                                        return (
                                            <div key={item._id} className="mb-32">
                                                <div className='flex justify-between'>
                                                    <div className='grid grid-cols-2 lg:space-x-6 space-x-1'>
                                                        <div className='lg:flex '>
                                                        <h2 className="mt-4 mb-2 block text-sm font-medium text-gray-500 lg:ml-24">Order ID: <br></br><span className='text-black font-semibold'>{item.orderId}</span></h2>
                                                        <h2 className="mt-4 mb-2 block text-sm font-medium text-gray-500 lg:ml-12">Date: <br></br><span className='text-black font-semibold'>{dateFormat(item.createdAt)}</span></h2>
                                                        </div>
                                                        <div className='lg:flex'>
                                                        <h2 className="mt-4 mb-2 block text-sm font-medium text-gray-500 lg:ml-12">Delivery Status: <br></br> <span className='text-black font-semibold'>{item.deliveryStatus}</span></h2>
                                                        <h2 className="mt-4 mb-2 block text-sm font-medium text-gray-500 lg:ml-12">Total Amount:<br></br> <span className='text-black font-semibold'>₹{item.amount.toLocaleString('en-IN')}</span></h2>
                                                        </div>
                                                    </div>
                                                    <button onClick={()=>router.push('/order?id='+item.orderId)} type="button" className="xs:h-12 py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 justify-end self-center align-middle lg:mr-24 mt-3">View Details</button>
                                                </div>
                                                <hr className="h-px lg:mx-24 my-2 bg-gray-200 border-0"></hr>

                                                {Object.keys(item.products).map((k) => {
                                                    return (
                                                        <div key={k} className="flex  rounded-lg bg-white lg:ml-24 mb-5">
                                                            <img className="m-2 h-24 w-28 object-contain" src={item.products[k].image} alt="" />
                                                            <div className="flex-auto flex flex-col mt-5 ml-6 mb-5">
                                                                <div>
                                                                    <h4 className="font-medium max-w-xl">
                                                                        {item.products[k].name}
                                                                    </h4>
                                                                </div>
                                                                <div className="mt-6 flex-1 flex items-end">
                                                                    <dl className="flex text-sm">
                                                                        <div className="flex text-base ">
                                                                            <div className='flex space-x-4'>
                                                                            {item.products[k].size != "" && <div className='flex'> <dt className="font-medium text-gray-900">Size:</dt> <dd className="ml-2 text-gray-700">{item.products[k].size}</dd></div>}
                                                                            {item.products[k].variant != ""  && <div className='flex'> <dt className="font-medium text-gray-900">Color:</dt> <dd className="ml-2 text-gray-700">{capitalizeFirstLetter(item.products[k].variant)}</dd></div>}
                                                                            </div>
                                                                        </div>
                                                                        
                                                                    </dl>
                                                                </div>
                                                            </div>
                                                           
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })}
                                </div>
                        }
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

    return {
        props: {token: usertoken }, // will be passed to the page component as props
    }
}
export default Orders
                                                    {/* {item.products[k].size != "" && <span className="text-gray-400">Size: {item.products[k].size}</span>} */}
                                                    {/* {item.products[k].variant != "" && <span className="text-gray-400">Color: {capitalizeFirstLetter(item.products[k].variant)}</span>} */}
                                                {/* <div className='flex justify-between'>
                                            <p className="text-lg font-semibold">₹{(cart[k].price * cart[k].qty).toLocaleString('en-IN')}</p>

                                            <div className='w-24 h-8 flex'>
                                                <button onClick={() => { removeFromCart(k, cart[k].image, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                                                    <span className="m-auto text-xl font-thin">&minus;</span>
                                                </button>
                                                <input type="number" className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" value={cart[k].qty} readOnly></input>
                                                <button onClick={() => { addToCart(k, cart[k].image, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                                                    <span className="m-auto text-xl font-thin">&#43;</span>
                                                </button>
                                            </div>
                                        </div> */}
                                                {/* <button onClick={() => { removeFromCart(k, cart[k].qty, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }}
                                            type="button"
                                            className="text-justify font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Remove
                                        </button> */}