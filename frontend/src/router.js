import Vue from "vue";
import Router from "vue-router";

import main from '@/components/_pages/main/main'
import compare from '@/components/_pages/compare/compare'
import timeLine from '@/components/_pages/time-line/time-line'
import change from '@/components/_pages/change/change'
import cumulative from '@/components/_pages/cumulative/cumulative'
import populationTest from '@/components/_pages/population-test/population-test'
import weekStats from '@/components/_pages/population-test/population-week-stats'

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
        path: "/compare",
        name: "compare",
        component: compare,
    }, {
        path: "/timeline",
        name: "timeline",
        component: timeLine,
    }, {
        path: "/change",
        name: "change",
        component: change,
    }, {
        path: "/cumulative",
        name: "cumulative",
        component: cumulative,
    }, {
        path: "/population-test",
        name: "populationTest",
        component: populationTest,
    }, {
        path: "/speed-test",
        name: "populationTest",
        component: populationTest,
    }, {
        path: "/week-stats",
        name: "weekStats",
        component: weekStats,
    }
];

const router = new Router({routes});


export default router;
