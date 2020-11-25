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
    }
];

const router = new Router({routes});


export default router;
