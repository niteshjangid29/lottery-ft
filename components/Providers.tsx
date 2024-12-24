"use client";

import store from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

function Providers({ children }: { children: React.ReactNode }) {
	return <Provider store={store}>{children}</Provider>;
}

export default Providers;
