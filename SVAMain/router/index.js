import { createRouter, createWebHashHistory } from 'vue-router'
import NotFound from '@/components/NotFound.vue'
import Dashboard from '../views/Dashboard.vue'
import SimulatePayment from '../views/SimulatePayment.vue';
import QueryTransaction from '../views/QueryTransaction.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound,
            meta: { title: "404 Not Found" }
        },
        {
            path: '/',
            name: 'Dashboard',
            component: Dashboard,
            meta: { title: "Dashboard" }
        },
        {
            path: '/simulate-payment',
            name: 'SimulatePayment',
            component: SimulatePayment,
            meta: { title: "Simulate Payment" }
        },
        {
            path: '/query-transaction',
            name: 'QueryTransaction',
            component: QueryTransaction,
            meta: { title: "Query Transaction" }
        }
    ]
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    next();
});

export default router;