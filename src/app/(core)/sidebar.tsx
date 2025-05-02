import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { db } from "@/db";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { threadsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Sidebar() {
	const { userId } = await auth();

	if (!userId) {
		redirect("/sign-in");
	}

	// TODO: check table for rate limits

	const threads = await db.query.threadsTable.findMany({
		where: eq(threadsTable.ownerId, userId),
	});

	return (
		<div className="h-screen w-[275px] bg-sidebar flex flex-col p-5 text-sidebar-foreground gap-y-5">
			<h1 className="font-bold">ACM Chat</h1>
			<Button className="w-full font-bold tracking-tighter text-md cursor-pointer">
				New Chat
				<Plus />
			</Button>
			<div className="flex-col">
				{threads.map((thread) => (
					<ThreadListItem
						key={thread.id}
						threadId={thread.id}
						threadName={thread.name}
					/>
				))}
			</div>
		</div>
	);
}

interface ThreadListItemProps {
	threadId: string;
	threadName: string;
}

function ThreadListItem({ threadId, threadName }: ThreadListItemProps) {
	return (
		<Link href={`/thread/${threadId}`}>
			<div className="h-16 w-full flex items-center">
				<p>{threadName}</p>
			</div>
		</Link>
	);
}
