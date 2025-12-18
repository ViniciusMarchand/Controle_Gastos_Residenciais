import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/transaction-registration.tsx"),
    route("user-registration","routes/user-registration.tsx"),
    route("category-registration","routes/category-registration.tsx"),
    route("user-details","routes/user-transaction-details.tsx"),
    route("category-details","routes/category-transaction-details.tsx")
] satisfies RouteConfig;

