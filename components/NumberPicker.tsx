"use client";

// import React, { useRef, useState } from "react";

// const ITEM_HEIGHT = 50;

// const NumberPicker: React.FC = () => {
// 	const data: string[] = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]; // Replace with your text array
// 	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
// 	const [scrollValue, setScrollValue] = useState<number>(0);

// 	const handleScroll = (): void => {
// 		if (scrollContainerRef.current) {
// 			setScrollValue(scrollContainerRef.current.scrollTop);
// 		}
// 	};

// 	const calculateOpacity = (distance: number): number => {
// 		const inputRange = [
// 			-2 * ITEM_HEIGHT,
// 			-ITEM_HEIGHT,
// 			0,
// 			ITEM_HEIGHT,
// 			2 * ITEM_HEIGHT,
// 		];
// 		const outputRange = [0.0, 0.3, 1.0, 0.3, 0.0];

// 		for (let i = 0; i < inputRange.length - 1; i++) {
// 			if (distance >= inputRange[i] && distance < inputRange[i + 1]) {
// 				const ratio =
// 					(distance - inputRange[i]) /
// 					(inputRange[i + 1] - inputRange[i]);
// 				return (
// 					outputRange[i] +
// 					ratio * (outputRange[i + 1] - outputRange[i])
// 				);
// 			}
// 		}

// 		return 0.0;
// 	};

// 	return (
// 		<div
// 			ref={scrollContainerRef}
// 			className="h-[300px] overflow-y-scroll scroll-smooth border border-[#ccc]"
// 			onScroll={handleScroll}
// 		>
// 			{data.map((item, index) => {
// 				const distanceFromViewCenter = Math.abs(
// 					index * ITEM_HEIGHT - scrollValue
// 				);
// 				const opacity = calculateOpacity(distanceFromViewCenter);

// 				return (
// 					<div
// 						key={index}
// 						className="flex items-center justify-center transition-opacity duration-200 ease-in-out text-sm text-center"
// 						style={{
// 							opacity,
// 							height: ITEM_HEIGHT,
// 						}}
// 					>
// 						{item}
// 					</div>
// 				);
// 			})}
// 		</div>
// 	);
// };

// export default NumberPicker;

// pages/index.tsx
import React, { useState } from "react";

const NumberPicker: React.FC = () => {
	const items: string[] = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
	const [selectedItem, setSelectedItem] = useState<string | null>(null);

	const handleChange = (index: number): void => {
		setSelectedItem(items[index]);
	};

	return (
		<div
			// style={{
			// 	display: "flex",
			// 	flexDirection: "column",
			// 	alignItems: "center",
			// 	justifyContent: "center",
			// 	height: "100vh",
			// 	fontFamily: "Arial, sans-serif",
			// }}
			className="h-[300px] flex flex-col items-center justify-center"
		>
			<h1>Cupertino Picker</h1>
			<div
				// style={{
				// 	width: "200px",
				// 	height: "150px",
				// 	overflowY: "scroll",
				// 	border: "1px solid #ccc",
				// 	borderRadius: "8px",
				// 	textAlign: "center",
				// }}
				className="w-[200px] h-[150px] overflow-y-scroll scroll-smooth no-scrollbar text-center rounded-lg"
			>
				{items.map((item, index) => (
					<div
						key={index}
						style={{
							padding: "8px 0",
							cursor: "pointer",
							backgroundColor:
								selectedItem === item ? "#e0e0e0" : "white",
							transition: "background-color 0.2s ease",
						}}
						onClick={() => handleChange(index)}
					>
						{item}
					</div>
				))}
			</div>
			{selectedItem && (
				<p style={{ marginTop: "16px", fontSize: "16px" }}>
					Selected: <strong>{selectedItem}</strong>
				</p>
			)}
		</div>
	);
};

export default NumberPicker;
