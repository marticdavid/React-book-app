import { useState, useContext, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { storeContext } from "../context/storeContext";
import Spinner from "../Layout/spinner";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const {
    password,
    setPassword,
    email,
    setEmail,
    apiUrl,
    isLoading,
    setIsLoading,
    setAuth,
    isAuth,
    token,
    setToken
  } = useContext(storeContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard");
    }
  }, [isAuth]);

  async function submitHandler(e) {
    e.preventDefault();

    setIsLoading(true);
    
    try {
      const response = await fetch(`${apiUrl}/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      console.log("response");

      

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message[0].message); // joi message
        toast.error(data.message); //api valid msg
        setIsLoading(false);
        return;
      }

      console.log(data.access_token);

      //save on local storage
      localStorage.setItem("bookApp_token", data.access_token);

      //save on  context
      setToken(data.access_token)

      toast.success("login successful");
      setAuth(true);
      console.log("Setting auth and navigating...");
      navigate("/dashboard");

      setIsLoading(false);

      // useEffect(() => {
      //   console.log("isAuth changed:", isAuth);
      //   if (isAuth) {
      //     navigate("/dashboard");
      //   }
      // }, [isAuth]);

      //fetch from local storage
      // localStorage.getItem("bookApp_token");

      //delete from local storage
      // localStorage.removeItem("bookApp_token");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  function toggle() {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">
            Login on our Book App today
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Login to start make a reservation for a book on our library.
          </p>

          <form
            className="mx-auto mt-8 mb-0 max-w-md space-y-4"
            onSubmit={submitHandler}
          >
            <input
              type="email"
              className="block w-full rounded-lg border-gray-200 p-4 text-xs text-gray-700 shadow-sm"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-xs text-gray-700 shadow-sm"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />

              <span
                className="absolute inset-y-0 end-0 grid color-black place-content-center px-4"
                onClick={toggle}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white"
            >
              Sign In
            </button>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link className="underline" to="/register">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
