import React, { useState, useRef, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsArrowRightCircleFill } from "react-icons/bs";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import axios from "axios";
import { Toast } from "primereact/toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Preloader from "./Preloader";

const SignIn = () => {
  const token = Cookies.get("token");
  const usertype = Cookies.get("user_type");

  const navigate = useNavigate();
  useEffect(() => {
    if (token && usertype === 1) {
      navigate("/admin/dashboard");
    } else if (token && usertype === 2) {
      navigate("/customer/dashboard");
    }
  }, [token, usertype]);

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const toastRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.email.trim() || !data.password.trim()) {
      toastRef.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please fill in all the details.",
        life: 3000,
      });
      return;
    }
    if (data.email && data.password) {
      setLoading(true);
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, data)
        .then((res) => {
          console.log(res.data);
          const token = res.data.token;
          const user_type = res.data.user.user_type;
          const user_uuid = res.data.user.user_uuid;
          const expirationTime = new Date();
          expirationTime.setDate(expirationTime.getDate() + 7); // Cookie expires in 1 week
          Cookies.set("token", token, {
            expires: expirationTime,
            sameSite: "strict",
          });
          Cookies.set("user_uuid", user_uuid, {
            expires: expirationTime,
            sameSite: "strict",
          });
          Cookies.set("user_type", user_type, {
            expires: expirationTime,
            sameSite: "strict",
          });
          if (user_type === 1) {
            setLoading(false);
            navigate("/admin/dashboard");
          } else {
            setLoading(false);
            navigate("/customer/dashboard");
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toastRef.current.show({
            severity: "error",
            summary: "Error",
            detail:
              err.response?.data?.message ||
              "An error occurred. Please try again later.",
            life: 3000,
          });
        });
    }
  };

  //const storedToken = Cookies.get('token');
  //Cookies.remove('token');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-6 dark:!bg-gray-850 sm:py-12">
      <Toast ref={toastRef} className="toast-custom" position="top-right" />
      {loading ? (
        <Preloader />
      ) : (
        <div className="relative py-3 sm:mx-auto sm:max-w-xl">
          <div className="absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-blue-300 to-blueSecondary shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"></div>
          <div className="relative bg-white px-4 py-10 shadow-lg dark:!bg-gray-750 sm:rounded-3xl sm:p-20">
            <div className="mx-auto max-w-md">
              <div>
                <h1 className="text-2xl opacity-70 dark:!text-white">
                  <span
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "500",
                    }}
                  >
                    Welcome To Starkenn Technologies
                  </span>
                </h1>
              </div>

              <div className="divide-y">
                <div className="space-y-8 py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                  <form onSubmit={handleSubmit}>
                    <div className="relative">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        className="peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:!bg-gray-800 dark:!text-white dark:focus:border-blue-500"
                        placeholder=" "
                      />
                      <label className="absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-gray-300 dark:!text-gray-400 peer-focus:dark:!text-gray-100">
                        Username
                      </label>
                    </div>
                    <div className="relative my-4">
                      <input
                        autoComplete="off"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        className="peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:!bg-gray-800 dark:!text-white dark:focus:border-blue-500"
                        placeholder=" "
                      />
                      <label className="absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-gray-300 dark:!text-gray-400 peer-focus:dark:!text-gray-100">
                        Password
                      </label>
                      <div className="absolute right-2.5 top-4">
                        {showPassword ? (
                          <FaEyeSlash
                            className="h-5 w-5 cursor-pointer  text-gray-500"
                            onClick={togglePasswordVisibility}
                          />
                        ) : (
                          <FaEye
                            className="h-5 w-5 cursor-pointer text-gray-600"
                            onClick={togglePasswordVisibility}
                          />
                        )}
                      </div>
                    </div>

                    <div className="relative">
                      <button
                        type="submit"
                        className="rounded-md bg-blueSecondary py-1 pl-4 pr-8 text-white dark:!bg-gray-100 dark:!text-gray-850"
                      >
                        Sign In
                        <BsArrowRightCircleFill className="absolute left-[4.6rem] top-[0.6rem]" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="relative border-0 text-center">
                <p>
                  <a href="/" className="text-blue-600 underline">
                    Forgot Password?
                  </a>
                </p>
              </div>
            </div>
            <FixedPlugin />
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
