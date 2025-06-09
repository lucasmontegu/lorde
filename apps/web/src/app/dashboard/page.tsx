"use client";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";

export default function Dashboard() {
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();

	useEffect(() => {
		if (!isPending) {
			if (!session) {
				router.push("/login");
			} else {
				router.push("/dashboard/overview");
			}
		}
	}, [session, isPending, router]);
}
