const adapters = [
  require("./registry-directory"),
  require("./magic-ui"),
  require("./heroui"),
  require("./hyperui"),
  require("./flowbite"),
  require("./react-aria"),
  require("./radix"),
  require("./headless-ui"),
];

async function main() {
  const summary = await Promise.all(
    adapters.map(async (adapter) => ({
      source: adapter.source,
      url: adapter.url,
      entries: (await adapter.fetchEntries()).length,
    })),
  );

  console.log(JSON.stringify({ generatedAt: new Date().toISOString(), summary }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
