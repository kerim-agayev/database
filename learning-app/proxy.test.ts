// @vitest-environment node
import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { config, proxy } from "./proxy";

function run(path: string) {
  return proxy(new NextRequest(`http://localhost:3000${path}`));
}

describe("proxy: real 404s for invalid tutorial days", () => {
  it("only runs on /tutorial/:day", () => {
    expect(config.matcher).toBe("/tutorial/:day");
  });

  it.each(["/tutorial/1", "/tutorial/9", "/tutorial/45", "/tutorial/90", "/tutorial/%39"])(
    "lets %s through",
    (path) => {
      const res = run(path);
      expect(res.headers.get("x-middleware-next")).toBe("1");
      expect(res.headers.get("x-middleware-rewrite")).toBeNull();
    },
  );

  it.each([
    "/tutorial/0",
    "/tutorial/91",
    "/tutorial/07",
    "/tutorial/abc",
    "/tutorial/1.5",
    "/tutorial/%ZZ",
  ])("rewrites %s to a path that does not exist (so Next answers 404)", (path) => {
    const res = run(path);
    expect(res.headers.get("x-middleware-rewrite")).toContain("/_invalid-day");
    expect(res.headers.get("x-middleware-next")).toBeNull();
  });
});
