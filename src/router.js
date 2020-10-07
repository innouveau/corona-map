import Vue from "vue";
import Router from "vue-router";

import main from '@/components/main/main-view'
import sewageTools from '@/components/sewage/sewage-tools'
import compare from '@/components/compare/compare'
import timeLine from '@/components/time-line/time-line'

Vue.use(Router);

const routes = [
    {
        path: "/",
        name: "main",
        component: main
    }, {
        path: "/main",
        name: "main",
        redirect: {name: "main"},
    }, {
        path: "/riool",
        name: "riool",
        component: sewageTools,
    }, {
        path: "/compare",
        name: "compare",
        component: compare,
    }, {
        path: "/timeline",
        name: "timeline",
        component: timeLine,
    }
];

const router = new Router({routes});


export default router;
