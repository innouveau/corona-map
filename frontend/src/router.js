import Vue from "vue";
import Router from "vue-router";

import main from "@/components/pages/main/main";
import compare from "@/components/pages/compare/compare";
import timeLine from "@/components/pages/time-line/time-line";
import change from "@/components/pages/change/change";
import cumulative from "@/components/pages/cumulative/cumulative";
import populationTest from "@/components/pages/population-test/population-test";
import weekStats from "@/components/pages/population-test/population-week-stats";

Vue.use(Router);

const routes = [
    {
        path: "/",
        name: "main",
        component: main,
    },
    {
        path: "/main",
        name: "main",
        redirect: { name: "main" },
    },
    {
        path: "/compare",
        name: "compare",
        component: compare,
    },
    {
        path: "/timeline",
        name: "timeline",
        component: timeLine,
    },
    {
        path: "/change",
        name: "change",
        component: change,
    },
    {
        path: "/cumulative",
        name: "cumulative",
        component: cumulative,
    },
    {
        path: "/population-test",
        name: "populationTest",
        component: populationTest,
    },
    {
        path: "/speed-test",
        name: "populationTest",
        component: populationTest,
    },
    {
        path: "/week-stats",
        name: "weekStats",
        component: weekStats,
    },
];

const router = new Router({ routes });

export default router;
