'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import getters from 'getters';
import actions from 'actions';

Vue.use(Vuex);

var state = {
    data: 1
};
var mutations = {};

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});
