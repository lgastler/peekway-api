import { expect, test } from "vitest";
import app from "./index";

test("GET /", async () => {
  const res = await app.request("/");
  const resTest = await res.text();
  expect(resTest).toBe("peekway API");
});

test("GET /api", async () => {
  const res = await app.request("/api");
  // res should have rediercted to "/"
  expect(res.status).toBe(302);
  expect(res.headers.get("location")).toBe("/");
});

test("GET /api/dwd", async () => {
  const res = await app.request("/api/dwd");
  // res should have rediercted to "/"
  expect(res.status).toBe(302);
  expect(res.headers.get("location")).toBe("/");
});

test("GET /api/dwd/10865/aggregate-set", async () => {
  const res = await app.request("/api/dwd/10865/aggregate-set");
  const json = await res.json();

  const expected = {
    id: "10865",
  };
  expect(json).toMatchObject(expected);
});
