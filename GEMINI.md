# Next.js Internal Coding Standard

This document defines the mandatory coding standards and architectural rules for this Next.js project to ensure consistency, scalability, maintainability, and performance.

## 1. Prerequisites & Setup

- **Node.js**: Minimum Required: Node.js ≥ 20.19 or higher. Preferred Version: Node.js 22.x or current LTS.
- **Package Manager**: `npm` or `bun` (Preferred). Lock files must be committed.
- **Environment Consistency**: The Node.js version must be identical across Local, CI, and Production. Maintain `.nvmrc` and `engines` in `package.json`.
- **Environment Setup**: `.env.example` is mandatory. No secrets allowed in `.env` files committed to git.
- **Build Tool**: Turbopack (Recommended).

## 2. Project Structure

Based on standard patterns and the current project structure:

- `app/`: Next.js App Router. Contains routing, pages, and layouts. Each folder represents a route. Focuses only on structure and UI composition, not business logic.
- `src/components/`: Feature-level pure UI components (no API calls, no complex business logic). Ensure single responsibility.
- `src/hooks/`: Global, reusable hooks. Must not be tied to a specific feature unless explicitly scoped.
- `src/types/`: Shared global TypeScript types and interfaces.
- `src/data/`: Data handling, business logic, constants, or mock data. (Corresponds to typical `/services` or `/store` for state management).
- `public/`: Static assets such as images or raw files.

**Important Rules:**

- No API calls inside `src/components`.
- No business logic inside `app/` (pages/layouts).
- Each folder has a single responsibility.

## 3. Coding Conventions

### Naming Rules

- **Components**: `PascalCase` (e.g., `AddUserModal`)
- **Hooks**: `useCamelCase` (e.g., `useAuth`)
- **Variables & Functions**: `camelCase` (e.g., `fetchData`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`)
- **Files/Folders**: Use `kebab-case` for file names. Files must match exported entity names.

### Formatting (ESLint + Prettier)

- ESLint + Prettier are mandatory.
- Use `husky` or pre-commit hooks. No manual formatting overrides. Lint must pass in CI.

### TypeScript Rules

- `strict: true` is mandatory.
- `any` is NOT allowed. Use `unknown` instead of `any`.
- Explicit return types for public functions.
- `interface` for objects, `type` for unions.

## 4. Layout & Routing Management

Next.js App Router rules:

- **Layouts (`layout.tsx`)**: Define structural UI. Must not contain business logic or API calls. Render content via `children` prop. Avoid deep nesting (max 2-3 levels).
- **Route Groups**: Use `(groupName)` for logical organization without affecting the URL.
- **Nested Routes**: Deep nesting should be avoided (max 3 levels). Each module handles loading and errors automatically.
- **Middleware**: Keep lightweight. No heavy operations or complex logic. Handles routing, access control, auth, and request validation.

### Route Constraints

- **Public Routes**: No auth required. Prioritize SEO and performance. Focus on logical grouping.
- **Private Routes**: Protect and require authentication via centralized access control.
- **Dynamic/Query Routes**: Parameters and queries MUST always be validated on the server or in hooks before use.

## 5. State Management

| Use Case             | Solution                          |
| :------------------- | :-------------------------------- |
| Component-only state | `useState`                        |
| Shared UI state      | `Context`                         |
| App-wide state       | `Zustand` (Recommended) / `Redux` |
| Server state         | `React Query` / `TanStack Query`  |

- UI components must consume state via exported hooks only.
- App-wide state must be in a dedicated folder (e.g., `src/store` or `src/data`).

## 6. Custom Hooks Guidelines

- Must start with `use`. File name must match `kebab-case` (e.g., `use-debounce.ts`). One hook per file.
- **No UI Logic**: Contain zero UI logic. No JSX, HTML elements, styling, or direct DOM manipulation.
- Allowed inside hooks: State management, `useEffect`, API calls, data transformation.
- Hooks with business logic must have tests focusing on behavior, not internals.

## 7. Business Logic & UI Separation

- **Container Layer / Data Layer**: Coordinates screens. Connects business logic to UI, handles lifecycle, and prepares data.
- **UI Layer**: Pure presentational elements. Receives data and callbacks via props only. Does not access APIs or stores directly. Pages in `app/` should mostly render Containers.

## 8. Error & Toast Handling

- Errors must be centralized and predictable. Use Error Boundaries (`error.tsx`), ensuring they do not contain complex business logic.
- Log actionably. `console.log` and `console.error` are forbidden in production.
- **Toasts**: Used only for user-visible, short-lived feedback (API success, failure, form submission). Toast logic must be centralized. UI components must avoid hardcoding toast messages. Do not spam toasts.
