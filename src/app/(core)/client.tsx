"use client";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function Thread() {
	return (
		<main className="max-w-[900px] mx-auto min-h-screen relative">
			<ChatBox />
		</main>
	);
}

function ChatBox() {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [isFocused, setIsFocused] = useState(false);

	// Auto-resize textarea on input
	function handleTextareaInput() {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = "auto";
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	}

	// Initialize height on component mount
	useEffect(() => {
		handleTextareaInput();
	}, []);

	return (
		<div
			className={`bg-popover rounded-lg p-5 min-h-32 w-full absolute bottom-5 max-w-[700px] left-1/2 -translate-x-1/2 flex flex-col gap-y-2 ${
				isFocused
					? "ring-2 ring-primary ring-opacity-50"
					: "border border-border"
			} transition-all duration-150`}
		>
			<textarea
				ref={textareaRef}
				className="w-full min-h-[80px] rounded-lg p-2 resize-none overflow-hidden outline-none border-none bg-transparent"
				placeholder="Type your message here..."
				onInput={handleTextareaInput}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
			<div className="flex justify-end p-0">
				<Button>
					<Send />
				</Button>
			</div>
		</div>
	);
}
