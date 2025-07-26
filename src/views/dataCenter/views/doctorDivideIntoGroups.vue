<template>
    <div class="contents">
        <div class="nav_top_con">
            <!-- <div class="nav_con_d" v-for="(item,index) in navList" :key="index">
                <div class="daodao" :style="{background: item.id == activeItem ? 'linear-gradient(#588ef1,#2c71f5)' : 'linear-gradient(#5a90f1,#5e92f1)',}" @click="navClick(item.id)">{{item.name}}</div>
            </div> -->
            <div class="right_time" @click="doctorModel = true">
                <span>{{doctorName}}</span> 
                <i class="iconfont icon-xiangxia icon_xia"></i>
            </div>
            <div class="right_time" @click="timeClick">
                <span>{{time}}</span> 
                <i class="iconfont icon-xiangxia icon_xia"></i>
            </div>
        </div>
        <div class="">
            <doctorGroups :time="time" ref="daodaos" :performance="performance"  :isLoading="isLoading"/>
        </div>
       
        <!-- <div class="" v-if="activeItem == 0">
            <daodao :time="time" ref="daodaos" :performance="performance"  :isLoading="isLoading"/>
        </div>
        <div class="" v-else>
            <jina :time="time" ref="jinas" :performance="performance"  :isLoading="isLoading"/>
        </div> -->

        <van-popup v-model="timeModel" position="bottom" style="height: 50%" round >
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                title="选择年月日"
                :min-date="minDate"
                :max-date="maxDate"
                @cancel="timeModel = false"
                @confirm="timeConfirm"
            />
        </van-popup> 
        <!-- 医生 -->
      <van-popup v-model="doctorModel" round position="bottom">
          <van-picker
              show-toolbar
              :columns="doctorListName"
              @cancel="doctorModel = false"
              @confirm="doctorConfirm"
          />
      </van-popup>

    </div>
    
</template>
<script>
import  * as api from "@/api/order.js";

import doctorGroups from "../components/doctorGroups.vue"
export default {
    props:{
        liveAnchorBaseInfos:Array
    },
    components:{
        doctorGroups,
        
    },
    data(){
        return{
            activeItem:0,
            navList:[
                {
                    id:0,
                    name:'刀刀组'
                },
                {
                    id:1,
                    name:'吉娜组'
                },
                
            ],
            time:this.$moment().format("YYYY-MM-DD"),
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2026, 10, 1),
            currentDate:  this.$moment().format("YYYY-MM-DD"),
            timeModel:false,
            performance:{},
            isLoading:false,
            // 主播
            daodao:'',
            jina:'',
            // 医生
            doctorList:[],
            doctorListName:[],
            doctorModel:false,
            doctorName:'',
            doctorId:''

            
        }
    },
    methods:{
        navClick(value){
            // sessionStorage.setItem('divdeIntoActive',value)
            if(value == 0){
                this.activeItem = value
                this.getPerformanceByLiveAnchorName()
                return
            }else{
                this.activeItem = value
                this.getPerformanceByLiveAnchorName()
                return
            }
            
        },
        timeClick(){
            this.currentDate = new Date(this.$moment(this.time).format("YYYY-MM-DD"))
            this.timeModel = true
        },
        timeConfirm(value){
            this.time = this.$moment(value).format("YYYY-MM-DD")
            this.timeModel = false
            this.getPerformanceByLiveAnchorName()
        },
        // 获取主播id
        getAnchor(){
            const data = {
                isSelfLiveAnchor:true
            }
            api.LiveAnchorBaseInfo(data).then((res)=>{
                if(res.code === 0) {
                    res.data.liveAnchorBaseInfos.map(item=>{
                        if(item.name == '刀刀'){
                            sessionStorage.setItem('daodaoid',item.id)
                        }else if(item.name == '吉娜'){
                            sessionStorage.setItem('jinaid',item.id)
                        }
                    })
                }
            })
        },
        
        // 获取医生列表
        getDoctorListClick(){
            api.getDoctorList().then((res)=>{
                if(res.code == 0){
                    // this.performance =  res.data.performance
                    const {DoctorList} = res.data
                    this.doctorList =  DoctorList
                    this.doctorName = DoctorList ? DoctorList.find(item=>item.name == '润棠文化传媒').name : ''
                    this.doctorId = DoctorList ?DoctorList.find(item=>item.name == '润棠文化传媒').id : ''
                    let name=[]
                    DoctorList.map(item=>{
                        name.push(item.name)
                    })
                    this.doctorListName = name
                }else{
                    this.$toast(res.msg)
                }
            })
        },
        // 医生确认
        doctorConfirm(value){
            this.doctorName = value;
            this.doctorModel = false;
            // 取id
            this.doctorList.map((item) => {
                if (item.name == value) {
                this.doctorId = item.id;
                }
            });
            this.getPerformanceByLiveAnchorName()

        },
        // 获取主播数据
        getPerformanceByLiveAnchorName(){
            const data ={
                // year:this.$moment(this.time).format("YYYY"),
                // month:this.$moment(this.time).format("MM"),
                date:this.$moment(this.time).format("YYYY-MM-DD"),
                liveAnchorBaseId:this.doctorId,
                isSelfLiveAnchor:false
            }
            this.isLoading = true
            api.PerformanceByLiveAnchorName(data).then((res)=>{
                if(res.code == 0){
                    this.isLoading = false
                    // this.performance =  res.data.performance
                    this.performance =  res.data.performance
                }else{
                    this.$toast(res.msg)
                }
            })
        }
    },
    created(){
        this.getAnchor()
        this.isLoading = true
        this.getDoctorListClick()
        setTimeout(()=>{
            this.getPerformanceByLiveAnchorName()
        },1000)
        // if(this.activeItem == 0){
        //     this.getPerformanceByLiveAnchorName()
            
        //     return
        // }
        // this.activeItem = sessionStorage.getItem('divdeIntoActive') ? sessionStorage.getItem('divdeIntoActive') : 0
    },
}
</script>

<style scoped lang="less">
.contents{
    width: 100%;
    background:#C0D6FE;
    // height: 100vh;
    
    .nav_top_con{
            display: flex;
            justify-content:space-between;
            align-items: center;
            padding: 10px;
            box-sizing: border-box;
            font-size: 14px;
            padding-left: 75px;
            box-sizing: border-box;
            
            .nav_con_d{
                display: flex;
                .daodao{
                    // background: linear-gradient(#6398f8,#4980e6);
                    background:#C0D6FE;
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
        margin-left: 10px;
    }
}
</style>