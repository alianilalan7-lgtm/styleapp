const SOURCES = [
  "registry-directory",
  "magic-ui",
  "heroui",
  "hyperui",
  "flowbite",
  "react-aria",
  "radix",
  "headless-ui",
];

function createAdapter(source, url) {
  return {
    source,
    url,
    async fetchEntries() {
      return [];
    },
  };
}

module.exports = {
  SOURCES,
  createAdapter,
};
