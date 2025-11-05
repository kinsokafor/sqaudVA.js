import SimulatePayment from "../views/SimulatePayment.vue";
import QueryTransaction from "../views/QueryTransaction.vue";

export const sharedRoutes = [
  {
    path: "/sqaudva/simulate-payment",
    name: "SimulatePayment",
    component: SimulatePayment,
    meta: {
      title: "Simulate Payment",
    },
  },
  {
    path: "/sqaudva/query-transaction",
    name: "QueryTransaction",
    component: QueryTransaction,
    meta: {
      title: "Query Transaction",
    },
  },
];