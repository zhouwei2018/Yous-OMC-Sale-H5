/**
 * Created by aresn on 16/6/20.
 */
import Vue from 'vue';
import App from './app.vue';
import $ from 'jquery';
import MintUI from 'mint-ui';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(MintUI);

Vue.prototype.$prefix = "http://116.62.68.26:81" //图片前缀

// 测试环境
Vue.prototype.$api = "http://192.168.0.222:8080" //api地址
Vue.prototype.$export = "http://192.168.0.222:8080" //图片前缀

// 生产环境
//Vue.prototype.$api = "http://wx.urskongjian.com:8080" //api地址
//Vue.prototype.$export = "http://wx.urskongjian.com:8080" //图片前缀

//Vue.config.debug = true;// 开启debug模式
Vue.config.debug = true;// 开启debug模式

var router = new VueRouter({
    mode: "hash",
    hashbang: false,
    routes: [
        {
            path: '/list',
            component: require('./routers/list.vue')
        },
        {
          path: '/filter',
          component: require('./routers/search.vue'),
        },
        {
            path: '/detail',
            component: require('./routers/detail.vue')
        },
        {
            path: '/house',
            component: require('./routers/house.vue')
        },
        {
            path: '/order',
            component: require('./routers/order.vue')
        },
        {
            path: '/select',
            component: require('./routers/select.vue')
        },
        {
            path: '*',
            component: require('./routers/list.vue')
        }
    ]
});

new Vue({
    el: '#app',
    router: router,
    render: function (h) {
        return h(App)
    }
});
