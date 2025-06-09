"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatarProfile } from "@/components/user-avatar-profile";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function UserNav() {
	const { data: session } = authClient.useSession();
	const router = useRouter();
	if (session?.user) {
		const userData = {
			image: session.user.image || undefined,
			name: session.user.name,
			email: session.user.email,
		};
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="relative h-8 w-8 rounded-full">
						<UserAvatarProfile user={userData} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-56"
					align="end"
					sideOffset={10}
					forceMount
				>
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="font-medium text-sm leading-none">
								{session.user.name}
							</p>
							<p className="text-muted-foreground text-xs leading-none">
								{session.user.email}
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem
							onSelect={() => router.push("/dashboard/profile")}
						>
							Profile
						</DropdownMenuItem>
						<DropdownMenuItem>Billing</DropdownMenuItem>
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem>New Team</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem onSelect={() => authClient.signOut()}>
						<LogOut className="mr-2 h-4 w-4" />
						<span>Sign Out</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}
}
