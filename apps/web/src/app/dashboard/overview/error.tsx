"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function OverviewError({ error }: { error: Error }) {
	return (
		<Alert variant="destructive">
			<AlertTriangle className="h-4 w-4" />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>
				Failed to load statistics: {error.message}
			</AlertDescription>
		</Alert>
	);
}
