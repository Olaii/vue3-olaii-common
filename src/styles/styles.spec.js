import fs from "node:fs";
import { describe, expect, it } from "vitest";
import * as sass from "sass";

// Compiles a style file the way the apps import it
function compile(file) {
  return sass.compile(`src/styles/${file}`).css;
}

// Classes the apps (pass, vouchers, guestlist) use in their templates, measured when Bootstrap was removed.
// They must keep working when an app replaces its _bootstrap.scss with styles/index.scss.
const USED_BY_APPS = [
  // spacing
  "m-0",
  "mt-0",
  "mt-2",
  "mt-3",
  "mt-4",
  "mb-1",
  "mb-2",
  "mb-3",
  "mb-4",
  "mr-2",
  "ml-1",
  "mx-1",
  "p-0",
  "p-5",
  "pr-0",
  "pr-1",
  "pb-3",
  "gap-1",
  "gap-2",
  "gap-3",
  "no-margin",
  // text
  "text-left",
  "text-right",
  "text-center",
  "text-bold",
  "text-small",
  "text-muted",
  "no-wrap",
  "lh-1",
  "strikethrough",
  "danger",
  "success",
  "red",
  // display, flex, width
  "d-flex",
  "d-block",
  "d-xs-none",
  "f-center",
  "grow",
  "flex-grow",
  "w-0",
  "w-full",
  // grid
  "container",
  "row",
  "col-md-6",
  "col-lg-4",
  // components
  "clickable",
  "box",
  "view-wrapper",
];

describe("styles", () => {
  const css = compile("index.scss");

  it("include every helper class the apps use", () => {
    const missing = USED_BY_APPS.filter((name) => !new RegExp(`\\.${name}\\b`).test(css));
    expect(missing).toEqual([]);
  });

  it("use the Bootstrap 4 spacing scale", () => {
    expect(css).toMatch(/\.mt-3 \{\s*margin-top: 1rem !important;/);
    expect(css).toMatch(
      /\.px-2 \{\s*padding-left: 0.5rem !important;\s*padding-right: 0.5rem !important;/
    );
    expect(css).toMatch(/\.m-5 \{\s*margin: 3rem !important;/);
  });

  it("contain no Bootstrap code", () => {
    const sources = fs.readdirSync("src/styles").filter((file) => file.endsWith(".scss"));
    const withBootstrap = sources.filter((file) =>
      /bootstrap/i.test(fs.readFileSync(`src/styles/${file}`, "utf8").replace(/\/\/.*$/gm, ""))
    );
    expect(withBootstrap).toEqual([]);
  });

  it("compile every file on its own", () => {
    for (const file of [
      "variables.scss",
      "base.scss",
      "grid.scss",
      "common.scss",
      "utilities.scss",
    ]) {
      expect(() => compile(file)).not.toThrow();
    }
  });
});
