import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle button (Mobile) */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <button onClick={() => setOpen(!open)} className="text-2xl">
          {open ? <FiX /> : <FiMenu />}
        </button>
        <h1 className="text-xl font-bold">My Blog</h1>
      </div>

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out
          ${
            open ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:shadow-none`}
      >
        <div className="p-4 text-xl font-bold border-b border-gray-200">
          Blog App
        </div>
        <nav className="flex flex-col gap-4 p-4">
          <Link to="/" onClick={() => setOpen(false)}>
            🏠 Home
          </Link>
          <Link to="/all-posts" onClick={() => setOpen(false)}>
            📝 All Posts
          </Link>
          <Link to="/add-post" onClick={() => setOpen(false)}>
            ➕ Add Post
          </Link>
          <Link to="/login" onClick={() => setOpen(false)}>
            🔐 Login
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
