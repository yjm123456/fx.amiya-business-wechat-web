<template>
    <div class="contents" v-if="isLoading == false">
        <div class="content_r">
            <div class="con_left">
                <!-- 当日业绩 -->
                <doctorPerformance :time="time" ref="daodaos" :performance="performance.currentDateDataVo"  :isLoading="isLoading" title="当日业绩"/>
            </div>
            <div class="con_right">
                <!-- 总业绩 -->
                <doctorPerformance :time="time" ref="daodaos" :performance="performance.monthDataVo"  :isLoading="isLoading" title="总业绩"/>
            </div>
        </div>
        
        <div class="no_data">没有更多了</div>
    </div>
    <van-loading size="24px" vertical text-color="#fff" color="#fff" style="height:100vh;padding:140px 0 0 0px;background:#C0D6FE;margin-left:60px" v-else>加载中...</van-loading>
</template>
<script>
import doctorPerformance from "./doctorPerformance.vue"
export default {
    components:{
        doctorPerformance
    },
    props:{
        time:String,
        performance:Object,
        dataObj:Object,
        isLoading:Boolean
    },
    data(){
        return{
        }
    },
    methods:{
        
    }
}
</script>
<style scoped lang="less">
.contents{
    width: 100%;
    padding-left: 60px;
    box-sizing: border-box;
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
            background-image: url(../../../assets/dataCenter.png) ;
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