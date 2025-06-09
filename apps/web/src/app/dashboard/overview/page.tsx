"use client";

import {
	ControlBar,
	RoomAudioRenderer,
	RoomContext,
} from "@livekit/components-react";
import { Room } from "livekit-client";
import "@livekit/components-styles";
import { useEffect, useState } from "react";

import { orpc } from "@/utils/orpc";
import { useQuery } from "@tanstack/react-query";

const LIVEKIT_URL = process.env.NEXT_PUBLIC_LIVEKIT_URL;

if (!LIVEKIT_URL) {
	throw new Error("NEXT_PUBLIC_LIVEKIT_URL is not set");
}

export default function Overview() {
	const room = "quickstart-room";
	const name = "quickstart-user";
	const data = useQuery(
		orpc.livekit.generateToken.queryOptions({
			input: {
				roomName: room,
				participantName: name,
			},
		}),
	);

	const token = data.data?.token;

	const [roomInstance] = useState(
		() =>
			new Room({
				// Optimize video quality for each participant's screen
				adaptiveStream: true,
				// Enable automatic audio/video quality optimization
				dynacast: true,
			}),
	);

	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				if (!mounted) return;
				if (token && LIVEKIT_URL) {
					await roomInstance.connect(LIVEKIT_URL, token);
				}
			} catch (e) {
				console.error(e);
			}
		})();

		return () => {
			mounted = false;
			roomInstance.disconnect();
		};
	}, [roomInstance, token]);

	if (token === "") {
		return <div>Getting token...</div>;
	}

	return (
		<RoomContext.Provider value={roomInstance}>
			<div data-lk-theme="default" style={{ height: "100dvh" }}>
				{/* Your custom component with basic video conferencing functionality. */}
				{/* The RoomAudioRenderer takes care of room-wide audio for you. */}
				<RoomAudioRenderer />
				{/* Controls for the user to start/stop audio, video, and screen share tracks */}
				<ControlBar />
			</div>
		</RoomContext.Provider>
	);
}
