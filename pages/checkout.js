import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Head from "next/head";
import { redirect } from "next/dist/server/api-utils";

const orderid = require("order-id")("key");
const Checkout = ({
  useremail,
  user,
  cart,
  addToCart,
  removeFromCart,
  totalQty,
  subTotal,
  fAmt,
  clearCart,
}) => {
  const [paymentmethod, setPaymentmethod] = useState(null);
  const [onlineCheck, setOnlineCheck] = useState(false);
  const [codCheck, setCodCheck] = useState(false);
  const [fullname, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();

  // useEffect(() => {
  //     if (useremail != '') {
  //         setEmail(useremail)
  //     }
  // }, [])

  useEffect(() => {
    if (
      fullname.length > 3 &&
      address.length > 3 &&
      zipcode.length > 3 &&
      phone.length > 3 &&
      (useremail.length > 3 || email.length > 3)
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [fullname, address, zipcode, email, phone]);

  const capitalizeFirstLetter = (str) => {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
  };

  const handleChange = async (e) => {
    if (e.target.name == "full-name") {
      setFullName(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "zipcode") {
      setZipcode(e.target.value);
      if (e.target.value.length == 6) {
        // let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        // let fpin = await pins.json();
        // if (Object.keys(fpin).includes(e.target.value)) {
        //     setState(fpin[e.target.value][1])
        //     setCity(fpin[e.target.value][0])
        // } else {
        //     setState('')
        //     setCity('')
        // }

        let fetchpin = { pincode: e.target.value };

        const data = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/pincode`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(fetchpin),
          }
        );
        let res = await data.json();
        if (res.senddetail[0].Status == "Success") {
          setCity(res.senddetail[0].PostOffice[0].Block);
          setState(res.senddetail[0].PostOffice[0].State);
          setCountry(res.senddetail[0].PostOffice[0].Country);
        }
      } else {
        setState("");
        setCity("");
        setCountry("");
      }
    } else if (e.target.name == "city") {
      setCity(e.target.value);
    } else if (e.target.name == "state") {
      setState(e.target.value);
    } else if (e.target.name == "country") {
      setCountry(e.target.value);
    } else if (e.target.name == "contact-number") {
      setPhone(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    }
  };

  const handleProceedPay = async () => {
    const getpindetail = await fetch(
      `https://api.postalpincode.in/pincode/${zipcode}`
    );
    const senddetail = await getpindetail.json();

    if (email.length == 0) {
      email = useremail;
    }
    if (Object.keys(cart).length == 0) {
      toast.error("There is no item found in your cart", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (zipcode.length !== 6) {
      toast.error("Please enter a valid zipcode", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (phone.length !== 10) {
      toast.error("Please enter a valid phone number", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (senddetail[0].Status != "Success") {
      toast.error("Sorry! We cant't deliver your items to this pincode", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      let delinfo =
        fullname +
        "\n" +
        phone +
        "\n" +
        address +
        "\n" +
        city +
        ", " +
        state +
        "\n" +
        country +
        " - " +
        zipcode;
      if (paymentmethod) {
        makePayment(fullname, delinfo);
      } else if (paymentmethod == false) {
        makeCOD(delinfo);
      } else {
        toast.error("Please select payment method", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  const makeCOD = async (deliveryinfo) => {
    let orderId = ("" + (Math.random() + 1)).substring(2, 13);
    let paymentMethod = "Cash On Delivery(COD)";
    let deliveryData = {
      cart,
      fAmt,
      deliveryinfo,
      email,
      subTotal,
      orderId,
      paymentMethod,
    };

    const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/makeCod`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deliveryData),
    });

    if (data.status == 200) {
      router.push("/order?id=" + orderId);
      clearCart();
    } else {
      toast.error("Internal Server Error Occured", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const makePayment = async (ofullname, deliveryinfo) => {
    if(!user.value){
      toast.error("Please sign in to place an order", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    let orderId = ("" + (Math.random() + 1)).substring(2, 13);
    let paymentMethod = "Online Payment";

    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    let deliveryData = {
      cart,
      fAmt,
      deliveryinfo,
      email,
      subTotal,
      orderId,
      paymentMethod,
    };

    const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/razorpay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deliveryData),
    }).then((t) => t.json());

    if (data.success == false) {
      clearCart();
      toast.error(data.error, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      var options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        amount: data.amount,
        currency: data.currency,
        description: "Thank you for your shopping",
        name: "Onstore",
        image: "/images/logo-6.png",
        order_id: data.id,
        handler: async function (response) {
          //Update status into orders table after checking transaction status
          const razorData = {
            OrderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            razorpaySign: response.razorpay_signature,
          };
          // Validate payment at server - using webhooks is a better idea.
          const result = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(razorData),
            }
          );

          if (result.status == 200) {
            router.push("/order?id=" + orderId);
            clearCart();
          } else {
            toast.error("Internal Server Error Occured", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        },
        prefill: {
          name: ofullname,
          email: email,
          contact: phone,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
  };

  return (
    <div>
      <Head>
        <title>Checkout Page - Onstore</title>
        <meta
          name="description"
          content="Your all needs at one store. Onstore - An ecommerce platform. Check out page"
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
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 pt-24 mb-20">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 h-96 scrollbar-thumb-custom scrollbar-track-custom-light overflow-y-scroll scrollbar-thin">
            {Object.keys(cart).length == 0 && (
              <div className="cart-empty mt-1 font-medium">
                Your cart is empty!
              </div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <div
                  key={k}
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                >
                  <img
                    className="m-2 h-24 w-28 object-contain"
                    src={cart[k].image}
                    alt=""
                  />
                  <div className="flex w-full flex-col px-5 py-4">
                    <span className="font-md">{cart[k].name}</span>
                    <div className="space-x-7">
                      {cart[k].size != "" && (
                        <span className="text-gray-400">
                          Size: {cart[k].size}
                        </span>
                      )}
                      {cart[k].variant != "" && (
                        <span className="text-gray-400">
                          Color: {capitalizeFirstLetter(cart[k].variant)}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <p className="text-lg font-semibold">
                        ₹{(cart[k].price * cart[k].qty).toLocaleString("en-IN")}
                      </p>

                      <div className="w-24 h-8 flex">
                        <button
                          onClick={() => {
                            removeFromCart(
                              k,
                              cart[k].image,
                              1,
                              cart[k].price,
                              cart[k].name,
                              cart[k].size,
                              cart[k].variant
                            );
                          }}
                          className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                        >
                          <span className="m-auto text-xl font-thin">
                            &minus;
                          </span>
                        </button>
                        <input
                          type="number"
                          className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                          name="custom-input-number"
                          value={cart[k].qty}
                          readOnly
                        ></input>
                        <button
                          onClick={() => {
                            addToCart(
                              k,
                              cart[k].image,
                              1,
                              cart[k].price,
                              cart[k].name,
                              cart[k].size,
                              cart[k].variant
                            );
                          }}
                          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                        >
                          <span className="m-auto text-xl font-thin">
                            &#43;
                          </span>
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        removeFromCart(
                          k,
                          cart[k].qty,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      type="button"
                      className="text-justify font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-lg font-medium">Payment Methods</p>
          <form className="mt-5 grid gap-6">
            <div
              className="relative"
              onClick={(e) => {
                setPaymentmethod(true);
                setOnlineCheck(true);
                setCodCheck(false);
              }}
            >
              <input
                onChange={(e) => {}}
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                checked={onlineCheck}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/online-payment.png"
                  alt=""
                />
                <div className="ml-7 h-10">
                  <p className="mt-2 font-semibold top-1/2">Online Payment</p>
                </div>
              </label>
            </div>
            <div
              className="relative"
              onClick={(e) => {
                setPaymentmethod(false);
                setOnlineCheck(false);
                setCodCheck(true);
              }}
            >
              <input
                onChange={(e) => {}}
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked={codCheck}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/cod.png"
                  alt=""
                />
                <div className="ml-7 h-10">
                  <p className="mt-2 font-semibold top-1/2">Cash on Delivery</p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <label
              htmlFor="full-name"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Full Name<span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                onChange={handleChange}
                value={fullname}
                type="text"
                id="full-name"
                name="full-name"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your Full Name Here"
                required
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email<span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                onChange={handleChange}
                value={email}
                type="text"
                id="email"
                name="email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
                required
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor="contact-number"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Contact Number<span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                onChange={handleChange}
                value={phone}
                type="number"
                id="number"
                name="contact-number"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="91XXX XXXXX"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  style={{ color: "rgb(156, 163, 175)" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-telephone-fill"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path
                    fillRule="evenodd"
                    d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                    fill="#9ca3af"
                  ></path>{" "}
                </svg>
              </div>
            </div>
            <label
              htmlFor="address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Shipping Address
            </label>
            <div className="relative">
              <textarea
                onChange={handleChange}
                value={address}
                name="address"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your address"
                rows="3"
                id="message"
              ></textarea>
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  style={{ color: "rgb(156, 163, 175)" }}
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.05025 4.05025C7.78392 1.31658 12.2161 1.31658 14.9497 4.05025C17.6834 6.78392 17.6834 11.2161 14.9497 13.9497L10 18.8995L5.05025 13.9497C2.31658 11.2161 2.31658 6.78392 5.05025 4.05025ZM10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z"
                    fill="#9ca3af"
                  />{" "}
                </svg>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="sm:w-1/2">
                <label
                  htmlFor="pin-code"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Pin Code
                </label>
                <input
                  onChange={handleChange}
                  name="zipcode"
                  value={zipcode}
                  type="number"
                  className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 w-full"
                  placeholder="Pin Code"
                />
              </div>
              <div className="sm:w-1/2">
                <label
                  htmlFor="city"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  City
                </label>
                <input
                  onChange={handleChange}
                  name="city"
                  value={city}
                  type="text"
                  className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="City"
                />
              </div>
              {/* <input type="text" name="credit-cvc" className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="CVC" /> */}
            </div>
            <div className="flex gap-5">
              <div className="sm:w-1/2">
                <label
                  htmlFor="state"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  State
                </label>
                <input
                  onChange={handleChange}
                  name="state"
                  value={state}
                  type="text"
                  className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 w-full"
                  placeholder="State"
                />
              </div>
              <div className="sm:w-1/2">
                <label
                  htmlFor="country"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Country
                </label>
                <input
                  onChange={handleChange}
                  name="country"
                  value={country}
                  type="text"
                  className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Country"
                />
              </div>
              {/* <input type="text" name="credit-cvc" className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="CVC" /> */}
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">
                  ₹{subTotal.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">
                  {subTotal == 0
                    ? "-"
                    : (subTotal < 1000 && subTotal != 0
                        ? "₹40"
                        : "FREE"
                      ).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                ₹
                {(
                  subTotal + (subTotal < 1000 && subTotal != 0 ? 40 : 0)
                ).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
          <button
            className="disabled:bg-gray-400 hover:bg-gray-800 mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
            onClick={handleProceedPay}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
