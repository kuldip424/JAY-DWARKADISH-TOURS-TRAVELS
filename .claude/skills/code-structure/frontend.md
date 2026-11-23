# Frontend layers — details & templates

All paths are under `client/src/`.

## Folder layout

```
client/src/
  api/
    apiClient.js            shared helpers (create once, reuse)
    <feature>Api.js         one file per feature, e.g. ordersApi.js
  hooks/
    <feature>/
      use<Thing>.js         e.g. hooks/orders/useOrders.js, useOrderDetail.js
  zustand/
    <feature>/
      use<Feature>.Zus.js   e.g. zustand/orders/useOrders.Zus.js
  pages/                    route-level screens
  components/               reusable UI pieces
```

## 1. API layer — `api/`

If `api/apiClient.js` does not exist yet, create it with:

```js
// client/src/api/apiClient.js
import axios from "axios";

export const withCreds = { withCredentials: true };

// Extract a user-facing message from an axios error.
export const apiError = (e, fallback) =>
  e?.response?.data?.error || fallback || "Something went wrong";

// Wrap an axios call so callers get `data` directly.
export const unwrap =
  (fn) =>
  async (...args) => {
    const { data } = await fn(...args);
    return data;
  };

export default axios;
```

Feature API file — only HTTP, nothing else:

```js
// client/src/api/ordersApi.js
import axios, { unwrap, withCreds } from "./apiClient";

const BASE = "/api/orders";

export const listOrdersApi = unwrap((params = {}) =>
  axios.get(BASE, { params, ...withCreds }),
);

export const getOrderApi = unwrap((id) =>
  axios.get(`${BASE}/${id}`, withCreds),
);

export const updateOrderStatusApi = unwrap((id, status) =>
  axios.patch(`${BASE}/${id}/status`, { status }, withCreds),
);
```

Naming: functions end in `Api` (`listXApi`, `getXApi`, `createXApi`, `updateXApi`, `deleteXApi`).

## 2. State layer — `zustand/` (only when state is shared)

```js
// client/src/zustand/orders/useOrders.Zus.js
import { create } from "zustand";

const useOrdersStore = create((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),

  selectedOrder: null,
  setSelectedOrder: (selectedOrder) => set({ selectedOrder }),
}));

export default useOrdersStore;
```

No API calls, no toasts, no async logic in the store.

## 3. Hook layer — `hooks/<feature>/`

The hook is the only place that joins the API and the state.

```js
// client/src/hooks/orders/useOrders.js
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiError } from "../../api/apiClient";
import { listOrdersApi, updateOrderStatusApi } from "../../api/ordersApi";
import useOrdersStore from "../../zustand/orders/useOrders.Zus";

const useOrders = (filters) => {
  const { orders, setOrders } = useOrdersStore();
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listOrdersApi(filters);
      setOrders(data.orders || []);
    } catch (e) {
      toast.error(apiError(e, "Failed to load orders"));
    } finally {
      setLoading(false);
    }
  }, [filters, setOrders]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = useCallback(
    async (id, status) => {
      try {
        await updateOrderStatusApi(id, status);
        toast.success("Status updated");
        fetchOrders();
        return true;
      } catch (e) {
        toast.error(apiError(e, "Failed to update status"));
        return false;
      }
    },
    [fetchOrders],
  );

  return { orders, loading, refetch: fetchOrders, updateStatus };
};

export default useOrders;
```

If no store is needed, keep the data in `useState` inside the hook instead.

## 4. UI layer — `pages/`, `components/`

```jsx
// client/src/pages/Orders/OrdersPage.jsx
import useOrders from "../../hooks/orders/useOrders";
import OrdersTable from "../../components/Orders/OrdersTable";

const OrdersPage = () => {
  const { orders, loading, updateStatus } = useOrders();

  if (loading) return <Spinner />;
  return <OrdersTable orders={orders} onStatusChange={updateStatus} />;
};

export default OrdersPage;
```

Components get data and callbacks through props or their own hook. They never import `axios` or anything from `api/`.

## Anti-patterns (don't write these)

```jsx
// ❌ API call inside a page/component
useEffect(() => { axios.get("/api/orders").then(...) }, []);

// ❌ Page importing the API layer directly
import { listOrdersApi } from "../../api/ordersApi";

// ❌ API call inside a zustand store
fetchOrders: async () => { const { data } = await axios.get(...); set({ orders: data }); }

// ❌ Toast / React state inside an api/ file
```
