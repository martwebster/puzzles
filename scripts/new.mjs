// Scaffold a puzzle day, creating (and installing) the year's project first if it doesn't exist.
//   pnpm new aoc 2018 4   -> advent-of-code/2018/src/day4
//   pnpm new ec 2025 3    -> everybody-codes/2025/src/day3
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const kinds = {
  aoc: { folder: "advent-of-code", prefix: "aoc", title: "Advent of Code" },
  ec: { folder: "everybody-codes", prefix: "ec", title: "Everybody Codes" },
};

const [kindArg, year, day] = process.argv.slice(2);
const kind = kinds[kindArg];
if (!kind || !/^\d{4}$/.test(year ?? "") || !/^\d+$/.test(day ?? "")) {
  console.error("Usage: pnpm new <aoc|ec> <year> <day>");
  process.exit(1);
}

const projectDir = join(root, kind.folder, year);
let createdProject = false;
if (!existsSync(projectDir)) {
  mkdirSync(join(projectDir, "src"), { recursive: true });
  const pkg = {
    name: `${kind.prefix}-${year}`,
    version: "1.0.0",
    private: true,
    description: `${kind.title} ${year} in TypeScript`,
    scripts: {
      test: "tsc && vitest",
      "test:run": "tsc && vitest run",
      typecheck: "tsc",
    },
    dependencies: { "@puzzles/utils": "workspace:*" },
  };
  writeFileSync(join(projectDir, "package.json"), `${JSON.stringify(pkg, null, 2)}\n`);
  writeFileSync(
    join(projectDir, "tsconfig.json"),
    `${JSON.stringify({ extends: "../../tsconfig.base.json", include: ["src/**/*"] }, null, 2)}\n`,
  );
  writeFileSync(
    join(projectDir, "vitest.config.js"),
    readFileSync(join(root, "packages", "utils", "vitest.config.js")),
  );
  createdProject = true;
}

const dayDir = join(projectDir, "src", `day${day}`);
if (existsSync(dayDir)) {
  console.error(`${dayDir} already exists`);
  process.exit(1);
}
mkdirSync(dayDir);
const templateDir = join(root, "templates", kind.folder);
for (const file of readdirSync(templateDir)) {
  const content = readFileSync(join(templateDir, file), "utf8")
    .replaceAll("dayx", `day${day}`)
    .replace('const dayNumber = "x"', `const dayNumber = "${day}"`);
  writeFileSync(join(dayDir, file.replace("dayx", `day${day}`)), content);
}

console.log(`Created ${dayDir}`);
if (createdProject) {
  // A new workspace project can't resolve @puzzles/utils until pnpm links it.
  console.log(`New project ${kind.prefix}-${year}: running 'pnpm install' to link @puzzles/utils`);
  execFileSync("pnpm", ["install"], { cwd: root, stdio: "inherit" });
}
