import { NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/auth";

const Navbar = () => {
  const [mobileNav, setMobileNav] = useState("hidden");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <>
      <div className="flex z-10 relative bg-[#28272A] items-center justify-between lg:px-3 px-4 text-white py-4">
        <div className="flex justify-center items-center gap-5 lg:px-5 md:px-1 lg:ml-20 md:ml-5 ">
          <NavLink to="/">
            <img className="md:w-14 w-10" src="booklogo.png" alt="booklogo" />
          </NavLink>
          <NavLink to="/">
            <h1 className="md:text-xl lg:text-2xl text-lg font-semibold cursor-pointer">
              BookHeaven
            </h1>
          </NavLink>
        </div>

        <div className="hidden md:flex md:min-h-fit md:w-auto md:bg-[#28272A] md:text-white">
          <ul className="flex md:flex-row gap-5 md:gap-8 md:items-center md:text-sm lg:text-xl px-10">
            <NavLink to="/">
              <li className="cursor-pointer hover:text-blue-500 transition-all duration-300 py-2">
                Home
              </li>
            </NavLink>

            <NavLink to="/allbooks">
              <li className="cursor-pointer hover:text-blue-500 transition-all duration-300 py-2">
                All Books
              </li>
            </NavLink>

            {!isLoggedIn ? (
              <>
                <NavLink to="/login">
                  <button className="border-blue-500 border px-5 py-2 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">
                    <li>Login</li>
                  </button>
                </NavLink>

                <NavLink to="/signup">
                  <button className="bg-blue-500 px-4 py-2 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">
                    <li>SignUp</li>
                  </button>
                </NavLink>
              </>
            ) : (
              <>
                {role !== "admin" && (
                  <NavLink to="/carts">
                    <li className="cursor-pointer hover:text-blue-500 transition-all duration-300 py-2">
                      Carts
                    </li>
                  </NavLink>
                )}

                {role === "admin" ? (
                  <NavLink to="/profile">
                    <li className="cursor-pointer hover:text-blue-500 transition-all duration-300 py-2">
                      AdminProfile
                    </li>
                  </NavLink>
                ) : (
                  <NavLink to="/profile">
                    <li className="cursor-pointer hover:text-blue-500 transition-all duration-300 py-2">
                      Profile
                    </li>
                  </NavLink>
                )}

                <button
                  onClick={handleLogout}
                  className="cursor-pointer hover:text-blue-500 transition-all duration-300 py-2"
                >
                  Logout
                </button>
              </>
            )}
          </ul>
        </div>

        <button
          onClick={() =>
            mobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")
          }
          className="block md:hidden text-4xl hover:text-zinc-400"
        >
          <GiHamburgerMenu />
        </button>
      </div>

      <div
        className={`${mobileNav} absolute md:hidden flex flex-col items-center justify-center bg-zinc-800 h-screen top-10 left-0 w-full z-9`}
      >
        <ul
          className="text-3xl text-white font-semibold flex flex-col gap-5 px-10"
          onClick={() =>
            mobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")
          }
        >
          <NavLink to="/">
            <li className="cursor-pointer hover:text-blue-500 transition-all duration-300 py-2">
              Home
            </li>
          </NavLink>

          <NavLink to="/allbooks">
            <li className="cursor-pointer hover:text-blue-500 transition-all duration-300 py-2">
              All Books
            </li>
          </NavLink>

          {!isLoggedIn ? (
            <>
              <NavLink to="/login">
                <button className="border-blue-500 flex mb-8 border px-5 py-2 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">
                  <li>Login</li>
                </button>
              </NavLink>

              <NavLink to="/signup">
                <button className="bg-blue-500 px-4 py-2 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">
                  <li>SignUp</li>
                </button>
              </NavLink>
            </>
          ) : (
            <>
              {role !== "admin" && (
                <NavLink to="/carts">
                  <li className="cursor-pointer hover:text-blue-500 transition-all duration-300 py-2">
                    Carts
                  </li>
                </NavLink>
              )}

              {role === "admin" ? (
                <NavLink to="/profile">
                  <li className="cursor-pointer hover:text-blue-500 transition-all duration-300 py-2">
                    AdminProfile
                  </li>
                </NavLink>
              ) : (
                <NavLink to="/profile">
                  <li className="cursor-pointer hover:text-blue-500 transition-all duration-300 py-2">
                    Profile
                  </li>
                </NavLink>
              )}

              <button
                onClick={handleLogout}
                className="cursor-pointer hover:text-blue-500 transition-all duration-300 py-2 border-white border-2"
              >
                Logout
              </button>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
