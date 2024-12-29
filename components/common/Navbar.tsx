"use client";
import useClickOutside from "@/hooks/useClickOutside";
import { logoutRetailer } from "@/redux/slices/retailerSlice";
import { logout } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FiHome, FiList, FiMenu, FiX } from "react-icons/fi";
import { IoTicketOutline, IoWalletOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

function NavbarContent() {
	const dispatch = useDispatch();
	const router = useRouter();

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const profileDropDownRef = useRef(null);
	const mobileMenuRef = useRef(null);

	const currentPath = usePathname();
	const { authUser } = useSelector((state: RootState) => state.user);
	const { authRetailer } = useSelector((state: RootState) => state.retailer);
	const { profile: retailer } = useSelector(
		(state: RootState) => state.retailer
	) as any;
	// const { location } = useSelector((state: RootState) => state.location);

	useClickOutside(profileDropDownRef, () => {
		setDropdownOpen(false);
	});

	useClickOutside(mobileMenuRef, () => {
		setIsMobileMenuOpen(false);
	});

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const query = useSearchParams();
	const affiliate_id = query.get("affiliate_id");
	// const retailer_id = query.get("retailer_id");

	console.log("authUser", authUser);
	console.log("retailer", retailer);
	console.log("authRetailer", authRetailer);

	const handleSignOut = () => {
		console.log("Signing out");

		try {
			// Dispatch logout actions
			if (authUser) {
				dispatch(logout());
			} else if (authRetailer) {
				dispatch(logoutRetailer());
			}

			// Reset menu and navigate
			setDropdownOpen(false);
			router.push("/");
			router.refresh(); // Force refresh to clear navigation cache
		} catch (error) {
			console.error("Sign out error:", error);
		}
	};

	useClickOutside(profileDropDownRef, () => {
		setDropdownOpen(false);
	});

	const navItems = [
		{ label: "Home", href: "/" },
		{ label: "Lotteries", href: "/lotteries" },
		{ label: "Results", href: "/draw/results" },
		{ label: "Credit", href: "/credit" },
		{ label: "Contact-Us", href: "/support/contact_us" },
	];

	const bottomNavItems = [
		{ label: "Home", href: "/", icon: FiHome },
		{ label: "Lottery", href: "/lotteries", icon: IoTicketOutline },
		{ label: "Result", href: "/draw/results", icon: FiList },
		{ label: "Credit", href: "/credit", icon: IoWalletOutline },
	];

	return (
		<>
			<nav
				className={`bg-primary text-secondary fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
			>
				<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
					<div className="relative flex items-center justify-between h-16">
						<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
							<button
								onClick={toggleMobileMenu}
								className="text-gray-600 hover:text-blue-600 p-2"
							>
								{isMobileMenuOpen ? (
									<FiX className="h-6 w-6" />
								) : (
									<FiMenu className="h-6 w-6" />
								)}
							</button>
						</div>
						<div className="flex-1 flex items-center ml-10 sm:ml-0 justify-start sm:items-stretch sm:justify-start">
							<Link
								href="/"
								className="flex-shrink-0 items-center sm:flex"
							>
								<Image
									className="hidden lg:block h-8 w-auto"
									src="https://tailwindui.com/plus/img/logos/workflow-mark-indigo-500.svg"
									alt="Workflow"
									width={10}
									height={10}
								/>
								<span className="ml-2 text-white text-2xl font-semibold">
									PB Lottery
								</span>
							</Link>
							<div className="hidden sm:block sm:ml-6">
								<div className={`flex space-x-4`}>
									{navItems.map((item) => (
										<Link
											key={item.href}
											href={`${
												authUser && retailer
													? item.href === "/"
														? `${item.href}store/?affiliate_id=${affiliate_id}`
														: `${item.href}/?affiliate_id=${affiliate_id}`
													: authRetailer &&
													  retailer &&
													  item.href === "/"
													? `${item.href}store/?retailer_id=${retailer._id}`
													: item.href
											}`}
											className={`px-3 py-2 rounded-md text-sm font-medium text-gray-100 hover:text-white hover:bg-gray-700 ${
												currentPath === item.href
													? "bg-gray-700"
													: ""
											}`}
										>
											{item.label}
										</Link>
									))}
								</div>
							</div>
						</div>
						<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
							{authUser || authRetailer ? (
								// Profile dropdown
								<div
									className="relative"
									ref={profileDropDownRef}
								>
									<button
										type="button"
										className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
										id="user-menu-button"
										aria-expanded={true}
										aria-haspopup="true"
										onClick={() => {
											setDropdownOpen(!dropdownOpen);
										}}
									>
										<span className="sr-only">
											Open user menu
										</span>
										<CgProfile className="h-8 w-8 rounded-full" />
									</button>
									<div
										className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
											dropdownOpen ? "" : "hidden"
										}`}
										role="menu"
										aria-orientation="vertical"
										aria-labelledby="user-menu-button"
										tabIndex={-1}
									>
										<Link
											href={`${
												authUser
													? "/profile"
													: `/retailer/dashboard/?retailer_id=${retailer._id}`
											}`}
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											onClick={(e) => {
												e.stopPropagation();
												setDropdownOpen(false);
											}}
										>
											{authUser
												? "Your Profile"
												: "Dashboard"}
										</Link>
										<Link
											href="/settings"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											onClick={(e) => {
												e.stopPropagation();
												setDropdownOpen(false);
											}}
										>
											Settings
										</Link>
										<button
											onClick={(e) => {
												e.stopPropagation();
												e.preventDefault();
												handleSignOut();
											}}
											className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Sign out
										</button>
									</div>
								</div>
							) : (
								<div className={`flex space-x-4`}>
									<button
										type="button"
										className={`px-3 py-2 rounded-md text-sm font-medium text-gray-100 hover:text-white hover:bg-gray-700 ${
											currentPath === "/login"
												? "bg-gray-700"
												: ""
										}`}
									>
										<Link href="/login">Login</Link>
									</button>
									<button
										type="button"
										className={`px-3 py-2 rounded-md text-sm font-medium text-gray-100 hover:text-white hover:bg-gray-700 ${
											currentPath === "/signup"
												? "bg-gray-700"
												: ""
										}`}
									>
										<Link href="/signup">Sign Up</Link>
									</button>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Mobile Menu Overlay */}
				<div
					className={`sm:hidden ${
						isMobileMenuOpen ? "flex" : "hidden"
					} fixed inset-0 bg-black bg-opacity-50 z-[100]`}
				>
					<div
						className={`w-1/2 fixed top-16 h-full bg-white`}
						ref={mobileMenuRef}
					>
						<div className={`flex flex-col gap-2 p-2`}>
							{navItems.map((item) => (
								<Link
									href={`${
										authUser && retailer
											? item.href === "/"
												? `${item.href}store/?affiliate_id=${affiliate_id}`
												: `${item.href}/?affiliate_id=${affiliate_id}`
											: authRetailer &&
											  retailer &&
											  item.href === "/"
											? `${item.href}store/?retailer_id=${retailer._id}`
											: item.href
									}`}
									key={item.href}
									className={`text-gray-600 hover:text-blue-600 transition border-b text-lg`}
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{item.label}
								</Link>
							))}
						</div>
					</div>
				</div>
			</nav>

			{/* Bottom Navigation for Mobile display */}
			<div className="fixed bottom-0 left-0 right-0 bg-gray-300 rounded-t-3xl border-t md:hidden z-20 transition-all duration-300">
				<div className="grid grid-cols-4 h-16">
					{bottomNavItems.map((item) => {
						const Icon = item.icon;
						return (
							<Link
								key={item.href}
								href={`${
									authUser && retailer
										? item.href === "/"
											? `${item.href}store/?affiliate_id=${affiliate_id}`
											: `${item.href}/?affiliate_id=${affiliate_id}`
										: authRetailer &&
										  retailer &&
										  item.href === "/"
										? `${item.href}store/?retailer_id=${retailer._id}`
										: item.href
								}`}
								className={`flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 ${
									currentPath === item.href
										? "text-blue-600"
										: ""
								}`}
							>
								<Icon className="h-6 w-6" />
								<span className="text-xs mt-1">
									{item.label}
								</span>
							</Link>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default function Navbar() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<NavbarContent />
		</Suspense>
	);
}
