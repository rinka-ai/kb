import { describe, expect, test } from "bun:test";
import { readKbHttpConfig } from "../../src/http/config";

describe("readKbHttpConfig", () => {
  test("uses safe defaults", () => {
    expect(readKbHttpConfig({})).toEqual({
      host: "127.0.0.1",
      port: 3000,
      allowedHosts: undefined,
      statefulSessions: false,
      enableWrites: false,
    });
  });

  test("parses booleans, ports, and allowed hosts from env", () => {
    expect(
      readKbHttpConfig({
        HOST: "0.0.0.0",
        PORT: "4001",
        KB_ALLOWED_HOSTS: "kb.example.com, localhost",
        KB_STATEFUL_SESSIONS: "false",
        KB_ENABLE_WRITES: "true",
      }),
    ).toEqual({
      host: "0.0.0.0",
      port: 4001,
      allowedHosts: ["kb.example.com", "localhost"],
      statefulSessions: false,
      enableWrites: true,
    });
  });
});
