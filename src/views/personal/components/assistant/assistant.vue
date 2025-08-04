<template>
    <div class="contents" v-if="isLoading == false">
        <div class="nav_top_con">
            <div class="nav_con_d" >
                <div class="daodao" >{{$route.query.liveAnchorBaseName}}</div>
            </div>
            <div class="right_time" @click="timeClick">
                <span>{{time}}</span> 
                <i class="iconfont icon-xiangxia icon_xia"></i>
            </div>
        </div>
         <div class="contents2"  :style="{height:performance.length < 5 ? '100vh' : 'auto'}">
       <div class="assistant_list" v-for="(item,index) in performance" :key="index">
        <!-- @click="$router.push({path:'/assistantDetails',query:{customerServiceId:item.customerServiceId}})" -->
            <div class="assistant_item" >
                <!--<div class="assistant_left" style="color:#FF0000" v-if="index == 0">{{item.customerServiceName}}</div>
                <div class="assistant_left" style="color:#FF6600" v-else-if="index == 1">{{item.customerServiceName}}</div>
                <div class="assistant_left" style="color:#FFC760" v-else-if="index == 2">{{item.customerServiceName}}</div>
                <div class="assistant_left"  v-else>{{item.customerServiceName}}</div>
                <div class="assistant_right">
                     <div class="assistant_top">
                        <span class="tit">总业绩</span>
                        <span class="tit_num">{{item.totalPerformance}}w</span>
                    </div>
                    <div class="assistant_bottom">
                        <div class="new_achievement">
                            <div class="achievement_num">{{item.newCustomerPerformance}}w</div>
                            <div class="achievement_title">新客业绩</div>
                        </div>
                        <div class="new_achievement">
                            <div class="achievement_num">{{item.oldCustomerPerformance}}w</div>
                            <div class="achievement_title">老客业绩</div>
                        </div>
                        <div class="new_achievement">
                            <div class="achievement_num">{{item.visitNumRatio}}%</div>
                            <div class="achievement_title">上门率</div>
                        </div>
                    </div> 
                    
                </div>-->
                <div class="title">{{item.customerServiceName}}</div>
                    <div class="item">
                        <div>总业绩 <span>{{item.totalPerformance}}w</span></div>
                        <div>新客业绩 <span>{{item.newCustomerPerformance}}w</span></div>
                        <div>老客业绩 <span>{{item.oldCustomerPerformance}}w</span></div>
                    </div>
                    <div class="item">
                        <div>总上门 <span>{{item.totalVisitCount}}人</span></div>
                        <div>新客上门 <span>{{item.newCustomerVisitCount}}人</span></div>
                        <div>老客上门 <span>{{item.oldCustomerVisitCount}}人</span></div>
                    </div>
                    <div class="item">
                        <!-- <div>上门率 <span>{{item.visitNumRatio}}%</span></div>
                        <div>成交率 <span>{{item.dealNumRatio}}%</span></div>
                        <div>复购率 <span>{{item.buyAgainNumRatio}}%</span></div> -->
                        <div>上门率 <span :style="{color:item.visitNumRatio > item.visitNumHealthNumber ? 'green' : item.visitNumRatio < item.visitNumHealthNumber ? 'red' : '#5492FE'}">{{item.visitNumRatio}}%</span></div>
                        <div>成交率 <span :style="{color:item.dealNumRatio > item.dealNumHealthNumber ? 'green' : item.dealNumRatio < item.dealNumHealthNumber ? 'red' : '#5492FE'}">{{item.dealNumRatio}}%</span></div>
                        <div>复购率 <span :style="{color:item.buyAgainNumRatio > item.buyAgainNumHealthNumber ? 'green' : item.buyAgainNumRatio < item.buyAgainNumHealthNumber ? 'red' : '#5492FE'}">{{item.buyAgainNumRatio}}%</span></div>
                    </div>
            </div>
       </div>
       <!-- <div class="no_data" :style="{height:!performance ? '90%' : '5px',position:'absolute',bottom:!performance ? '40%' : '0px'}">没有更多了</div> -->
       <!-- <div class="no_data" v-if="!performance" :style="{height:!performance ? '94%' : '5px',position:'absolute',bottom:!performance ? '0' : '30px',left:'49%'}">没有更多了</div> -->
       <!-- <div class="no_data">没有更多了</div> -->
       <div class="no_data" v-if="performance.length>1">没有更多了</div>
       <div  v-if="performance.length == 0 || performance == []" style="padding-top:100px;text-align:center;font-size:12px;color:#fff">暂无数据</div>

    </div>
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
    <van-loading size="24px" vertical text-color="#fff" color="#fff" style="height:100vh;padding:140px 0 0 0px;background:linear-gradient(#8ab4fe,#f5f5f5);" v-else>加载中...</van-loading>
