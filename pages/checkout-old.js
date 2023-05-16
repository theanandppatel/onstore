<div className="overflow-y-hidden">
    <div className="flex justify-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 ">
        <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
            <div className="flex w-full  flex-col justify-start items-start">
                <div>
                    <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Check out</p>
                </div>

                <div className="mt-12">
                    <p className="text-xl font-semibold leading-5 text-gray-800">Shipping Details</p>
                </div>
                <div className="mt-8 flex flex-col justify-start items-start w-full space-y-8 ">
                    <input onChange={handleChange} name='fname' value={fname} className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="text" placeholder="First Name" />
                    <input onChange={handleChange} name='lname' value={lname} className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="text" placeholder="Last Name" />
                    <input onChange={handleChange} name='address1' value={address1} className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="text" placeholder="Address" />
                    <input onChange={handleChange} name='address2' value={address2} className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="text" placeholder="Address (line 02)" />
                    <div className="flex justify-between flex-col sm:flex-row w-full items-start space-y-8 sm:space-y-0 sm:space-x-8">
                        <input onChange={handleChange} name='zipcode' value={zipcode} className="no-spinner px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="number" placeholder="Zip Code" />
                        <div className="relative w-full">
                            <input onChange={handleChange} name='city' value={city} className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="text" placeholder="City" />
                        </div>
                    </div>
                    <div className="flex justify-between flex-col sm:flex-row w-full items-start space-y-8 sm:space-y-0 sm:space-x-8">
                        <input onChange={handleChange} name='state' value={state} className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="text" placeholder="State" />

                        <div className="w-full">
                            <input onChange={handleChange} name='country' value={country} className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 pt-4 pb-3   w-full" type="text" placeholder="Country" />
                        </div>
                    </div>
                    {user.value ? <input onChange={handleChange} name='email' value={useremail} className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4   w-full" type="text" placeholder="Email" readOnly /> : <input onChange={handleChange} name='email' value={email} className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4   w-full" type="text" placeholder="Email" />}
                    <input onChange={handleChange} name='phone' value={phone} className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4   w-full" type="number" placeholder="Phone Number" />
                </div>
                <button disabled={disabled} onClick={handleProceedPay} className="disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-8 text-base font-medium focus:ring-ocus:ring-gray-800 leading-4 hover:bg-black py-4 w-full md:w-4/12 lg:w-full text-white bg-gray-800">Proceed to payment</button>

                <div className="review-cart mt-14 w-full">
                    <p className="text-xl font-bold leading-5 text-gray-800">Review Cart</p>

                    {Object.keys(cart).length > 0 ? <div className="summary item-list mt-4 py-4 pl-4 pr-1 bg-green-200">
                        <ol className='list-decimal text-xl ml-4 font-semibold'>
                            {Object.keys(cart).length == 0 && <div className='cart-empty mt-1 font-medium'>Your cart is empty!
                            </div>}
                            {Object.keys(cart).map((k) => {
                                return <li key={k}>
                                    <div className="item flex my-2">
                                        <div className='w-2/3 font-semibold text-lg'>{`${cart[k].name} ${(cart[k].category != 'stickers' && cart[k].category !== 'mugs') ? '(' + cart[k].size + '/' + cart[k].variant + ')' : ''}`}</div>
                                        <div className='flex items-center justify-center w-1/3 '><AiOutlineMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer mx-2 text-green-800 text-3xl' /><span className='mr-5 ml-5'>{cart[k].qty}</span><AiOutlinePlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer mx-2 text-green-800 text-3xl' /></div>
                                    </div>
                                </li>
                            })}
                        </ol>
                        <div className="cart-inner-subtotal font-bold mt-8 ml-3">
                            Subtotal: ₹{subTotal}
                        </div>
                    </div> : <p className='mt-4'>Your cart is empty</p>}
                </div>
            </div>
            <div className="col-2 w-full">
                <div className="payment-method">
                    <p className="text-xl font-semibold leading-5 text-gray-800 mt-20 pt-2">Payment Method</p>
                    <div className="mt-5 py-8">
                        <div className="form-check mx-3" onClick={(e) => { setPaymentmethod(true); setOnlineCheck(true); setCodCheck(false) }}>
                            <input onChange={(e) => { }} className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="onlinepay" id="flexRadioDefault1" checked={onlineCheck} />
                            <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault1">
                                Online Payment
                            </label>
                        </div>
                        <div className="form-check mx-3 py-2" onChange={(e) => { setPaymentmethod(false); setOnlineCheck(false); setCodCheck(true) }}>
                            <input onChange={(e) => { }} className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="cod" id="flexRadioDefault2" checked={codCheck} />
                            <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault2">
                                Cash On Delivery
                            </label>
                        </div>
                    </div>
                </div>
                <div className=" bg-gray-50 w-full p-6 md:p-14 h-[45vh] md:h-[60vh] mt-30">
                    <div>
                        <h1 className="text-2xl font-semibold leading-6 text-gray-800">Order Summary</h1>
                    </div>
                    <div className="flex mt-7 flex-col items-end w-full space-y-6">
                        <div className="flex justify-between w-full items-center">
                            <p className="text-lg leading-4 text-gray-600">Total items</p>
                            <p className="text-lg font-semibold leading-4 text-gray-600">{totalQty}</p>
                        </div>
                        <div className="flex justify-between w-full items-center">
                            <p className="text-lg leading-4 text-gray-600">Total Charges</p>
                            <p className="text-lg font-semibold leading-4 text-gray-600">₹{subTotal}</p>
                        </div>
                        <div className="flex justify-between w-full items-center">
                            <p className="text-lg leading-4 text-gray-600">Shipping charges</p>
                            <p className="text-lg font-semibold leading-4 text-gray-600">{subTotal < 1000 && subTotal != 0 ? "₹40" : "FREE"}</p>
                        </div>
                    </div>
                    <div className="flex justify-between w-full items-center mt-32">
                        <p className="text-xl font-semibold leading-4 text-gray-800">You have to Pay </p>
                        <p className="text-lg font-semibold leading-4 text-gray-800">₹{subTotal + (subTotal < 1000 && subTotal != 0 ? 40 : 0)} </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> 
