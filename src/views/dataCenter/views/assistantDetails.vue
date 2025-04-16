<template>
    <div class="content">
        <div class="bg_content">
            <div class="assistant_top">
                <span style="font-weight:bold">{{performance.customerServiceName}}</span>
                <div class="time" @click="timeClick">
                    <span>{{time}}</span>
                    <i class="iconfont icon-xiangxia time_icon"></i>
                </div>
            </div>
            <div class="totalPerformance_center">
                <div class="num">{{performance.totalPerformance}}w</div>
                <div>总业绩</div>
            </div>
        </div>
        <div class="rate">
             <div class="rate_item">
                <div class="rate_num">{{performance.visitNumRatio}}%</div>
                <div>总上门率</div>
            </div>
            <div class="rate_item">
                <div class="rate_num">{{performance.thisMonthSendThisMonthVisitNumRatio}}%</div>
                <div>当月上门率</div>
            </div>
            <div class="rate_item">
                <div  class="rate_num">{{performance.newCustomerPerformance}}w</div>
                <div>新客业绩</div>
            </div>
            <div class="rate_item">
                <div  class="rate_num">{{performance.oldCustomerPerformance}}w</div>
                <div>老客业绩</div>
            </div>
        </div>
        <div class="pit_con">
            <div class="pit_item">
                <div class="pit"></div>
                <div class="pit_content1">
                    <div>视频业绩</div>
                    <div class="pit_num">{{performance.videoPerformance}}w</div>
                </div>
            </div>
            <div class="pit_item">
                <div class="pit"></div>
                <div class="pit_content1">
                    <div>照片业绩</div>
                    <div class="pit_num">{{performance.picturePerformance}}w</div>
                </div>
            </div>
            <div class="pit_item">
                <div class="pit"></div>
                <div class="pit_content2">
                    <div>视频/照片占比</div>
                    <div class="pit_num">{{performance.videoAndPictureCompare}}</div>
                </div>
            </div>
            
        </div>
       <div class="pit_con">
            <div class="pit_item">
                <div class="pit"></div>
                <div class="pit_content1">
                    <div>陪诊业绩</div>
                    <div class="pit_num">{{performance.acompanyingPerformance}}w</div>
                </div>
            </div>
            <div class="pit_item">
                <div class="pit"></div>
                <div class="pit_content1">
                    <div>独立业绩</div>
                    <div class="pit_num">{{performance.notAcompanyingPerformance}}w</div>
                </div>
            </div>
            <div class="pit_item">
                <div class="pit"></div>
                <div class="pit_content2">
                    <div>陪诊/独立占比</div>
                    <div class="pit_num">{{performance.isAcompanyingCompare}}</div>
                </div>
            </div>
        </div>
        <div class="pit_con">
            
            <div class="pit_item">
                <div class="pit"></div>
                <div class="pit_content3">
                    <div>潜在业绩</div>
                    <div class="pit_num">{{performance.zeroPerformance}}w</div>
                </div>
            </div>
            <div class="pit_item">
                <div class="pit"></div>
                <div class="pit_content3">
                    <div>有效业绩</div>
                    <div class="pit_num">{{performance.havingPricePerformance}}w</div>
                </div>
            </div>
            <div class="pit_item">
                <div class="pit"></div>
                <div class="pit_content4">
                    <div>潜在/有效占比</div>
                    <div class="pit_num">{{performance.zeroAndHavingPriceCompare}}</div>
                </div>
            </div>
        </div>
        
        <div class="pit_con2">
            <div class="pit_item">
                <div class="pit"></div>
                <div class="pit_content">
                    <div>当月派单当月成交业绩</div>
                    <div class="pit_num">{{performance.thisMonthSendThisMonthDealPerformance}}w</div>
                </div>
            </div>
        </div>
        <div class="pit_con2">
            <div class="pit_item">
                <div class="pit"></div>
                <div class="pit_content">
                    <div>历史派单当月成交业绩</div>
                    <div class="pit_num">{{performance.historySendThisMonthDealPerformance}}w</div>
                </div>
            </div>
        </div>
        <div class="pit_con2">
            <div class="pit_item">
                <div class="pit"></div>
                <div class="pit_content">
                    <div>当月/历史派单当月成交业绩</div>
                    <div class="pit_num">{{performance.historyAndThisMonthCompare}}</div>
                </div>
            </div>
        </div>
        <div class="pit_con2">
            <div class="pit_item">
                <div class="pit"></div>
                <div class="pit_content">
                    <div>辅助订单业绩</div>
                    <div class="pit_num">{{performance.supportPerformance ? performance.supportPerformance : 0}}w</div>
                </div>
            </div>
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
        <div class="back" @click="backClick">返回</div>
    </div>
</template>
<script>
import  * as api from "@/api/order.js";