</template>
<script>
import  * as api from "@/api/order.js";

export default {
    props:{
    },
    components:{
    },
    data(){
        return{
            // activeItem:0,
            // navList:[
            //     {
            //         id:0,
            //         name:'刀刀组'
            //     },
            //     {
            //         id:1,
            //         name:'吉娜组'
            //     },
                
            // ],
            time:this.$moment().format("YYYY-MM"),
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2026, 10, 1),
            currentDate:  this.$moment().format("YYYY-MM"),
            timeModel:false,
            performance:[],
            isLoading:false
           
        }
    },
    methods:{
        // tab切换
        navClick(value){
            sessionStorage.setItem('assistantActive',value)
            if(value == 0){
                this.activeItem = value
                this.getcustomerServicePerformance()
                return
            }else{
                this.activeItem = value
                this.getcustomerServicePerformance()
                return
            }
            
        },
        // 时间选择
        timeClick(){
            this.currentDate = new Date(this.$moment(this.time).format("YYYY-MM-DD"))
            this.timeModel = true
        },
        // 时间确认
        timeConfirm(value){
            this.time = this.$moment(value).format("YYYY-MM")
            this.timeModel = false
            this.getcustomerServicePerformance()
        },
        // // 获取主播id
        // getAnchor(){
        //     const data = {
        //         isSelfLiveAnchor:true
        //     }
        //     api.LiveAnchorBaseInfo(data).then((res)=>{
        //         if(res.code === 0) {
        //             res.data.liveAnchorBaseInfos.map(item=>{
        //                 if(item.name == '刀刀'){
        //                     sessionStorage.setItem('daodaoid',item.id)
        //                 }else if(item.name == '吉娜'){
        //                     sessionStorage.setItem('jinaid',item.id)
        //                 }
        //             })
        //         }
        //     })
        // },
        // // 获取助理业绩
        // getcustomerServicePerformance(){
        //     const data ={
        //         year:this.$moment(this.time).format("YYYY"),
        //         month:this.$moment(this.time).format("MM"),
        //         liveAnchorBaseId:this.activeItem == 0 ? sessionStorage.getItem('daodaoid') : sessionStorage.getItem('jinaid'),
        //         isSelfLiveAnchor:true
        //     }
        //     this.isLoading = true
        //     api.customerServicePerformance(data).then((res)=>{
        //         if(res.code == 0){
        //            this.performance =  res.data.performance
        //            this.isLoading = false
        //         }else{
        //             this.$toast(res.msg)
        //         }
        //     })
        // }
        // 根据id获取主播个人信息
        getAnchor(){
            api.LiveAnchorBaseInfoAnchor(this.$route.query.liveAnchorBaseId).then((res)=>{
                if(res.code === 0){
                    sessionStorage.setItem('isSelfLivevAnchors',res.data.liveAnchorBaseInfo.isSelfLivevAnchor)
                }
            })
        },
        // 获取主播数据
        getcustomerServicePerformance(){
            const data ={
                year:this.$moment(this.time).format("YYYY"),
                month:this.$moment(this.time).format("MM"),
                liveAnchorBaseId:this.$route.query.liveAnchorBaseId,
                isSelfLiveAnchor:sessionStorage.getItem('isSelfLivevAnchors')
            }
            this.isLoading = true
            api.customerServicePerformance(data).then((res)=>{
                if(res.code == 0){
                    this.performance =  res.data.performance
                    this.isLoading = false
                }else{
                    this.$toast(res.msg)
                }
            })
        }
    },
    created(){
        // if(this.activeItem == 0){
        //     this.getcustomerServicePerformance()
        //     return
        // }
        this.getAnchor()
        this.getcustomerServicePerformance()
        this.activeItem = sessionStorage.getItem('assistantActive') ? sessionStorage.getItem('assistantActive') : 0
        // setTimeout(()=>{
        //     this.getcustomerServicePerformance()
        // },1000)
    }
}
</script>

