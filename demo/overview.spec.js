import fs from "node:fs";
import { describe, expect, it } from "vitest";
import * as library from "@/index";
import { groups } from "./overview";

const items = groups.flatMap((group) => group.items);

describe("demo overview", () => {
  it("describes every export of the library", () => {
    const described = new Set(items.map((item) => item.name));
    const missing = Object.keys(library).filter((name) => !described.has(name));
    expect(missing).toEqual([]);
  });

  it("only lists exports that exist, or separate imports", () => {
    const unknown = items
      .filter((item) => !item.importFrom && !(item.name in library))
      .map((item) => item.name);
    expect(unknown).toEqual([]);
  });

  it("points to files that exist", () => {
    const missingFiles = items
      .filter((item) => !item.file.startsWith("dist/") && !fs.existsSync(item.file))
      .map((item) => item.file);
    expect(missingFiles).toEqual([]);
  });
});
