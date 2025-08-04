<template>
    <div class="content">
        <div class="top">
            <span class="t_t"></span>
            <span  @click="timeClick">{{time}}</span>
        </div>
        <!--时间弹窗 -->
        <van-popup v-model="timeModel" position="bottom" style="height: 50%" round >
            <van-datetime-picker
                v-model="currentDate"
                type="year-month"
                title="选择年月"
                :min-date="minDate"
                :max-date="maxDate"
                @cancel="timeModel = false"
                @confirm="timeConfirm"
            />
        </van-popup> 
        <!-- <div class="money_con"><span>￥</span><span>{{performance.totalPerformance ? performance.totalPerformance : 0}}</span></div>
        <div class="ring"  v-if="Math.sign(performance.totalPerformanceChainRatio)== 1"> 
            <span class="ring_num"><span style="font-size:16px">环比</span> {{ '+' +performance.totalPerformanceChainRatio + '%'}}</span>
            <i class="iconfont icon-cs-jt-xs-1-1 jiantou"></i>
        </div>
        <div class="ring"  v-if="Math.sign(performance.totalPerformanceChainRatio)== -1">
            <span class="ring_num2"><span style="font-size:16px">环比</span> {{performance.totalPerformanceChainRatio+ '%'}}</span>
            <i class="iconfont icon-cs-jt-xx-1-1 jiantou2"></i>
        </div> -->
        <div class="item_con">
            <div class="item">
                <div>新客业绩</div>
                <div class="money">￥{{performance.newCustomerPerformance ? performance.newCustomerPerformance : 0}}</div>
            </div>
            <div class="item">
                <div>老客业绩</div>
                <div  class="money">￥{{performance.oldCustomerPerformance ? performance.oldCustomerPerformance : 0}}</div>
                
            </div>
            <div class="item">
                <div>总业绩</div>
                <div  class="money">￥{{performance.totalPerformance ? performance.totalPerformance : 0}}</div>
            </div>
        </div>
        <!-- 环形图 -->
        <div class="chart_content">
            <chart :proportion="proportion"/>
        </div>
        <!-- 地图 -->
        <!-- <div class="chart_content" style="height:310px">
            <china />
        </div> -->
        <!-- nav -->
        <navs :performance="performance"/>
    </div>
</template>
<script>
import  * as api from "@/api/order.js";
import chart from "./components/chart.vue"
import china from "./components/china.vue"
import navs from "./components/nav.vue"

export default{
    components:{
        chart,
        navs,
        china
    },
    data(){
        return{
            
            performance:{},
            // 占比数据
            proportion:[],
            time:this.$moment().format("YYYY-MM"),
            currentDate:  this.$moment().format("YYYY-MM"),
            timeModel:false,
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2026, 10, 1),
        }
    },
    methods:{
        navClick(value){
            this.active = value
        },
        timeClick(){
            this.currentDate = new Date(this.$moment(this.time).format("YYYY-MM-DD"))
            this.timeModel = true
        },
        timeConfirm(value){
            this.time = this.$moment(value).format("YYYY-MM")
            this.timeModel = false
            this.getCharts()
        },
        getCharts(){
            const data = {
                year:this.$moment(this.time).format("YYYY"),
                month:this.$moment(this.time).format("MM")
            }
            api.TotalPerformance(data).then((res)=>{
                if(res.code === 0){
                    const {selfLiveAnchorPerformance,otherLiveAnchorPerformance,commercePerformance,doctorPerformance,otherPerformance} = res.data.performance
                    this.performance = res.data.performance
                    let proportion = []
                    proportion.push({
                        name:'自播达人',
                        value:selfLiveAnchorPerformance
                    },{
                        name:'合作达人',
                        value:otherLiveAnchorPerformance
                    },{
                        name:'医生业绩',
                        value:doctorPerformance
                    },{
                        name:'其他业绩',
                        value:otherPerformance
                    })
                    this.proportion = proportion
                }
            })
        }
    },
    created(){
        this.getCharts()
    }
}
</script>
<style scoped lang="less">
/deep/.van-tabs__nav {
    background: none ;
   
}
/deep/.van-tabs__line{
 background: #4C71F6;
}
/deep/.van-tab__pane{
    height: 300px;
    background: #F6FAFF;
    color: #4C71F6;
}
/deep/.van-tabs__content{
    width: 100%;
    margin: 0 auto;
}
.content{
    // padding: 0 10px;
    // box-sizing: border-box;
    // .button_con{
    //     display: flex;
    //     justify-content: space-around;
    //     margin-top: 20px;
    // }
    width: 100%;
    height: 100vh;
    background-image: url(../../assets/datac.jpg) ;
    background-size: 100% 100%;
    // border-radius: 10px/10px;
    // padding: 20px;
    // box-sizing: border-box;
    color: #fff;
    .top{
        font-size: 13px;
        display: flex;
        justify-content: space-between;
        padding-left:  20px;
        box-sizing: border-box;
        padding: 20px 20px 0;
        box-sizing: border-box;
        .t_t{
            padding-left: 140px;
            box-sizing: border-box;
            text-align: center;
        }
    }
    .item_con{
        display: flex;
        justify-content: space-around;
        font-size: 12px;
        margin: 10px 0 ;
        .item{
            width: 33%;
            border-right: 1px solid #fff;
            text-align: center;
            .money{
                margin: 5px 0 ;
            }
        }
        .item:last-child{
            border: none;
        }
    }
    .money_con{
        font-size: 28px;
        font-weight: bold;
        margin: 20px 0;
        // padding-left: 38px;
        // box-sizing: border-box;
        text-align: center
    }
    .ring{
        margin: 10px 0;
        text-align: center;
        .ring_num{
            font-size: 18px;
            color: #B2F9C1;
        }
        .ring_num2{
            font-size: 18px;
            color: red;
        }
        .jiantou{
            color: #B2F9C1;
        }
        .jiantou2{
            color: red;
        }
    }
    .chart_content{
        width: 94%;
        height: 180px;
        background-image: url(../../assets/data_bg.png) ;
        background-size: 100% 100%;
        margin: 0 auto;
        
    }
    

}
</style>
