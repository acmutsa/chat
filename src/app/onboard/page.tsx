import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
export default async function Page() {
	const clerkUser = await currentUser();

	if (!clerkUser) {
		redirect("/sign-in");
	}

	const user = await db.query.usersTable.findFirst({
		where: eq(usersTable.id, clerkUser.id),
	});

	if (!user) {
		const insertData = {
			id: clerkUser.id,
			firstName: clerkUser.firstName ?? "",
			lastName: clerkUser.lastName ?? "",
			email: clerkUser.emailAddresses[0].emailAddress,
			profileImage: clerkUser.hasImage ? clerkUser.imageUrl : "",
		};

		await db.insert(usersTable).values(insertData);
	}

	return (
		<main className="w-full flex-col max-w-screen h-screen flex items-center justify-center">
			<h1 className="text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 pb-5">
				Welcome!
			</h1>
			<p className="font-bold">
				You are now Registered. Feel free to customize your experience
				below:
			</p>
			<Card className="relative overflow-hidden border-border/40 bg-gradient-to-b from-background to-background/95 backdrop-blur shadow-xl rounded-2xl w-full max-w-[500px] mt-10">
				<CardContent className="p-0 flex items-center justify-center">
					<Button>Continue {">"}</Button>
				</CardContent>
			</Card>
		</main>
	);
}
