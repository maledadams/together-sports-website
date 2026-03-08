import fs from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const inputPath = process.argv[2] ?? "content/editable-content.json";
const sourcePath = path.resolve(rootDir, inputPath);
const outputPath = path.resolve(rootDir, "src/data/editableContentSeed.ts");

const isPlainObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value);

const hasContentShape = (value) =>
  isPlainObject(value) &&
  Array.isArray(value.experiences) &&
  Array.isArray(value.partners) &&
  Array.isArray(value.teamSections);

const main = async () => {
  const raw = await fs.readFile(sourcePath, "utf8");
  const parsed = JSON.parse(raw);

  const portableContent = hasContentShape(parsed)
    ? parsed
    : isPlainObject(parsed) && parsed.version === 1 && hasContentShape(parsed.content)
      ? parsed.content
      : null;

  if (!portableContent) {
    throw new Error("Invalid content JSON. Expected an exported editable-content file.");
  }

  const nextFile = `import type { PortableEditableContentState } from "@/lib/editable-content-format";

const editableContentSeed: PortableEditableContentState = ${JSON.stringify(portableContent, null, 2)};

export default editableContentSeed;
`;

  await fs.writeFile(outputPath, nextFile, "utf8");
  console.log(`Applied content from ${inputPath} to src/data/editableContentSeed.ts`);
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
