import Vue from "vue";
import Router from "vue-router";

import main from '@/components/main/main-view'
import sewage from '@/components/sewage/sewage'
import compare from '@/components/compare/compare'
import timeLine from '@/components/time-line/time-line'
import change from '@/components/change/change'
import story from '@/components/story/story'
import populationTest from '@/components/population-test/population-test'
import exportPage from '@/components/export/export'
import hospitalisations from '@/components/hospitalisations/hospitalisations'
import weekStats from '@/components/population-test/population-week-stats'

Vue.use(Router);

const routes = [
    {
        path: "/",
        name: "story",
        component: story
    }, {
        path: "/main",
        name: "main",
    }, {
        path: "/riool",
        name: "riool",
        component: sewage,
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
        path: "/story",
        name: "story",
        component: story,
    }, {
        path: "/population-test",
        name: "populationTest",
        component: populationTest,
    }, {
        path: "/speed-test",
        name: "populationTest",
        component: populationTest,
    }, {
        path: "/export",
        name: "exportPage",
        component: exportPage,
    }, {
        path: "/hospitalisations",
        name: "hospitalisations",
        component: hospitalisations,
    }, {
        path: "/week-stats",
        name: "weekStats",
        component: weekStats,
    }
];

const router = new Router({routes});


export default router;
