import { FaHeart } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-dark-gray text-white shadow-lg z-50">
      <div className="max-w-8xl mx-auto px-6 sm:px-12 lg:px-16 flex items-center justify-between h-16">
        <div className="flex items-center">
          <FaHeart className="text-red-500 h-6 w-6 mr-2" />
          <div className="text-xl sm:text-2xl font-bold">
            <a href="/">Swyamvar.com</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
