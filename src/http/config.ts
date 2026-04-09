import * as z from "zod/v4";

const TRUTHY = new Set(["1", "true", "yes", "on"]);

const booleanString = (fallback: string) =>
  z
    .string()
    .default(fallback)
    .transform((v) => TRUTHY.has(v.trim().toLowerCase()));

const KbHttpConfigSchema = z.object({
  host: z.string().default("127.0.0.1"),
  port: z.coerce.number().int().positive().default(3000),
  allowedHosts: z
    .string()
    .transform((v) =>
      v
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    )
    .optional(),
  statefulSessions: booleanString("false"),
  enableWrites: booleanString("false"),
});

export type KbHttpConfig = z.infer<typeof KbHttpConfigSchema>;

export function readKbHttpConfig(env: NodeJS.ProcessEnv = process.env): KbHttpConfig {
  return KbHttpConfigSchema.parse({
    host: env.HOST,
    port: env.PORT,
    allowedHosts: env.KB_ALLOWED_HOSTS,
    statefulSessions: env.KB_STATEFUL_SESSIONS,
    enableWrites: env.KB_ENABLE_WRITES,
  });
}
