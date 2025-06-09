import { protectedProcedure, publicProcedure } from "../lib/orpc";
import { livekitRouter } from "./livekit";

export const appRouter = {
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),
	privateData: protectedProcedure.handler(({ context }) => {
		return {
			message: "This is private",
			user: context.session?.user,
		};
	}),
	livekit: livekitRouter,
};
export type AppRouter = typeof appRouter;
