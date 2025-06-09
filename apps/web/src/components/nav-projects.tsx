"use client";

import type { Icons } from "@/components/icons";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import {
	MoreHorizontalIcon as Dots,
	FolderIcon as Folder,
	ShareIcon as Share,
	TrashIcon as Trash,
} from "lucide-react";

export function NavProjects({
	projects,
}: {
	projects: {
		name: string;
		url: string;
		icon: keyof typeof Icons;
	}[];
}) {
	const { isMobile } = useSidebar();

	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Projects</SidebarGroupLabel>
			<SidebarMenu>
				{projects.map((item) => (
					<SidebarMenuItem key={item.name}>
						<SidebarMenuButton asChild>
							<a href={item.url}>
								<HugeiconsIcon icon={item.icon as any} size={16} />
								<span>{item.name}</span>
							</a>
						</SidebarMenuButton>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuAction showOnHover>
									<HugeiconsIcon icon={Dots} size={16} />
									<span className="sr-only">More</span>
								</SidebarMenuAction>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-48 rounded-lg"
								side={isMobile ? "bottom" : "right"}
								align={isMobile ? "end" : "start"}
							>
								<DropdownMenuItem>
									<HugeiconsIcon
										icon={Folder}
										size={16}
										className="mr-2 h-4 w-4 text-muted-foreground"
									/>
									<span>View Project</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<HugeiconsIcon
										icon={Share}
										size={16}
										className="mr-2 h-4 w-4 text-muted-foreground"
									/>
									<span>Share Project</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<HugeiconsIcon
										icon={Trash}
										size={16}
										className="mr-2 h-4 w-4 text-muted-foreground"
									/>
									<span>Delete Project</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				))}
				<SidebarMenuItem>
					<SidebarMenuButton className="text-sidebar-foreground/70">
						<HugeiconsIcon
							icon={Dots}
							size={16}
							className="text-sidebar-foreground/70"
						/>
						<span>More</span>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	);
}
