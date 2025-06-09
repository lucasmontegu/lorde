import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default async function Page() {
	const { data: user } = await authClient.getSession();

	if (!user) {
		return redirect("/login");
	}
	redirect("/dashboard/overview");
}
