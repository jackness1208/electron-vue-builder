'use strict';
import './index.scss';
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../../vuex/store.js';

import pageHome from '../../components/p-index-home/p-index-home.js';

Vue.use(VueRouter);
const router = new VueRouter({
 routes: [
     {
         path: '/index',
         component: pageHome
     }, {
         path: '*',
         component: pageHome

     }
 ]
});

new Vue({ store, router }).$mount("#app");




