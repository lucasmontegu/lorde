import type { ActionId, ActionImpl } from "kbar";
import * as React from "react";

const ResultItem = React.forwardRef(
	(
		{
			action,
			active,
			currentRootActionId,
		}: {
			action: ActionImpl;
			active: boolean;
			currentRootActionId: ActionId;
		},
		ref: React.Ref<HTMLDivElement>,
	) => {
		const ancestors = React.useMemo(() => {
			if (!currentRootActionId) return action.ancestors;
			const index = action.ancestors.findIndex(
				(ancestor: any) => ancestor.id === currentRootActionId,
			);
			return action.ancestors.slice(index + 1);
		}, [action.ancestors, currentRootActionId]);

		return (
			<div
				ref={ref}
				className={
					"relative z-10 flex cursor-pointer items-center justify-between px-4 py-3"
				}
			>
				{active && (
					<div
						id="kbar-result-item"
						className="absolute inset-0 z-[-1]! border-primary border-l-4 bg-accent/50"
					/>
				)}
				<div className="relative z-10 flex items-center gap-2">
					{action.icon && action.icon}
					<div className="flex flex-col">
						<div>
							{ancestors.length > 0 &&
								ancestors.map((ancestor) => (
									<React.Fragment key={ancestor.id}>
										<span className="mr-2 text-muted-foreground">
											{ancestor.name}
										</span>
										<span className="mr-2">&rsaquo;</span>
									</React.Fragment>
								))}
							<span>{action.name}</span>
						</div>
						{action.subtitle && (
							<span className="text-muted-foreground text-sm">
								{action.subtitle}
							</span>
						)}
					</div>
				</div>
				{action.shortcut?.length ? (
					<div className="relative z-10 grid grid-flow-col gap-1">
						{action.shortcut.map((sc: any, i: number) => (
							<kbd
								key={sc + i}
								className="flex h-5 items-center gap-1 rounded-md border bg-muted px-1.5 font-medium text-[10px]"
							>
								{sc}
							</kbd>
						))}
					</div>
				) : null}
			</div>
		);
	},
);

ResultItem.displayName = "KBarResultItem";

export default ResultItem;
