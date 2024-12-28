"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchRetailerDetails,
  fetchStoreByUniqueId,
} from "@/redux/slices/retailerSlice";
import HomePage from "@/components/Home/HomePage";

const StorePageContent: React.FC = () => {
  const query = useSearchParams();
  const { profile: retailer } = useSelector(
    (state: RootState) => state.retailer
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { location } = useSelector((state: RootState) => state.location);

  const retailer_id = query.get("retailer_id");
  const affiliate_id = query.get("affiliate_id");
  console.log("affiliate_id", affiliate_id);

  useEffect(() => {
    if (affiliate_id === null && retailer_id === null) {
      router.push("/");
      return;
    }

    if (!retailer) {
      if (affiliate_id) {
        dispatch(fetchStoreByUniqueId(affiliate_id))
          .unwrap()
          .then((data) => {
            console.log("Store fetched successfully:", data);
          })
          .catch((error) => {
            console.error("Failed to fetch store:", error);
          });
      }
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
  }, [affiliate_id, retailer_id, retailer, router, dispatch]);

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

  console.log("location", location);

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
