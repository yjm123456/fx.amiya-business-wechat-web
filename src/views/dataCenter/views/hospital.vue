<template>
    <div>
        <div class="contents" v-if="isLoading == false" :style="{height:performance.length<=3 ? '100vh' : 'auto'}">
            <div class="time" @click="timeClick">
                <span>{{time}}</span>
                <i class="iconfont icon-xiangxia time_icon"></i>
            </div>
            <div class="chart_content" v-if="performance.length>1">
                <hospitalChart :performance="performance"/>
            </div>

            <div class="list" v-if="performance.length>1">
                <div  v-for="(item, index) in performance" :key="index">
                    <div class="item">
                        <img :src="item.hospitalLogo" alt="" class="img" v-if="item.hospitalLogo">
                        <div class="item_right">
                            <div class="right_top">
                                <span class="hospital">{{item.hospitalName}}</span>
                                <!-- <span class="num">{{item.totalAchievement + 'w'}}</span> -->
                            </div>
                            <div class="achievement">
                                <div class="achievement_left">
                                    <div class="achievement_l">
                                        <span>当日 <span  class="num"> {{item.todayTotalAchievement + 'w'}}</span></span>
                                        <div  class="achi_l">新客 {{item.todayNewCustomerAchievement + 'w'}}</div>
                                        <div>老客 {{item.todayOldCustomerAchievement  + 'w'}}</div>
                                    </div>
                                    <div class="achievement_r">
                                        <div  class="achi_l">占比 {{item.todayNewOrOldCustomerRate}}</div>
                                        <div>贡献 {{item.todayTotalAchievementRatio}}%</div>
                                    </div>
                                </div>
                                <div class="achievement_right">
                                    <span>当月 <span  class="num"> {{item.totalAchievement + 'w'}}</span></span>
                                    <div class="achievement_l">
                                        <div  class="achi_l">新客 {{item.newCustomerAchievement + 'w'}}</div>
                                        <div>老客 {{item.oldCustomerAchievement  + 'w'}}</div>
                                    </div>
                                    <div class="achievement_r">
                                        <div  class="achi_l">占比 {{item.newOrOldCustomerRate}}</div>
                                        <div>贡献 {{item.totalAchievementRatio}}%</div>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="no_data" v-if="performance.length>1">没有更多了</div>
            <van-popup v-model="timeModel" position="bottom" style="height: 50%" round >
                <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    title="选择年月"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @cancel="timeModel = false"
                    @confirm="timeConfirm"
                />
            </van-popup> 
        </div>
        <!-- <van-loading size="24px" vertical text-color="#0094ff" color="#0094ff" style="padding:100px 0 0 50px" v-else>加载中...</van-loading> -->
        <van-loading size="24px" vertical text-color="#fff" color="#fff" style="height:100vh;padding:140px 0 0 0px;background:#C0D6FE;margin-left:60px" v-else>加载中...</van-loading>
    </div>
    <!-- <div v-else class="nodate">暂无数据</div> -->
</template>
<script>
import  * as api from "@/api/order.js";

import hospitalChart from "../components/hospitalChart.vue"
export default {
    components:{
        hospitalChart
    },
    data(){
        return{
            performance:[],
            time:this.$moment().format("YYYY-MM-DD"),
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2026, 10, 1),
            currentDate:  this.$moment().format("YYYY-MM-DD"),
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
            this.time = this.$moment(value).format("YYYY-MM-DD")
            this.timeModel = false
            this.gethospitalPerformance()
        },
        gethospitalPerformance(){
            const data = {
                // year:this.$moment(this.time).format("YYYY"),
                // month:this.$moment(this.time).format("MM")
                date:this.$moment(this.time).format("YYYY-MM-DD")
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
    padding-left: 60px;
    box-sizing: border-box;
    width: 100%;
    background:#C0D6FE;
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
        background-image: url(../../../assets/data_bg.png) ;
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
            display: flex;
            background: #E9F3FF;
            border-radius: 10px;
            padding: 10px;
            box-sizing: border-box;
            align-items: center;
            margin-bottom: 10px;
            .img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
            .item_right{
                flex:1;
                width: 100%;
                margin-left: 10px;
                .right_top{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .hospital{
                        // width: 150px;
                        width: 170px;
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
                
                .achievement{
                    margin-top: 6px;
                    display: flex;
                    justify-content: space-around;
                    width: 100%;
                    color: #767474;
                    font-size: 12px;
                    .achievement_right,.achievement_left{
                        .num{
                            color: #5492FE;
                        }
                    }
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
.nodate{
    padding-left: 60px;
    box-sizing: border-box;
    width: 100%;
    background:linear-gradient(#8ab4fe,#f5f5f5);
    height: 100vh;
    text-align: center;
    color: #767474;
    padding-top: 20px;
}
</style>
