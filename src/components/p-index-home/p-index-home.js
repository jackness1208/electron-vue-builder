'use strict';
import Vue from 'vue';
import getters from 'getters';
import actions from 'actions';
import tpl from './p-index-home.jade';
import './p-index-home.scss';

export default Vue.extend({
    template: tpl(),
    vuex: {
        getters,
        actions
    },
    data(){
        return {
            message:'ssb',
            year: 2017,
            month: 1,
            date: 23,
            week: 1,
            yiList: [],
            byList: []
        };
    }
});
