import axios from "axios";
import { useEffect, useState } from "react";
// import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const headers = {
    userid: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  const API = "https://bookstore-backenc.onrender.com"
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/api/order/orderHistory`, { headers });
        console.log(response.data.data);
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
        setOrderHistory([]);
      }
    };
    fetchData();
  }, []);

  console.log(orderHistory);

  return (
    <>
     
      {orderHistory.length===0 && (
        <div className="p-4  text-zinc-100">
          <div className="h-[20vh] md:h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-2xl md:text-5xl font-semibold text-zinc-500 flex items-center justify-center h-[20vh] md:h-[100%] w-full">
            
              NO Order History
            </h1>
          </div>
        </div>
      )}


{/* {!orderHistory.length && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )} */}

      {orderHistory.length > 0 && (
        <div className="h-[100%] w-[95vw] md:w-full p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 md:mb-8">
            Your Order History
          </h1>

          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 hidden md:flex gap-2 text-sm md:text-base">
            <div className="w-[5%]">
              <h1 className="text-center">Sr.</h1>
            </div>

            <div className="w-[20%]">
              <h1 className="">Books</h1>
            </div>

            <div className="w-[40%]">
              <h1 className="">Description</h1>
            </div>

            <div className="w-[10%]">
              <h1 className="">Price</h1>
            </div>

            <div className="w-[20%]">
              <h1 className="">Status</h1>
            </div>

            <div className="w-[5%] hidden md:block">
              <h1 className="">Mode</h1>
            </div>
          </div>

          {orderHistory.map((items, i) => (
            <div key={i} className="bg-zinc-800 w-full rounded py-2 px-4 flex flex-col md:flex-row gap-2 md:gap-4 hover:bg-zinc-900 hover:cursor-pointer text-sm md:text-base mt-2">
              <div className="w-full md:w-[5%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>

              <div className="w-full md:w-[20%]">
                {items.book ? (
                  <Link to={`/view-book-details/${items.book._id}`} className="hover:text-blue-300">
                    {items.book.title}
                  </Link>
                ) : (
                  <span>Unknown Book</span>
                )}
              </div>

              <div className="w-full md:w-[40%]">
                {items.book && items.book.description ? (
                  <h1 className="">{items.book.description.length > 50 ? items.book.description.slice(0, 50) + "..." : items.book.description}</h1>
                ) : (
                  <span>No Description</span>
                )}
              </div>

              <div className="w-full md:w-[10%]">
                <h1 className="">{items.book ? items.book.price : 'N/A'}</h1>
              </div>

              <div className="w-full md:w-[20%]">
                <h1 className="font-semibold text-green-500">
                  {items.status === "order placed" ? (
                    <div className="text-yellow-500">{items.status}</div>
                  ) : items.status === "Canceled" ? (
                    <div className="text-red-500">{items.status}</div>
                  ) : (
                    items.status
                  )}
                </h1>
              </div>

              <div className="hidden md:block md:w-[5%]">
                <h1 className="text-sm text-zinc-400">COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default OrderHistory;
