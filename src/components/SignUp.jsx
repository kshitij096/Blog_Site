import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const signup = async (data) => {
    setError("");
    try {
      await authService.createAccount(data);

      toast.success("Signup Successful! Please login.", {
        duration: 2000,
        position: "top-center",
      });

      // Delay navigate just a bit so toast shows before redirect
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-blue-700 transition-all duration-200 hover:underline"
          >
            Log In
          </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(signup)}>
          <div className="space-y-5">
            <Input
              label="Full Name:"
              placeholder="Enter your full name"
              {...register("name", { required: true })}
            />
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      value
                    ) || "Email address must be valid",
                },
              })}
            />
            <Input
              label="Password:"
              placeholder="Enter your password"
              type="password"
              {...register("password", { required: true })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
            <Toaster />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

// // import { useDispatch } from "react-redux";
// // import { login } from "../store/authSlice";
// import authService from "../appwrite/auth";
// import { Link, useNavigate } from "react-router-dom";
// import { Button, Input, Logo } from "./index";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";

// const SignUp = () => {
//   const navigate = useNavigate();
//   // const dispatch = useDispatch();
//   const { register, handleSubmit } = useForm();

//   const [error, setError] = useState("");

//   const signup = async (data) => {
//     setError("");
//     try {
//       const userData = await authService.createAccount(data);
//       if (userData) {
//         //   const userData = await authService.getCurrentUser();
//         //   if (userData) dispatch(login(userData));
//         navigate("/login");
//         // }
//         toast("Signup Successfully", {
//           duration: 2000,
//           position: "top-center",
//           icon: "✅",
//           iconTheme: {
//             primary: "#000",
//             secondary: "#fff",
//           },
//           ariaProps: {
//             role: "status",
//             "aria-live": "polite",
//           },
//         });
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center ">
//       <div
//         className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
//       >
//         <div className="mb-2 flex justify-center">
//           <span className="inline-block w-full max -w-[100px]">
//             <Logo width="100%" />
//           </span>
//         </div>
//         <h2 className="text-center text-2xl font-bold leading-tight">
//           Sign up to create your account
//         </h2>
//         <p className="mt-2 text-center text-base text-black/60">
//           Already have an account?&nbsp;
//           <Link
//             to="/login"
//             className="font-medium text-primary text-blue-700 transition-all duration-200 hover:underline"
//           >
//             LogIn
//           </Link>
//         </p>
//         {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
//         <form onSubmit={handleSubmit(signup)}>
//           <div className="space-y-5">
//             <Input
//               label="Full Name: "
//               placeholder="Enter your full name"
//               {...register("name", {
//                 required: true,
//               })}
//             />
//             <Input
//               label="Email: "
//               placeholder="Enter your email"
//               type="email"
//               {...register("email", {
//                 required: true,
//                 validate: {
//                   matchPattern: (value) =>
//                     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
//                       value
//                     ) || "Email address must be a valid address",
//                 },
//               })}
//             />
//             <Input
//               label="Password"
//               placeholder="Enter your password"
//               type="password"
//               {...register("password", {
//                 required: true,
//               })}
//             />
//             <Button type="submit" className="w-full">
//               Create Account
//             </Button>
//             <Toaster />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
// // import { useDispatch } from "react-redux";
// // import { login } from "../store/authSlice";
// // import authService from "../appwrite/auth";
// // import { Link, useNavigate } from "react-router-dom";
// // import { Button, Input, Logo } from "./index";
// // import { useForm } from "react-hook-form";
// // import { useState } from "react";
// // import toast, { Toaster } from "react-hot-toast";

// // const SignUp = () => {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const { register, handleSubmit } = useForm();

// //   const [error, setError] = useState("");

// //   const signup = async (data) => {
// //     setError("");
// //     try {
// //       const userData = await authService.createAccount(data);
// //       if (userData) {
// //         const userData = await authService.getCurrentUser();
// //         if (userData) dispatch(login(userData));
// //         navigate("/");
// //       }
// //       toast("Signup Successfully", {
// //         duration: 2000,
// //         position: "top-center",

// //         // Styling
// //         style: {},
// //         className: "",

// //         // Custom Icon
// //         icon: "✅",

// //         // Change colors of success/error/loading icon
// //         iconTheme: {
// //           primary: "#000",
// //           secondary: "#fff",
// //         },

// //         // Aria
// //         ariaProps: {
// //           role: "status",
// //           "aria-live": "polite",
// //         },
// //       });
// //     } catch (error) {
// //       setError(error.message);
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center ">
// //       <div
// //         className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
// //       >
// //         <div className="mb-2 flex justify-center">
// //           <span className="inline-block w-full max -w-[100px]">
// //             <Logo width="100%" />
// //           </span>
// //         </div>
// //         <h2 className="text-center text-2xl font-bold leading-tight">
// //           Sign up to create your account
// //         </h2>
// //         <p className="mt-2 text-center text-base text-black/60">
// //           Already have an account?&nbsp;
// //           <Link
// //             to="/login"
// //             className="font-medium text-primary transition-all duration-200 hover:underline"
// //           >
// //             Sign In
// //           </Link>
// //         </p>
// //         {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
// //         <form onSubmit={handleSubmit(signup)}>
// //           <div className="space-y-5">
// //             <Input
// //               label="Full Name: "
// //               placeholder="Enter your full name"
// //               {...register("name", {
// //                 required: true,
// //               })}
// //             />
// //             <Input
// //               label="Email: "
// //               placeholder="Enter your email"
// //               type="email"
// //               {...register("email", {
// //                 required: true,
// //                 validate: {
// //                   matchPattern: (value) =>
// //                     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
// //                       value
// //                     ) || "Email address must be a valid address",
// //                 },
// //               })}
// //             />
// //             <Input
// //               label="Password"
// //               placeholder="Enter your password"
// //               type="password"
// //               {...register("password", {
// //                 required: true,
// //               })}
// //             />
// //             <Button type="submit" className="w-full ">
// //               Create Account
// //             </Button>
// //             <Toaster />
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SignUp;
