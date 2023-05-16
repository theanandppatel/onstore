import React from 'react'
import Order from '../models/Order'
import mongoose from "mongoose"
import { useRouter } from 'next/router'

const MyOrder = ({ cart, subTotal, order }) => {

  // const address!= order.deliveryinfo.replace(/\\n/g, '\n')
  const addressLines = order.deliveryinfo.split("\n");

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dateFormat = (d) => {
    var t = new Date(d);
    return t.getDate() + '-' + monthNames[t.getMonth()] + '-' + t.getFullYear();
  }
  return (
    // <div>
    //   <section className="text-gray-600 body-font overflow-hidden">
    //     <div className="container px-5 py-14 mx-auto">
    //       <div className="lg:w-4/5 mx-auto flex flex-wrap">
    //         <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
    //           <h2 className="text-sm title-font text-gray-500 tracking-widest">ECLOUD ADDA</h2>
    //           <h1 className="text-gray-900 text-2xl md:text-3xl title-font font-medium mb-4">Order: #{order.orderId}</h1>
    //           <p className="leading-relaxed mb-4">Yayy! Your order has been successfully placed!</p>
    //           <p className="leading-relaxed mb-4">Order Placed On: </p>
    //           <p className="leading-relaxed mb-4">Your Payment Method is <span className='text-black font-bold'>COD</span> </p>
    //           <div className="flex py-2 font-bold">
    //             <span className="text-black w-1/3">Item</span>
    //             <span className=" text-black w-1/3 text-center">Quantity</span>
    //             <span className=" text-black w-1/3 text-center">Amount</span>
    //           </div>

    //           {/* {Object.keys(order.products).map((item)=>{
    //               return <div key={item} className="flex border-t border-b border-gray-200 py-2">
    //             <span className="text-black  w-1/3 ">{order.products[item].name}</span>
    //             <span className=" text-black  w-1/3 text-center">{order.products[item].qty}</span>
    //             <span className=" text-black  w-1/3 text-center">₹{order.products[item].price}</span>
    //             </div>
    //             })} */}
    //             {Object.keys(order.products).map((item)=>{
    //             return <div key={item} className="flex border-t border-b border-gray-200 py-2">
    //             <span className="text-black  w-1/3 ">{`${order.products[item].name} ${(order.products[item].category!='stickers' && order.products[item].category!=='mugs') ? '('+order.products[item].size+'/'+order.products[item].variant+')':'' }`}</span>
    //             <span className=" text-black  w-1/3 text-center">{order.products[item].qty}</span>
    //             <span className=" text-black   text-center w-16 md:w-1/3 ml-7 md:ml-0">₹{order.products[item].price} × {order.products[item].qty} = ₹{order.products[item].price*order.products[item].qty}</span>
    //             </div>
    //           })}


    //           <div className="mt-10" >
    //           <div className="title-font font-medium text-xl text-gray-900">Delivery Charge:
    //           {order.bcharge < 1000 && order.bcharge != 0 ? " ₹40" : " FREE"}</div>

    //             <div className="title-font mt-10 font-medium text-2xl text-gray-900">Subtotal: ₹{order.amount}</div>
    //             <p className='mt-5'>Tracking link will be sent via Email once your order is shipped! If you still have any issues, feel free to call our customer support number</p>
    //           </div>
    //         </div>
    //         <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-[70vh] h-64 object-cover object-center rounded" src="https://www.codeswear.com/order.jpg"/>
    //       </div>
    //     </div>
    //   </section>
    // </div>
    <>
      {/* This example requires Tailwind CSS v2.0+ */}

      <div className='px-3 sm:px-5 lg:px-72 pt-28'>
        <div className="max-w-xl">
          <h1 className="text-sm font-semibold uppercase tracking-wide text-blue-600">Thank you!</h1>
          <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">It&apos;s on the way!</p>
          {/* <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">Order #{order.orderId}</p> */}
          <p className="mt-2 text-base text-gray-500">Your order has shipped and will be with you soon.</p>
          <dl className="mt-12 text-sm font-medium flex gap-10">
            <span>
              <dt className="text-gray-900">Order Number</dt>
              <dd className="text-blue-600 mt-2">
                <a href="" target="_blank" className="text-base font-semibold">
                  {order.orderId}
                </a>
              </dd>
            </span>
            <span>
              <dt className="text-gray-900">Order Placed</dt>
              <dd className="text-blue-600 mt-2">
                <a href="" target="_blank" className="text-base font-semibold">
                  {dateFormat(order.createdAt)}
                </a>
              </dd>
            </span>
          </dl>

        </div>
        <div className="mt-10 border-t border-gray-200">
          <h2 className="sr-only">Your order</h2>

          <h3 className="sr-only">Items</h3>

          {/* <% @checkout_session.line_items.data.each do |line_item| %> */}
          {/* <% product = Product.find_by(stripe_id: line_item.price.product.id) %> */}

          {Object.keys(order.products).map((item) => {
            return (
              <div key={item} className="py-10 border-b border-gray-200 flex space-x-6">
                <img src={order.products[item].image} alt="" className="flex-none w-20 h-20 object-contain bg-gray-100 rounded-lg sm:w-40 sm:h-40" />
                <div className="flex-auto flex flex-col">
                  <div>
                    <h4 className="font-medium text-xl text-gray-900">
                      <a href="#">{order.products[item].name}</a>
                    </h4>
                    <div className='flex pt-3 space-x-3'>
                    {order.products[item].size && <p className='text-gray-600'><span className='text-black'>Size:</span> {order.products[item].size}</p>}
                    {order.products[item].variant && <p className='text-gray-600'><span className='text-black'>Color:</span> {order.products[item].variant}</p>}
                    </div>
                  </div>
                  <div className="mt-6 flex-1 flex items-end">
                    <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                      <div className="flex text-base">
                        <dt className="font-medium text-gray-900">Quantity</dt>
                        <dd className="ml-2 text-gray-700">{order.products[item].qty}</dd>
                      </div>
                      <div className="pl-4 flex sm:pl-6 text-base">
                        <dt className="font-medium text-gray-900">Price</dt>
                        <dd className="ml-2 text-gray-700">
                          ₹{((order.products[item].price) * (order.products[item].qty)).toLocaleString('en-IN')}
                        </dd>

                      </div>
                    </dl>
                  </div>
                </div>
              </div>)
          })}
          {/* <% end %> */}

          <div className="sm:ml-40 sm:pl-6">
            <h3 className="sr-only">Information</h3>

            <h4 className="sr-only">Addresses</h4>
            <dl className="grid grid-cols-2 text-sm py-10">
              <div>
                <dt className="font-medium text-base text-gray-900">Shipping Address</dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block" >
                      <ul className='text-base'>
                        {addressLines.map((line, index) => (
                          <li key={index}>{line}</li>
                        ))}
                      </ul>
                    </span>
                  </address>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-base text-gray-900">Payment method</dt>
                <dd className="mt-2 text-gray-700">
                  {/* <!-- <p>Apple Pay</p> --> */}
                  <p className='text-base'>{order.paymentMethod}</p>
                  {order.paymentMethod != "Cash On Delivery(COD)" && <p className='text-base'>{order.paymentInfo.method.toUpperCase()}</p>}
                </dd>
              </div>
              {/* <!-- <div> -->
      <!--   <dt className="font-medium text-gray-900">Billing address</dt> -->
      <!--   <dd className="mt-2 text-gray-700"> -->
      <!--     <address className="not-italic"> -->
      <!--       <span className="block">Kristin Watson</span> -->
      <!--       <span className="block">7363 Cynthia Pass</span> -->
      <!--       <span className="block">Toronto, ON N3Y 4H8</span> -->
      <!--     </address> -->
      <!--   </dd> -->
      <!-- </div> --> */}
            </dl>


            <h3 className="sr-only">Summary</h3>

            <dl className="space-y-6 border-t border-gray-200 pt-10 mb-52">
              <div className="flex justify-between font-medium text-xl">
                <dt className="font-medium text-gray-900">Subtotal</dt>
                <dd className="text-gray-700">
                  ₹{order.bcharge.toLocaleString('en-IN')}
                </dd>
              </div>
              <div className="flex justify-between font-medium text-xl">
                <dt className="font-medium text-gray-900">Shipping</dt>
                <dd className="text-gray-900">
                  {order.bcharge < 1000 && order.bcharge != 0 ? " ₹40" : " FREE"}
                </dd>

              </div>
              <div className="flex justify-between font-medium text-xl">
                <dt className="font-medium text-gray-900">Total</dt>
                <dd className="text-gray-900">
                  ₹{order.amount.toLocaleString('en-IN')}
                </dd>

              </div>
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
  let order = await Order.findOne({ orderId: context.query.id })


  return {
    props: { order: JSON.parse(JSON.stringify(order)) }, // will be passed to the page component as props
  }
}

export default MyOrder
