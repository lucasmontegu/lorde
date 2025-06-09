import { openai } from "@ai-sdk/openai";
import { Agent, LibSQLStorage } from "@voltagent/core";
import { VercelAIProvider } from "@voltagent/vercel-ai";
import { ElevenLabsVoiceProvider } from "@voltagent/voice";

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

if (!ELEVENLABS_API_KEY) {
	throw new Error("ELEVENLABS_API_KEY must be set");
}

// Configure LibSQLStorage
const memoryStorage = new LibSQLStorage({
	// Required: Connection URL
	url: process.env.DATABASE_URL || "file:./voltagent-memory.db", // Example: Env var for Turso, fallback to local file

	// Required for Turso / Remote sqld (if not using TLS or auth is needed)
	authToken: process.env.DATABASE_AUTH_TOKEN,

	// Optional: Prefix for database table names
	tablePrefix: "agent_memory", // Defaults to 'voltagent_memory'

	// Optional: Storage limit (max number of messages per user/conversation)
	// storageLimit: 100, // Defaults to 100

	// Optional: Enable debug logging for the storage provider
	// debug: true, // Defaults to false
});

const supervisor = new Agent({
	name: "Supervisor",
	instructions:
		"You are a helpful assistant that can answer questions and help with tasks. You are the supervisor of the agents.",
	llm: new VercelAIProvider(),
	model: openai("gpt-4o"),
	memory: memoryStorage,
});

const elevenLabsVoice = new ElevenLabsVoiceProvider({
	apiKey: ELEVENLABS_API_KEY, // Ensure API key is set
	ttsModel: "eleven_multilingual_v2",
	voice: "Rachel", // Example voice ID
});
