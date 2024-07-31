import { NavLink, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        setUser({
          email: "",
          password: ""
        });
        alert("Login successfully");
        dispatch(authActions.login());
        dispatch(authActions.setToken(responseData.token));
        dispatch(authActions.changeRole(responseData.role));
        localStorage.setItem('id', responseData.userId);
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('role', responseData.role);
        navigate('/');
      } else {
        console.log(responseData.extraDetails || responseData.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full h-full lg:flex justify-center items-center bg-white py-10 lg:py-0">
      <div className="hidden lg:block lg:w-1/2 xl:w-2/5">
        <img className="h-[85vh] ml-10" src="login1.jpg" alt="Login illustration" />
      </div>

      <div className="flex justify-center lg:w-1/2 xl:w-3/5 h-[73vh] lg:h-auto items-center">
        <div className="w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] rounded-xl bg-[#AACBFF] p-6 lg:p-10">
          <div className="text-3xl sm:text-4xl font-semibold flex items-center justify-center pt-5">
            <h1>Login</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center mt-6">
            <div className="mt-4 bg-white px-3 gap-3 rounded h-[5vh] w-full flex items-center">
              <MdEmail />
              <input
                onChange={handleChange}
                className="outline-none border-none w-full"
                type="email"
                placeholder="Email"
                name="email"
                value={user.email}
                required
                autoComplete="off"
              />
            </div>

            <div className="mt-4 bg-white px-3 gap-3 rounded h-[5vh] w-full flex items-center">
              <RiLockPasswordFill />
              <input
                onChange={handleChange}
                className="outline-none border-none w-full"
                type={visible ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={user.password}
                required
                autoComplete="off"
              />
              <div onClick={() => setVisible(!visible)} className="cursor-pointer">
                {visible ? <LuEye /> : <LuEyeOff />}
              </div>
            </div>

            <div className="w-full mt-6 flex justify-center">
              <button className="w-full py-2 rounded bg-blue-500 hover:bg-blue-600 transition duration-300 text-white text-xl" type="submit">
                Login Now
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <div>
              <h4 className="font-semibold">OR</h4>
            </div>
            <h1>
              Dont have an account yet?{" "}
              <NavLink to="/signup">
                <span className="text-blue-700 hover:text-blue-800 cursor-pointer text-xl">Sign Up</span>
              </NavLink>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
