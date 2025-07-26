import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import Vant from 'vant';
import { CellGroup, Toast, Dialog, Empty, Button, Field, Form, Icon, Row, Col, Checkbox, CheckboxGroup } from 'vant';
import '@/assets/js/font.js'
import 'vant/lib/index.css';
import "./utils/requestIntercept";
import "vue-easytable/libs/theme-default/index.css";
// 表格
import { VeTable } from "vue-easytable";
import VueClipboard from 'vue-clipboard2'
// 浏览大图
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.config.productionTip = false

Vue.prototype.$axios = axios

// echarts 地图
import * as echarts from 'echarts'
import china from './echarts/china.json' //导入china包
echarts.registerMap('china', china)
Vue.prototype.$echarts = echarts

// import Vconsole from 'vconsole';
// const vConsole = new Vconsole()
// Vue.use(vConsole)

/**
 * 日期
 */
import moment from "moment";
Vue.prototype.$moment = moment;
// Vue.use(Viewer)
Vue.use(VueClipboard)
Vue.use(VeTable);
Vue.use(Vant);
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(CellGroup);
Vue.use(Empty);
Vue.use(Button);
Vue.use(Field);
Vue.use(Form);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Viewer, {
    defaultOptions: {
        zIndex: 9999, // 这里设置层级高度
    }
})

function isMobile() {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    return flag;
}

let GetQueryString = name => {
    var url = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var newUrl = window.location.search.substr(1).match(url);
    if (newUrl != null) {
        return unescape(newUrl[2]);
    } else {
        return false;
    }
};
if (process.env.NODE_ENV === 'production') {
    router.beforeEach((to, from, next) => {
                // console.log(to, 'to')
                Toast.clear();
                if (!isMobile()) {
                    // window.location.href = `${process.env.VUE_APP_WEB_BASE_URL}/fxbh/pc/index.html#/auth`
                } else {
                    if (window.sessionStorage.getItem("tokenInfo")) {
                        /* 路由发生变化修改页面title */
                        if (to.meta.title) {
                            document.title = to.meta.title
                        }
                        next();
                    } else if (window.sessionStorage.getItem("token")) {
                        /* 路由发生变化修改页面title */
                        if (to.meta.title) {
                            document.title = to.meta.title
                        }
                        next()
                    } else if (window.sessionStorage.getItem("userInfo") && to.path === '/') {
                        /* 路由发生变化修改页面title */
                        if (to.meta.title) {
                            document.title = to.meta.title
                        }
                        next()
                    } else if (window.sessionStorage.getItem("errorMessage") && to.path === '/') {
                        /* 路由发生变化修改页面title */
                        if (to.meta.title) {
                            document.title = to.meta.title
                        }
                        next()
                    } else if (to.path === '/amyLogin') {
                        /* 路由发生变化修改页面title */
                        if (to.meta.title) {
                            document.title = to.meta.title
                        }
                        next()
                    } else if (GetQueryString('code')) {
                        // console.log(GetQueryString('code'), 'code')
                        axios({
                                url: `${process.env.VUE_APP_BASE_URL}/businessWechat/Auth/businessWechatAuth`,
                                method: "get",
                                params: {
                                    code: GetQueryString('code'),
                                },
                            })
                            .then((res) => {
                                // console.log(res, 'res')
                                if (res.data.code === 0) {
                                    const {
                                        businessWechatAuth
                                    } = res.data.data;
                                    window.sessionStorage.setItem("userInfo", JSON.stringify(businessWechatAuth));
                                    next({
                                        path: "/",
                                        query: {
                                            redirect: to.fullPath !== '/' ? to.fullPath : ''
                                        }
                                    })
                                } else {
                                    window.sessionStorage.setItem("errorMessage", res.data.msg);
                                    next({
                                        path: "/",
                                        query: {
                                            redirect: to.fullPath !== '/' ? to.fullPath : ''
                                        }
                                    })
                                }
                            })
                    } else {
                        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?agentid=${process.env.VUE_APP_AGENT_ID}&appid=${process.env.VUE_APP_APP_ID}&redirect_uri=${encodeURIComponent(`${process.env.VUE_APP_WEB_BASE_URL}/amiyabusinesswechat/index.html#${to.fullPath}`)}&response_type=code&scope=snsapi_privateinfo&state=fxState#wechat_redirect`
            }
        }
    })
}




new Vue({
    router,
    store,
    // Cell,
    // CellGroup,
    render: h => h(App)
}).$mount('#app')