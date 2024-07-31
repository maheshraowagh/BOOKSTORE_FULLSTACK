import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Loader from "../Loader";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ViewBookDetails = () => {
    const [book, setBook] = useState({});
    const { id } = useParams();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

   

    const singleBook = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/getSingleBook/${id}`, {
                headers: { "Content-Type": "application/json" }
            });
            console.log(response.data);
            setBook(response.data);
        } catch (error) {
            console.log(error.message); 
        }
    };

    useEffect(() => { 
        singleBook();
    }, [id]);

    const headers ={
        userid:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem('token')}`, 
        bookid:id,
    }

    const handleFav = async()=>{
      try {
        const response = await axios.patch(`http://localhost:5000/api/favorite/addBookINFav`,
            {},
            {headers}
           )
           
         console.log(response.data.message)
           alert(response.data.message)
      } catch (error) {
        console.log(error.message)
        alert(error.response.data.message)
      }
    };


    const handleCart = async()=>{
        try {
            const response = await axios.patch("http://localhost:5000/api/cart/addToCart",{},
                {headers})
                  alert(response.data.message)
        } catch (error) {
            console.log(error.message)
            alert(error.response.data.message)
        }
       
    }

    return (
        <>
            {book.url ? (
                <div className="px-12 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row  gap-8">
                    <div className=" lg:w-1/2">
                        <div className="bg-zinc-800 rounded lg:flex p-4 md:p-12 md:w-[40vw]    md:justify-around">
                            <img className="rounded mx-auto md:mx-0 h-65 md:h-96 lg:h-[70vh]" src={book.url} alt={book.title} />
                            {isLoggedIn && role === 'user' && (
                                <div className=" flex   text-center md:flex-row lg:flex-col   md:gap-10  mt-4 md:mt-0">
                                    <button onClick={handleFav}
                                     className="bg-white md:rounded-full text-3xl mx-10 md:mx-0 md:text-4xl p-2 text-red-500"><FaHeart /></button>
                                    <button onClick={handleCart}
                                    className="text-white md:rounded-full text-3xl mx-5 md:mx-0 md:text-4xl p-2 bg-blue-500 flex items-center justify-center"><FaShoppingCart />
                                    <span className="ms-4 block lg:hidden text-sm">Add to cart</span>
                                    </button>
                                </div>
                            )}

                             {isLoggedIn && role === 'admin' && (
                                <div className=" flex  text-center md:flex-row lg:flex-col   md:gap-10  mt-4 md:mt-0">
                                    <button className="bg-white md:rounded-full text-3xl mx-10 md:mx-0 md:text-4xl p-2 "><FaEdit /></button>
                                    <button className="text-red-500 md:rounded-full text-3xl mx-5 md:mx-0 md:text-4xl p-2 bg-white flex items-center justify-center"><MdDelete />

                                    <span className="ms-4 block lg:hidden text-sm">Delete</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="px-4 py-6 md:py-12 w-full lg:w-1/2">
                        <h1 className="text-2xl md:text-4xl text-zinc-300 font-semibold">{book.title}</h1>
                        <p className="text-zinc-400 mt-1 text-sm md:text-base">by {book.author}</p>
                        <p className="text-zinc-500 mt-4 text-sm md:text-xl">{book.description}</p>
                        <p className="text-zinc-400 flex mt-4 items-center"><GrLanguage className="mr-2" /> {book.language}</p>
                        <p className="mt-4 text-zinc-100 text-xl md:text-3xl font-semibold">Price: ₹{book.price}</p>
                    </div>
                </div>
            ) : (
                <div className='flex items-center justify-center my-8'>
                    <Loader />
                </div>
            )}
        </>
    );
};

export default ViewBookDetails;
