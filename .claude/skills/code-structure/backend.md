# Backend layers — details & templates

The backend is ESM (`import`/`export`, `.js` extensions in import paths).

## Folder layout

```
routes/<feature>.router.js                      (or routes/<Area>/<feature>.router.js)
controllers/<feature>.controller.js             (or controllers/<Area>/<feature>.controller.js)
services/<feature>/<feature>.service.js
repositories/<feature>/<feature>.repository.js
models/<feature>.model.js
utils/httpError.js                              shared helper (create once, reuse)
```

Build in this order: **repository → service → controller → route → mount**.

## Shared error helper

If `utils/httpError.js` does not exist yet, create it with:

```js
// utils/httpError.js
// Throw from services so controllers can map the error to an HTTP status.
const httpError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

export default httpError;
```

## 1. Repository — the only layer that touches models

```js
// repositories/orders/orders.repository.js
import Order from "../../models/order.model.js";

export const findOrdersByShop = (shopId, { status, limit = 20, skip = 0 } = {}) =>
  Order.find({ shopId, ...(status && { status }) })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

export const findOrderById = (id) => Order.findById(id).lean();

export const updateOrderStatusById = (id, status) =>
  Order.findByIdAndUpdate(id, { $set: { status } }, { new: true }).lean();
```

Rules: one function per query, named after what it does (`findX`, `createX`, `updateX`, `deleteX`, `countX`). No business decisions, no `req`/`res`.

## 2. Service — all business logic

```js
// services/orders/orders.service.js
import httpError from "../../utils/httpError.js";
import {
  findOrderById,
  findOrdersByShop,
  updateOrderStatusById,
} from "../../repositories/orders/orders.repository.js";

const ALLOWED_STATUSES = ["pending", "shipped", "delivered", "cancelled"];

export const listOrders = async (shopId, { status, page = 1, limit = 20 }) => {
  const safeLimit = Math.min(Number(limit) || 20, 100);
  const skip = (Math.max(Number(page) || 1, 1) - 1) * safeLimit;
  return findOrdersByShop(shopId, { status, limit: safeLimit, skip });
};

export const changeOrderStatus = async (shopId, orderId, status) => {
  if (!ALLOWED_STATUSES.includes(status)) throw httpError(400, "Invalid status");

  const order = await findOrderById(orderId);
  if (!order || String(order.shopId) !== String(shopId))
    throw httpError(404, "Order not found");
  if (order.status === "delivered") throw httpError(400, "Delivered orders cannot change");

  return updateOrderStatusById(orderId, status);
};
```

Rules: services take plain arguments (not `req`), return plain data, and throw `httpError(status, msg)` for expected failures. Services may call repositories, other services, queues, utils, and external APIs.

## 3. Controller — thin

```js
// controllers/orders.controller.js
import { changeOrderStatus, listOrders } from "../services/orders/orders.service.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await listOrders(req.user.shopId, req.query);
    res.json({ success: true, orders });
  } catch (e) {
    res.status(e.status || 500).json({ success: false, error: e.message });
  }
};

export const patchOrderStatus = async (req, res) => {
  try {
    const order = await changeOrderStatus(req.user.shopId, req.params.id, req.body.status);
    res.json({ success: true, order });
  } catch (e) {
    res.status(e.status || 500).json({ success: false, error: e.message });
  }
};
```

A controller does exactly three things: pull inputs from `req`, call one service function, send the response. If you are writing an `if` about business rules, a loop, or a data transformation in a controller, move it to the service.

## 4. Route — wiring only

```js
// routes/orders.router.js
import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { getOrders, patchOrderStatus } from "../controllers/orders.controller.js";

const router = express.Router();

router.get("/", protectRoute, getOrders);
router.patch("/:id/status", protectRoute, patchOrderStatus);

export default router;
```

Mount it in `server.js` next to the other routers (`app.use("/api/orders", ordersRouter);`), or in a parent router such as `routes/Admin/admin.router.js` for admin features.

## Anti-patterns (don't write these)

```js
// ❌ Model in a controller or service
import Order from "../models/order.model.js";

// ❌ Controller calling a repository directly
import { findOrderById } from "../repositories/orders/orders.repository.js";

// ❌ Inline handler in a route
router.post("/x", (req, res) => { ...logic... });

// ❌ Service using req/res
export const changeOrderStatus = async (req, res) => { ... };

// ❌ Business logic in a repository
export const shipIfPaid = async (id) => { const o = await Order.findById(id); if (o.paid) ... };
```
