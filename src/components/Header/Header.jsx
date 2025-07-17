import { useState } from "react";
import { LogoutBtn, Logo, Container } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react"; // install via: npm install lucide-react

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "My Posts", slug: "/my-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="bg-indigo-600 text-white sticky top-0 z-50 shadow">
      <Container>
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <Link to="/">
              <Logo width="60px" />
            </Link>
            {/* <span className="font-bold text-lg hidden sm:inline">Blog App</span> */}
          </div>

          {/* Mobile menu toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-4 ml-auto items-center">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-4 py-2  hover:bg-indigo-700 rounded-md transition"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && <LogoutBtn />}
          </ul>
        </div>

        {/* Mobile Sidebar */}
        {isOpen && (
          <div className="md:hidden  bg-indigo-700 text-white px-4 py-4 rounded-lg space-y-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.slug);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 rounded-md hover:bg-indigo-800 transition"
                  >
                    {item.name}
                  </button>
                )
            )}
            {authStatus && (
              <div className="pt-2">
                <LogoutBtn />
              </div>
            )}
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
