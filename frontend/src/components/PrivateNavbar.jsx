import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { SiAuthy } from "react-icons/si";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { FaBlog } from "react-icons/fa";
import { logoutAction } from "../redux/slices/authSlice";

export default function PrivateNavbar() {
  //! Dispatch using for dispatching logout action
  const dispatch = useDispatch();
  //!logout handler - call this function, it will dispatch the logout action present in authslice.js, when use it below on logout button on onClick handler.
  const logoutHandler = () => {
    dispatch(logoutAction());
  };
  return (
    <Disclosure as="nav" className="bg-black shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-screen px-4 sm:px-6 lg:px-8 bg-black">
            <div className="flex h-16 justify-between ">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-purple-500 font-extrabold hover:bg-gray-900 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="my-9 h-13 w-13 flex flex-shrink-0 items-center justify-center rounded-full bg-black">
                  <img
                    src="src\assets\logo.png" // Replace with the actual path to your logo
                    alt="Logo"
                    className="h-12 w-auto object-contain"
                  />
                </div>

                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link
                    to="/"
                    className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-300"
                  >
                    Home
                  </Link>
                </div>

                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link
                    to="/user/fitdashboard"
                    className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-300"
                  >
                    Fitness Tracker
                  </Link>
                </div>

                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link
                    to="/about"
                    className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-300"
                  >
                    About Us
                  </Link>
                </div>

                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link
                    to="/contact"
                    className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-300"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <button
                    onClick={logoutHandler} //!when click logout button, above handler function is called which will then dispatch the logout action present in authslice.js
                    className="relative inline-flex items-center gap-x-1.5 rounded-md bg-purple-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 animate-pulse"
                  >
                    <FaRegUser className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Logout
                  </button>
                </div>
                <div className="md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  <Link
                    to="/profile"
                    className="relative inline-flex items-center gap-x-1.5 rounded-full h-10 w-10 bg-purple-700 px-3 text-9xl text-gray-800 hover:bg-purple-600"
                  >
                    <FaRegUser className="-ml-0.5 text-white  h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <Link to="/">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-sm font-medium text-gray-500 hover:border-gray-500 hover:bg-gray-900 hover:text-gray-300 sm:pl-5 sm:pr-6"
                >
                  Home
                </Disclosure.Button>
              </Link>

              <Link to="/user/fitdashboard">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-sm font-medium text-gray-500 hover:border-gray-500 hover:bg-gray-900 hover:text-gray-300 sm:pl-5 sm:pr-6"
                >
                  Fitness Tracker
                </Disclosure.Button>
              </Link>

              <Link to="/about">
                <Disclosure.Button
                  as="button"
                  className="text-gray-200 block border-l-4 border-transparent py-2 pl-3 pr-4 text-sm font-medium text-gray-500 hover:border-gray-500 hover:bg-gray-900 hover:text-gray-300 sm:pl-5 sm:pr-6"
                >
                  About Us
                </Disclosure.Button>
              </Link>

              <Link to="/contact">
                <Disclosure.Button
                  as="button"
                  className="text-gray-200 block border-l-4 border-transparent py-2 pl-3 pr-4 text-sm font-medium text-gray-500 hover:border-gray-500 hover:bg-gray-900 hover:text-gray-300 sm:pl-5 sm:pr-6"
                >
                  Contact Us
                </Disclosure.Button>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
