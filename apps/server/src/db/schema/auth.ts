import {
	index,
	integer,
	real,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: integer("email_verified", { mode: "boolean" })
		.$defaultFn(() => false)
		.notNull(),
	image: text("image"),
	role: text("role").default("member").notNull(), // 'admin', 'manager', 'member'
	createdAt: integer("created_at", { mode: "timestamp" })
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.$defaultFn(() => new Date())
		.notNull(),
	banned: integer("banned", { mode: "boolean" }).default(false),
	banReason: text("ban_reason"),
	banExpires: integer("ban_expires", { mode: "timestamp" }),
});

export const session = sqliteTable("session", {
	id: text("id").primaryKey(),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
	token: text("token").notNull().unique(),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	activeOrganizationId: text("active_organization_id"),
	impersonatedBy: text("impersonated_by"),
});

export const account = sqliteTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: integer("access_token_expires_at", {
		mode: "timestamp",
	}),
	refreshTokenExpiresAt: integer("refresh_token_expires_at", {
		mode: "timestamp",
	}),
	scope: text("scope"),
	password: text("password"),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
		() => /* @__PURE__ */ new Date(),
	),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
		() => /* @__PURE__ */ new Date(),
	),
});

export const organization = sqliteTable("organization", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	slug: text("slug").unique(),
	logo: text("logo"),
	industry: text("industry"), // 'tech', 'finance', 'healthcare', etc.
	size: text("size"), // 'startup', 'small', 'medium', 'enterprise'
	plan: text("plan").default("basic").notNull(), // 'basic', 'pro', 'enterprise'
	settings: text("settings"), // JSON: agent limits, features, etc.
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	metadata: text("metadata"), // JSON: billing, contacts, etc.
});

