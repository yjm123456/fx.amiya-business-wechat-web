<template>
    <div>
        <div class="contents" v-if="isLoading == false" :style="{height:performance.length < 6  ? '100vh' : 'auto'}">
            <div class="time" @click="timeClick">
                <span>{{time}}</span>
                <i class="iconfont icon-xiangxia time_icon"></i>
            </div>
            <div class="chart_content" v-if="performance.length>1">
                <hospitalChart :performance="performance" />
            </div>

            <div class="list" v-if="performance.length>1">
                <div  v-for="(item, index) in performance" :key="index">
                    <div class="item">
                        <img :src="item.hospitalLogo" alt="" class="img" v-if="item.hospitalLogo">
                        <div class="item_right">
                            <div class="right_top">
                                <span class="hospital">{{item.hospitalName}}</span>
                                <div  class="achi_l">新老客占比 {{item.newOrOldCustomerRate}}</div>
                            </div>
                        </div>
                        <div class="achievement">
                            <div class="achievement_r">
                                <div>贡献 {{item.totalAchievementRatio}}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="no_data"  v-if="performance.length>1">没有更多了</div>
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
        </div>
        <!-- <van-loading size="24px" vertical text-color="#0094ff" color="#0094ff" style="padding:100px 0 0 50px" v-else>加载中...</van-loading> -->
        <van-loading size="24px" vertical text-color="#fff" color="#fff" style="height:100vh;padding:140px 0 0 0px;background:linear-gradient(#8ab4fe,#f5f5f5);" v-else>加载中...</van-loading>
    </div>
</template>
<script>
import  * as api from "@/api/order.js";

import hospitalChart from "../../components/hospitalChart.vue"
export default {
    components:{
        hospitalChart
    },
    data(){
        return{
            performance:[],
            time:this.$moment().format("YYYY-MM"),
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2026, 10, 1),
            currentDate:  this.$moment().format("YYYY-MM"),
            timeModel:false,
            isLoading:false
        }
    },
    methods:{
        timeClick(){
            this.currentDate = new Date(this.$moment(this.time).format("YYYY-MM-DD"))
            this.timeModel = true
        },
        timeConfirm(value){
            this.time = this.$moment(value).format("YYYY-MM")
            this.timeModel = false
            this.gethospitalPerformance()
        },
        gethospitalPerformance(){
            const data = {
                year:this.$moment(this.time).format("YYYY"),
                month:this.$moment(this.time).format("MM")
            }
            this.isLoading =true
             api.hospitalPerformance(data).then((res)=>{
                if(res.code ===0){
                    this.isLoading = false
                    this.performance = res.data.performance
                }
             })   
        }
    },
    created(){
        this.gethospitalPerformance()
    }
}
</script>
<style scoped lang="less">
.contents{
    width: 100%;
    background:linear-gradient(#8ab4fe,#f5f5f5);
    // height: 100vh;
    
    .time{
        text-align: right;
        font-size: 14px;
        color: #fff;
        padding: 10px;
        box-sizing: border-box;
    }
    .chart_content{
        width: 94%;
        height: 180px;
        background-image: url(../../../../assets/data_bg.png) ;
        background-size: 100% 100%;
        display: flex;
        margin: 0 auto;
    }
    .list{
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        margin-top: 10px;
        .item{
            width: 100%;
            display: flex;
            background: #E9F3FF;
            border-radius: 10px;
            padding: 10px;
            box-sizing: border-box;
            align-items: center;
            margin-bottom: 10px;
            justify-content: space-between;
            .img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
            .item_right{
                width: 80%;
                flex:1;
                margin-left: 10px;
                .right_top{
                    width: 200px;
                    overflow: hidden; /*超出隐藏*/
                    text-overflow: ellipsis;/*隐藏后添加省略号*/
                    white-space: nowrap;/*强制不换行*/
                    // display: flex;
                    // justify-content: space-between;
                    // align-items: center;
                    .achi_l{
                        font-size: 12px;
                        color: #767474;
                        margin-top: 5px;
                    }
                    .hospital{
                        width: 200px;
                        overflow: hidden; /*超出隐藏*/
                        text-overflow: ellipsis;/*隐藏后添加省略号*/
                        white-space: nowrap;/*强制不换行*/
                        font-size: 14px;
                        color: #000;
                    }
                    .num{
                        color: #5492FE;
                        font-size: 14px;
                    }
                }
            }
            .achievement{
                    color: #767474;
                    font-size: 12px;
                    .achi_l{
                        margin-bottom: 5px;
                    }

                }
        }
    }
    .no_data{
        text-align: center;
        color: #ccc;
        font-size: 14px;
        box-sizing: border-box;
        padding-bottom: 10px;
        box-sizing: border-box;
    }
}
</style>
