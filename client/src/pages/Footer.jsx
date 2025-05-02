import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthStore } from "../store/AuthStore";

export default function Footer() {
    const token = AuthStore((state)=>state.token)
  return (
    <footer className="bg-gray-900 text-gray-300 px-4 py-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 md:flex-row md:justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">LearnHub</h2>
          <p className="mt-2 text-sm max-w-sm">
            Empowering learners with quality content and expert instructors.
            Learn from anywhere, anytime.
          </p>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Explore</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/courses" className="hover:underline">
                  Courses
                </Link>
              </li>
              <li>
                <a href="#about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Account</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/signin" className="hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:underline">
                  Sign Up
                </Link>
              </li>
              {token && (
                <li>
                  <Link to="/my_enrollment" className="hover:underline">
                    My Courses
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Help</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">
            Connect with us
          </h3>
          <div className="flex space-x-4 text-xl mt-2">
            <Link to="#" aria-label="Facebook" className="hover:text-white">
              <FaFacebook />
            </Link>
            <Link to="#" aria-label="Twitter" className="hover:text-white">
              <FaTwitter />
            </Link>
            <Link to="#" aria-label="LinkedIn" className="hover:text-white">
              <FaLinkedin />
            </Link>
            <Link to="#" aria-label="YouTube" className="hover:text-white">
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} LearnHub. All rights reserved.
      </div>
    </footer>
  );
}
