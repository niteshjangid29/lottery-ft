"use client";

import React, { useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchStoreByUniqueId, setProfile } from "@/redux/slices/retailerSlice";
import HomePage from "@/components/Home/HomePage";

interface RetailerStore {
	name: string;
	brandName: string;
	logo: string;
	customization: {
		primaryColor: string;
		secondaryColor: string;
		brandingText: string;
	};
}

const StorePage: React.FC = () => {
	const query = useSearchParams();
	const { profile: retailer } = useSelector(
		(state: RootState) => state.retailer
	);
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();

	const affiliate_id = query.get("affiliate_id");
	console.log("affiliate_id", affiliate_id);

	useEffect(() => {
		if (affiliate_id === null) {
			router.push("/");
			return;
		}

		if (!retailer) {
			dispatch(fetchStoreByUniqueId(affiliate_id))
				.unwrap()
				.then((data) => {
					console.log("Store fetched successfully:", data);
				})
				.catch((error) => {
					console.error("Failed to fetch store:", error);
				});
		}
	}, [affiliate_id, dispatch]);

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

	return (
		<>
			<HomePage retailer={retailer} />
		</>
	);
};

export default StorePage;
