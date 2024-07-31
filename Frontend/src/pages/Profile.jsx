import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import MobileNav from "./MobileNav";

const Profile = () => {
  const [profile,setProfile] = useState()
  // const token = useSelector((state) => state.auth.token);
  const token= localStorage.getItem("token")
    const API = "https://bookstore-backenc.onrender.com"

  const fetchData = async () => {
    try {
      const response = await fetch(`${API}/api/user/userInfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      // console.log(response);
      // console.log(responseData);
      setProfile(responseData)
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return (
   
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row  py-8 gap-4 text-white">
     {!profile && (
     <div className="w-full h-screen flex items-center justify-center"> 
    <Loader/></div>
     )}
     {profile &&(
       <>
       <div className="w-full md:w-1/6 h-auto lg:h-screen">
         <Sidebar data={profile} />
         <MobileNav/>
       </div>
       <div className="w-5/6">
         <Outlet />
       </div>
 
       </>
     )}
    </div>
   
   
  
  );
};

export default Profile;
