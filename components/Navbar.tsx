"use client";
import useClickOutside from "@/hooks/useClickOutside";
import { useRef, useState } from "react";

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const profileDropDownRef = useRef(null);
    const user = null;

    useClickOutside(profileDropDownRef, () => {
        setDropdownOpen(false);
    });

    return (
        <nav className="bg-primary text-secondary">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 items-center hidden sm:flex">
                            <img
                                className="block h-8 w-auto"
                                src="https://tailwindui.com/plus/img/logos/workflow-mark-indigo-500.svg"
                                alt="Workflow"
                            />
                            <span className="hidden ml-2 text-white text-2xl font-semibold lg:block">
                                Lotto G
                            </span>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-100 hover:text-white hover:bg-gray-700"
                                >
                                    Home
                                </a>
                                <a
                                    href="#"
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-100 hover:text-white hover:bg-gray-700"
                                >
                                    Lotteries
                                </a>
                                <a
                                    href="#"
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-100 hover:text-white hover:bg-gray-700"
                                >
                                    Draw Results
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {user ? (
                            // Profile dropdown
                            <div className="relative" ref={profileDropDownRef}>
                                <button
                                    type="button"
                                    className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                    id="user-menu-button"
                                    aria-expanded="true"
                                    aria-haspopup="true"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                </button>
                                <div
                                    className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${dropdownOpen ? "" : "hidden"
                                        }`}
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                    tabIndex={-1}
                                >
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                                        Your Profile
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                                        Settings
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                                        Sign out
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-100 hover:text-white hover:bg-gray-700"
                                >
                                    Login
                                </button>
                                <button
                                    type="button"
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-100 hover:text-white hover:bg-gray-700"
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