export default{
    data(){
        return{
            time:this.$moment().format("YYYY-MM"),
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2026, 10, 1),
            currentDate:  this.$moment().format("YYYY-MM"),
            timeModel:false,
            performance:{},
            activeItem:2
        }
    },
    methods:{
        // 返回上一页
        backClick(){
            this.$router.go(-1)
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
            this.getcustomerServiceDetailPerformanceById()
        },
        // 根据客服id获取助理详细业绩
        getcustomerServiceDetailPerformanceById(){
            const data ={
                year:this.$moment(this.time).format("YYYY"),
                month:this.$moment(this.time).format("MM"),
                customerServiceId:this.$route.query.customerServiceId,
            }
            api.customerServiceDetailPerformanceById(data).then((res)=>{
                if(res.code == 0){
                    this.performance =  res.data.performance
                }
            })
        }
    },
    created(){
        this.getcustomerServiceDetailPerformanceById()
        
    }
}
</script>

<style scoped lang="less">
.content{
    width: 100%;
    // height: 100vh;
    padding-bottom: 20px;
    box-sizing: border-box;
    .bg_content{
        background-image: url(../../../assets/ass_bg.png) ;
        background-size: 100% 100%;
        height: 240px;
    }
    .time{
        font-weight: bold;
    }
    
    background: linear-gradient(#5492FE,#f4f4f6);
    .assistant_top{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        box-sizing: border-box;
        color: #fff;
    }
    .totalPerformance_center{
        text-align: center;
        margin-top: 18%;
        color: #fff;
        font-size: 14px;
        .num{
            font-size: 18px;
            font-weight: bold;
        }
    }
    .rate{
        width: 100%;
        display: flex;
        justify-content: space-between;
        text-align: center;
        margin: 0 auto;
        .rate_item{
            border-right: 1px solid #5492FE;
            padding: 0 10px;
            box-sizing: border-box;
            flex:1;
            font-size: 12px;
            text-align: center;
            color: #636262;
            .rate_num{
                font-size: 14px;
                color: #636262;
                font-weight: bold;
            }
        }
        .rate_item:last-child{
            border: none;
        }
    }
    .pit_con{
        width: 100%;
        display: flex;
         justify-content: space-between;
         padding: 0 10px;
         box-sizing: border-box;
        .pit_item{
            display: flex;
            font-size: 14px;
            margin-top: 15px;
            .pit{
                width: 10px;
                height: 60px;
                background: #5492FE;
                border-bottom-left-radius: 6px;
                border-top-left-radius: 6px;
            }
            .pit_content{
                // width: 110px;
                height: 60px;
                background: #fff;
                padding:10px 10px 0 10px;
                box-sizing: border-box;
                .pit_num{
                    font-size: 16px;
                    margin-top: 3px;
                    color: #5492FE;
                }
            }
            .pit_content1{
                width: 22vw;
                height: 60px;
                background: #fff;
                padding:10px ;
                box-sizing: border-box;
                border: 1px solid #EACEBF;
                .pit_num{
                    font-size: 16px;
                    margin-top: 3px;
                    color: #5492FE;
                }
            }
            .pit_content2{
                width: 37vw;
                height: 60px;
                background: #fff;
                padding:10px ;
                box-sizing: border-box;
                border: 1px solid #EACEBF;
                .pit_num{
                    font-size: 16px;
                    margin-top: 3px;
                    color: #5492FE;
                }
            }
            .pit_content3{
                width: 22vw;
                height: 60px;
                background: #fff;
                padding:10px ;
                box-sizing: border-box;
                border: 1px solid #EACEBF;
                .pit_num{
                    font-size: 16px;
                    margin-top: 3px;
                    color: #5492FE;
                }
            }
            .pit_content4{
                width: 37vw;
                height: 60px;
                background: #fff;
                padding:10px ;
                box-sizing: border-box;
                border: 1px solid #EACEBF;
                .pit_num{
                    font-size: 16px;
                    margin-top: 3px;
                    color: #5492FE;
                }
            }
        }
    }
    .pit_con2{
        width: 100%;
        display: flex;
         justify-content: space-between;
         padding: 0 10px;
         box-sizing: border-box;
        .pit_item{
            display: flex;
            font-size: 14px;
            margin-top: 15px;
            .pit{
                width: 10px;
                height: 60px;
                background: #5492FE;
                border-bottom-left-radius: 6px;
                border-top-left-radius: 6px;
            }
            .pit_content{
                width: 92vw;
                height: 60px;
                background: #fff;
                padding:10px ;
                // box-sizing: border-box;
                border: 1px solid #EACEBF;
                .pit_num{
                    font-size: 16px;
                    margin-top: 3px;
                    color: #5492FE;
                }
            }
        }
    }
    .back{
        width: 150px;
        height: 35px;
        border-radius: 20px;
        text-align: center;
        line-height: 35px;
        background: #5492FE;
        color: #fff;
        margin: 15px auto ;
    }
}
</style>