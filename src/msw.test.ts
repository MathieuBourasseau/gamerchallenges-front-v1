import { describe, it, expect } from "vitest";

/**
 * This test ensures that MSW is correctly set up.
 * It verifies that the /login handler returns the mocked response.
 * If this test fails, MSW is not working and all other tests depending on API mocks will fail too.
 */
describe("MSW setup", () => {
  it("should mock /login", async () => {
    const res = await fetch("/login", { method: "POST" });
    const data = await res.json();

    expect(data.token).toBe("fake-token");
  });
});
