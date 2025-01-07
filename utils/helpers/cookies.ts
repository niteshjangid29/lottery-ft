import Cookies from "js-cookie";

const cookieConverter = Cookies.withConverter({
	read: function (value, name) {
		// Remove quotes from token value
		if (name === "userToken") {
			const decodedValue = decodeURIComponent(value);
			return decodedValue.replace(/^"(.*)"$/, "$1");
		}
		// Parse JSON for other values
		try {
			return Cookies.converter.read(value, name);
		} catch {
			return value;
		}
	},
	write: function (value) {
		return typeof value === "string" ? value : JSON.stringify(value);
	},
});

export const getCookie = (name: string): string | null => {
	const value = cookieConverter.get(name);
	return value ? value : null;
};

export const setCookie = (name: string, value: any, days = 3): void => {
	const processedValue =
		typeof value === "string" ? value : JSON.stringify(value);

	cookieConverter.set(name, processedValue, { expires: days });
};

export const removeCookie = (name: string): void => {
	cookieConverter.remove(name);
};
