<template>
    <div class="content" :style="{height:performance.customerServiceRankDtoList == null || performance.customerServiceRankDtoList == [] || performance.customerServiceRankDtoList.length == 0 ? '100vh' : 'auto'}" v-if="isLoading == false">
        <div class="bg_content">
            <div class="assistant_top">
                <span style="font-weight:bold">{{performance.customerServiceName}}</span>
                <div class="time" @click="timeClick">
                    <span>{{time}}</span>
                    <i class="iconfont icon-xiangxia time_icon"></i>
                </div>
            </div>
            <div class="totalPerformance_center">
                <div class="num">{{performance.totaPrice}}w</div>
                <div>总业绩</div>
            </div>
        </div>
        <div class="rate">
            <div class="rate_item">
                <div  class="rate_num">{{performance.visitRate}}%</div>
                <div>总上门率</div>
            </div>
            <div class="rate_item">
                <div  class="rate_num">{{performance.thisMonthSendThisMonthVisitNumRatio}}%</div>
                <div>当月上门率</div>
            </div>
            
            <div class="rate_item">
                <div  class="rate_num">{{performance.newCustomerPrice}}w</div>
                <div>新客业绩</div>
            </div>
            <div class="rate_item">
                <div  class="rate_num">{{performance.oldCustomerPrice}}w</div>
                <div>老客业绩</div>
            </div>
            <!-- <div class="rate_item">
                <div class="rate_num">{{performance.newOrOldCustomerRate}}</div>
                <div>新/老客占比</div>
            </div> -->
        </div>
        <div class="center">
            <div class="center_con">
                <div class="cen_item">
                    <div class="cen_title">新诊</div>
                    <div class="cen_num">{{performance.newCustomerNum}}人</div>
                </div>
                <div class="cen_item">
                    <div class="cen_title">成交</div>
                    <div class="cen_num">{{performance.dealNum}}人</div>
                </div>
            </div>
            <div class="center_con">
                <div class="cen_item">
                    <div class="cen_title">复诊</div>
                    <div class="cen_num">{{performance.sequentCustomerNum}}人</div>
                </div>
                <div class="cen_item">
                    <div class="cen_title">老客</div>
                    <div class="cen_num">{{performance.oldCustomerNum}}人</div>
                </div>
            </div>
        </div>
        <div class="ph_container">
            <div class="ph_content">
                <div class="ph_left">
                    <div class="l_tit">当月累计排名</div>
                    <div class="rule" @click="ruleClick">规则 <i class="iconfont icon-gantanhao-xianxingyuankuang icon_gth"></i></div>
                </div>
                <img src="https://ameiya.oss-cn-hangzhou.aliyuncs.com/0062867f1e5540338bc9559d4914d6cd.png" alt="" class="ph_img">
            </div>
            <div class="list" >
                <div class="item" v-for="(item,index) in performance.customerServiceRankDtoList" :key="index">
                    <div class="item_left">
                        <span  class="t_title">{{item.rankId}}</span>
                        <span class="customer">{{item.customerServiceName}}</span>
                    </div>
                    <img src="https://ameiya.oss-cn-hangzhou.aliyuncs.com/b358e09740c94fd980b30c5355cf3156.png" alt="" class="icon_img" v-if="index==0">
                    <img src="https://ameiya.oss-cn-hangzhou.aliyuncs.com/21fa436ba2ae4400853aa7d9b3f2c4c5.png" alt="" class="icon_img" v-else-if="index==1">
                    <img src="https://ameiya.oss-cn-hangzhou.aliyuncs.com/d3313da6c40e4a6db8edf27496185763.png" alt="" class="icon_img" v-else-if="index==2">
                    
                </div>
            </div>
            <div class="no_data" v-if="performance.customerServiceRankDtoList">没有更多了</div>
            <div v-else class="bottom_title">您的账号不是客服角色，暂时无法展示主播归属客服排名</div>
        </div>
        <!-- 时间选择器 -->
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

        <!-- 规格弹窗 -->
        <van-popup v-model="ruleModel"  style="width:90%">
            <div class="rule_con">
                <div class="rule_title">排行规则</div>
                <div class="rule_content">
                    <div>1：统计企业内员工从本月到当前时间加1分钟为止（本月一号到今日具体时分加一分钟（例：18:00:32，数据统计时间为"18:01:00"）</div>
                    <div>2：非客服角色账号的成员不展示在排行榜中</div>
                    <div>3：未归属主播的账号无法查看排行版</div>
                    <div>4：业绩金额小于一万的不在排行榜中展示</div>
                </div>
            </div>
        </van-popup>
        <!-- <div class="back" @click="backClick">返回</div> -->
    </div>
    <van-loading size="24px" vertical text-color="#fff" color="#fff" style="height:100vh;padding:140px 0 0 0px;background:linear-gradient(#8ab4fe,#f5f5f5);" v-else>加载中...</van-loading>
