import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import toast, { Toaster } from "react-hot-toast";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
    toast("Logout Successfully", {
      duration: 4000,
      position: "top-center",

      // Styling
      style: {},
      className: "",

      // Custom Icon
      icon: "🔓",

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
  };

  return (
    <>
      <button
        onClick={logoutHandler}
        className="inline-block px-6 py-2 duration-200 hover:bg-indigo-700 rounded-md"
      >
        Logout
      </button>
      <Toaster />
    </>
  );
}

export default LogoutBtn;
