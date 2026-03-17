import { setupServer } from "msw/node";
import { handlers } from "./handlers";

/**
 * This file creates the MSW server instance for the Node.js environment.
 * Vitest runs in Node, so MSW must use the "node" adapter instead of the browser worker.
 *
 * The server loads all handlers and will intercept every fetch() call during tests.
 */
export const server = setupServer(...handlers);

// This server is imported in setupTests.ts to start/stop MSW automatically.
