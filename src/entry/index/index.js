'use strict';
import './index.scss';
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../../vuex/store.js';
import getters from 'getters';
import actions from 'actions';

import pageHome from '../../components/p-index-home/p-index-home.js';

Vue.use(VueRouter);

var 
    
    router = new VueRouter({
        routers: [{
                path: 'index',
                component: pageHome
            }, {
                path: '*',
                component: pageHome
            }

        ]
    });


var 
    app = new Vue({
        el: function(){
            return '#app';
        },
        router,
        store,
        vuex: {
            actions,
            getters
        },
        ready(){

        }
    });

