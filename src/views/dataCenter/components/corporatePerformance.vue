<template>
    <div class="contents" v-if="isLoading == false">
        <!--  v-for="(item,index) in list" :key="index" -->
        <div class="time" @click="timeClick">
            <span>{{time}}</span> 
            <i class="iconfont icon-xiangxia icon_xia"></i>
        </div>
        <!-- <div class="num_content">
            <div class="item_num_con">
                <div>今日总业绩</div>
                <div class="allnum">{{todayPerFormance}}w</div>
            </div>
            <div class="item_num_con"> 
                <div>总业绩</div>
                <div class="allnum">{{allPerFormance}}w</div>
            </div>
        </div> -->
        <div class="list_con" v-for="(item,index) in performance" :key="index">
            <div class="list">
                <div class="item">
                    <div class="title">{{item.liveanchorName}}</div>
                    <div class="item_contet">
                        <div class="item_left">
                            <div class="allnum">{{item.todayPerformance}}w</div>
                            <div class="con">
                                <div class="con_top">
                                    <div class="flex_l">
                                        <div class="text">新客成交</div><span class="num">{{item.todayNewCustomerPerformance}}w</span>
                                    </div>
                                    <div class="flex_l">
                                        <div class="text ">业绩占比</div><span class="num">{{item.todayNewCustomerPerformanceRatio}}%</span>
                                    </div>
                                </div>
                                <div class="con_bottom">
                                    <div class="flex_l">
                                        <div class="text">老客成交</div><span class="num">{{item.todayOldCustomerPerformance}}w</span>
                                    </div>
                                    <div class="flex_l">
                                        <div class="text ">业绩占比</div><span class="num">{{item.todayOldCustomerPerformanceRatio}}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item_left">
                            <div class="allnum">{{item.performance}}w</div>
                            <div class="con">
                                <div class="con_top">
                                    <div class="flex_l">
                                        <div class="text">新客成交</div><span class="num">{{item.newCustomerPerformance}}w</span>
                                    </div>
                                    <div class="flex_l">
                                        <div class="text ">业绩占比</div><span class="num">{{item.newCustomerPerformanceRatio}}%</span>
                                    </div>
                                </div>
                                <div class="con_bottom">
                                    <div class="flex_l">
                                        <div class="text">老客成交</div><span class="num">{{item.oldCustomerPerformance}}w</span>
                                    </div>
                                    <div class="flex_l">
                                        <div class="text ">业绩占比</div><span class="num">{{item.oldCustomerPerformanceRatio}}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
               
            </div>
        </div>
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
    <van-loading size="24px" vertical text-color="#fff" color="#fff" style="height:100vh;padding:140px 0 0 0px;background:#C0D6FE;margin-left:60px" v-else>加载中...</van-loading>
</template>
<script>
import  * as api from "@/api/order.js";

export default {
    data(){
        return{
            isLoading:false,
            time:this.$moment().format("YYYY-MM-DD"),
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2026, 10, 1),
            currentDate:  this.$moment().format("YYYY-MM-DD"),
            timeModel:false,
            // 业绩
            performance:[],
            todayPerFormance:0,
            allPerFormance:0,
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
            this.getcooperateLiveAnchorPerformanceData()
        },
        // 获取合作达人业绩
        getcooperateLiveAnchorPerformanceData(){
            const data ={
                // year:this.$moment(this.time).format("YYYY"),
                // month:this.$moment(this.time).format("MM"),
                checkDate:this.$moment(this.time).format("YYYY-MM-DD")
            }
            this.isLoading = true
            api.cooperateLiveAnchorPerformanceData(data).then((res)=>{
                if(res.code == 0){
                    this.isLoading  = false
                    const {data} = res.data
                    data.map((item,index) => {
                    if(item.liveanchorName == '整体业绩'){
                        data.unshift(data.splice(index , 1)[0]);
                        this.todayPerFormance = item.todayPerformance
                        this.allPerFormance = item.performance
                    }
                })
                    this.performance =  data
                }else{
                    this.$toast(res.msg)
                }
            })
        }
    },
    created(){
        this.getcooperateLiveAnchorPerformanceData()
    }

}
</script>

<style scoped lang="less">
.contents{
    width: 100%;
    height: 100vh;
    padding-left: 60px;
    box-sizing: border-box;
    background:#C0D6FE;
    font-size: 12px;
    padding-top: 10px;
    .time{
        text-align: end;
        font-size: 14px;
        color: #fff;
        padding-right: 10px;
        margin-bottom: 10px;
    }
    .num_content{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        .item_num_con{
            width: 48%;
            background: #e9f3ff;
            border-radius: 8px;
            padding: 10px;
            box-sizing: border-box;
            margin-bottom: 10px;
            .allnum{
                font-size: 16px;
                color: #5492FE;
            }
        }
    }
    .list_con{
        width: 96%;
        margin:  0 auto;
        .list{
            display: flex;
            background: #e9f3ff;
            border-radius: 5px;
            padding: 5px;
            box-sizing: border-box;
            margin-bottom: 10px;
            .item{
                flex:1;
                font-size: 12px;
                .item_contet{
                    display: flex;
                    justify-content: space-between;
                }
                // background: #e9f3ff;
                .item_left:last-child{
                    border: none;
                    padding-left:10px;
                }
                .item_left:first-child{
                    padding-right:10px;
                    box-sizing: border-box;
                }
                .item_left{
                    border-right: 1px solid #D9D9D9;
                    width: 50%;
                    
                    .con{
                        // display: flex;
                        // justify-content: space-between;
                        // .text{
                        //     width: 30px;
                        // }
                        .con_top,.con_bottom{
                            display: flex;
                            justify-content: space-between;
                            align-content: center;
                        }
                    }
                    .flex_l{
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        .num{
                            color: #5492FE;
                        }
                    }
                    .allnum{
                        font-size: 16px;
                        color: #5492FE;
                        margin: 5px 0;
                    }
                   
                }
                
            }
        }
    }
}
</style>