import { useState, useEffect } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import mongoose from "mongoose"
import Product from '../../../models/Product'
import Error from 'next/error'
import Head from 'next/head';
import Link from 'next/link';

const Beautyproducts = ({ error, cart, clearCart, addToCart, products, buyNow, productImgArr, prodHighlights, prodDetails }) => {

    if (error == 404) {
        return <Error statusCode={404} /> //redirect to error page if product is not found
    }

    const [color, setColor] = useState('')
    const [selectedColor, setSelectedColor] = useState(products.color)
    const [selectedSize, setSelectedSize] = useState('')
    const [image, setImage] = useState(0)
    const router = useRouter()
    const { slug } = router.query
    const [pin, setPin] = useState()
    const [service, setService] = useState()
    const [size, setSize] = useState('')
    const [sizeWarn, setSizeWarn] = useState(false)

    useEffect(() => {
        if (!error) {
            setColor(products.color)
        }
    }, [router.query])


    const checkDelivery = async (e) => {
        e.preventDefault()
        const getpindetail = await fetch(`https://api.postalpincode.in/pincode/${pin}`)
        const senddetail = await getpindetail.json()


        if (senddetail[0].Status == 'Success') {
            setService(true)
            toast.success('Yay! This pincode is serviceable!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            setService(false)
            toast.error('Sorry! We can\'t deliver your items to this pincode', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const handleChangePin = (e) => {
        setPin(e.target.value)
        setService()
    }

    // const refreshVariant = (newSize, newColor) => {
    //     if (newSize == null) {

    //         if (Object.keys(variants[newColor]).includes('XXS')) {
    //             newSize = 'XXS'
    //         }
    //         else if (Object.keys(variants[newColor]).includes('XS')) {
    //             newSize = 'XS'
    //         }
    //         else if (Object.keys(variants[newColor]).includes('S')) {
    //             newSize = 'S'
    //         }
    //         else if (Object.keys(variants[newColor]).includes('M')) {
    //             newSize = 'M'
    //         }
    //         else if (Object.keys(variants[newColor]).includes('L')) {
    //             newSize = 'L'
    //         }
    //         else if (Object.keys(variants[newColor]).includes('XL')) {
    //             newSize = 'XL'
    //         }
    //         else if (Object.keys(variants[newColor]).includes('2XL')) {
    //             newSize = '2XL'
    //         }
    //         else if (Object.keys(variants[newColor]).includes('3XL')) {
    //             newSize = '3XL'
    //         }
    //     }
    //     setColor(newColor)
    //     let url = `${process.env.NEXT_PUBLIC_HOST}/products/fashion-products/${variants[newColor][newSize]['slug']}`
    //     console.log(url)
    //     // window.location = url;
    //     router.push(url)
    // }

    const handleAddToBag = (e) => {
        e.preventDefault()

        let slug = products.slug
        addToCart(slug, products.img[0], 1, products.price, products.title, "", "", products.category)
    }

    const handleBuyNow = (e) => {
        e.preventDefault()

        let slug = products.slug
        buyNow(slug, products.img[0], 1, products.price, products.title, "", "", products.category)
    }


    return (
        <>

            <Head>
                <title>{products.title}</title>
                <meta name="description" content="Your all needs at one adda" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-white">
                <ToastContainer
                    position="bottom-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div className="pt-6">
                    <nav aria-label="Breadcrumb" className='pt-20 px-5'>
                        <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            <li>
                                <div className="flex items-center">
                                    <a href={'/'} className="mr-2 text-sm font-medium text-gray-900">
                                        Home
                                    </a>
                                    <svg
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <a href={'/'} className="mr-2 text-sm font-medium text-gray-900">
                                        Fashion Products
                                    </a>
                                    <svg
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                            <li className="text-sm">
                                <Link href={products.slug} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                    {products.title}
                                </Link>
                            </li>
                        </ol>
                    </nav>

                    {/* Image gallery */}


                    {/* Product info */}
                    <div className="mx-auto max-w-2xl px-4 pt-3  sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24">
                        <div className="lg:col-span-2 lg:pr-8">
                            {/* <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1> */}
                            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-16 lg:pb-16 lg:pr-8">
                                {/* Description and details */}
                                <div className="md:flex-1 px-1">
                                    <div className="md:flex-1 px-2">
                                        <div className="h-80 md:h-96 rounded-lg mb-4" style={{ textAlign: "-webkit-center" }}>
                                            {productImgArr.map((value, index) => {
                                                return <img key={index} src={value}
                                                    className={`h-80 md:h-96 rounded-lg mb-4 flex justify-center items-center ${image === index ? 'block' : 'hidden'
                                                        }`}
                                                >
                                                </img>
                                            })}
                                        </div>
                                        <div className="flex -mx-2 mb-4 justify-center">
                                            {productImgArr.map((value, index) => (
                                                <button
                                                    key={index}
                                                    className={`mx-2 rounded-full w-4 h-4 border border-gray-300 focus:outline-none ${image === index ? 'bg-gray-500' : 'bg-gray-300'
                                                        }`}
                                                    onClick={() => setImage(index)}
                                                ></button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Options */}

                        <div className="mt-4 lg:row-span-3 lg:mt-0 px-5">
                            <h1 className="mt-14 text-xl tracking-tight text-gray-900 sm:text-3xl">{products.title}</h1>
                            {/* <h2 className="sr-only">Product information</h2> */}
                            <p className="text-3xl mt-5 tracking-tight text-gray-900 font-bold">₹{products.price.toLocaleString('en-IN')}</p>
                            {products.availableQty <= 0 && <p className="mt-3 title-font font-medium text-2xl text-red-600">Out of Stock!</p>}
                            {/* Reviews */}
                            {/* <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{reviews.average} out of 5 stars</p>
                                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    {reviews.totalCount} reviews
                                </a>
                            </div>
                        </div> */}

                            <form className="mt-14">
                                {/* Colors */}
                                {/* {!Object.keys(variants).includes("") && <div>
                                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                                <div className='grid grid-cols-7 gap-2 mt-5'>
                                    {Object.keys(variants).includes('white') && <button onClick={(e) => { e.preventDefault(), refreshVariant(null, 'white') }} className={`bg-slate-100 rounded-full w-8 h-8 focus:outline-none ${color == 'white' ? 'ring ring-offset-1 ring-gray-500' : ''}`}></button>}
                                    {Object.keys(variants).includes('black') && <button onClick={(e) => { e.preventDefault(), refreshVariant(null, 'black') }} className={`bg-gray-900 rounded-full w-8 h-8 focus:outline-none ${color == 'black' ? 'ring ring-offset-1 ring-gray-700' : ''}`}></button>}
                                    {Object.keys(variants).includes('blue') && <button onClick={(e) => { e.preventDefault(), refreshVariant(null, 'blue') }} className={`bg-blue-600 rounded-full w-8 h-8 focus:outline-none ${color == 'blue' ? 'ring ring-offset-1 ring-blue-400' : ''}`}></button>}
                                    {Object.keys(variants).includes('green') && <button onClick={(e) => { e.preventDefault(), refreshVariant(null, 'green') }} className={`bg-green-600 rounded-full w-8 h-8 focus:outline-none ${color == 'green' ? 'ring ring-offset-1 ring-green-400' : ''}`}></button>}
                                    {Object.keys(variants).includes('red') && <button onClick={(e) => { e.preventDefault(), refreshVariant(null, 'red') }} className={`bg-red-500 rounded-full w-8 h-8 focus:outline-none ${color == 'red' ? 'ring ring-offset-1 ring-red-400' : ''}`}></button>}
                                    {Object.keys(variants).includes('purple') && <button onClick={(e) => { e.preventDefault(), refreshVariant(null, 'purple') }} className={`bg-purple-500 rounded-full w-8 h-8 focus:outline-none ${color == 'purple' ? 'ring ring-offset-1 ring-purple-400' : ''}`}></button>}
                                    {Object.keys(variants).includes('yellow') && <button onClick={(e) => { e.preventDefault(), refreshVariant(null, 'yellow') }} className={`bg-yellow-500 rounded-full w-8 h-8 focus:outline-none ${color == 'yellow' ? 'ring ring-offset-1 ring-yellow-400' : ''}`}></button>}
                                </div>
                            </div>} */}

                                <div className="relative border-2 border-indigo-600 rounded-lg">
                                    <input onChange={handleChangePin} type="number" className="h-14 w-full pl-3 pr-20 rounded-lg z-0" placeholder="Enter Pincode" />
                                    <div className="absolute top-2 right-2">

                                        <button onClick={checkDelivery} className="h-10 w-32 text-white rounded-lg bg-indigo-600 hover:bg-indigo-700">Check Pincode</button>

                                    </div>
                                </div>
                                {/* <div
                                className="mb-1 mt-1 inline-flex w-full items-center rounded-lg bg-success-100 py-2 px-6 text-base text-success-700"
                                role="alert">
                                <span className="mr-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-5 w-5">
                                        <path
                                            fill-rule="evenodd"
                                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </span>
                                A simple success alert - check it out!
                            </div> */}

                                <div className='md:flex md:gap-3 mt-10'>
                                    <button
                                        type="submit" disabled={products.availableQty <= 0 ? true : false} onClick={handleBuyNow}
                                        className="mb-5 flex w-full lg:w-1/2 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75"
                                    >
                                        Buy Now
                                    </button>
                                    <button
                                        type="submit" disabled={products.availableQty <= 0 ? true : false} onClick={handleAddToBag}
                                        className="mb-5 flex w-full lg:w-1/2 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75"
                                    >
                                        Add to bag
                                    </button>
                                </div>
                            </form>
                        </div>


                    </div>
                    <div className="pt-10 lg:pt-3">
                        <span className="mb-3 text-sm font-bold uppercase text-violet-700 mx-auto flex-col flex items-center">
                            Product Description
                        </span>
                    </div>
                    <div className='mx-auto max-w-2xl px-4 pt-3  sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24'>
                        {products.desc != null && <div className="mt-10">
                            <h2 className="text-md font-medium text-gray-900">Description</h2>

                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600 text-justify">{products.desc}</p>
                            </div>
                        </div>}

                        {prodHighlights.length != 0 && <div className="mt-10">
                            <h3 className="text-md font-medium text-gray-900">Highlights</h3>

                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    {prodHighlights.map((value, index) => {
                                        return <li key={index} className="text-gray-400">
                                            <span className="text-gray-600">{value}</span>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </div>}

                        {prodDetails.length != 0 && <div className="mt-10 xs:mb-20">
                            <h3 className="text-md font-medium text-gray-900">Details</h3>

                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    {prodDetails.map((value, index) => {
                                        return <li key={index} className="text-gray-400">
                                            <span className="text-gray-600">{value}</span>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </div>}
                    </div>
                </div>
            </div >
        </>
    )
}

export async function getServerSideProps(context) {
    let error;
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }

    let products = await Product.findOne({ slug: context.query.slug })

    if (products == null || products.category != 'personal-and-beauty-care-products') {
        return {
            props: { error: 404 }, // will be passed to the page component as props
        }
    }

    // let variants = await Product.find({ title: products.title })
    let imgVariants = await Product.find({ color: products.color, title: products.title})
    let productImgArr = imgVariants[0].img
    // let colorSizeSlug = {}
    let prodHighlights = products.highlights
    let prodDetails = products.details


    // for (let item of variants) {
    //     if (Object.keys(colorSizeSlug).includes(item.color)) {
    //         colorSizeSlug[item.color][item.size] = { slug: item.slug }
    //     }
    //     else {
    //         colorSizeSlug[item.color] = {}
    //         colorSizeSlug[item.color][item.size] = { slug: item.slug }
    //     }
    // }
    return {
        props: {prodDetails: JSON.parse(JSON.stringify(prodDetails)), prodHighlights: JSON.parse(JSON.stringify(prodHighlights)), productImgArr: JSON.parse(JSON.stringify(productImgArr)), products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
    }
}

export default Beautyproducts