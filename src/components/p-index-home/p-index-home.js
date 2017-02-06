'use strict';
import Vue from 'vue';
import tpl from './p-index-home.jade';
import './p-index-home.scss';

export default Vue.extend({
    template: tpl(),
    data(){
        return {
            // 日期
            year: '',
            month: '-',
            date: '-',
            week: '-',
            // 女神亲近指数
            girlStar: 0,
            // 饮品
            drinks: [],
            //
            direction: '',
            yiList: [{name: '骂你', info: '就是骂你'}],
            byList: [{name: '骂你', info: '就是骂你'}]
        };
    },
    mounted(){
        console.log(this.$store.getters)
        console.log(this.$store.getters.data)

    }
});
