<template>
    <div :style="{height:innerHeight > 800 ? '100vh' : 'auto'}">
        <div class="top">
            <div class="top_con">
                <div class="top_title"><div>{{title}}</div> <div class="total_num">{{performance.cueerntMonthTotalPerformance ? performance.cueerntMonthTotalPerformance + 'w' : ' 0w'}}</div></div>
                <!-- <div class="total_num">{{performance.cueerntMonthTotalPerformance ? performance.cueerntMonthTotalPerformance + 'w' : ' -'}}</div> -->
                <!-- <div class="line2"></div> -->
                <div class="bot_num">
                    <span>目标 <div class="num"> {{performance.totalPerformanceTarget ? performance.totalPerformanceTarget + 'w' : ' -'}}</div></span>
                    <span class="bot_r">完成率 <div class="num">{{ performance.totalPerformanceTargetComplete ? performance.totalPerformanceTargetComplete + '%' : '-'}} </div></span>
                </div>
                <div class="bot_num" style="margin-top:3px">
                    <span>
                        同比
                        <div v-if="Math.sign(performance.totalPerformanceYearOnYear)== 1"> {{ Math.abs(performance.totalPerformanceYearOnYear) + '%'}}<span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span></div>
                        <div v-else-if="Math.sign(performance.totalPerformanceYearOnYear)== -1">{{ Math.abs(performance.totalPerformanceYearOnYear) + '%'}}<span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span></div>
                        <div v-else>-</div>
                    </span>
                    <span class="bot_r">
                        环比
                        <div v-if="Math.sign(performance.totalPerformanceChainratio)== 1"> {{ Math.abs(performance.totalPerformanceChainratio) + '%'}}<span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span></div>
                        <div v-else-if="Math.sign(performance.totalPerformanceChainratio)== -1">{{ Math.abs(performance.totalPerformanceChainratio) + '%'}}<span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span></div>
                        <div v-else>-</div>
                    </span>
                </div>
            </div>
        </div>
        
        <div class="center">
            <div class="cen_left">
                <div class="new_customer_con">
                    <div class="new_customer"><div>{{title == '总业绩' ? '新客总业绩' : '新客业绩'}}</div>  <div  class="total_num" >{{performance.currentMonthNewCustomerPerformance ? performance.currentMonthNewCustomerPerformance + 'w': ' 0w'}}</div></div>
                    <!-- <span class="target">目标<span>{{performance.newCustomerPerformanceTarget ? performance.newCustomerPerformanceTarget + 'w': ' -'}}</span></span> -->
                </div>
                <div class="cen_bot_w">
                    <!-- <div class="total_num">{{performance.currentMonthNewCustomerPerformance ? performance.currentMonthNewCustomerPerformance + 'w': ' -'}}</div> -->
                    
                </div>
                <!-- <div class="line"></div> -->
                <div class="cen_bot_w"   style="">
                    <div  class="t_con2">
                        <div class="t_h">目标</div>
                        <span >{{performance.newCustomerPerformanceTarget ? performance.newCustomerPerformanceTarget + 'w': ' -'}}</span>
                    </div>
                    <div class="t_con">
                        <div  class="t_h">完成比率</div>
                        <span>{{performance.newCustomerPerformanceTargetComplete ? performance.newCustomerPerformanceTargetComplete  + '%': '-'}}</span>
                    </div>
                    
                </div>
                <div class="cen_bot_w" >
                    <div class="t_con2">
                        <div  class="t_h">同比</div>
                        <span>
                            <span v-if="Math.sign(performance.newCustomerPerformanceYearOnYear)== 1"> {{ Math.abs(performance.newCustomerPerformanceYearOnYear) + '%'}}<span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span></span>
                            <span v-else-if="Math.sign(performance.newCustomerPerformanceYearOnYear)== -1">{{ Math.abs(performance.newCustomerPerformanceYearOnYear) + '%'}}<span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span></span>
                            <span v-else>-</span>
                        </span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">环比</div>
                        <div>
                            <span v-if="Math.sign(performance.newCustomerPerformanceChainRatio)== 1"> {{ Math.abs(performance.newCustomerPerformanceChainRatio) + '%'}}<span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span></span>
                            <span v-else-if="Math.sign(performance.newCustomerPerformanceChainRatio)== -1">{{ Math.abs(performance.newCustomerPerformanceChainRatio) + '%'}}<span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span></span>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
                <div  class="cen_bot_w" style="justify-content:flex-start;">
                    <div class="t_h">业绩占比 {{performance.newCustomerPerformanceRatio ? performance.newCustomerPerformanceRatio + '%' : '-'}}</div>
                </div>
            </div>

            <div class="cen_left">
                <div class="new_customer_con">
                    <div class="new_customer">{{title == '总业绩' ? '老客总业绩' : '老客业绩'}}<div class="total_num">{{performance.currentMonthOldCustomerPerformance ? performance.currentMonthOldCustomerPerformance + 'w': ' 0w'}}</div></div>
                    <!-- <span class="target">目标<span>{{performance.oldCustomerTarget ? performance.oldCustomerTarget + 'w' : ' -'}}</span></span> -->
                </div>
                <div class="cen_bot_w" style="margin-top:4px">
                    <div  class="t_con2">
                        <div class="t_h">目标</div>
                        <span>{{performance.oldCustomerTarget ? performance.oldCustomerTarget + 'w' : ' -'}}</span>
                    </div>
                    <div class="t_con">
                        <div  class="t_h">完成比率</div>
                        <span>{{performance.oldCustomerTargetComplete ? performance.oldCustomerTargetComplete  + '%': '-'}}</span>
                    </div>
                    
                </div>
                <div class="cen_bot_w" >
                    <div class="t_con2">
                        <div  class="t_h">同比</div>
                        <span>
                            <span v-if="Math.sign(performance.oldCustomerPerformanceYearOnYear)== 1"> {{ Math.abs(performance.oldCustomerPerformanceYearOnYear) + '%'}}<span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span></span>
                            <span v-else-if="Math.sign(performance.oldCustomerPerformanceYearOnYear)== -1">{{ Math.abs(performance.oldCustomerPerformanceYearOnYear) + '%'}}<span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span></span>
                            <span v-else>-</span>
                        </span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">环比</div>
                        <div>
                            <span v-if="Math.sign(performance.oldCustomerPerformanceChainRatio)== 1"> {{ Math.abs(performance.oldCustomerPerformanceChainRatio) + '%'}}<span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span></span>
                            <span v-else-if="Math.sign(performance.oldCustomerPerformanceChainRatio)== -1">{{ Math.abs(performance.oldCustomerPerformanceChainRatio) + '%'}}<span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span></span>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
                <div class="cen_bot_w">
                    <div  class="t_con">
                        <div class="t_h">业绩占比 {{performance.oldCustomerPerformanceRatio ? performance.oldCustomerPerformanceRatio + '%' : '-'}}</div>
                    </div>
                </div>
            </div>
            
        </div>

        <div class="center" >
            <div class="cen_left" style="padding:25px 10px;">
                <div class="new_customer_con">
                    <div class="new_customer">{{title == '总业绩' ? '有效总业绩' : '有效业绩'}}<div class="total_num" >{{performance.existPricePerformance ? performance.existPricePerformance + 'w': ' 0w'}}</div></div>
                </div>
                <div style="display:flex;justify-content: space-between;margin-top:1px;align-items:center">
                    <div>
                        <!-- <div class="total_num">{{performance.existPricePerformance ? performance.existPricePerformance + 'w': ' -'}}</div> -->
                        <!-- <div class="line2"></div> -->
                    </div>
                    
                </div>
                
                <!-- <div class="cen_bot_w">
                    <div  class="t_con1">
                        <div class="t_h">业绩占比 </div>
                        <span style="margin-left:4px;margin-top:1px">{{ performance.existPricePerformanceRatio ?  performance.existPricePerformanceRatio + '%' : ' -'}}</span>
                    </div>
                </div> -->
                <div class="cen_bot_w" style="margin-top:3px">
                    <div class="t_con2">
                        <div  class="t_h">同比</div>
                        <span>
                            <span v-if="Math.sign(performance.existPricePerformanceYearOnYear)== 1"> {{ Math.abs(performance.existPricePerformanceYearOnYear) + '%'}}<span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span></span>
                            <span v-else-if="Math.sign(performance.existPricePerformanceYearOnYear)== -1">{{ Math.abs(performance.existPricePerformanceYearOnYear) + '%'}}<span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span></span>
                            <span v-else>-</span>
                        </span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">环比</div>
                        <div>
                            <span v-if="Math.sign(performance.existPricePerformanceChainRatio)== 1"> {{ Math.abs(performance.existPricePerformanceChainRatio) + '%'}}<span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span></span>
                            <span v-else-if="Math.sign(performance.existPricePerformanceChainRatio)== -1">{{ Math.abs(performance.existPricePerformanceChainRatio) + '%'}}<span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span></span>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
                <div class="cen_bot_w"  style="padding-top:4px">
                        <div  class="t_con">
                            <div class="t_h">业绩占比 {{ performance.existPricePerformanceRatio ?  performance.existPricePerformanceRatio + '%' : ' -'}}</div>
                        </div>
                    </div>
            </div>

            <div class="cen_left" style="padding:25px 10px;">
                <div class="new_customer_con" >
                    <div class="new_customer">{{title == '总业绩' ? '潜在总业绩' : '潜在业绩'}}<div  class="total_num" >{{performance.zeroPricePerformance ? performance.zeroPricePerformance + 'w': ' 0w'}}</div></div>
                </div>
                <div style="display:flex;justify-content: space-between;margin-top:1px;align-items:center">
                    <div>
                        <!-- <div class="total_num">{{performance.zeroPricePerformance ? performance.zeroPricePerformance + 'w': ' -'}}</div> -->
                        <!-- <div class="line2"></div> -->
                    </div>
                    
                </div>
                <div class="cen_bot_w"  style="margin-top:2px">
                    <div class="t_con2">
                        <div  class="t_h">同比</div>
                        <span>
                            <span v-if="Math.sign(performance.zeroPricePerformanceYearOnYear)== 1"> {{ Math.abs(performance.zeroPricePerformanceYearOnYear) + '%'}}<span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span></span>
                            <span v-else-if="Math.sign(performance.zeroPricePerformanceYearOnYear)== -1">{{ Math.abs(performance.zeroPricePerformanceYearOnYear) + '%'}}<span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span></span>
                            <span v-else>-</span>
                        </span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">环比</div>
                        <div>
                            <span v-if="Math.sign(performance.zeroPricePerformanceChainRatio)== 1"> {{ Math.abs(performance.zeroPricePerformanceChainRatio) + '%'}}<span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span></span>
                            <span v-else-if="Math.sign(performance.zeroPricePerformanceChainRatio)== -1">{{ Math.abs(performance.zeroPricePerformanceChainRatio) + '%'}}<span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span></span>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
                <div class="cen_bot_w" >
                        <div  class="t_con">
                            <div class="t_h">业绩占比 {{ performance.zeroPricePerformanceRatio ?  performance.zeroPricePerformanceRatio + '%' : ' -'}}</div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>
