import axios from "axios";
import { Link } from "react-router-dom";

const BookCards = ({ datas, favorite, onRemove }) => {
  const headers = {
    userid: localStorage.getItem("id"),
    bookid: datas._id,
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/favorite/removeFavBook`, {}, { headers });
      alert(response.data.message);
      onRemove(datas._id); 
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
      <Link to={`/view-book-details/${datas._id}`}>
        <div className="bg-zinc-900 rounded flex items-center justify-center">
          <img className="h-[25vh]" src={datas.url} alt="" />
        </div>
        <h2 className="mt-4 text-xl text-white font-semibold">{datas.title}</h2>
        <p className="mt-2 text-zinc-400 font-semibold">by {datas.author}</p>
        <p className="mt-2 text-zinc-400 font-semibold text-xl">₹ {datas.price}</p>
      </Link>
      {favorite && (
        <button
          onClick={handleRemoveBook}
          className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-red-600 mt-4 font-semibold"
        >
          Remove from favourite
        </button>
      )}
    </div>
  );
};

export default BookCards;
