import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [{
        path: '/',
        name: 'qwLogin',
        meta: {
            title: "企业微信登录",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/login/qwLogin.vue'),
    },
    {
        path: '/amyLogin',
        name: 'amyLogin',
        meta: {
            title: "啊美雅账号登录",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/login/amyLogin'),
    },
    {
        path: '/workbench',
        name: 'workbench',
        meta: {
            title: "工作台",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/workbench/workbench'),
    },
    {
        path: '/recording',
        name: 'recording',
        meta: {
            title: "录单",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/recording/recording'),
    },
    {
        path: '/editRecording',
        name: 'editRecording',
        meta: {
            title: "编辑订单",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/editRecording/recording'),
    },
    {
        path: '/orderList',
        name: 'orderList',
        meta: {
            title: "订单列表",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/orderList/orderList'),
    },
    {
        path: '/dispatchList',
        name: 'dispatchList',
        meta: {
            title: "派单列表",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/dispatchList/dispatchList'),
    },
    {
        path: '/noDispatch',
        name: 'noDispatch',
        meta: {
            title: "未派单列表",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/dispatchList/views/noDispatch'),
    },
    {
        path: '/dispatched',
        name: 'dispatched',
        meta: {
            title: "已派单列表",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/dispatchList/views/dispatched'),
    },
    {
        path: '/detail',
        name: 'detail',
        meta: {
            title: "订单详情",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/detail/detail'),
    },
    {
        path: '/deal',
        name: 'deal',
        meta: {
            title: "确认成交",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/deal/deal'),
    },
    {
        path: '/dataCenter',
        name: 'dataCenter',
        meta: {
            title: "数据中心",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/dataCenter/dataCenter'),
    },
    {
        path: '/naturalSeeding',
        name: 'naturalSeeding',
        meta: {
            title: "自播达人",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/dataCenter/views/naturalSeeding'),
    },
    {
        path: '/commerce',
        name: 'commerce',
        meta: {
            title: "带货板块",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/dataCenter/views/commerce'),
    },
    {
        path: '/doctor',
        name: 'doctor',
        meta: {
            title: "医生板块",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/dataCenter/views/doctor'),
    },
    {
        path: '/assistantDetails',
        name: 'assistantDetails',
        meta: {
            title: "助理详情",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/dataCenter/views/assistantDetails'),
    },
    {
        path: '/personal',
        name: 'personal',
        meta: {
            title: "个人中心",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/personal/personal'),
    },
    {
        path: '/myData',
        name: 'myData',
        meta: {
            title: "我的数据",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/personal/views/myData/myData'),
    },
    {
        path: '/recordingApplicationList',
        name: 'recordingApplicationList',
        meta: {
            title: "录单申请列表",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/personal/views/recordingApplicationList/recordingApplicationList'),
    },
    {
        path: '/mySubmit',
        name: 'mySubmit',
        meta: {
            title: "我提交的",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/personal/views/mySubmit/mySubmit'),
    },
    {
        path: '/myReceive',
        name: 'myReceive',
        meta: {
            title: "我收到的",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/personal/views/myReceive/myReceive'),
    },
    {
        path: '/editCustomer',
        name: 'editCustomer',
        meta: {
            title: "修改绑定客服",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/personal/views/editCustomer/editCustomer'),
    },
    {
        path: '/customerServiceContentPlatformBound',
        name: 'customerServiceContentPlatformBound',
        meta: {
            title: "已绑定客服内容平台订单",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/personal/views/customerServiceContentPlatformBound/customerServiceContentPlatformBound'),
    },
    {
        path: '/customerPool',
        name: 'customerPool',
        meta: {
            title: "已绑定客户池客服手机号",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/personal/views/customerPool/customerPool'),
    },
    {
        path: '/accountNumber',
        name: 'accountNumber',
        meta: {
            title: "账号设置",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/personal/views/accountNumber/accountNumber'),
    },
    {
        path: '/anchorLeft',
        name: 'anchorLeft',
        meta: {
            title: "主播数据",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/personal/views/anchorLeft/anchorLeft'),
    },
    {
        path: '/hospital',
        name: 'hospital',
        meta: {
            title: "医院排名",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/personal/views/hospital/hospital'),
    },
    {
        path: '/reservationList',
        name: 'reservationList',
        meta: {
            title: "客户预约日程",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/personal/views/reservationList/reservationList'),
    },
    {
        path: '/performanceDetail',
        name: 'performanceDetail',
        meta: {
            title: "合作达人",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/dataCenter/views/performanceDetail'),
    },
    {
        path: '/smallYellowCarRegistration',
        name: 'smallYellowCarRegistration',
        meta: {
            title: "小黄车",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/smallYellowCarRegistration/smallYellowCarRegistration'),
    },
    {
        path: '/addYellowCar',
        name: 'addYellowCar',
        meta: {
            title: "小黄车添加",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/addYellowCar/addYellowCar'),
    },
]

const router = new VueRouter({
    routes
})

export default router