<script>
import  * as api from "@/api/order.js";

export default {
    props:{
        title:String,
        performance:Object
    },
    data(){
        return{
           innerHeight:0
        }
    },
    mounted(){
        this.innerHeight = window.innerHeight
    }
}
</script>
<style scoped lang="less">
.contents{
    width: 100%;
    padding-left: 60px;
    box-sizing: border-box;
    background:linear-gradient(#8ab4fe,#f5f5f5);
    display: flex;
    .con_left,.con_right{
        width: 50%;
    }
    .top{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding:  10px;
        box-sizing: border-box;
        // margin-top: 10px;
        font-size: 12px;
        margin-top: 15px;
        .top_title{
            text-align: start;
            font-size: 12px;
            margin-bottom: 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .top_con{
            width: 100%;
            background-image: url(../../../assets/dataCenter.png) ;
            background-size: 100% 100%;
            border-radius: 10px/10px;
            padding: 10px;
            box-sizing: border-box;
            .total_num{
                color: #5492FE;
                font-size: 14px;
                // margin-top: 5px;
                border-bottom:2px solid #5492FE;
                padding-bottom: 2px;
                
                
            }
            .line{
                width: 46px;
                height: 1px;
                border: 1px solid #5492FE;
                margin: 5px 0;
                margin-top: -10px;
            }
            .line2{
                width: 46px;
                height: 1px;
                border: 1px solid #5492FE;
                margin: 5px 0;
            }
            .bot_num{
                display: flex;
                justify-content: space-between;
                .num{
                    font-size: 12px;
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
                    text-align: right;
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
        width: 100%;
        padding: 0px 10px;
        box-sizing: border-box;
        .cen_left{
            width: 100%;
            background: #e9f3ff;
            border-radius: 10px;
            padding: 10px;
            box-sizing: border-box;
            margin-bottom: 15px;
            .new_customer_con{
                display: flex;
                justify-content: space-between;
                align-items: center;

                .new_customer{
                    width: 100%;
                    font-size: 12px;
                    text-align: start;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .target{
                    font-size: 12px;
                    color: #767474;
                }
            }
            .new_customer_con2{
                align-items: center;
                .new_customer{
                    font-size: 12px;
                }
                .target{
                    font-size: 12px;
                    color: #767474;
                }
            }
            .total_num{
                font-size: 14px;
                color: #5492FE;
                // margin-top: 4px;
                border-bottom:2px solid #5492FE;
                padding-bottom: 2px;
                
            }
            .line{
                width: 46px;
                height: 1px;
                border: 1px solid #5492FE;
                margin: 5px 0;
                margin-top: -10px;
            }
            .line2{
                width: 46px;
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
                    align-items: flex-end;
                    flex-direction: column;
                    .t_h{
                        // width: 30px;
                        text-align: end;
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
                .t_con2{
                    display: flex;
                    align-items: flex-start;
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