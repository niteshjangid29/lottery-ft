// "use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/common/Navbar";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/common/Providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "PB Lottery",
	description: "Online Lottery Platform",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>
					<Toaster
						position="top-right"
						toastOptions={{
							style: {
								background: "rgb(51, 65, 85)",
								color: "#fff",
							},
						}}
					/>
					<Navbar />
					{children}
				</Providers>
			</body>
		</html>
	);
}
