"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const setCookie = (name: string, value: string, days: number) => {
	const date = new Date();
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	const expires = `; expires=${date.toUTCString()}`;
	document.cookie = `${name}=${value}${expires}; path=/`;
};

const getCookie = (name: string): string | null => {
	const cookies = document.cookie.split("; ");
	const cookie = cookies.find((row) => row.startsWith(`${name}=`));
	return cookie ? cookie.split("=")[1] : null;
};

export function ThemeSelector() {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		const savedTheme = getCookie("theme") as "light" | "dark" | null;
		if (savedTheme && ["light", "dark"].includes(savedTheme)) {
			setTheme(savedTheme);
		}
	}, []);

	useEffect(() => {
		setCookie("theme", theme, 365);
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(theme);
	}, [theme]);

	// Handler to ensure the value is 'light' or 'dark' before setting state
	const handleThemeChange = (value: string) => {
		if (value === "light" || value === "dark") {
			setTheme(value);
		}
	};

	return (
		<div className="p-6 flex flex-col items-center space-y-4">
			<label className="text-lg font-semibold" htmlFor="theme-select">
				Choose Theme
			</label>
			<Select value={theme} onValueChange={handleThemeChange}>
				<SelectTrigger className="w-[180px]" id="theme-select">
					<SelectValue placeholder="Select theme" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="light">Light</SelectItem>
					<SelectItem value="dark">Dark</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
