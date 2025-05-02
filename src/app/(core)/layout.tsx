import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema";
import { RedirectToSignIn } from "@clerk/nextjs";
import Sidebar from "./sidebar";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { userId } = await auth();

	if (!userId) {
		return <RedirectToSignIn />;
	}

	const user = await db.query.usersTable.findFirst({
		where: eq(usersTable.id, userId),
	});

	if (!user) {
		redirect("/onboard");
	}

	return (
		<main className="flex">
			<Sidebar />
			<div className="flex-1">{children}</div>
		</main>
	);
}
