<template>
    <div class="content_i" :style="{height:innerHeight > 800 ? '100vh' : 'auto'}">
        <div class="top">
            <div class="top_con">
                <div class="top_title">{{title}}<div class="total_num">{{performance.cueerntMonthTotalPerformance ? performance.cueerntMonthTotalPerformance + 'w': ' 0w'}}</div></div>
                
                <div class="bot_num">
                    <span>目标 <div class="num"> {{performance.totalPerformanceTarget ? performance.totalPerformanceTarget + 'w': ' -'}}</div></span>
                    <span class="bot_r">完成率 <div class="num">{{ performance.totalPerformanceTargetComplete ? performance.totalPerformanceTargetComplete : '-'}}</div></span>
                </div>
                <div class="bot_num" >
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
            <div class="cen_left" >
                <div class="new_customer_con">
                    <span class="new_customer">{{title == '总业绩' ? '新客总业绩' : '新客业绩'}}</span>
                    <div class="total_num">{{performance.currentMonthNewCustomerPerformance ? performance.currentMonthNewCustomerPerformance + 'w': '0w'}}</div>
                    <!-- <span class="target">目标<span>{{performance.newCustomerPerformanceTarget ? performance.newCustomerPerformanceTarget + 'w': ' -'}}</span></span> -->
                </div>
                
                <div class="cen_bot_w">
                    <div  class="t_con2">
                        <div class="t_h">目标</div>
                        <span>{{performance.newCustomerPerformanceTarget ? performance.newCustomerPerformanceTarget + 'w': ' -'}}</span>
                    </div>
                    <div class="t_con">
                        <div  class="t_h">完成比率</div>
                        <span>{{performance.newCustomerPerformanceTargetComplete ? performance.newCustomerPerformanceTargetComplete : '-'}}</span>
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
                <div class="cen_bot_w">
                    <div  class="t_con">
                        <span class="t_h">业绩占比 {{performance.newCustomerPerformanceRatio ? performance.newCustomerPerformanceRatio + '%' : '-'}}</span>
                    </div>
                </div>
            </div>

            <div class="cen_left" >
                <div class="new_customer_con">
                    <span class="new_customer">{{title == '总业绩' ? '老客总业绩' : '老客业绩'}}</span>
                    <div class="total_num">{{performance.currentMonthOldCustomerPerformance ? performance.currentMonthOldCustomerPerformance+'w' : ' 0w'}}</div>

                </div>
                <div class="cen_bot_w">
                    
                    <div  class="t_con2">
                        <div class="t_h">目标</div>
                        <span>{{performance.oldCustomerTarget ? performance.oldCustomerTarget +'w': ' -'}}</span>
                    </div>
                    <div class="t_con">
                        <div  class="t_h">完成比率</div>
                        <span>{{performance.oldCustomerTargetComplete ? performance.oldCustomerTargetComplete : '-'}}</span>
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

        <div class="center">
            <div class="cen_left" style="padding:25px 10px;">
                <div class="new_customer_con">
                    <span class="new_customer">{{title == '总业绩' ? '有效总业绩' : '有效业绩'}}</span>
                    <div class="total_num">{{performance.existPricePerformance ? performance.existPricePerformance +'w': '0w'}}</div>
                </div>
                
                <div class="cen_bot_w" >
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
                <div class="cen_bot_w">
                    <div  class="t_con1">
                        <div class="t_h">业绩占比 </div>
                        <span style="margin-left:4px;margin-top:1px">{{ performance.existPricePerformanceRatio ?  performance.existPricePerformanceRatio + '%' : ' -'}}</span>
                    </div>
                </div>
            </div>

            <div class="cen_left" style="padding:25px 10px;">
                <div class="new_customer_con">
                    <span class="new_customer">{{title == '总业绩' ? '潜在总业绩' : '潜在业绩'}}</span>
                    <div class="total_num">{{performance.zeroPricePerformance ? performance.zeroPricePerformance + 'w': '0w'}}</div>
                </div>
                
                <div class="cen_bot_w" >
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
                <div class="cen_bot_w">
                    <div  class="t_con1">
                        <div class="t_h">业绩占比 </div>
                        <span style="margin-left:4px;margin-top:1px">{{ performance.zeroPricePerformanceRatio ?  performance.zeroPricePerformanceRatio + '%' : ' -'}}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="center">
            <div class="cen_left">
                <div class="new_customer_con">
                    <span class="new_customer"> <div>当月派单</div><div>{{title == '总业绩' ? '当月成交业绩' : '当日成交业绩'}}</div></span>
                </div>
                <div class="total_num">{{performance.duringMonthSendDuringMonthDeal ? performance.duringMonthSendDuringMonthDeal + 'w' : ' -'}}</div>
                <div class="line"></div>
                <div class="cen_bot_w">
                    <div  class="t_con1">
                        <div class="t_h">业绩占比 </div>
                        <span style="margin-left:4px;margin-top:1px">{{ performance.duringMonthSendDuringMonthDealPerformanceRatio ?  performance.duringMonthSendDuringMonthDealPerformanceRatio + '%' : ' -'}}</span>
                    </div>
                </div>
                <div class="cen_bot_w" >
                    <div class="t_con">
                        <div  class="t_h">同比</div>
                        <span>
                            <span v-if="Math.sign(performance.duringMonthSendDuringMonthDealYearOnYear)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.duringMonthSendDuringMonthDealYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.duringMonthSendDuringMonthDealYearOnYear)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.duringMonthSendDuringMonthDealYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                        </span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">环比</div>
                        <div>
                            <span v-if="Math.sign(performance.duringMonthSendDuringMonthDealChainRatio)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.duringMonthSendDuringMonthDealChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.duringMonthSendDuringMonthDealChainRatio)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.duringMonthSendDuringMonthDealChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cen_left">
                <div class="new_customer_con">
                    <span class="new_customer"> <div>历史派单</div><div>{{title == '总业绩' ? '当月成交业绩' : '当日成交业绩'}}</div></span>
                </div>
                <div class="total_num">{{performance.historySendDuringMonthDeal ? performance.historySendDuringMonthDeal + 'w': ' -'}}</div>
                <div class="line"></div>
                <div class="cen_bot_w">
                    <div  class="t_con1">
                        <div class="t_h">业绩占比 </div>
                        <span style="margin-left:4px;margin-top:1px">{{ performance.historySendDuringMonthDealPerformanceRatio ?  performance.historySendDuringMonthDealPerformanceRatio + '%' : ' -'}}</span>
                    </div>
                </div>
                <div class="cen_bot_w" >
                    <div class="t_con">
                        <div  class="t_h">同比</div>
                        <span>
                            <span v-if="Math.sign(performance.historySendDuringMonthDealYearOnYear)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.historySendDuringMonthDealYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.historySendDuringMonthDealYearOnYear)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.historySendDuringMonthDealYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                        </span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">环比</div>
                        <div>
                            <span v-if="Math.sign(performance.historySendDuringMonthDealChainRatio)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.historySendDuringMonthDealChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.historySendDuringMonthDealChainRatio)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.historySendDuringMonthDealChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="center">
            <div class="cen_left">
                <div class="new_customer_con">
                    <span class="new_customer">视频业绩</span>
                </div>
                <div class="total_num">{{performance.videoConsultationPerformance ? performance.videoConsultationPerformance + 'w': ' -'}}</div>
                <div class="line"></div>
                <div class="cen_bot_w">
                    <div  class="t_con1">
                        <div class="t_h">业绩占比 </div>
                        <span style="margin-left:4px;margin-top:1px">{{ performance.videoConsultationPerformanceRatio ?  performance.videoConsultationPerformanceRatio + '%' : ' -'}}</span>
                    </div>
                </div>
                <div class="cen_bot_w" >
                    <div class="t_con">
                        <div  class="t_h">同比</div>
                        <span>
                            <span v-if="Math.sign(performance.videoConsultationPerformanceYearOnYear)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.videoConsultationPerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.videoConsultationPerformanceYearOnYear)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.videoConsultationPerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                        </span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">环比</div>
                        <div>
                            <span v-if="Math.sign(performance.videoConsultationPerformanceChainRatio)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.videoConsultationPerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.videoConsultationPerformanceChainRatio)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.videoConsultationPerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cen_left">
                <div class="new_customer_con">
                    <span class="new_customer">照片业绩</span>
                </div>
                <div class="total_num">{{performance.pictureConsultationPerformance ? performance.pictureConsultationPerformance + 'w': ' -'}}</div>
                <div class="line"></div>
                <div class="cen_bot_w">
                    <div  class="t_con1">
                        <div class="t_h">业绩占比 </div>
                        <span style="margin-left:4px;margin-top:1px">{{ performance.pictureConsultationPerformanceRatio ?  performance.pictureConsultationPerformanceRatio + '%' : ' -'}}</span>
                    </div>
                </div>
                <div class="cen_bot_w" >
                    <div class="t_con">
                        <div  class="t_h">同比</div>
                        <span>
                            <span v-if="Math.sign(performance.pictureConsultationPerformanceYearOnYear)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.pictureConsultationPerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.pictureConsultationPerformanceYearOnYear)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.pictureConsultationPerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                        </span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">环比</div>
                        <div>
                            <span v-if="Math.sign(performance.pictureConsultationPerformanceChainRatio)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.pictureConsultationPerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.pictureConsultationPerformanceChainRatio)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.pictureConsultationPerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="center">
            <div class="cen_left">
                <div class="new_customer_con">
                    <span class="new_customer">主播接诊业绩</span>
                </div>
                <div class="total_num">{{performance.acompanyingPerformance ? performance.acompanyingPerformance + 'w': ' -'}}</div>
                <div class="line"></div>
                <div class="cen_bot_w">
                    <div  class="t_con1">
                        <div class="t_h">业绩占比 </div>
                        <span style="margin-left:4px;margin-top:1px">{{ performance.acompanyingPerformanceRatio ?  performance.acompanyingPerformanceRatio + '%' : ' -'}}</span>
                    </div>
                </div>
                <div class="cen_bot_w" >
                    <div class="t_con">
                        <div  class="t_h">同比</div>
                        <span>
                            <span v-if="Math.sign(performance.acompanyingPerformanceYearOnYear)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.acompanyingPerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.acompanyingPerformanceYearOnYear)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.acompanyingPerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                        </span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">环比</div>
                        <div>
                            <span v-if="Math.sign(performance.acompanyingPerformanceChainRatio)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.acompanyingPerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.acompanyingPerformanceChainRatio)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.acompanyingPerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cen_left">
                <div class="new_customer_con">
                    <span class="new_customer">非主播接诊业绩</span>
                </div>
                <div class="total_num">{{performance.notAcompanyingPerformance ? performance.notAcompanyingPerformance + 'w': ' -'}}</div>
                <div class="line"></div>
                <div class="cen_bot_w">
                    <div  class="t_con1">
                        <div class="t_h">业绩占比 </div>
                        <span style="margin-left:4px;margin-top:1px">{{ performance.notAcompanyingPerformanceRatio ?  performance.notAcompanyingPerformanceRatio + '%' : ' -'}}</span>
                    </div>
                </div>
                <div class="cen_bot_w" >
                    <div class="t_con">
                        <div  class="t_h">同比</div>
                        <span>
                            <span v-if="Math.sign(performance.notAcompanyingPerformanceYearOnYear)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.notAcompanyingPerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.notAcompanyingPerformanceYearOnYear)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.notAcompanyingPerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                        </span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">环比</div>
                        <div>
                            <span v-if="Math.sign(performance.notAcompanyingPerformanceChainRatio)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.notAcompanyingPerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.notAcompanyingPerformanceChainRatio)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.notAcompanyingPerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
   
</template>
<script>

export default {
    props:{
        title:String,
        time:String,
        performance:Object,
        dataObj:Object,
        isLoading:Boolean
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
.content_i{
    width: 100%;
    .top{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        box-sizing: border-box;
        margin-top: 10px;
        font-size: 12px;
        .top_con{
            margin-bottom: 10px;
            width:100%;
            background-image: url(../../../assets/dataCenter.png) ;
            background-size: 100% 100%;
            border-radius: 10px/10px;
            padding: 10px;
            box-sizing: border-box;
            .top_title{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 5px;
            }
            .total_num{
                color: #5492FE;
                font-size: 16px;
                border-bottom: 2px solid #5492FE;
                
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
        padding: 0 10px;
        box-sizing: border-box;
        
        .cen_left{
            width: 100%;
            background: #e9f3ff;
            border-radius: 10px;
            padding: 10px;
            box-sizing: border-box;
            margin-bottom: 10px;
            .new_customer_con{
                display: flex;
                justify-content: space-between;
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
                font-size: 15px;
                color: #5492FE;
                border-bottom: 2px solid #5492FE;
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
                margin-top: 5px;
                .c_title{
                    width: 20px;
                }
                .t_con{
                    display: flex;
                    align-items: flex-end;
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