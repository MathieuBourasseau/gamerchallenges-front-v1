import { http, HttpResponse } from "msw";

export const handlers = [
  // Mock for POST /login

  http.post("/login", async () => {
    return HttpResponse.json(
      { token: "fake-token", user: { id: 1, username: "Vincent" } },
      { status: 200 },
    );
  }),
  // Mock for PATCH /me/change-password
  // to handle every URL that ends with /me/change-password, we use a wildcard * before it.
  http.patch("*/me/change-password", async () => {
    return HttpResponse.json({ ok: true }, { status: 200 });
  }),
];

// it's a kind of backend in the frontend, it intercepts the requests and returns the mocked responses defined in handlers.
