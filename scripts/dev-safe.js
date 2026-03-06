#!/usr/bin/env node

const { spawn, spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const PORT = String(process.env.PORT || "3000");
const HOST = String(process.env.HOST || "localhost");

function runSync(command, args) {
  return spawnSync(command, args, {
    encoding: "utf8",
  });
}

function listPortPids(port) {
  const result = runSync("lsof", [`-tiTCP:${port}`, "-sTCP:LISTEN"]);
  if (result.status !== 0 || !result.stdout) return [];

  return result.stdout
    .split("\n")
    .map((value) => value.trim())
    .filter(Boolean);
}

function processCommand(pid) {
  const result = runSync("ps", ["-p", pid, "-o", "command="]);
  return (result.stdout || "").trim();
}

function processParent(pid) {
  const result = runSync("ps", ["-p", pid, "-o", "ppid="]);
  return (result.stdout || "").trim();
}

function stopPid(pid) {
  runSync("kill", [pid]);
}

function stopExistingNextOnPort(port) {
  const pids = listPortPids(port);
  if (pids.length === 0) return;

  for (const pid of pids) {
    const cmd = processCommand(pid);
    if (!cmd.includes("next")) continue;

    stopPid(pid);

    const parent = processParent(pid);
    if (parent && parent !== "1") {
      stopPid(parent);
    }
  }
}

function clearNextBuildOutput() {
  const nextDir = path.join(process.cwd(), ".next");
  try {
    fs.rmSync(nextDir, { recursive: true, force: true });
  } catch {
    // Ignore cleanup failures; dev server can still attempt startup.
  }
}

function run() {
  clearNextBuildOutput();
  stopExistingNextOnPort(PORT);

  const nextSafeScript = path.join(__dirname, "next-safe.js");
  const child = spawn(
    process.execPath,
    [nextSafeScript, "dev", "--webpack", "--hostname", HOST, "--port", PORT],
    {
      stdio: "inherit",
      env: process.env,
    },
  );

  child.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }
    process.exit(code ?? 1);
  });
}

run();
