import axios from "axios";
import { useEffect, useState } from "react";
import BookCards from "../components/BookCards";

const Favorites = () => {
  const [favBooks, setFavBooks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/favorite/getFavBook", { headers });
      setFavBooks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const removeBookFromFavorites = (bookId) => {
    setFavBooks(favBooks.filter(book => book._id !== bookId));
  };

  return (
    <>
      {favBooks.length === 0 && (
        <div className=" text-2xl md:text-5xl font-semibold text-zinc-500 flex items-center justify-center h-[20vh] md:h-[100%] w-full">
          No Favourite Books Added
        </div>
      )}


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-[100vw] md:w-full lg:grid-cols-4 gap-4 pr-4 md:pr-0  md:pl-10   justify-center">
        
        {favBooks &&(
        
          favBooks.map((book) => (

            <BookCards
              key={book._id}
              datas={book}
              favorite={true}
              onRemove={removeBookFromFavorites}
            />
          )))}
      </div>
    </>
  );
};

export default Favorites;
