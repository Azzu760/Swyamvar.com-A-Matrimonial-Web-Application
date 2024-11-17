import { FaHeart } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-dark-gray text-white shadow-lg z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <FaHeart className="text-red-500 h-6 w-6 mr-2" aria-hidden="true" />
          <a
            href="/"
            className="text-xl sm:text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Swyamvar.com
          </a>
        </div>
        <a
          href="/auth/sign-in"
          className="bg-red-500 hover:bg-red-600 text-white text-base sm:text-lg py-2 px-6 sm:px-8 rounded-lg font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Login
        </a>
      </div>
    </nav>
  );
}
