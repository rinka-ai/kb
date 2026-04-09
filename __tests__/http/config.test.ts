import { describe, expect, test } from "bun:test";
import { readKbHttpConfig } from "../../src/http/config";

describe("readKbHttpConfig", () => {
  test("uses safe defaults", () => {
    expect(readKbHttpConfig({})).toEqual({
      host: "127.0.0.1",
      port: 3000,
      allowedHosts: undefined,
      allowedOrigins: undefined,
      statefulSessions: false,
      enableWrites: false,
      maxBodyBytes: 1_048_576,
      rateLimitWindowMs: 60_000,
      rateLimitMaxRequests: 120,
    });
  });

  test("parses booleans, ports, and safety controls from env", () => {
    expect(
      readKbHttpConfig({
        HOST: "0.0.0.0",
        PORT: "4001",
        KB_ALLOWED_HOSTS: "kb.example.com, localhost",
        KB_ALLOWED_ORIGINS: "https://codex.example.com, https://claude.example.com",
        KB_STATEFUL_SESSIONS: "false",
        KB_ENABLE_WRITES: "true",
        KB_MAX_BODY_BYTES: "4096",
        KB_RATE_LIMIT_WINDOW_MS: "30000",
        KB_RATE_LIMIT_MAX_REQUESTS: "45",
      }),
    ).toEqual({
      host: "0.0.0.0",
      port: 4001,
      allowedHosts: ["kb.example.com", "localhost"],
      allowedOrigins: ["https://codex.example.com", "https://claude.example.com"],
      statefulSessions: false,
      enableWrites: true,
      maxBodyBytes: 4096,
      rateLimitWindowMs: 30000,
      rateLimitMaxRequests: 45,
    });
  });
});
