import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import locale from "element-ui/lib/locale/lang/zh-CN"; // lang i18n

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";
import axios from "axios";
// import api from "api";

import "@/icons"; // icon
import "@/permission"; // permission control
import echarts from "echarts";

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === "production") {
    const { mockXHR } = require("../mock");
    mockXHR();
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale });
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

import Highcharts from 'highcharts/highcharts'
import HighchartsVue from 'highcharts-vue'

import stockInit from 'highcharts/modules/stock'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsDrilldown from 'highcharts/modules/drilldown'
import Highcharts3D from 'highcharts/highcharts-3d'
import HighchartszhCN from '@/utils/highcharts-zh_CN.es6'

stockInit(Highcharts)
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts)
Highcharts3D(Highcharts)
HighchartszhCN(Highcharts)

Highcharts.setOptions({
    global: { useUTC: false }
})

Vue.use(HighchartsVue)


Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

new Vue({
    el: "#app",
    router,
    store,
    axios,
    render: h => h(App)
});