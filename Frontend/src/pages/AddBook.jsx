import { useState } from "react";
import axios from 'axios'

const AddBook = () => {
  const [bookData, setBookData] = useState({
    imageUrl: "",
    title: "",
    author: "",
    language: "",
    description: "",
    price: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const headers = {
      userid: localStorage.getItem("id"), // Ensure this is the correct ID
      authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  
    try {
      if (
        bookData.imageUrl === "" ||
        bookData.title === "" ||
        bookData.author === "" ||
        bookData.language === "" ||
        bookData.description === "" ||
        bookData.price === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/admin/addBook",
          bookData,
          { headers }
        );
        setBookData({
          imageUrl: "",
          title: "",
          author: "",
          language: "",
          description: "",
          price: ""
        });
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-800 p-4 rounded-md">
        <div>
          <label className="block text-lg font-medium text-white">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={bookData.imageUrl}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-zinc-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-white">Title</label>
          <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-zinc-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-white">Author</label>
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-zinc-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-white">Language</label>
          <input
            type="text"
            name="language"
            value={bookData.language}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-zinc-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-white">Description</label>
          <textarea
            name="description"
            value={bookData.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full px-3 py-2 bg-zinc-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-white">Price</label>
          <input
            type="number"
            name="price"
            value={bookData.price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-zinc-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
