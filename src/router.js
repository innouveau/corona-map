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
        path: "/riool",
        name: "riool",
        component: sewageTools,
    }, {
        path: "/vergelijk",
        name: "vergelijk",
        component: compare,
    }, {
        path: "/compare",
        name: "compare",
        component: compare,
    }, {
        path: "/tijdlijn",
        name: "tijdlijn",
        component: timeLine,
    }, {
        path: "/timeline",
        name: "timeline",
        component: timeLine,
    }
];

const router = new Router({routes});


export default router;
