'use strict';
import Vue from 'vue';
import tpl from './p-index-home.jade';
import './p-index-home.scss';

const WEEK = {
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六',
    '7': '日'
};

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
            girlStar: 5,
            // 饮品
            drinks: [],
            //
            direction: '',
            yiList: [{name: '骂你', info: '就是骂你'}],
            byList: [{name: '骂你', info: '就是骂你'}]
        };
    },
    mounted(){
        let 
            vm = this,
            now = new Date();

        vm.year = now.getFullYear();
        vm.month = now.getMonth() + 1;
        vm.date = now.getDate();
        vm.week = WEEK[now.getDay()];
        // console.log(this.$store.getters)
        // console.log(this.$store.getters.data)

    }
});
