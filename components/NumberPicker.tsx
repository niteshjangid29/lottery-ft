"use client";

import React from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

interface NumberPickerProps {
	index: number;
	value: string;
	onChange: (index: number, value: string) => void;
	totalDigits: number;
}

const NumberPicker: React.FC<NumberPickerProps> = ({
	index,
	value,
	onChange,
	totalDigits,
}: NumberPickerProps) => {
	const inputRef = React.useRef<HTMLInputElement>(null);

	const focusNext = () => {
		const nextInput = document.querySelector(
			`input[data-index="${index + 1}"]`
		) as HTMLInputElement;
		if (nextInput && index < totalDigits - 1) {
			nextInput.focus();
		}
	};

	const focusPrevious = () => {
		const prevInput = document.querySelector(
			`input[data-index="${index - 1}"]`
		) as HTMLInputElement;
		if (prevInput && index > 0) {
			prevInput.focus();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		switch (e.key) {
			case "ArrowRight":
				focusNext();
				break;
			case "ArrowLeft":
				focusPrevious();
				break;
			case "Backspace":
				if (!value && index > 0) {
					focusPrevious();
				}
				break;
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value.slice(-1);
		console.log("newValue index - ", index, " - ", newValue);
		if (/^[0-9]$/.test(newValue) || newValue === "") {
			onChange(index, newValue);
			if (newValue) {
				focusNext();
			}
		}
	};

	return (
		<div className="flex flex-col items-center">
			<button
				onClick={() => {
					const newValue =
						value === ""
							? "0"
							: value === "9"
							? "0"
							: String(Number(value) + 1);
					onChange(index, newValue);
					inputRef.current?.focus();
					console.log(`newValue for index ${index} - ${newValue}`);
				}}
				className="p-1 rounded-t"
			>
				<FaChevronUp className="w-4 h-4" />
			</button>

			<input
				ref={inputRef}
				type="text"
				inputMode="numeric"
				value={value}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				data-index={index}
				placeholder="0"
				className="w-12 h-12 text-center text-2xl border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				maxLength={1}
			/>

			<button
				onClick={() => {
					const newValue =
						value === ""
							? "9"
							: value === "0"
							? "9"
							: String(Number(value) - 1);
					onChange(index, newValue);
					inputRef.current?.focus();
					console.log(`newValue for index ${index} - ${newValue}`);
				}}
				className="p-1 rounded-b"
			>
				<FaChevronDown className="w-4 h-4" />
			</button>
		</div>
	);
};

export default NumberPicker;
