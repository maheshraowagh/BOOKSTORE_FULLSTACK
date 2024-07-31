import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AboutUs from "./pages/AboutUs";
import Carts from "./pages/Carts";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import AllBooks from "./pages/AllBooks";
import Login from "./pages/Login";
import Register from "./pages/Register/Register";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import Logout from "./pages/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./Store/auth";
import Favorites from "./pages/Favorites";
import OrderHistory from "./pages/OrderHistory";
import Settings from "./pages/Settings";
import AllOrder from "./pages/AllOrder";
import AddBook from "./pages/AddBook";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  console.log(role);
  
  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("id")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/allbooks" element={<AllBooks />} />
        <Route path="/carts" element={<Carts />} />
        <Route path="/profile" element={<Profile />}>
          {role === 'user' && <Route index element={<Favorites />} />}
          {role === 'admin' && <Route index element={<AllOrder />} />}
          {role === 'admin' && <Route path="addbook" element={<AddBook />} />}
          <Route path="orderhistory" element={<OrderHistory />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
