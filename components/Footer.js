import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const d = new Date();
  const year = d.getFullYear();
  return (
    <>
      <footer aria-label="Site Footer" className="bg-indigo-100">
        <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* <div className="flex flex-col items-center gap-4 rounded-lg bg-indigo-600 p-6 shadow-lg sm:flex-row sm:justify-between">
            <strong className="text-xl text-white sm:text-xl">
              Make Your Next Career Move!
            </strong>
            <a className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-8 py-3 text-indigo-600 hover:bg-transparent hover:text-white focus:outline-none focus:ring active:bg-white/90" >
              <span className="text-sm font-medium"> Lets Get Started </span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div> */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:gap-52 sm:grid-cols-2 lg:grid-cols-4 ml-10">
            <div className="text-left">
              <p className="text-lg font-medium text-gray-900">About</p>
              <nav aria-label="Footer About Nav" className="mt-8">
                <ul className="space-y-4 text-sm">
                  <li>
                    <Link href={"/cart"}>
                      <a className="text-gray-700 transition hover:text-blue-600">
                        Contact Us
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <a className="text-gray-700 transition hover:text-blue-600">
                        About Us
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <a className="text-gray-700 transition hover:text-blue-600">
                        Careers
                      </a>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="text-left">
              <p className="text-lg font-medium text-gray-900">Categories</p>
              <nav aria-label="Footer Category Nav" className="mt-8">
                <ul className="space-y-4 text-sm">
                  <li>
                    <Link href={"/fashion"}>
                      <a className="text-gray-700 transition hover:text-blue-600">
                        Fashion Products
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/homefurnishing"}>
                      <a className="text-gray-700 transition hover:text-blue-600">
                        Home Furnishing
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/electronics"}>
                      <a className="text-gray-700 transition hover:text-blue-600">
                        Electronic Items
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/grocery"}>
                      <a className="text-gray-700 transition hover:text-blue-600">
                        Grocery
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/personalcare"}>
                      <a className="text-gray-700 transition hover:text-blue-600">
                        Beauty & Personal Care
                      </a>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="text-left">
              <p className="text-lg font-medium text-gray-900">
                Consumer Policy
              </p>
              <nav aria-label="Footer Services Nav" className="mt-8">
                <ul className="space-y-4 text-sm">
                  <li>
                    <Link href={"/"}>
                      <a className="text-gray-700 transition hover:text-blue-600">
                        Return Policy
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <a className="text-gray-700 transition hover:text-blue-600">
                        Terms of Use
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <a className="text-gray-700 transition hover:text-blue-600">
                        Privacy
                      </a>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="text-left">
              <p className="text-lg font-medium text-gray-900">Helpful Links</p>
              <nav aria-label="Footer Helpful Nav" className="mt-8">
                <ul className="space-y-4 text-sm">
                  <li>
                    <Link href={"/"}>
                      <a className="text-gray-700 transition hover:text-blue-600">
                        FAQs
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <a className="text-gray-700 transition hover:text-blue-600">
                        Terms and Conditions
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <a className="text-gray-700 transition hover:text-blue-600">
                        Support
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <a className="text-gray-700 transition hover:text-blue-600">
                        Live Chat
                      </a>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="mt-16">
            <div className="md:flex justify-between">
              <ul>
                <img
                  className="h-10 items-center"
                  src="../../images/razorpay-payment.png"
                  alt=""
                />
                <img className="h-5" src="../../images/payment-option.svg" />
              </ul>
              <ul className="flex justify-center gap-6 sm:justify-end items-center mt-10">
                <li>
                  <Link
                    href={"https://www.facebook.com/theanandppatel/"}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <a className="text-indigo-700 transition hover:text-indigo-700/75">
                      <span className="sr-only" href={"https://facebook.com"}>
                        Facebook
                      </span>
                      <Image src="/social-media-svg/facebook.svg" alt="Facebook Icon" width={24} height={24} />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"https://www.instagram.com/anandppatel"}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <a className="text-rose-700 transition hover:text-rose-700/75">
                      <span className="sr-only">Instagram</span>
                      <Image src="/social-media-svg/instagram.svg" alt="Instagram Icon" width={24} height={24} />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"https://x.com/theanandppatel1"}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <a className="text-indigo-500 transition hover:text-indigo-500/75">
                      <span className="sr-only">𝕏</span>
                      <Image src="/social-media-svg/x.svg" alt="X.com Icon" width={24} height={24} />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"https://github.com/theanandppatel/"} rel="noreferrer" target="_blank">
                    <a className="text-slate-700 transition hover:text-slate-700/75">
                      <span className="sr-only">GitHub</span>
                      <Image src="/social-media-svg/github.svg" alt="Github Icon" width={24} height={24} />
                    </a>
                  </Link>
                </li>
                {/* <li>
                <Link href={'/'} rel="noreferrer" target="_blank" className="text-teal-700 transition hover:text-teal-700/75">
                  <span>
                    <span className="sr-only">Dribbble</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                    </svg>
                  </span>
                </Link>
              </li> */}
              </ul>
            </div>

            <div className="mt-10 lg:pb-0 pb-10">
              <div className="flex flex-col items-center justify-between gap-3 text-sm text-neutral-700 md:flex-row">
                <img className="h-12" src="../../images/logo-6.png" alt="" />
                <p>
                  Created By{" "}
                  <strong>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.linkedin.com/in/theanandppatel/"
                    >
                      Anand Patel
                    </a>
                  </strong>
                  . {/* */}©{year} All Right Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
