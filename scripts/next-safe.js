#!/usr/bin/env node

const { spawn, spawnSync } = require("node:child_process");

function supportsNoExperimentalWebStorageFlag() {
  const result = spawnSync(process.execPath, ["--help"], {
    encoding: "utf8",
  });

  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
  return output.includes("--no-experimental-webstorage");
}

function run() {
  const nextArgs = process.argv.slice(2);
  const nextBin = require.resolve("next/dist/bin/next");

  const nodeArgs = [];
  if (supportsNoExperimentalWebStorageFlag()) {
    nodeArgs.push("--no-experimental-webstorage");
  }
  nodeArgs.push(nextBin, ...nextArgs);

  const env = { ...process.env };
  delete env.NODE_OPTIONS;

  const child = spawn(process.execPath, nodeArgs, {
    stdio: "inherit",
    env,
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }
    process.exit(code ?? 1);
  });
}

run();
