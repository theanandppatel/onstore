import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from "next/router";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const NavbarEle = ({
  logout,
  open,
  setOpen,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [token, setToken] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [fullScreenMenu, setFullScreenMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    Object.keys(cart).length != 0 && setSidebar(true);

    let exempted = ["/checkout", "/order", "/orders"];
    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }

    if (!localStorage.getItem("myuser")) {
      setToken("");
    }

    if (localStorage.getItem("myuser")) {
      setToken(JSON.parse(localStorage.getItem("myuser")).token);
    }
  }, []);

  useEffect(() => {
    setFullScreenMenu(false);
  }, [router.query]);

  useEffect(() => {
    Object.keys(cart).length != 0 && setSidebar(true);

    let exempted = ["/checkout", "/order", "/orders"];
    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }

    if (localStorage.getItem("myuser")) {
      setToken(JSON.parse(localStorage.getItem("myuser")).token);
    }
  }, [router]);

  const onSearch = (e) => {
    e.preventDefault();

    const encodedQuery = encodeURI(searchQuery);
    router.push(`/search?query=${encodedQuery}`);
  };

  const toggleCart = () => {
    setOpen(true);
  };

  const handleUserLoggedIn = () => {
    if (token != "") {
      router.push("/my-account?usertoken=" + token);
    } else {
      router.push("/login");
    }
  };

  const closeMenu = () => {
    setFullScreenMenu(false);
  };

  const openMenu = () => {
    setFullScreenMenu(true);
  };

  const capitalizeFirstLetter = (str) => {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
  };

  return (
    <>
      {/* {!sidebar && dropdown && <div className='fixed right-8 md:right-10 mt-4 mr-5 bg-green-300 shadow-lg border top-6 py-4 rounded-md px-5 w-32 z-20'>
        <ul>
          <Link href={'/myaccount?usertoken=' + token}><a><li className='py-1 hover:text-green-700 text-sm font-bold'>My account</li></a></Link>
          <Link href={'/orders'}><a><li className='py-1 hover:text-green-700 text-sm font-bold'>Orders</li></a></Link>
          <li onClick={handleLogout} className='cursor-pointer py-1 hover:text-green-700 text-sm font-bold'>Logout</li>
        </ul>
      </div>} */}

      {user.value && dropDown && (
        <div className="user-nav-sub w-52 h-auto bg-gray-100 fixed right-0 top-12 z-30 mr-2">
          <a
            className="user-nav-sub-link flex justify-between text-left p-6 pb-1"
            href="/account"
          >
            View Account
            <span
              role="img"
              aria-label="user"
              className="anticon anticon-user justify-center mt-1"
            >
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="user"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
              </svg>
            </span>
          </a>
          <h6
            className="user-nav-sub-link margin-0 d-flex justify-between p-5 text-left flex pb-3"
            role="presentation"
          >
            Sign Out
            <span
              role="img"
              aria-label="logout"
              className="anticon anticon-logout justify-center mt-1"
            >
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="logout"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 01-112.7 75.9A352.8 352.8 0 01512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 01-112.7-75.9 353.28 353.28 0 01-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z"></path>
              </svg>
            </span>
          </h6>
        </div>
      )}

      {/* Top Navbar Start */}

      <nav
        className="fixed z-30 flex justify-between items-center w-[100%] mx-auto backdrop-filter backdrop-blur-sm bg-opacity-100"
        style={{ backgroundColor: "#ffffff80" }}
      >
        <Link href={"/"}>
          <img
            className="ml-2 md:ml-5 w-32 cursor-pointer"
            src="../../images/logo-6.png"
            alt="..."
          />
        </Link>
        <div
          className={`nav-links md:visible invisible duration-500 md:static absolute md:min-h-fit min-h-[40vh] left-0 top-[-100%] md:w-auto  w-full flex items-center px-5`}
        >
          <ul className="flex md:flex-row flex-col md:items-center lg:gap-[4vw] md:gap-[2vw] gap-8 md:text-xs lg:text-base text-base">
            <li>
              <Link href={"/fashion"}>
                <a className="text-gray-700 hover:text-blue-700">Fashion</a>
              </Link>
            </li>
            <li>
              <Link href={"/homefurnishing"}>
                <a className="text-gray-700 hover:text-blue-600">
                  Home Furnishing
                </a>
              </Link>
            </li>
            <li>
              <Link href={"/electronics"}>
                <a className="text-gray-700 hover:text-blue-700">
                  Electronic Items
                </a>
              </Link>
            </li>
            <li>
              <Link href={"/grocery"}>
                <a className="text-gray-700 hover:text-blue-700">Grocery</a>
              </Link>
            </li>
            <li>
              <Link href={"/personalcare"}>
                <a className="text-gray-700 hover:text-blue-700">
                  Beauty & Personal Care
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-0 md:gap-6 -mr-5 md:mr-5">
          <form
            className="relative flex h-10 max-w-[200px] content-between items-center md"
            onSubmit={onSearch}
          >
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="h-full w-full rounded-lg border border-solid border-transparent bg-neutral-100 p-2.5 pr-9 text-neutral-900 placeholder-neutral-500 outline-none transition-colors focus:border-violet-500"
              type="text"
              name="search"
              id="search"
              placeholder="Search"
            />
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute right-0 h-full w-[30px] cursor-pointer pr-2.5 text-neutral-500"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </form>
          <svg
            onClick={toggleCart}
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-700 invisible md:visible transition-colors hover:text-violet-700 cursor-pointer md:w-6"
            height="20px"
            width="20px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <svg
            onClick={handleUserLoggedIn}
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-700 md:w-6 invisible md:visible transition-colors hover:text-violet-700 cursor-pointer"
            height="20px"
            width="20px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </nav>

      {/* Top Navbar End */}

      {/* Bottom Navbar Start */}

      <div
        id="menu"
        className={`fixed z-50 flex justify-center items-center bg-black duration-700 ${
          fullScreenMenu
            ? "w-screen h-screen opacity-95 animate-fadeIn"
            : "w-0 h-0 opacity-0 hidden animate-fadeOut"
        } duration-700`}
      >
        <a
          className="cursor-pointer fixed top-6 right-8 text-white hover:text-violet-700 text-7xl font-semibold duration-300"
          onClick={closeMenu}
        >
          &times;
        </a>
        <div className="flex flex-col text-white text-center text-xl font-light space-y-3">
          <Link
            className="text-slate-200 hover:text-violet-700 duration-300"
            href="/fashion"
          >
            Fashion Items
          </Link>
          <Link
            className="text-slate-200 hover:text-violet-700 duration-300"
            href="/homefurnishing"
          >
            Home Furnishing Products
          </Link>
          <Link
            className="text-slate-200 hover:text-violet-700 duration-300"
            href="/electronics"
          >
            Electronics Items
          </Link>
          <Link
            className="text-slate-200 hover:text-violet-700 duration-300"
            href="/grocery"
          >
            Grocery Items
          </Link>
          <Link
            className="text-slate-200 hover:text-violet-700 duration-300"
            href="/personalcare"
          >
            Beauty & Personal Products
          </Link>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 left-0 z-50 h-16 md:hidden backdrop-filter backdrop-blur-lg bg-opacity-50 border-b border-gray-200">
        <ul className="flex h-full">
          <Link href={"/"}>
            <li className="flex-1">
              <a
                className={`flex h-full w-full flex-col items-center justify-center text-xs font-medium text-neutral-700 hover:text-violet-700 ${
                  fullScreenMenu ? "text-slate-200" : ""
                }`}
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="1.2rem"
                  width="1.2rem"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span className="mt-1">Home</span>
              </a>
            </li>
          </Link>
          <li className="flex-1">
            <a
              onClick={openMenu}
              className={`flex h-full w-full flex-col items-center justify-center text-xs font-medium text-neutral-700 hover:text-violet-700 false ${
                fullScreenMenu ? "text-slate-200" : ""
              }`}
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1.2rem"
                width="1.2rem"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span className="mt-1">Categories</span>
            </a>
          </li>
          <li className="flex-1">
            <a
              className={`flex h-full w-full flex-col items-center justify-center text-xs font-medium text-neutral-700 hover:text-violet-700 false ${
                fullScreenMenu ? "text-slate-200" : ""
              }`}
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1.2rem"
                width="1.2rem"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  closeMenu();
                  toggleCart();
                }}
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span className="mt-1">Cart</span>
            </a>
          </li>
          <Link href={"/checkout"}>
            <li className="flex-1">
              <a
                className={`flex h-full w-full flex-col items-center justify-center text-xs font-medium text-neutral-700 hover:text-violet-700 false ${
                  fullScreenMenu ? "text-slate-200" : ""
                }`}
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="13"
                  viewBox="0 0 483.1 483.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="1.2rem"
                  width="1.2rem"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Capa_1"
                  xmlSpace="preserve"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="2" />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path
                          d="M434.55,418.7l-27.8-313.3c-0.5-6.2-5.7-10.9-12-10.9h-58.6c-0.1-52.1-42.5-94.5-94.6-94.5s-94.5,42.4-94.6,94.5h-58.6 c-6.2,0-11.4,4.7-12,10.9l-27.8,313.3c0,0.4,0,0.7,0,1.1c0,34.9,32.1,63.3,71.5,63.3h243c39.4,0,71.5-28.4,71.5-63.3 C434.55,419.4,434.55,419.1,434.55,418.7z M241.55,24c38.9,0,70.5,31.6,70.6,70.5h-141.2C171.05,55.6,202.65,24,241.55,24z M363.05,459h-243c-26,0-47.2-17.3-47.5-38.8l26.8-301.7h47.6v42.1c0,6.6,5.4,12,12,12s12-5.4,12-12v-42.1h141.2v42.1 c0,6.6,5.4,12,12,12s12-5.4,12-12v-42.1h47.6l26.8,301.8C410.25,441.7,389.05,459,363.05,459z"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <path
                          d="M255.25,293.4h-27.5c-10,0-18.1-8.1-18.1-18.1s8.1-18.1,18.1-18.1h48.4c6.6,0,12-5.4,12-12s-5.4-12-12-12h-22.6v-16.7 c0-6.6-5.4-12-12-12s-12,5.4-12,12v16.7h-1.7c-23.2,0-42.1,18.9-42.1,42.1s18.9,42.1,42.1,42.1h27.5c10,0,18.1,8.1,18.1,18.1 s-8.1,18.1-18.1,18.1h-49.3c-6.6,0-12,5.4-12,12s5.4,12,12,12h23.5v17.1c0,6.6,5.4,12,12,12s12-5.4,12-12v-17.1h2 c0.1,0,0.2,0,0.3,0c23-0.3,41.5-19.1,41.5-42.1C297.35,312.3,278.45,293.4,255.25,293.4z"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>

                <span className="mt-1">Checkout</span>
              </a>
            </li>
          </Link>
          <li className="flex-1">
            <div
              onClick={handleUserLoggedIn}
              className={`flex h-full w-full flex-col items-center justify-center text-xs font-medium text-neutral-700 hover:text-violet-700 false ${
                fullScreenMenu ? "text-slate-200" : ""
              }`}
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1.2rem"
                width="1.2rem"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="mt-1">Profile</span>
            </div>
          </li>
        </ul>
      </div>

      {/* Bottom Navbar End */}

      {/* SideCart Start  */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md h-[93vh] sm:h-[100vh]">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {/* {Object.keys(cart).map((k) => {
                  return <li key={k}>
                    <div className="item flex my-5">
                      <div className='w-2/3 font-semibold'>{`${cart[k].name} ${(cart[k].category != 'stickers' && cart[k].category !== 'mugs') ? '(' + cart[k].size + '/' + cart[k].variant + ')' : ''}`}</div>
                      <div className='flex items-center justify-center w-1/3 '><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer mx-2 text-green-800 text-lg' />{cart[k].qty}<AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer mx-2 text-green-800 text-lg' /></div>
                    </div>
                  </li>
                })} */}
                              {Object.keys(cart).length == 0 && (
                                <div className="cart-empty mt-7 font-medium">
                                  Your cart is empty!
                                </div>
                              )}
                              {Object.keys(cart).map((k) => {
                                return (
                                  <li key={k} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                                      <img
                                        src={cart[k].image}
                                        alt={"dsd"}
                                        className="h-full w-full object-contain"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            <a href={"/"}>{cart[k].name}</a>
                                          </h3>
                                          <p className="ml-4">
                                            ₹
                                            {(
                                              cart[k].price * cart[k].qty
                                            ).toLocaleString("en-IN")}
                                          </p>
                                        </div>
                                        <div className="flex gap-10">
                                          {cart[k].variant != "" && (
                                            <p className="mt-1 text-sm text-gray-500">
                                              Color:{" "}
                                              {capitalizeFirstLetter(
                                                cart[k].variant
                                              )}
                                            </p>
                                          )}
                                          {cart[k].size && (
                                            <p className="mt-1 text-sm text-gray-500">
                                              Size: {cart[k].size}
                                            </p>
                                          )}
                                        </div>
                                        <div className="mt-3 mb-2 w-24 h-8 flex">
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
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500">
                                          Qty {cart[k].qty}
                                        </p>

                                        <div className="flex">
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
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>₹{subTotal.toLocaleString("en-IN")}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <Link href={"/checkout"}>
                            <span className="cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                              Checkout
                            </span>
                          </Link>
                        </div>
                        <div className="mt-0 sm:mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p className="hidden sm:block">
                            or
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/* SideCart End */}

      {/* <div className={`sticky top-0 z-10 shadow-md bg-white ${!sidebar && 'overflow-hidden'}`}>
        <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2">
          <div className="logo mr-44 md:mx-5">
            <Link href={'/'}><a><Image height={60} width={200} src="/images/navbar-logo.png" alt="E-cloud logo" /></a></Link>
          </div>
          <div className="nav">
            <ul className='flex space-x-4 font-bold md:text-base'>
              <Link href={'/tshirts'}><a><li className='hover:text-green-600'>Tshirts</li></a></Link>
              <Link href={'/hoodies'}><a><li className='hover:text-green-600'>Hoodies</li></a></Link>
              <Link href={'/stickers'}><a><li className='hover:text-green-600'>Stickers</li></a></Link>
              <Link href={'/mugs'}><a><li className='hover:text-green-600'>Mugs</li></a></Link>
            </ul>
          </div>

          <div className="cursor-pointer items-center cart absolute right-0 top-6 mx-5 flex ">
            {!user.value && <button onClick={() => { router.push('/login') }} className='bg-green-600 px-2 py-2 rounded-md text-sm font-medium flex text-white mx-3 hover:bg-green-700'>Login <span className='text-black text-xl ml-2'><RiLoginBoxFill /></span></button>}
            <span onClick={() => { setDropdown(!dropdown) }} className='top-4'>
              {user.value && <MdAccountCircle className='text-xl md:text-2xl mx-2' />}
            </span>

            <AiOutlineShoppingCart onClick={toggleCart} className='text-xl md:text-2xl' />
            {Object.keys(cart).length > 0 && <span className="absolute top-1 md:top-1 right-1 inline-block w-3 h-3 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"></span>}
          </div>

          <div className={`w-80 h-[100vh] sidecart overflow-y-auto absolute top-0 transition-all bg-green-200 py-10 pl-6 ${sidebar ? 'right-0' : '-right-96'} `}>
            <h2 className='font-bold text-xl text-center'>Shopping cart</h2>
            <span onClick={toggleCart} className="absolute top-5  right-2 cursor-pointer text-2xl text-green-800"><AiFillCloseCircle /></span>
            <div className="item-list pl-3 pr-1">
              <ol className='list-decimal font-semibold'>
                {Object.keys(cart).length == 0 && <div className='cart-empty mt-7 font-medium'>Your cart is empty!
                </div>}
                {Object.keys(cart).map((k) => {
                  return <li key={k}>
                    <div className="item flex my-5">
                      <div className='w-2/3 font-semibold'>{`${cart[k].name} ${(cart[k].category != 'stickers' && cart[k].category !== 'mugs') ? '(' + cart[k].size + '/' + cart[k].variant + ')' : ''}`}</div>
                      <div className='flex items-center justify-center w-1/3 '><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer mx-2 text-green-800 text-lg' />{cart[k].qty}<AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer mx-2 text-green-800 text-lg' /></div>
                    </div>
                  </li>
                })}
              </ol>
            </div>


            <div className="cart-subtotal font-bold mt-16 ml-3">
              Subtotal: ₹{subTotal}
            </div>
            <div className="cart-button flex">

              <Link href={'/checkout'}><button disabled={Object.keys(cart).length == 0} className="disabled:bg-green-300 flex my-3 mx-2 text-white bg-green-500 border-0 py-1 px-2 focus:outline-none hover:bg-green-600 rounded text-lg"><IoBagCheck className='text-xl mt-1 mr-1' />Checkout</button></Link>
              <button disabled={Object.keys(cart).length == 0} onClick={() => { clearCart() }} className="disabled:bg-green-300 flex my-3 mx-2 text-white bg-green-500 border-0 py-1 px-2 focus:outline-none hover:bg-green-600 rounded text-lg"><BsFillBagXFill className='text-lg mt-1 mr-1' />Clear Cart</button>
            </div>
          </div>
        </div>

      </div> */}
    </>
  );
};

export default NavbarEle;
