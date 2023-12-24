import { Analytics } from '@vercel/analytics/react';
// import { SpeedInsights } from '@vercel/speed-insights/next';
import NavbarEle from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/globals.css";
import "../styles/index.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";

function MyApp({ Component, pageProps }) {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [fAmt, setFAmt] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const [useremail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    try {
      if (!localStorage.getItem("myuser")) {
        setUser({ value: null });
        setUserEmail("");
        setKey(Math.random());
      }
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
      }
      if (localStorage.getItem("subTotal")) {
        setSubTotal(JSON.parse(localStorage.getItem("subTotal")));
      }
      if (localStorage.getItem("fAmt")) {
        setFAmt(JSON.parse(localStorage.getItem("fAmt")));
      }
      if (localStorage.getItem("totalQty")) {
        setTotalQty(JSON.parse(localStorage.getItem("totalQty")));
      }
      if (localStorage.getItem("myuser")) {
        setUser({
          value: JSON.parse(localStorage.getItem("myuser")).token,
          email: JSON.parse(localStorage.getItem("myuser")).email,
        });
        setUserEmail(JSON.parse(localStorage.getItem("myuser")).email);
        setKey(Math.random());
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, [router.query]);

  useEffect(() => {
    if (localStorage.getItem("myuser")) {
      setUser({
        value: JSON.parse(localStorage.getItem("myuser")).token,
        email: JSON.parse(localStorage.getItem("myuser")).email,
      });
      setKey(Math.random());
      setUserEmail(JSON.parse(localStorage.getItem("myuser")).email);
    }
  }, [router]);

  const logout = () => {
    localStorage.clear();
    setUser({ value: null });
    setUserEmail("");
    setKey(Math.random());
    setTimeout(() => {
      router.push('/')
    }, 3000);
  };

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));

    let subt = 0;
    let totalqty = 0;
    let keys = Object.keys(myCart);
    for (let index = 0; index < keys.length; index++) {
      subt += myCart[keys[index]].price * myCart[keys[index]].qty;
      totalqty += myCart[keys[index]].qty;
    }
    setSubTotal(subt);
    if (subt < 1000 && subt != 0) {
      setFAmt(subt + 40);
      localStorage.setItem("fAmt", JSON.stringify(subt + 40));
    } else {
      setFAmt(subt);
      localStorage.setItem("fAmt", JSON.stringify(subt));
    }
    setTotalQty(totalqty);
    localStorage.setItem("subTotal", JSON.stringify(subt));
    localStorage.setItem("totalQty", JSON.stringify(totalqty));
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  const addToCart = (
    itemCode,
    image,
    qty,
    price,
    name,
    size,
    variant,
    category
  ) => {
    let myCart = cart;
    if (itemCode in cart) {
      myCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      myCart[itemCode] = {
        image,
        qty: 1,
        price,
        name,
        size,
        variant,
        category,
      };
    }
    setCart(myCart);
    saveCart(myCart);
  };

  const removeFromCart = async (
    itemCode,
    image,
    qty,
    price,
    name,
    size,
    variant,
    category
  ) => {
    let myCart = cart;

    myCart = JSON.parse(JSON.stringify(myCart));

    if (itemCode in cart) {
      myCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (myCart[itemCode].qty <= 0) {
      delete myCart[itemCode];
    }
    setCart(myCart);
    saveCart(myCart);
  };

  const buyNow = (
    itemCode,
    image,
    qty,
    price,
    name,
    size,
    variant,
    category
  ) => {
    let newCart = {};
    newCart[itemCode] = { image, qty: 1, price, name, size, variant, category };
    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  };
  return (
    <>
      <LoadingBar
        color="#08d416"
        progress={progress}
        waitingTime={800}
        onLoaderFinished={() => setProgress(0)}
      />
      <NavbarEle
        key={key}
        open={open}
        setOpen={setOpen}
        logout={logout}
        user={user}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        totalQty={totalQty}
      />
      <Component
        logout={logout}
        open={open}
        setOpen={setOpen}
        cart={cart}
        user={user}
        useremail={useremail}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        buyNow={buyNow}
        clearCart={clearCart}
        subTotal={subTotal}
        totalQty={totalQty}
        fAmt={fAmt}
        {...pageProps}
      />
      <Footer />
      <Analytics />
      {/* <SpeedInsights/> */}
    </>
  );
}

export default MyApp;
