import React from 'react'
import Link from 'next/link'
import mongoose from "mongoose";
import Product from '../models/Product';

const Tshirt = ({ groceryitem }) => {
  return (
    <>
      {Object.keys(groceryitem).length == 0 ? <p className='text-gray-600 text-center pt-40 pb-40'>Sorry all the Grocery Products are currently out of stock. New stock coming soon. Stay Tuned!</p> :
        <div className='pt-32 pb-36 md:ml-14 items-center lg:gap-4 lg:grid-cols-4 grid grid-cols-2' style={{ textAlign: "-webkit-center" }}>
          {Object.keys(groceryitem).map((item) => {
            return (
              <div className="max-w-xs shadow-lg rounded-xl p-6 relative group" key={groceryitem[item]._id}>
                <div className="flex flex-col ">
                  <div>
                    {groceryitem[item].availableQty > 0 ? <div className="absolute z-10 flex flex-col top-2 right-2 items-center bg-green-600 text-white text-xs px-2 py-1 ml-3 rounded-lg">INSTOCK</div>
                      : <div className="flex items-center bg-red-600 text-white text-xs px-2 py-1 ml-3 rounded-lg">OUTOFSTOCK</div>}
                    <div className="relative h-48 w-full mb-3">
                    <Link href={`/products/${groceryitem[item].category}/${groceryitem[item].slug}`}><img src={`${groceryitem[item].img}`} alt= {groceryitem[item].title} className="w-full h-full object-contain rounded-2xl cursor-pointer" /></Link>
                    </div>
                    <div>
                      <div>

                        <div className="items-center w-full justify-between min-w-0 h-16">
                          <h2 className="text-base md:text-lg mr-auto cursor-pointer text-black hover:text-blue-700 overflow-hidden line-clamp-2 object-contain"><Link href={`/products/${groceryitem[item].category}/${groceryitem[item].slug}`}>{groceryitem[item].title}</Link></h2>

                        </div>
                      </div>
                      <div className="md:flex space-x-2 text-sm font-medium justify-between mt-5">
                        <div className="text-xl font-semibold mt-1">₹{groceryitem[item].price.toLocaleString('en-IN')}</div>
                        <Link href={`/products/${groceryitem[item].category}/${groceryitem[item].slug}`}>
                        <button className="mt-3 md:mt-0 transition ease-in duration-300 inline-flex items-center text-sm font-medium md:mb-0 bg-black px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-blue-700">
                          <span>Buy Now</span>
                        </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
          }

        </div>
      }
      {/* {Object.keys(stickers).length==0 ? <p className='text-gray-600 text-center mt-20 mb-52'>Sorry all the Stickers are currently out of stock. New stock coming soon. Stay Tuned!</p>:
    <section className="text-gray-600 body-font">
      <div className="container px-4 py-24 mx-auto">
        <div className="flex flex-wrap md:ml-24 md:mr-5 justify-center">
          {Object.keys(stickers).map((item)=>{
            return( <Link passHref={true} key={stickers[item]._id} href={`/product/${stickers[item].slug}`}>
            <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-6">
              <a className="block rounded overflow-hidden">
                <img alt="tshirt" className="m-auto h-[30vh] md:h-[36vh] block" src={`${stickers[item].img}`} />
              </a>
              <div className="mt-10 text-center md:text-left">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Stickers</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{`${stickers[item].title}`}</h2>
              </div>
            </div>
          </Link>
          )
          })}
        </div>
      </div>
    </section>} */}
    </>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let groceryitem = await Product.find({ category: 'grocery-items' })

  // let tshirts = {}

  //   for (let item of products) {
  //       if(item.title in tshirts){

  //           if(!tshirts[item.title].color.includes(item.color) && item.availableQty>0){
  //               tshirts[item.title].color.push(item.color)
  //           }
  //           if(!tshirts[item.title].size.includes(item.size) && item.availableQty>0){
  //               tshirts[item.title].size.push(item.size)
  //           }

  //       }else{
  //           tshirts[item.title] = JSON.parse(JSON.stringify(item))

  //           if(item.availableQty>=0){
  //               tshirts[item.title].color = [item.color]
  //               tshirts[item.title].size = [item.size]
  //           }else{
  //             tshirts[item.title].color = []
  //               tshirts[item.title].size = []
  //           }
  //       }

  // }

  return {
    props: { groceryitem: JSON.parse(JSON.stringify(groceryitem)) }, // will be passed to the page component as props
  }
}

export default Tshirt
