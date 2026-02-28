import { NavLink } from "react-router";
import Logo from "../logo/logo";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { Link } from "react-router";
import useAuth from "./../../hook/useAuth";

const Navbar = () => {
  const { user, loading } = useAuth();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/friends", label: "Friends" },
    { to: "/messages", label: "Messages" },
    { to: "/profile", label: "Profile" },
    { to: "/post", label: "Post" },
    { to: "/about", label: "About" },
    { to: "/admin", label: "Admin" },
  ];

  return (
    <nav aria-label="Main navigation" className="bg-base-100 shadow-sm">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to}>{link.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          <ThemeToggle />
          {user ? (
            <div className="ml-4">
              <span className="font-medium border border-base-300 p-2 rounded-md">
                {user.name}
              </span>
            </div>
          ) : loading ? (
            <span className="ml-4">Loading...</span>
          ) : (
            <Link to="/auth/register" className="btn btn-neutral mr-2">
              Register
            </Link>
          )}
          {user ? (
            <Link to="/auth/logout" className="btn btn-neutral">
              Logout
            </Link>
          ) : loading ? (
            <span className="ml-4">Loading...</span>
          ) : (
            <Link to="/auth/login" className="btn btn-neutral">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
