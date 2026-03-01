import { spawn } from "child_process";
import path from "path";

const COOLDOWN_MS = 5 * 1000;
let lastRingTime = 0;

const BELL_SCRIPT_PATH =
  process.env.BELL_SCRIPT_PATH ||
  path.join(process.cwd(), "scripts", "ring-bell.sh");
const BELL_EXEC_TIMEOUT_MS = Number(process.env.BELL_EXEC_TIMEOUT_MS || 90000);

function triggerLocalBell() {
  return new Promise((resolve, reject) => {
    const child = spawn("bash", [BELL_SCRIPT_PATH], {
      env: process.env,
      stdio: "ignore",
    });

    const hasTimeout =
      Number.isFinite(BELL_EXEC_TIMEOUT_MS) && BELL_EXEC_TIMEOUT_MS > 0;
    const timeoutId = hasTimeout
      ? setTimeout(() => {
          child.kill("SIGTERM");
          reject(new Error("Bell command timed out"));
        }, BELL_EXEC_TIMEOUT_MS)
      : null;

    child.on("error", (error) => {
      if (timeoutId) clearTimeout(timeoutId);
      reject(error);
    });

    child.on("exit", (code, signal) => {
      if (timeoutId) clearTimeout(timeoutId);
      if (code === 0) {
        resolve();
        return;
      }
      reject(
        new Error(
          `Bell command failed (code: ${String(code)}, signal: ${String(signal)})`,
        ),
      );
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const now = Date.now();
  const elapsed = now - lastRingTime;

  if (elapsed < COOLDOWN_MS) {
    const retryAfter = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
    return res
      .status(429)
      .json({ error: "Bell was just rung, try again later", retryAfter });
  }

  lastRingTime = now;

  try {
    await triggerLocalBell();
    return res.status(200).json({ success: true, message: "Bell rang!" });
  } catch (err) {
    console.error("Failed to ring bell:", err.message);
    lastRingTime = 0;
    return res
      .status(500)
      .json({ error: "Failed to ring bell on Ubuntu server" });
  }
}
