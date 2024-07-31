import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState();
  const headers = {
    userid: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/user/userInfo",
        { headers }
      );
      console.log(response);
      setProfileData(response.data);
      console.log(profileData);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const submitAddress = async()=>{
   const response = await axios.patch("http://localhost:5000/api/user/update",
    value,
    {headers}
   );
   console.log(response)
   alert(response.data.message)
  }

  return (
    <>
      {!profileData && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}

      {profileData && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>
          <div className="flex gap-12 ">
            <div>
              <label htmlFor="username">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.username}
              </p>
            </div>
          </div>

          <div className="flex gap-12 mt-8">
            <div>
              <label htmlFor="username">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.email}
              </p>
            </div>
          </div>

     

          <div className="mt-8 flex flex-col">
            <label htmlFor="address">Address</label>
            <textarea
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              rows="5"
              placeholder="Address"
              name="address"
              value={value.address}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button onClick={submitAddress} className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 hover:bg-yellow-400">
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