<style scoped lang="less">
.contents{
    width: 100%;
    background:linear-gradient(#8ab4fe,#f5f5f5);
    // height: 100vh;
    .nav_top_con{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            box-sizing: border-box;
            font-size: 14px;
            .nav_con_d{
                display: flex;
                .daodao{
                    background: linear-gradient(#6398f8,#4980e6);
                    padding: 5px 20px;
                    box-sizing: border-box;
                    margin-right: 10px;
                    color: #fff;
                    border-radius: 8px;
                }
            }
            
        }
    
    
    .right_time{
        color: #fff;
    }
    .contents2{
    width: 100%;
    // height: 100vh;
   
    .assistant_list{
        width: 100%;
        .assistant_item{
            width: 94%;
            display: flex;
            flex-direction: column;
            // align-items: center;
            padding: 5px 10px;
            box-sizing: border-box;
            background: #e9f3ff;
            border-radius: 10px;
            margin: 10px auto 0;
            font-size: 10px;
            .title{
                width: 100%;
                text-align: center;
                font-size: 13px;
                color: #5492FE;
            }
            .item{
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #ccc;
                padding: 5px 0;
                div{
                    width: 33%;
                    text-align: center;
                    margin-top: 10px;
                    border-right: 1px solid #ccc;
                    // padding-right: 10px;
                    // box-sizing: border-box;
                    span{
                        color: #5492FE;
                    }
                }
                div:last-child{
                    border: none;
                }
            }
            // .assistant_left{
            //     font-size: 15px;
            //     font-weight: bold;
            //     margin-right: 10px;
            //     width: 80px;
            //     padding-left: 10px;
            //     box-sizing: border;
            // }
            // .assistant_right{
            //     flex:1;
            //     .assistant_top{
            //         border-bottom: 1px solid #ccc;
            //         padding-bottom: 5px;
            //         box-sizing: border-box;
            //         .tit{
            //             font-size: 12px;
            //             color: #888585;
            //         }
            //         .tit_num{
            //             font-size: 15px;
            //             color: #5492FE;
            //             margin-left: 5px;
            //         }
            //     }
            //     .assistant_bottom{
            //         font-size: 12px;
            //         padding: 5px 0;
            //         box-sizing: border-box;
            //         display: flex;
            //         justify-content: space-around;
            //         .new_achievement{
            //             border-right: 1px solid #ccc;
            //             display: flex;
            //             flex-direction: column;
            //             text-align: center;
            //             padding-right:10px;
            //             box-sizing: border-box;
            //             justify-content: center;
            //             .achievement_num{
            //                 font-size: 14px;
            //                 color: #5492FE;
            //                 margin-top: 3px;
            //                 // margin-right: 10px;
            //                 text-align: center;
            //             }
            //         }
            //         .new_achievement:last-child{
            //             border: none;
            //         }
                    
            //     }
            // }
        }
    }
    .no_data{
        text-align: center;
        color: #ccc;
        font-size: 14px;
        box-sizing: border-box;
        // padding: 10px 0;
        // box-sizing: border-box;
        margin-top: 5px;
        padding-bottom: 20px;
        box-sizing: border-box;
        
    }
}
}
</style>