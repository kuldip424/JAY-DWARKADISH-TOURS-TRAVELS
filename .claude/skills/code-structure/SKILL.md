---
name: code-structure
description: Mandatory layered folder/code structure for this repo. Use whenever writing or changing any frontend code in client/src (pages, components, hooks, API calls, zustand stores) or any backend code (routes, controllers, services, repositories, models) — new features, new endpoints, new pages, or edits to them.
---

# Code Structure (Layered Architecture)

Every new feature and every change to code goes through fixed layers. Each layer has one job and only talks to the layer directly below it.

```
FRONTEND (client/src)                          BACKEND (repo root)

pages/ , components/   UI layer                routes/        define endpoint + middleware
        │ calls                                        │
hooks/<feature>/       hook layer              controllers/   thin: req → service → res
        │ calls            │ updates                   │
api/<feature>Api.js    zustand/<feature>/      services/      business logic
        │ HTTP                                         │
        └──────────────────► backend ─────────► repositories/  ONLY place that touches models
                                                       │
                                                models/
```

## Scope

- Applies to **new code and new changes** only.
- **Do not refactor existing/old code** to fit this structure unless the user explicitly asks. If you must edit an old file, make your change in the layered style around it (e.g. add a new repository function and call it) without rewriting the rest of the file.
- If an old file mixes layers, don't extend the mess: put new logic in the correct layer and call it from the old file.

## Frontend rules (`client/src`)

| Layer | Location | Allowed | Not allowed |
|---|---|---|---|
| UI | `pages/`, `components/` | JSX, local UI state (open/closed, input values), calling hooks | `axios`, importing from `api/`, toasts for API results, writing to stores directly for server data |
| Hook | `hooks/<feature>/use<Thing>.js` | call `api/` functions, loading/error state, `react-hot-toast`, read/write zustand store, return data + actions | JSX, `axios` directly |
| API | `api/<feature>Api.js` | `axios` calls, URL building, returning `data` | React, hooks, toasts, store access |
| State | `zustand/<feature>/use<Feature>.Zus.js` | state + plain setters | API calls, toasts, business logic |

**Build order:** API function → zustand store (only if state is shared across pages/components) → hook → page/component.

Use a zustand store only when data must be shared between components/pages or survive navigation. Page-local data stays in the hook's `useState`.

Details and templates: [frontend.md](frontend.md)

## Backend rules

| Layer | Location | Allowed | Not allowed |
|---|---|---|---|
| Route | `routes/<feature>.router.js` (mounted in `server.js` or a parent router) | path, HTTP method, middleware (`protectRoute`, `protectAdmin`, ...), controller reference | inline handlers, logic |
| Controller | `controllers/<feature>.controller.js` | read `req` (params/body/query/user), call **one** service function, send response, map errors to status | business logic, validation rules, loops/transformations, models, repositories |
| Service | `services/<feature>/<feature>.service.js` | all business logic: validation, rules, calculations, orchestration, calling repositories/other services/external APIs/queues | `req`/`res`, Mongoose models directly |
| Repository | `repositories/<feature>/<feature>.repository.js` | Mongoose queries (`find`, `create`, `updateOne`, `aggregate`, ...) | business logic, `req`/`res`, calling services |

**Build order:** repository function → service function → controller → route (+ mount).

- **Only repositories import models.** Controllers and services never import from `models/`.
- Controllers call services only (never repositories).
- Services return plain data or throw an error with a `status` (see backend.md); they never touch `res`.
- Response shape: success `{ success: true, ...data }`, failure `{ success: false, error: "message" }` (the frontend reads `error`).

Details and templates: [backend.md](backend.md)

## Before finishing — checklist

- [ ] No `axios` or `api/` import inside `pages/` or `components/`.
- [ ] Every API call lives in `client/src/api/`, used only from hooks.
- [ ] Stores contain no API calls.
- [ ] No route has an inline handler; every controller is thin (no logic beyond req → service → res).
- [ ] No `models/` import outside `repositories/`.
- [ ] Controllers don't import repositories.
- [ ] Files follow the naming in this skill.
- [ ] Old code was not refactored unless the user asked.