</template>
<script>
import  * as api from "@/api/my.js";

export default{
    data(){
        return{
            // 时间参数
            time:this.$moment().format("YYYY-MM"),
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2026, 10, 1),
            currentDate:  this.$moment().format("YYYY-MM"),
            timeModel:false,
            // 接口数据
            performance:{},
            // 规格弹窗
            ruleModel:false,
            // 加载
            isLoading:false
        }
    },
    methods:{
        ruleClick(){
            this.ruleModel = true
        },
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
            this.getcustomerServiceSimplePerformanceById()
        },
        // 获取页面数据
        getcustomerServiceSimplePerformanceById(){
            const data ={
                year:this.$moment(this.time).format("YYYY"),
                month:this.$moment(this.time).format("MM"),
                customerServiceId:sessionStorage.getItem('employeeId'),
            }
            this.isLoading = true
            api.customerServiceSimplePerformanceById(data).then((res)=>{
                if(res.code == 0){
                    this.isLoading = false
                    this.performance =  res.data.performance
                }else{
                    this.$toast(res.msg)
                }
            })
        }
    },
    created(){
        this.getcustomerServiceSimplePerformanceById()
        
    }
}
</script>

<style scoped lang="less">
.van-popup ,.van-popup--center{
    border-radius: 10px;
}
.content{
    width: 100%;
    // height: 100vh;
    padding-bottom: 20px;
    box-sizing: border-box;
    .bg_content{
        background-image: url(../../../../assets/ass_bg.png) ;
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
            padding: 0 5px;
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
    .center{
        width: 90%;
        display: flex;
        justify-content: space-between;
        padding: 15px 10px 5px 10px;
        box-sizing: border-box;
        background: #268DF1;
        margin: 20px auto 0;
        border-radius: 8px;
        .center_con{
            width: 100%;
            .cen_item{
                width: 90%;
                height: 50px;
                background-image: url(../../../../assets/Vector.png) ;
                background-size: 100% 100%;
                margin: 0 auto 10px;
                padding:8px 0 0 38px;
                .cen_title{
                    font-size: 12px;
                }
                .cen_num{
                    font-size: 15px;
                    color: #268DF1;
                }
            }
        }
    }  
    .ph_container{
        width: 90%;
        background: #c6d8f7;
        border-radius: 8px;
        margin: 20px auto 0;
        padding: 5px 0;
        box-sizing: border-box;
        .ph_content{
        width: 90%;
        display: flex;
        background: #268DF1;
        margin: 10px auto 0;
        border-radius: 8px;
        justify-content: space-between;
        padding: 15px;
        box-sizing: border-box;
        .ph_left{
            .l_tit{
                width: 230px;
                height: 35px;
                line-height: 35px;
                padding-left: 35px;
                background-image: url(../../../../assets/Vector12.png) ;
                background-size: 100% 100%;
                font-size: 26px;
                font-weight: bold;
                color: #268DF1;
            }
            .rule{
                width: 50px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                background: #fff;
                color: #268DF1;
                margin-top: 10px;
                font-size: 12px;
                margin-left: 20px;
                .icon_gth{
                    font-size: 12px;
                }
            }
            
        }
        .ph_img{
            width: 50px;
            height:65px;
        }
        
    }
    } 
    
    .list{
        width: 90%;
        margin: 20px auto 0;
        .item{
            display: flex;
            justify-content:space-between;
            align-items: center;
            background: #8EB5FB;
            border-radius: 5px;
            color: #fff;
            margin-bottom: 10px;
            padding: 0 40px 5px 20px;
            box-sizing: border-box;
            .item_left{
                display: flex;
                align-items: center;
                .t_title{
                    padding-top: 3px;
                    font-size: 16px;
                }
                .customer{
                    font-size: 14px;
                    margin-left: 30px;
                    // text-align: right;
                }
            }
             .icon_img{
                width: 25px;
            }
        }
    }
    .rule_con{
        padding: 20px;
        box-sizing: border-box;
        
        .rule_title{
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            color: red;
        }
        .rule_content{
            font-size: 12px;
            margin-top: 5px;
            color: #000
        }
    }
    .no_data{
        text-align: center;
        padding: 10px 0;
        box-sizing: border-box;
        color: #666;
        font-size: 14px;
    }
    .bottom_title{
        font-size: 12px;
        color: #666;
        text-align: center;
        padding: 10px 0;
        box-sizing: border-box;
    }
}
</style>