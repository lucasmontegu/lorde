import PageContainer from "@/components/layout/page-container";
import type React from "react";

export default function OverViewLayout({
	sales,
	pie_stats,
	bar_stats,
	area_stats,
	children,
}: {
	sales: React.ReactNode;
	pie_stats: React.ReactNode;
	bar_stats: React.ReactNode;
	area_stats: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<PageContainer>
			<div className="flex flex-1 flex-col space-y-2">
				<div className="flex items-center justify-between space-y-2">
					<h2 className="font-bold text-2xl tracking-tight">
						Hi, Welcome back 👋
					</h2>
				</div>

				{/* <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4 dark:*:data-[slot=card]:bg-card">
					<Card className="@container/card">
						<CardHeader>
							<CardDescription>Total Revenue</CardDescription>
							<CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
								$1,250.00
							</CardTitle>
							<CardAction>
								<Badge variant="outline">
									<TrendingUp className="h-4 w-4" />
									+12.5%
								</Badge>
							</CardAction>
						</CardHeader>
						<CardFooter className="flex-col items-start gap-1.5 text-sm">
							<div className="line-clamp-1 flex gap-2 font-medium">
								Trending up this month <TrendingUp className="h-4 w-4" />
							</div>
							<div className="text-muted-foreground">
								Visitors for the last 6 months
							</div>
						</CardFooter>
					</Card>
					<Card className="@container/card">
						<CardHeader>
							<CardDescription>New Customers</CardDescription>
							<CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
								1,234
							</CardTitle>
							<CardAction>
								<Badge variant="outline">
									<TrendingDown className="h-4 w-4" />
									-20%
								</Badge>
							</CardAction>
						</CardHeader>
						<CardFooter className="flex-col items-start gap-1.5 text-sm">
							<div className="line-clamp-1 flex gap-2 font-medium">
								Down 20% this period{" "}
								<TrendingDown className="h-4 w-4" />
							</div>
							<div className="text-muted-foreground">
								Acquisition needs attention
							</div>
						</CardFooter>
					</Card>
					<Card className="@container/card">
						<CardHeader>
							<CardDescription>Active Accounts</CardDescription>
							<CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
								45,678
							</CardTitle>
							<CardAction>
								<Badge variant="outline">
									<TrendingUp className="h-4 w-4" />
									+12.5%
								</Badge>
							</CardAction>
						</CardHeader>
						<CardFooter className="flex-col items-start gap-1.5 text-sm">
							<div className="line-clamp-1 flex gap-2 font-medium">
								Strong user retention{" "}
								<TrendingUp className="h-4 w-4" />
							</div>
							<div className="text-muted-foreground">
								Engagement exceed targets
							</div>
						</CardFooter>
					</Card>
					<Card className="@container/card">
						<CardHeader>
							<CardDescription>Growth Rate</CardDescription>
							<CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
								4.5%
							</CardTitle>
							<CardAction>
								<Badge variant="outline">
									<TrendingUp className="h-4 w-4" />
									+4.5%
								</Badge>
							</CardAction>
						</CardHeader>
						<CardFooter className="flex-col items-start gap-1.5 text-sm">
							<div className="line-clamp-1 flex gap-2 font-medium">
								Steady performance increase{" "}
								<TrendingUp className="h-4 w-4" />
							</div>
							<div className="text-muted-foreground">
								Meets growth projections
							</div>
						</CardFooter>
					</Card>
				</div> */}
				{/*  <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'>{bar_stats}</div>
          <div className='col-span-4 md:col-span-3'>
            {sales}
          </div>
          <div className='col-span-4'>{area_stats}</div>
          <div className='col-span-4 md:col-span-3'>{pie_stats}</div>
        </div> */}
				{children}
			</div>
		</PageContainer>
	);
}
