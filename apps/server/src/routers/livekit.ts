import { AccessToken, RoomServiceClient } from "livekit-server-sdk";
import { z } from "zod";
import { protectedProcedure } from "../lib/orpc";

const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY;
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;

if (!LIVEKIT_API_KEY || !LIVEKIT_API_SECRET || !LIVEKIT_URL) {
	throw new Error(
		"LIVEKIT_API_KEY, LIVEKIT_API_SECRET, and LIVEKIT_URL must be set",
	);
}

const roomService = new RoomServiceClient(
	LIVEKIT_URL,
	LIVEKIT_API_KEY,
	LIVEKIT_API_SECRET,
);

export const livekitRouter = {
	generateToken: protectedProcedure
		.input(
			z.object({
				roomName: z.string().min(1),
				participantName: z.string().min(1),
				metadata: z.record(z.string()).optional(),
			}),
		)
		.handler(async ({ input, context }) => {
			const { roomName, participantName, metadata } = input;
			const userId = context.session.user.id;

			// Create or get room
			try {
				await roomService.createRoom({
					name: roomName,
					emptyTimeout: 10 * 60, // 10 minutes
					maxParticipants: 2, // Agent + User
				});
			} catch (error) {
				// Room might already exist, which is fine
				console.log("Room might already exist:", error);
			}

			const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
				identity: participantName,
				metadata: JSON.stringify({
					userId,
					...metadata,
				}),
				ttl: "1h", // Token expires in 1 hour
			});

			// Grant permissions
			at.addGrant({
				roomJoin: true,
				room: roomName,
				canPublish: true,
				canSubscribe: true,
				canPublishData: true,
			});

			return {
				token: await at.toJwt(),
				roomName,
				url: LIVEKIT_URL,
			};
		}),
	joinRoom: protectedProcedure
		.input(
			z.object({
				roomName: z.string().min(1),
				participantName: z.string().min(1),
			}),
		)
		.handler(async ({ input, context }) => {
			const { roomName, participantName } = input;
			const userId = context.session.user.id;

			const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
				identity: participantName,
				metadata: JSON.stringify({
					userId,
				}),
				ttl: "1h", // Token expires in 1 hour
			});

			// Grant permissions
			at.addGrant({
				roomJoin: true,
				room: roomName,
				canPublish: true,
				canSubscribe: true,
				canPublishData: true,
			});

			return {
				token: await at.toJwt(),
				roomName,
				url: LIVEKIT_URL,
			};
		}),
};
