import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Carts = () => {
  const [cart, setCart] = useState("");
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cart/userCart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userid: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      const responseData = await response.json();
      console.log(responseData);
      setCart(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCartItem = (id) => {
    const del = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cart/removeBookInCart", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            userid: localStorage.getItem("id"),
            bookid: id,
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response);
        if (response.ok) {
          setCart((prevCart) => prevCart.filter((item) => item._id !== id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    del();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0;
      cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
    }
  }, [cart]);

  const placeOrder = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/order/placeOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          userid: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ order: cart }),
      });

      const responseData = await response.json();
      console.log(responseData);
      alert(responseData.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-900 px-2 md:px-12 py-8 min-h-screen">
      {!cart && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
      {cart && cart.length === 0 && (
        <div className="h-screen">
          <div className="h-full flex items-center justify-center flex-col">
            <h1 className="text-3xl md:text-5xl font-semibold text-zinc-400">
              Empty cart
            </h1>
            <img className="md:mt-4 lg:h-[50vh]" src="empty cart.png" alt="empty cart" />
          </div>
        </div>
      )}
      {cart && cart.length > 0 && (
        <>
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Cart
          </h1>
          {cart.map((items, i) => (
            <div
              key={i}
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
            >
              <img
                className="h-48 md:h-32 object-cover"
                src={items.url}
                alt="/"
              />
              <div className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0 md:ml-4">
                <h1 className="text-xl md:text-2xl text-zinc-100 font-semibold">
                  {items.title}
                </h1>
                <p className="text-sm md:text-base text-zinc-300 mt-2 hidden lg:block">
                  {items.description.slice(0, 100)}....
                </p>
                <p className="text-sm md:text-base text-zinc-300 mt-2 hidden md:block lg:hidden">
                  {items.description.slice(0, 65)}....
                </p>
                <p className="text-sm md:text-base text-zinc-300 mt-2 block md:hidden">
                  {items.description.slice(0, 100)}...
                </p>
              </div>
              <div className="flex mt-4 md:mt-0 w-full md:w-auto items-center justify-between">
                <h2 className="text-zinc-100 text-2xl md:text-3xl font-semibold">
                  ₹{items.price}
                </h2>
                <button
                  onClick={() => deleteCartItem(items._id)}
                  className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ml-4 md:ml-12"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {cart && cart.length > 0 && (
        <div className="mt-4 w-full flex flex-col md:flex-row items-center justify-end">
          <div className="p-4 bg-zinc-800 rounded min-h-[30vh] w-full md:w-auto">
            <h1 className="text-2xl md:text-3xl text-zinc-200 font-semibold">
              Total Amount
            </h1>
            <div className="flex mt-4 md:mt-16 items-center justify-between text-xl text-zinc-200">
              <h2>{cart.length} Books</h2>
              <h2>₹ {total}</h2>
            </div>
            <div className="w-full mt-3">
              <button
                onClick={placeOrder}
                className="bg-zinc-100 rounded mt-6 px-4 py-2 w-full font-semibold hover:bg-zinc-200"
              >
                Place your order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carts;
