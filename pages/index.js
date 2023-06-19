import Head from 'next/head';
// import Product from '../models/FeaturedProduct';
import FeaturedProduct from '../models/FeaturedProduct';
import RecommendedProduct from '../models/RecommendedProduct';
import Image from 'next/image';
import Link from 'next/link';
import FiShoppingCart from "react-icons/fi";
import { useRouter } from 'next/router';
import { FaCartPlus } from "react-icons/fa";
import mongoose from "mongoose";
import { useEffect } from 'react';

const Home = ({ addToCart, featuredproducts, recommendedproducts }) => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <>
      <Head>
        <title>Home Page - Onstore</title>
        <meta name="description" content="Your all needs at one adda" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <div className="carousel relative container mx-auto" style={{ maxWidth: '1600px' }}>
        <div className="carousel-inner relative overflow-hidden w-full">

          {/*Slide 1*/}
          <input className="carousel-open" type="radio" id="carousel-1" name="carousel" aria-hidden="true" hidden defaultChecked="checked" />
          <div className={`pt-16 carousel-item absolute opacity-0 h-screen`}>
            <div className="h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right" style={{ backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/fir-243cd.appspot.com/o/Carousel%2Fcarousel-1.jpg?alt=media&token=3836a117-0a16-4a51-86a2-2dc96a5982bf")' }}>
              <div className="container mx-auto md:mx-24">
                <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
                  <span
                    data-aos="fade-down"
                    data-aos-delay="200"
                    className="mb-2.5 rounded-md bg-violet-100 py-1 px-4 text-sm font-semibold text-violet-600 md:mb-5"
                  >
                    Sale 70%
                  </span>
                  <h2
                    data-aos="fade-right"
                    data-aos-delay="300"
                    className="mb-5 text-center text-[2.5rem] font-bold leading-tight text-black md:text-white md:text-left md:text-5xl"
                  >
                    Shop smart, live better with our electronic essentials
                  </h2>
                  {/* <h3
                    data-aos="fade-right"
                    data-aos-delay="400"
                    className="font-regular mb-5 text-center text-lg leading-tight text-neutral-700 md:mb-10 md:text-left"
                  >
                    Anyone can beat you but no one can beat your outfit as long as you wear Dine outfits.
                  </h3> */}
                  <Link
                    href={'/electronics'}
                    data-aos="fade-up"
                    data-aos-delay="500"
                    className="mb-10 flex items-center rounded bg-zinc-900 py-2.5 px-8 text-base font-normal text-white shadow-sm shadow-zinc-500"
                  >
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <svg aria-hidden="true" className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
                      Shop now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <label htmlFor="carousel-3" className="prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
          <label htmlFor="carousel-2" className="next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>
          {/*Slide 2*/}
          <input className="carousel-open" type="radio" id="carousel-2" name="carousel" aria-hidden="true" hidden />
          <div className="pt-16 carousel-item absolute opacity-0 bg-cover bg-right h-screen">
            <div className="h-full w-full mx-auto flex pt-6 md:pt-0 bg-cover bg-right" style={{ backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/fir-243cd.appspot.com/o/Carousel%2Fcarousel-2.jpg?alt=media&token=741c44b5-dce9-4d52-8e37-92bd85bd36bd")' }}>
              <div className="container mx-auto md:mx-24 md:mt-40">
                <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
                  <span
                    data-aos="fade-down"
                    data-aos-delay="200"
                    className="mb-2.5 rounded-md bg-violet-100 py-1 px-4 text-sm font-semibold text-violet-600 md:mb-5"
                  >
                    Off Upto 80%
                  </span>
                  <h2
                    data-aos="fade-right"
                    data-aos-delay="300"
                    className="mb-5 text-center text-[2.5rem] font-bold leading-tight text-white md:text-left md:text-5xl"
                  >
                    An Industrial Take on Streetwear
                  </h2>
                  {/* <h3
                    data-aos="fade-right"
                    data-aos-delay="400"
                    className="font-regular mb-5 text-center text-lg leading-tight text-violet-600 md:mb-10 md:text-left"
                  >
                    Anyone can beat you but no one can beat your outfit as long as you wear Dine outfits.
                  </h3> */}
                </div>
              </div>
            </div>
          </div>
          <label htmlFor="carousel-1" className="prev control-2 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
          <label htmlFor="carousel-3" className="next control-2 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>
          {/*Slide 3*/}
          <input className="carousel-open" type="radio" id="carousel-3" name="carousel" aria-hidden="true" hidden />
          <div className="pt-16 carousel-item absolute opacity-0 h-screen">
            <div className="h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-bottom" style={{ backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/fir-243cd.appspot.com/o/Carousel%2FUntitled%20design.png?alt=media&token=bd44d187-819a-40d2-9153-d28e85e22d07")' }}>
              {/* <div className="container mx-auto md:mx-24">
                <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
                  <span
                    data-aos="fade-down"
                    data-aos-delay="200"
                    className="mb-2.5 rounded-md bg-violet-100 py-1 px-4 text-sm font-semibold text-violet-600 md:mb-5"
                  >
                    OFF 50%
                  </span>
                  <h2
                    data-aos="fade-right"
                    data-aos-delay="300"
                    className="mb-5 text-center text-[2.5rem] font-bold leading-tight text-white md:text-left md:text-5xl"
                  >
                    An Industrial Take on Streetwear
                  </h2>
                  <h3
                    data-aos="fade-right"
                    data-aos-delay="400"
                    className="font-regular mb-5 text-center text-lg leading-tight text-neutral-700 md:mb-10 md:text-left"
                  >
                    Anyone can beat you but no one can beat your outfit as long as you wear Dine outfits.
                  </h3>
                </div>
              </div> */}
            </div>
          </div>
          <label htmlFor="carousel-2" className="prev control-3 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
          <label htmlFor="carousel-1" className="next control-3 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>
          {/* Add additional indicators for each slide*/}
          <ol className="carousel-indicators">
            <li className="inline-block mr-3">
              <label htmlFor="carousel-1" className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900">•</label>
            </li>
            <li className="inline-block mr-3">
              <label htmlFor="carousel-2" className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900">•</label>
            </li>
            <li className="inline-block mr-3">
              <label htmlFor="carousel-3" className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900">•</label>
            </li>
          </ol>
        </div>
      </div>
      <div>
      </div>

      {/* Featured Item Section Start  */}
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <span className="mb-5 text-sm font-bold uppercase text-violet-700 mx-auto flex-col flex items-center">
            Featured Items
          </span>
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Our featured items</h2>
            <p className="mt-4 text-base font-normal leading-7 text-gray-600">Discover the latest and greatest with our featured item.</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
            {Object.keys(featuredproducts).map((item) => {
              return (

                <div key={featuredproducts[item]._id} className="relative group">
                  <div className="overflow-hidden aspect-w-1 aspect-h-1">
                    <img className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125" src={`${featuredproducts[item].img[0]}`} alt={featuredproducts[item].title} />
                  </div>
                  <div className="absolute left-3 top-3">
                    {featuredproducts[item].slug == "home-assistant" && <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-gray-900 uppercase bg-white rounded-full">New</p>}
                    {featuredproducts[item].slug == "smart-light" && <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-violet-600 uppercase bg-violet-100 rounded-full">Sale</p>}
                  </div>
                  <div className="flex items-start justify-between mt-4 space-x-4">
                    <div>
                      <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                        <Link href={`/products/${featuredproducts[item].category}/${featuredproducts[item].slug}`}>
                          <span className='cursor-pointer line-clamp-2'>
                            {featuredproducts[item].title}
                            <span className="absolute inset-0" aria-hidden="true"></span>
                          </span>
                        </Link>
                      </h3>

                      {/* Ratings Stars Start */}
                      {/* <div className="flex items-center mt-2.5 space-x-px">
                      <svg className="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                      <svg className="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                      <svg className="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                      <svg className="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                      <svg className="w-3 h-3 text-gray-300 sm:w-4 sm:h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                    </div> */}
                      {/* Rating Star End  */}
                    </div>

                    <div className="text-right">
                      <p className="text-xs pr-2 font-bold text-gray-900 sm:text-sm md:text-base">₹{featuredproducts[item].price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>

              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Item Section Ends  */}

      <div className="relative overflow-hidden bg-white mb-20 mt-10">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Summer styles are finally here
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                This year, our new summer collection will shelter you from the harsh elements of a world that doesn&apos;t care
                if you live or die.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  href={'/fashion'}

                >
                  <button className='className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"'>Shop Collection</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More Store Item Section Starts  */}
      <section className="bg-white py-8">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <span className="mb-4 text-sm font-bold uppercase text-violet-700 mx-auto flex-col flex items-center">
            Recommended Items
          </span>
          <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
            <nav id="store" className="w-full top-0 px-6 py-1">
              <div className="max-w-md mx-auto text-center">
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Recommended items</h2>
                <p className="mt-4 text-base font-normal leading-7 text-gray-600">Shop Our Highly Recommended Products Today!</p>
              </div>
            </nav>
            {Object.keys(recommendedproducts).map((item) => {
              return (
                <div key={recommendedproducts[item]._id} className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                  <Link href={`/products/${recommendedproducts[item].category}/${recommendedproducts[item].slug}`}>
                    <div className='cursor-pointer'>
                      <img className="hover:grow hover:shadow-lg w-full h-80 object-contain py-5" src={`${recommendedproducts[item].img[0]}`} />
                      <div className="pt-3 flex items-center justify-between">
                        <p className="text-black text-base pr-3 line-clamp-2">{featuredproducts[item].title}</p>
                        <p className="pt-1 pr-3 text-black font-bold">₹{recommendedproducts[item].price.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
            {/* <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
            <a href="#">
              <img className="hover:grow hover:shadow-lg" src="https://images.unsplash.com/photo-1508423134147-addf71308178?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80" />
              <div className="pt-3 flex items-center justify-between">
                <p className>Product Name</p>
                <FaCartPlus className="h-6 w-6 fill-current text-gray-500 hover:text-violet-500" />
              </div>
              <p className="pt-1 text-gray-900">£9.99</p>
            </a>
          </div>
          <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
            <a href="#">
              <img className="hover:grow hover:shadow-lg" src="https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80" />
              <div className="pt-3 flex items-center justify-between">
                <p className>Product Name</p>
                <FaCartPlus className="h-6 w-6 fill-current text-gray-500 hover:text-violet-500" />
              </div>
              <p className="pt-1 text-gray-900">£9.99</p>
            </a>
          </div>
          <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
            <a href="#">
              <img className="hover:grow hover:shadow-lg" src="https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80" />
              <div className="pt-3 flex items-center justify-between">
                <p className>Product Name</p>
                <FaCartPlus className="h-6 w-6 fill-current text-gray-500 hover:text-violet-500" />
              </div>
              <p className="pt-1 text-gray-900">£9.99</p>
            </a>
          </div>
          <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
            <a href="#">
              <img className="hover:grow hover:shadow-lg" src="https://images.unsplash.com/photo-1467949576168-6ce8e2df4e13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80" />
              <div className="pt-3 flex items-center justify-between">
                <p className>Product Name</p>
                <FaCartPlus className="h-6 w-6 fill-current text-gray-500 hover:text-violet-500" />
              </div>
              <p className="pt-1 text-gray-900">£9.99</p>
            </a>
          </div>
          <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
            <a href="#">
              <img className="hover:grow hover:shadow-lg" src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80" />
              <div className="pt-3 flex items-center justify-between">
                <p className>Product Name</p>
                <FaCartPlus className="h-6 w-6 fill-current text-gray-500 hover:text-violet-500" />
              </div>
              <p className="pt-1 text-gray-900">£9.99</p>
            </a>
          </div>
          <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
            <a href="#">
              <img className="hover:grow hover:shadow-lg" src="https://images.unsplash.com/photo-1550837368-6594235de85c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80" />
              <div className="pt-3 flex items-center justify-between">
                <p className>Product Name</p>
                <FaCartPlus className="h-6 w-6 fill-current text-gray-500 hover:text-violet-500" />
              </div>
              <p className="pt-1 text-gray-900">£9.99</p>
            </a>
          </div>
          <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
            <a href="#">
              <img className="hover:grow hover:shadow-lg" src="https://images.unsplash.com/photo-1551431009-a802eeec77b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80" />
              <div className="pt-3 flex items-center justify-between">
                <p className>Product Name</p>
                <FaCartPlus onClick={() => { `${addToCart(slug, 1, "55", "sdshvds", "XL", "red", "tshirt")}` }} className="h-6 w-6 fill-current text-gray-500 hover:text-violet-500" />
              </div>
              <p className="pt-1 text-gray-900">£9.99</p>
            </a>
          </div> */}
          </div>
        </div>
      </section>

      <div className="mx-auto flex flex-col items-center px-4 py-10 md:container">
        <span className="mb-4 text-sm font-bold uppercase text-violet-700">Promotions</span>
        <h2 className="mb-6 text-center text-3xl font-bold text-black md:text-4xl">Our Promotions Events</h2>
        <div className="grid w-full max-w-[1150px] gap-3 md:grid-cols-4">
          <Link href="/fashion">
            <div className="col-span-2"><img alt="promo banner 1 image" loading="lazy" width={1806} height={681} decoding="async" data-nimg={1} style={{ color: 'transparent' }} src="../images/GET UPTO.png" />
            </div>
          </Link>
          <Link href="/">
            <div className="row-span-2"><img alt="promo banner 2 image" loading="lazy" width={881} height={1406} decoding="async" data-nimg={1} style={{ color: 'transparent' }} src="../images/promo-banner-3.png" />
            </div></Link>
          <Link href="/">
            <div className="row-span-2">
              <img alt="promo banner 3 image" loading="lazy" width={881} height={1406} decoding="async" data-nimg={1} style={{ color: 'transparent' }} src="../images/promo-banner-2.png" />
            </div></Link>
          <Link href="/">
            <div className="col-span-2"><img alt="promo banner 4 image" loading="lazy" width={1806} height={681} decoding="async" data-nimg={1} style={{ color: 'transparent' }} src="../images/promotion-2.png" />
            </div></Link></div>
      </div>



      {/* More Store Item Section Ends  */}

    </>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let featuredproducts = await FeaturedProduct.find()
  let recommendedproducts = await RecommendedProduct.find()

  // for (let item of featuredproducts) {
  //     if(item.title in stickers){

  //         if(!stickers[item.title].color.includes(item.color) && item.availableQty>0){
  //             stickers[item.title].color.push(item.color)
  //         }
  //         if(!stickers[item.title].size.includes(item.size) && item.availableQty>0){
  //             stickers[item.title].size.push(item.size)
  //         }

  //     }else{
  //         stickers[item.title] = JSON.parse(JSON.stringify(item))

  //         if(item.availableQty>0){
  //             stickers[item.title].color = [item.color]
  //             stickers[item.title].size = [item.size]
  //         }
  //     }

  // }

  return {
    props: { featuredproducts: JSON.parse(JSON.stringify(featuredproducts)), recommendedproducts: JSON.parse(JSON.stringify(recommendedproducts)) }, // will be passed to the page component as props
  }
}

export default Home
