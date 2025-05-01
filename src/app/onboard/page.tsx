import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
	return (
		<main className="w-full flex-col max-w-screen h-screen flex items-center justify-center">
			<h1 className="text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 pb-5">
				Welcome!
			</h1>
			<p className="font-bold">
				You are now Registered. Feel free to customize your experience
				below:
			</p>
		</main>
	);
}
