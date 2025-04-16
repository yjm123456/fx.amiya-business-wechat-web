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
        <div class="content_r">
            <div class="con_left">
                <!-- 当日业绩 -->
                <perforamance :time="time" ref="daodaos" :performance="performance.currentDateDataVo"  :isLoading="isLoading" title="当日业绩"/>
            </div>
            <div class="con_right">
                <!-- 总业绩 -->
                <perforamance :time="time" ref="daodaos" :performance="performance.monthDataVo"  :isLoading="isLoading" title="总业绩"/>
            </div>
        </div>
        <div class="no_data">没有更多了</div>

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
    <van-loading size="24px" vertical text-color="#fff" color="#fff" style="height:100vh;padding:140px 0 0 0px;background:linear-gradient(#8ab4fe,#f5f5f5);" v-else>加载中...</van-loading>
</template>
<script>
import  * as api from "@/api/order.js";
import perforamance from "../perforamance/perforamance.vue"
export default {
    components:{
        perforamance
    },
    props:{
       
    },
    data(){
        return{
            // 加载中
            isLoading:false,
            // 时间参数
            time:this.$moment().format("YYYY-MM-DD"),
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2026, 10, 1),
            currentDate:  this.$moment().format("YYYY-MM"),
            // 时间弹窗
            timeModel:false,
        }
    },
    methods:{
        // 时间弹窗
        timeClick(){
            this.currentDate = new Date(this.$moment(this.time).format("YYYY-MM-DD"))
            this.timeModel = true
        },
        // 时间确认
        timeConfirm(value){
            this.time = this.$moment(value).format("YYYY-MM")
            this.timeModel = false
            this.getPerformanceByLiveAnchorName()
        },
        // 根据id获取主播个人信息
        getLiveAnchorBaseInfoAnchor(){
            api.LiveAnchorBaseInfoAnchor(this.$route.query.liveAnchorBaseId).then((res)=>{
                if(res.code === 0){
                    sessionStorage.setItem('isSelfLivevAnchor',res.data.liveAnchorBaseInfo.isSelfLivevAnchor)
                }
            })
        },
        // 获取主播数据
        getPerformanceByLiveAnchorName(){
            const data ={
                // year:this.$moment(this.time).format("YYYY"),
                // month:this.$moment(this.time).format("MM"),
                date:this.$moment(this.time).format("YYYY-MM-DD"),
                liveAnchorBaseId:this.$route.query.liveAnchorBaseId,
                isSelfLiveAnchor:sessionStorage.getItem('isSelfLivevAnchor')
            }
            this.isLoading = true
            api.PerformanceByLiveAnchorName(data).then((res)=>{
                if(res.code == 0){
                    this.performance =  res.data.performance
                    this.isLoading = false
                }else{
                    this.$toast(res.msg)
                }
            })
        }
    },
    mounted(){
        
    },
    created(){
        this.getLiveAnchorBaseInfoAnchor()
        this.getPerformanceByLiveAnchorName()
        
    }
}
</script>
<style scoped lang="less">
.contents{
    width: 100%;
    background:linear-gradient(#8ab4fe,#f5f5f5);
    // padding: 0 30px;
    .nav_top_con{
        width: 100%;
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
        .right_time{
            color: #fff;
        }
        
    }
     .content_r{
        width:100%;
        display: flex;
    }
    .con_left,.con_right{
            width:50%;
        }
    .top{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        box-sizing: border-box;
        margin-top: 10px;
        font-size: 12px;
        .top_con{
            width: 70%;
            background-image: url(../../../../assets/dataCenter.png) ;
            background-size: 100% 100%;
            border-radius: 10px/10px;
            padding: 10px;
            box-sizing: border-box;
            .total_num{
                color: #5492FE;
                font-size: 16px;
                margin-top: 5px;
                
            }
            .line{
                width: 70px;
                height: 1px;
                border: 1px solid #5492FE;
                margin: 5px 0;
            }
            .bot_num{
                display: flex;
                justify-content: space-between;
                .num{
                    font-size: 14px;
                    color: #5492FE;
                    .icon_ziy{
                        font-size: 10px;
                    }
                   
                }
                .red{
                    color: green;
                }
                .green{
                    color: red;
                }
                .bot_r{
                }
            }
        }
        .time{
            font-size: 13px;
            color: #fff;
            .icon_xia{
                font-size: 20px;
            }
        }
        
    }
    .center{
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 5px 10px;
        box-sizing: border-box;
        .cen_left{
            width: 49%;
            background: #e9f3ff;
            border-radius: 10px;
            padding: 10px;
            box-sizing: border-box;
            .new_customer_con{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .new_customer{
                    font-size: 13px;
                }
                .target{
                    font-size: 12px;
                    color: #767474;
                }
            }
            .total_num{
                font-size: 15px;
                color: #5492FE;
                margin-top: 4px;
            }
            .line{
                width: 70px;
                height: 1px;
                border: 1px solid #5492FE;
                margin: 5px 0;
            }
            .cen_bot_w{
                display: flex;
                font-size: 12px;
                justify-content: space-between;
                margin-bottom: 5px;
                .c_title{
                    width: 20px;
                }
                .t_con{
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    .t_h{
                        // width: 30px;
                        text-align: center;
                    }
                    .icon_ziy{
                        font-size: 10px;
                    }
                    .red{
                    color: green;
                }
                
                .green{
                    color: red;
                }
                }
                .t_con1{
                    display: flex;
                    align-items: center;
                    .t_h{
                        text-align: center;
                    }
                    .icon_ziy{
                        font-size: 10px;
                    }
                    .red{
                    color: green;
                }
                
                .green{
                    color: red;
                }
                }
                
            }
        }
    }
    .no_data{
        text-align: center;
        padding: 10px 0;
        box-sizing: border-box;
        color: #ccc;
        font-size: 14px;
    }
    
}
</style>