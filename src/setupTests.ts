import "@testing-library/jest-dom";
import { server } from "./mocks/server";

/**
 * This file configures MSW for the entire test environment.
 * It runs once before all tests.
 */

// Start MSW before all tests
beforeAll(() => server.listen());

// Reset handlers after each test (important when tests override handlers)
afterEach(() => server.resetHandlers());

// Stop MSW after all tests
afterAll(() => server.close());
