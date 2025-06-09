"use client";

import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
	const { data, isPending, error } = useQuery({
		queryKey: ["user"],
		queryFn: () => authClient.getSession(),
	});

	return { data, isPending, error };
};
