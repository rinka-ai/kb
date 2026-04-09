import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import { setTimeout as delay } from "node:timers/promises";
import { ROOT } from "../../src/core/paths";

export interface BunCommandResult {
  code: number;
  stdout: string;
  stderr: string;
}

export interface StartedBunCommand {
  child: ReturnType<typeof spawn>;
  getStdout: () => string;
  getStderr: () => string;
  stop: () => Promise<void>;
}

function spawnBun(
  args: string[],
  env: NodeJS.ProcessEnv = {},
): {
  child: ReturnType<typeof spawn>;
  stdout: () => string;
  stderr: () => string;
} {
  const child = spawn(process.execPath, args, {
    cwd: ROOT,
    env: { ...process.env, ...env, NO_COLOR: "1" },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let stdout = "";
  let stderr = "";

  child.stdout.on("data", (chunk) => {
    stdout += chunk.toString();
  });
  child.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
  });

  return {
    child,
    stdout: () => stdout,
    stderr: () => stderr,
  };
}

export async function runBunCommand(
  args: string[],
  env: NodeJS.ProcessEnv = {},
): Promise<BunCommandResult> {
  const { child, stdout, stderr } = spawnBun(args, env);
  const [code] = (await once(child, "exit")) as [number | null, NodeJS.Signals | null];
  return {
    code: code ?? 0,
    stdout: stdout(),
    stderr: stderr(),
  };
}

export function startBunCommand(args: string[], env: NodeJS.ProcessEnv = {}): StartedBunCommand {
  const { child, stdout, stderr } = spawnBun(args, env);

  return {
    child,
    getStdout: stdout,
    getStderr: stderr,
    stop: async () => {
      if (child.exitCode !== null || child.signalCode !== null) {
        return;
      }

      child.kill("SIGTERM");
      const exit = once(child, "exit");
      const timedOut = delay(5_000).then(() => "timeout");
      const result = await Promise.race([exit, timedOut]);

      if (result === "timeout" && child.exitCode === null && child.signalCode === null) {
        child.kill("SIGKILL");
        await once(child, "exit");
      }
    },
  };
}

export async function findFreePort(): Promise<number> {
  const server = createServer();
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => resolve());
  });

  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;

  await new Promise<void>((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });

  if (!port) {
    throw new Error("Failed to allocate a free TCP port for integration tests.");
  }

  return port;
}

export async function waitForHttp(url: string, timeoutMs = 10_000): Promise<Response> {
  const deadline = Date.now() + timeoutMs;
  let lastError: unknown;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response;
      }
      lastError = new Error(`Unexpected status ${response.status} from ${url}`);
    } catch (error) {
      lastError = error;
    }

    await delay(100);
  }

  throw new Error(`Timed out waiting for ${url}: ${String(lastError)}`);
}
