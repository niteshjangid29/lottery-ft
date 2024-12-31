"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
	clearProfile,
	fetchRetailerDetails,
	fetchStoreByUniqueId,
} from "@/redux/slices/retailerSlice";
import HomePage from "@/components/Home/HomePage";
import toast from "react-hot-toast";

const StorePageContent: React.FC = () => {
	const query = useSearchParams();
	const { profile: retailer } = useSelector(
		(state: RootState) => state.retailer
	);
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();

	// const { location } = useSelector((state: RootState) => state.location);
	const { authUser } = useSelector((state: RootState) => state.user);

	const retailer_id = query.get("retailer_id");
	const affiliate_id = query.get("affiliate_id");
	console.log("affiliate_id", affiliate_id);

	useEffect(() => {
		dispatch(clearProfile());

		if (affiliate_id === null && retailer_id === null) {
			router.push("/");
			return;
		}

		console.log("Inside useEffect store page");

		if (!authUser) {
			router.push(
				`/login?affiliate_id=${affiliate_id}&retailer_id=${retailer_id}`
			);
			return;
		}

		// Clear existing retailer data when affiliate_id changes
		// localStorage.removeItem("retailerProfile");

		if (affiliate_id) {
			dispatch(fetchStoreByUniqueId(affiliate_id))
				.unwrap()
				.then((data) => {
					console.log("Store fetched successfully:", data);
					// localStorage.setItem(
					// 	"retailerProfile",
					// 	JSON.stringify(data)
					// );
				})
				.catch((error) => {
					console.error("Failed to fetch store:", error);
					toast.error("Failed to fetch store");
					router.push("/");
				});
		}

		if (retailer_id) {
			dispatch(fetchRetailerDetails())
				.unwrap()
				.then((data) => {
					console.log("Retailer fetched successfully:", data);
				})
				.catch((error) => {
					console.error("Failed to fetch retailer:", error);
				});
		}

		// return () => {
		// 	// Cleanup on unmount or affiliate_id change
		// 	localStorage.removeItem("retailerProfile");
		// };
	}, [affiliate_id, retailer_id, router, dispatch, authUser]);

	// Apply retailer's custom styling
	useEffect(() => {
		if (retailer?.customization) {
			document.documentElement.style.setProperty(
				"--primary-color",
				retailer.customization.primaryColor
			);
			document.documentElement.style.setProperty(
				"--secondary-color",
				retailer.customization.secondaryColor
			);
		}
	}, [retailer]);

	// console.log("location", location);

	return (
		<>
			<HomePage retailer={retailer} />
		</>
	);
};

export default function StorePage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<StorePageContent />
		</Suspense>
	);
}
