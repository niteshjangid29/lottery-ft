import { format, parse, isValid } from "date-fns";

export const formatDate = (dateStr: string) => {
	try {
		const parsedDate = parse(dateStr, "d-M-yyyy", new Date());
		if (!isValid(parsedDate)) {
			return "Invalid Date";
		}
		return format(dateStr, "dd-MM-yyyy");
	} catch (error) {
		console.error("Date parsing error:", error);
		return "Invalid Date";
	}
};
