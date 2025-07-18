import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        // console.log(userData.$id);
        if (userData) dispatch(storeLogin(userData));
        navigate("/");
      }
      toast("Login Successfully", {
        duration: 2000,
        position: "top-center",

        // Styling
        style: {},
        className: "",

        // Custom Icon
        icon: "🔐",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },

        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    } catch (error) {
      if (error.message.includes("User not found")) {
        setError("You are not signed up yet, please sign up first.");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full  bg-orange-300">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl my-6 mx-4 p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max -w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Login to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      value
                    ) || "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              LogIn
            </Button>
            <Toaster />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