export const member = sqliteTable("member", {
	id: text("id").primaryKey(),
	organizationId: text("organization_id")
		.notNull()
		.references(() => organization.id, { onDelete: "cascade" }),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	role: text("role").default("member").notNull(), // 'owner', 'admin', 'manager', 'member'
	department: text("department"), // 'engineering', 'sales', 'marketing', etc.
	position: text("position"), // 'developer', 'pm', 'designer', etc.
	permissions: text("permissions"), // JSON: specific agent permissions
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const invitation = sqliteTable("invitation", {
	id: text("id").primaryKey(),
	organizationId: text("organization_id")
		.notNull()
		.references(() => organization.id, { onDelete: "cascade" }),
	email: text("email").notNull(),
	role: text("role"),
	status: text("status").default("pending").notNull(),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
	inviterId: text("inviter_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

// ========== ORGANIZATIONAL AGENT SYSTEM ==========

// Plantillas de agentes para la organización
export const agentTemplate = sqliteTable("agent_template", {
	id: text("id").primaryKey(),
	organizationId: text("organization_id")
		.notNull()
		.references(() => organization.id, { onDelete: "cascade" }),
	name: text("name").notNull(), // "Sales Assistant", "Engineering Analyst", etc.
	description: text("description"),
	category: text("category").notNull(), // 'productivity', 'analysis', 'communication', 'crm'
	personality: text("personality").notNull(), // JSON: traits específicos por rol
	capabilities: text("capabilities").notNull(), // JSON: ['meeting_analysis', 'crm_integration', 'task_extraction']
	systemPrompt: text("system_prompt").notNull(),
	voiceConfig: text("voice_config"), // JSON: configuración de voz
	mcpTools: text("mcp_tools"), // JSON: herramientas MCP disponibles
	refinementRules: text("refinement_rules"), // JSON: reglas para refinar conversaciones
	isActive: integer("is_active", { mode: "boolean" }).default(true).notNull(),
	createdBy: text("created_by")
		.notNull()
		.references(() => user.id),
	createdAt: integer("created_at", { mode: "timestamp" })
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.$defaultFn(() => new Date())
		.notNull(),
});

// Instancias de agentes asignados a usuarios
export const organizationalAgent = sqliteTable("organizational_agent", {
	id: text("id").primaryKey(),
	templateId: text("template_id")
		.notNull()
		.references(() => agentTemplate.id, { onDelete: "cascade" }),
	assignedUserId: text("assigned_user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	organizationId: text("organization_id")
		.notNull()
		.references(() => organization.id, { onDelete: "cascade" }),
	name: text("name").notNull(), // Nombre personalizado por usuario
	customPersonality: text("custom_personality"), // JSON: personalización adicional
	customPrompt: text("custom_prompt"), // Prompt personalizado adicional
	memoryConfig: text("memory_config").notNull(), // JSON: configuración de memoria LibSQL
	contextWindow: integer("context_window").default(50).notNull(), // Ventana de contexto
	isActive: integer("is_active", { mode: "boolean" }).default(true).notNull(),
	lastUsed: integer("last_used", { mode: "timestamp" }),
	createdAt: integer("created_at", { mode: "timestamp" })
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.$defaultFn(() => new Date())
		.notNull(),
});

// ========== MEETING & CONVERSATION MANAGEMENT ==========

// Sesiones de escucha (dailies, meetings, etc.)
export const listeningSession = sqliteTable("listening_session", {
	id: text("id").primaryKey(),
	organizationId: text("organization_id")
		.notNull()
		.references(() => organization.id, { onDelete: "cascade" }),
	sessionType: text("session_type").notNull(), // 'daily', 'meeting', 'brainstorm', 'review'
	title: text("title"),
	description: text("description"),
	sourceType: text("source_type").notNull(), // 'browser_tab', 'microphone', 'upload', 'zoom', 'teams'
	sourceMetadata: text("source_metadata"), // JSON: URL, meeting ID, etc.
	status: text("status").default("active").notNull(), // 'active', 'completed', 'paused', 'error'
	duration: integer("duration"), // Duración en segundos
	participantCount: integer("participant_count"),
	audioQuality: real("audio_quality"), // 0.0 - 1.0
	startedBy: text("started_by")
		.notNull()
		.references(() => user.id),
	startedAt: integer("started_at", { mode: "timestamp" })
		.$defaultFn(() => new Date())
		.notNull(),
	endedAt: integer("ended_at", { mode: "timestamp" }),
});

// Agentes que participan en sesiones de escucha
export const sessionAgent = sqliteTable("session_agent", {
	id: text("id").primaryKey(),
	sessionId: text("session_id")
		.notNull()
		.references(() => listeningSession.id, { onDelete: "cascade" }),
	agentId: text("agent_id")
		.notNull()
		.references(() => organizationalAgent.id, { onDelete: "cascade" }),
	role: text("role").default("observer").notNull(), // 'observer', 'analyzer', 'facilitator'
	joinedAt: integer("joined_at", { mode: "timestamp" })
		.$defaultFn(() => new Date())
		.notNull(),
	leftAt: integer("left_at", { mode: "timestamp" }),
	processedSegments: integer("processed_segments").default(0),
	generatedInsights: integer("generated_insights").default(0),
});

// ========== CONVERSATION REFINEMENT ==========

// Segmentos de audio/conversación procesados
export const conversationSegment = sqliteTable("conversation_segment", {
	id: text("id").primaryKey(),
	sessionId: text("session_id")
		.notNull()
		.references(() => listeningSession.id, { onDelete: "cascade" }),
	speakerId: text("speaker_id"), // ID del hablante detectado (si se puede identificar)
	speakerName: text("speaker_name"), // Nombre detectado/inferido
	rawTranscript: text("raw_transcript").notNull(),
	refinedTranscript: text("refined_transcript"), // Versión refinada por agentes
	confidence: real("confidence"), // Confianza de la transcripción (0.0 - 1.0)
	sentiment: text("sentiment"), // 'positive', 'negative', 'neutral'
	topics: text("topics"), // JSON: ['pricing', 'roadmap', 'team_structure']
	entities: text("entities"), // JSON: personas, empresas, fechas mencionadas
	actionItems: text("action_items"), // JSON: tareas identificadas
	decisions: text("decisions"), // JSON: decisiones tomadas
	questions: text("questions"), // JSON: preguntas abiertas
	timestamp: integer("timestamp", { mode: "timestamp" }).notNull(),
	duration: real("duration"), // Duración del segmento en segundos
	processedBy: text("processed_by").references(() => organizationalAgent.id),
	createdAt: integer("created_at", { mode: "timestamp" })
		.$defaultFn(() => new Date())
		.notNull(),
});

// Insights generados por agentes
export const agentInsight = sqliteTable("agent_insight", {
	id: text("id").primaryKey(),
	sessionId: text("session_id")
		.notNull()
		.references(() => listeningSession.id, { onDelete: "cascade" }),
	agentId: text("agent_id")
		.notNull()
		.references(() => organizationalAgent.id, { onDelete: "cascade" }),
	insightType: text("insight_type").notNull(), // 'summary', 'action_item', 'risk', 'opportunity', 'pattern'
	title: text("title").notNull(),
	content: text("content").notNull(),
	priority: text("priority").default("medium").notNull(), // 'low', 'medium', 'high', 'critical'
	confidence: real("confidence"), // Confianza del agente en el insight
	relatedSegments: text("related_segments"), // JSON: IDs de segmentos relacionados
	tags: text("tags"), // JSON: etiquetas para categorización
	status: text("status").default("pending").notNull(), // 'pending', 'reviewed', 'approved', 'rejected'
	reviewedBy: text("reviewed_by").references(() => user.id),
	reviewedAt: integer("reviewed_at", { mode: "timestamp" }),
	createdAt: integer("created_at", { mode: "timestamp" })
		.$defaultFn(() => new Date())
		.notNull(),
});

// ========== CRM & EXTERNAL INTEGRATIONS ==========

// Configuración de integraciones MCP
export const mcpIntegration = sqliteTable("mcp_integration", {
	id: text("id").primaryKey(),
	organizationId: text("organization_id")
		.notNull()
		.references(() => organization.id, { onDelete: "cascade" }),
	name: text("name").notNull(), // 'Salesforce', 'HubSpot', 'Notion', 'Linear'
	type: text("type").notNull(), // 'crm', 'project_management', 'documentation', 'analytics'
	mcpServerUrl: text("mcp_server_url").notNull(),
	configuration: text("configuration").notNull(), // JSON: credenciales, configuración
	capabilities: text("capabilities").notNull(), // JSON: qué puede hacer esta integración
	isActive: integer("is_active", { mode: "boolean" }).default(true).notNull(),
	lastSyncAt: integer("last_sync_at", { mode: "timestamp" }),
	createdBy: text("created_by")
		.notNull()
		.references(() => user.id),
	createdAt: integer("created_at", { mode: "timestamp" })
		.$defaultFn(() => new Date())
		.notNull(),
});

// Datos sincronizados con sistemas externos
export const externalSync = sqliteTable("external_sync", {
	id: text("id").primaryKey(),
	integrationId: text("integration_id")
		.notNull()
		.references(() => mcpIntegration.id, { onDelete: "cascade" }),
	sessionId: text("session_id").references(() => listeningSession.id, {
		onDelete: "cascade",
	}),
	insightId: text("insight_id").references(() => agentInsight.id, {
		onDelete: "cascade",
	}),
	externalId: text("external_id").notNull(), // ID en el sistema externo
	externalType: text("external_type").notNull(), // 'lead', 'task', 'note', 'deal'
	syncData: text("sync_data").notNull(), // JSON: datos sincronizados
	syncStatus: text("sync_status").default("pending").notNull(), // 'pending', 'success', 'failed'
	errorMessage: text("error_message"),
	syncedAt: integer("synced_at", { mode: "timestamp" }),
	createdAt: integer("created_at", { mode: "timestamp" })
		.$defaultFn(() => new Date())
		.notNull(),
});

// ========== VOLTAGENT MEMORY TABLES ==========
// Estas tablas son creadas automáticamente por VoltAgent pero las incluyo para referencia

export const voltAgentMemory = sqliteTable("voltagent_memory_messages", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull(),
	conversationId: text("conversation_id").notNull(),
	role: text("role").notNull(), // 'user', 'assistant', 'system'
	content: text("content").notNull(),
	metadata: text("metadata"), // JSON
	timestamp: integer("timestamp", { mode: "timestamp" }).notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const voltAgentConversations = sqliteTable(
	"voltagent_memory_conversations",
	{
		id: text("id").primaryKey(),
		userId: text("user_id").notNull(),
		agentId: text("agent_id"), // Link to our organizationalAgent
		title: text("title"),
		metadata: text("metadata"), // JSON
		createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
		updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
	},
);

// ========== INDEXES FOR PERFORMANCE ==========
export const sessionAgentIndex = index("idx_session_agent_session").on(
	sessionAgent.sessionId,
);
export const conversationSegmentSessionIndex = index(
	"idx_conversation_segment_session",
).on(conversationSegment.sessionId);
export const agentInsightSessionIndex = index("idx_agent_insight_session").on(
	agentInsight.sessionId,
);
export const organizationalAgentUserIndex = index(
	"idx_organizational_agent_user",
).on(organizationalAgent.assignedUserId);
export const listeningSessionOrgIndex = index("idx_listening_session_org").on(
	listeningSession.organizationId,
);
