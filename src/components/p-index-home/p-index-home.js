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
    datas(){
        return {
            rotate: 0
        };
    }
});
