<template>
    <div class="content">
        <div class="left">
                <div class="left_title_con"><span class="left_line">|</span><span class="left_title">业绩</span></div>
                <div v-for="(item,index) in nav" :key="index">
                    <div class="left_item" :style="{background: item.id == active ? '#85a8ed' : '',}" @click="navClick(item.id)">{{item.name}}</div>
                </div>
        </div>
      
       <div v-if="active == 0"  class="right">
            <!-- 分组 -->
            <doctorDivideIntoGroups ref="doctorDivideIntoGroups" />
        </div>
         <div v-if="active == 1"  class="right">
            <!-- 助理 -->
            <doctorAssistant ref="doctorAssistant" />
        </div>
        <div v-if="active == 2"  class="right">
            <!-- 机构 -->
            <doctorHospital ref="doctorHospital"/>
        </div>
    </div>
</template>
<script>
import  * as api from "@/api/order.js";
import doctorDivideIntoGroups from "./doctorDivideIntoGroups.vue"
import doctorAssistant from "./doctorAssistant.vue"
import doctorHospital from "./doctorHospital.vue"
export default{
    components:{
        doctorDivideIntoGroups,
        doctorAssistant,
        doctorHospital
    },
    data(){
        return{
            active:0,
            nav:[
                {
                    id:0,
                    name:'分组'
                },
                {
                    id:1,
                    name:'助理'
                },
                {
                    id:2,
                    name:'医院'
                },
            ],
            // 获取主播
            liveAnchorBaseInfos:[]
        }
    },
    methods:{
        
        navClick(value){
            this.active = value
           
        },

    },
    created(){
        // this.active = this.$route.query.active
    }
}
</script>

<style scoped lang="less">
/deep/.van-sidebar{
    padding-top: 20px;
    border-radius: 10px;
    height: 100vh;
    background: linear-gradient(#8ab4fe,#fff);
}
/deep/.van-sidebar-item--select::before{
    background: #EACEBF;
}
/deep/.van-sidebar-item ,.van-sidebar-item--select{
    background: #fff;
}
.content{
    // height: 100vh;
    // background:#8ab4fe;
    // background:linear-gradient(#8ab4fe,#f5f5f5);
    // padding-top: 20px;
    // box-sizing: border-box;
    display: flex;
    width: 100%;
    overflow-x: hidden;
    .left{
        width: 60px;
        height: 100vh;
        // background: linear-gradient(#5492FE,#f5f5f5);
        background:#709EF7;
        // border-radius: 10px;
        position: fixed;
        left: 0;
        top: 0;
        color: #fff;
        .left_title_con{
            font-size: 16px;
            text-align: center;
            padding-top: 15px;
            box-sizing: border-box;
            margin-bottom: 15px;
            .left_line{
                color: #EACEBF
            }
            .left_title{
                margin-left: 4px;
            }
        }
        .left_item{
            height: 30px;
            width: 80%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 0 auto 10px;
            border-radius: 10px;
            font-size: 14px;
            
        }
    }
    .right{
        flex:1;
    }
}
</style>