import React from "react";
import Link from "next/link";
import Head from "next/head";
import mongoose from "mongoose";
import Product from "../models/Product";

const HomeFurnishing = ({ homefurnishing }) => {
  return (
    <>
      <Head>
        <title>Homefurnishing items - Onstore</title>
        <meta
          name="description"
          content="Your all needs at one store. Onstore - An ecommerce platform"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      {Object.keys(homefurnishing).length == 0 ? (
        <p className="text-gray-600 text-center pt-40 pb-40">
          Sorry all the Home Furnishing Items are currently out of stock. New
          stock coming soon. Stay Tuned!
        </p>
      ) : (
        <div
          className="pt-32 pb-36 md:ml-14 items-center lg:gap-4 lg:grid-cols-4 grid grid-cols-2"
          style={{ textAlign: "-webkit-center" }}
        >
          {Object.keys(homefurnishing).map((item) => {
            return (
              <div
                className="max-w-xs shadow-lg rounded-xl p-6 relative group"
                key={homefurnishing[item]._id}
              >
                <div className="flex flex-col ">
                  <div>
                    {homefurnishing[item].availableQty > 0 ? (
                      <div className="absolute z-10 flex flex-col top-2 right-2 items-center bg-green-600 text-white text-xs px-2 py-1 ml-3 rounded-lg">
                        INSTOCK
                      </div>
                    ) : (
                      <div className="flex items-center bg-red-600 text-white text-xs px-2 py-1 ml-3 rounded-lg">
                        OUTOFSTOCK
                      </div>
                    )}
                    <div className="relative h-48 w-full mb-3">
                      {/* <div className="absolute flex flex-col top-0 -right-2 p-2">
                        <button onClick={() => { `${addToCart(homefurnishing[item].slug, 1, homefurnishing[item].price, homefurnishing[item].title , homefurnishing[item].size, homefurnishing[item].color, homefurnishing[item].category)}` }} className="transition ease-in duration-300 bg-gray-800  hover:text-purple-500 shadow hover:shadow-md text-white rounded-full w-8 h-8 text-center p-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart ml-1" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" id="mainIconPathAttribute"></path> </svg></button>
                      </div> */}
                      <Link
                        href={`/products/home-furnishing-products/${homefurnishing[item].slug}`}
                      >
                        <img
                          src={`${homefurnishing[item].img}`}
                          alt={homefurnishing[item].title}
                          className="w-full h-full object-contain rounded-2xl cursor-pointer"
                        />
                      </Link>
                    </div>
                    <div>
                      <div>
                        {/* <div className="w-full flex-none text-sm flex items-center text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-gray-400 whitespace-nowrap mr-3">4.60</span><span className="mr-2 text-gray-400">India</span>
                      </div> */}
                        <div className="items-center w-full justify-between min-w-0 ">
                          <h2 className="text-base md:text-lg mr-auto cursor-pointer text-black hover:text-blue-700 overflow-hidden line-clamp-2">
                            <Link
                              href={`/products/home-furnishing-products/${homefurnishing[item].slug}`}
                            >
                              {homefurnishing[item].title}
                            </Link>
                          </h2>
                          {/* {homefurnishing[item].availableQty > 0 ? <div className="flex items-center bg-green-600 text-white text-xs px-2 py-1 ml-3 rounded-lg">INSTOCK</div>
                            : <div className="flex items-center bg-red-600 text-white text-xs px-2 py-1 ml-3 rounded-lg">OUTOFSTOCK</div>} */}
                        </div>
                      </div>
                      {/* <div className="lg:flex py-1 md:py-4  text-sm text-gray-600">
                        <div className="flex-1 md:inline-flex items-center  mb-3">
                          <div className="w-full flex-none text-sm flex items-center text-gray-600">
                            <ul className="flex flex-row justify-center items-center space-x-2">
                              {homefurnishing[item].color.includes('blue') && <li>
                                <span className="block p-1 border-2 border-white hover:border-blue-600 rounded-full transition ease-in duration-300">
                                  <a href={`/product/${homefurnishing[item].slug}`} className="block w-3 h-3 bg-blue-600 rounded-full"></a>
                                </span>
                              </li>}
                              {homefurnishing[item].color.includes('yellow') && <li>
                                <span className="block p-1 border-2 border-white hover:border-yellow-400 rounded-full transition ease-in duration-300">
                                  <a href={`/product/${homefurnishing[item].slug}`} className="block w-3 h-3  bg-yellow-400 rounded-full"></a>
                                </span>
                              </li>}
                              {homefurnishing[item].color.includes('red') && <li>
                                <span className="block p-1 border-2 border-white hover:border-red-500 rounded-full transition ease-in duration-300">
                                  <a href={`/product/${homefurnishing[item].slug}`} className="block w-3 h-3  bg-red-500 rounded-full"></a>
                                </span>
                              </li>}
                              {homefurnishing[item].color.includes('green') && <li>
                                <span className="block p-1 border-2 border-white hover:border-green-500 rounded-full transition ease-in duration-300">
                                  <a href={`/product/${homefurnishing[item].slug}`} className="block w-3 h-3  bg-green-500 rounded-full"></a>
                                </span>
                              </li>}
                            </ul>
                          </div>
                        </div>
                        <div className="flex-1 inline-flex items-center mb-0 md:mb-3">
                          <span className="text-secondary whitespace-nowrap mr-3">Size</span>
                          <div className="cursor-pointer text-gray-400 ">
                            {homefurnishing[item].size.includes('S') && <span className="hover:text-purple-900 p-1 py-0">S</span>}
                            {homefurnishing[item].size.includes('M') && <span className="hover:text-purple-900 p-1 py-0">M</span>}
                            {homefurnishing[item].size.includes('L') && <span className="hover:text-purple-900 p-1 py-0">L</span>}{homefurnishing[item].size.includes('XL') && <span className="hover:text-purple-900 p-1 py-0">XL</span>}
                            {homefurnishing[item].size.includes('XXL') && <span className="hover:text-purple-900 p-1 py-0">XXL</span>}
                          </div>
                        </div>
                      </div> */}
                      <div className="md:flex space-x-2 text-sm font-medium justify-between mt-5">
                        <div className="text-xl font-semibold mt-1">
                          ₹{homefurnishing[item].price.toLocaleString("en-IN")}
                        </div>
                        <Link
                          href={`/products/${homefurnishing[item].category}/${homefurnishing[item].slug}`}
                        >
                          <button className="mt-1 md:mt-0 transition ease-in duration-300 inline-flex items-center text-sm font-medium md:mb-0 bg-black px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-blue-700">
                            <span>Buy Now</span>
                          </button>
                        </Link>
                        {/* <button className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600 ">
                  <span>Add Cart</span>
                </button> */}
                        {/* <button className="transition ease-in duration-300 bg-gray-700 hover:bg-gray-800 border hover:border-gray-500 border-gray-700 hover:text-white  hover:shadow-lg text-gray-400 rounded-full w-9 h-9 text-center p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
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
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "home-furnishing-products" });

  // let homefurnishing = {}

  // for (let item of products) {
  //   if (item.title in homefurnishing) {

  //     if (!homefurnishing[item.title].color.includes(item.color) && item.availableQty > 0) {
  //       homefurnishing[item.title].color.push(item.color)
  //     }
  //     if (!homefurnishing[item.title].size.includes(item.size) && item.availableQty > 0) {
  //       homefurnishing[item.title].size.push(item.size)
  //     }

  //   } else {
  //     homefurnishing[item.title] = JSON.parse(JSON.stringify(item))

  //     if (item.availableQty > 0) {
  //       homefurnishing[item.title].color = [item.color]
  //       homefurnishing[item.title].size = [item.size]
  //     }
  //   }

  // }

  return {
    props: { homefurnishing: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  };
}

export default HomeFurnishing;
