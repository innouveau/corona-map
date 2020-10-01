import Vue from "vue";
import Router from "vue-router";

import main from '@/components/main/main-view'
import sewageTools from '@/components/sewage/sewage-tools'
import compare from '@/components/compare/compare'
import score from '@/components/score/score'

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
        path: "/score",
        name: "score",
        component: score,
    }
];

const router = new Router({routes});


export default router;
