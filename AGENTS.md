# JHipster Playwright Tests

This repository contains Playwright-based end-to-end tests for a JHipster application.

## Testing & Execution
- **Run all tests:** `npx playwright test`
- **Run specific project:** `npx playwright test --project=admin`
- **Run in headed mode:** `npx playwright test --headed`
- **View report:** `npx playwright show-report`

## Key Configuration
- **Base URL:** Defaults to `http://localhost:8080`. Override via `BASE_URL` env var.
- **Projects:** The `playwright.config.ts` defines several projects with dependencies:
    - `setup-admin`: Handles authentication setup.
    - `admin`: Depends on `setup-admin` and requires `.auth/admin.json` storage state.
- **Environment:** No automatic `webServer` is currently configured. Ensure the JHipster app is running at `BASE_URL` before testing.

## Directory Structure
- `tests/`: Contains test specification files (`*.spec.ts`) and setup files (`*.setup.ts`).
- `fixtures/`: Reusable test fixtures.
- `pages/`: Page Object Model (POM) files.
- `helpers/`: Utility functions.
- `.auth/`: Stores authentication state (e.g., `admin.json`). Created by setup tests.
