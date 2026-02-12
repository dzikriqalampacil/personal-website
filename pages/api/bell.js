import http from "http";

const COOLDOWN_MS = 30 * 1000;
let lastRingTime = 0;

const BELL_HOST = process.env.BELL_HOST || "192.168.18.1";
const BELL_PORT = process.env.BELL_PORT || "9999";

function triggerWindowsBell() {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: BELL_HOST,
        port: BELL_PORT,
        path: "/ring",
        method: "POST",
        timeout: 5000,
      },
      (res) => {
        res.resume();
        resolve();
      },
    );
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request to bell listener timed out"));
    });
    req.end();
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
    await triggerWindowsBell();
    return res.status(200).json({ success: true, message: "Bell rang!" });
  } catch (err) {
    console.error("Failed to ring bell:", err.message);
    lastRingTime = 0;
    return res
      .status(500)
      .json({ error: "Failed to ring bell on host machine" });
  }
}
