"use client";
import { Icons } from "@/components/icons";
import { OrgSwitcher } from "@/components/org-switcher";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { UserAvatarProfile } from "@/components/user-avatar-profile";
import { navItems } from "@/constants/data";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useUser } from "@/hooks/use-user";
import {
	Bell,
	ChevronDown,
	ChevronRight,
	CreditCard,
	LogOut,
	UserSquare,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const company = {
	name: "Acme Inc",
	logo: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
	plan: "Enterprise",
};

const tenants = [
	{ id: "1", name: "Acme Inc" },
	{ id: "2", name: "Beta Corp" },
	{ id: "3", name: "Gamma Ltd" },
];

export default function AppSidebar() {
	const pathname = usePathname();
	const { isOpen } = useMediaQuery();
	const { data: user } = useUser();
	const router = useRouter();
	const handleSwitchTenant = (_tenantId: string) => {
		// Tenant switching functionality would be implemented here
	};

	const activeTenant = tenants[0];

	useEffect(() => {
		// Side effects based on sidebar state changes
		console.log("isOpen", isOpen);
	}, [isOpen]);

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<OrgSwitcher
					tenants={tenants}
					defaultTenant={activeTenant}
					onTenantSwitch={handleSwitchTenant}
				/>
			</SidebarHeader>
			<SidebarContent className="overflow-x-hidden">
				<SidebarGroup>
					<SidebarGroupLabel>Overview</SidebarGroupLabel>
					<SidebarMenu>
						{navItems.map((item) => {
							const Icon = item.icon ? Icons[item.icon] : Icons.logo;
							return item?.items && item?.items?.length > 0 ? (
								<Collapsible
									key={item.title}
									asChild
									defaultOpen={item.isActive}
									className="group/collapsible"
								>
									<SidebarMenuItem>
										<CollapsibleTrigger asChild>
											<SidebarMenuButton
												tooltip={item.title}
												isActive={pathname === item.url}
											>
												{/* {item.icon && <HugeiconsIcon icon={item.icon as any} size={16} />} */}
												<span>{item.title}</span>
												<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
											</SidebarMenuButton>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.items?.map((subItem) => (
													<SidebarMenuSubItem key={subItem.title}>
														<SidebarMenuSubButton
															asChild
															isActive={pathname === subItem.url}
														>
															<Link href={subItem.url} className="w-full">
																<span>{subItem.title}</span>
															</Link>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												))}
											</SidebarMenuSub>
										</CollapsibleContent>
									</SidebarMenuItem>
								</Collapsible>
							) : (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										tooltip={item.title}
										isActive={pathname === item.url}
									>
										<Link href={item.url} className="w-full">
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									size="lg"
									className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								>
									{user && (
										<UserAvatarProfile
											className="h-8 w-8 rounded-lg"
											showInfo
											user={user as any}
										/>
									)}
									<ChevronDown className="ml-auto size-4" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
								side="bottom"
								align="end"
								sideOffset={4}
							>
								<DropdownMenuLabel className="p-0 font-normal">
									<div className="px-1 py-1.5">
										{user && (
											<UserAvatarProfile
												className="h-8 w-8 rounded-lg"
												showInfo
												user={user as any}
											/>
										)}
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />

								<DropdownMenuGroup>
									<DropdownMenuItem
										onClick={() => router.push("/dashboard/profile")}
									>
										<UserSquare className="mr-2 h-4 w-4" />
										Profile
									</DropdownMenuItem>
									<DropdownMenuItem>
										<CreditCard className="mr-2 h-4 w-4" />
										Billing
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Bell className="mr-2 h-4 w-4" />
										Notifications
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<LogOut className="mr-2 h-4 w-4" />
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
