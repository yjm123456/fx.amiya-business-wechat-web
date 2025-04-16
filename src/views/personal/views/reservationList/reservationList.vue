<template>
  <div class="content" :style="{height:list.length < 4 ? '100vh' : 'auto'}">
    <div class="search_content">
      <van-field
        v-model="query.keyWord"
        placeholder="请输入关键字"
        class="search"
        @input="blurInput"
      />
      <div class="calendar_con" @click="calendarClick">
        <i class="iconfont icon-rili search_icon"></i>
        <div>
          <div class="calendar_name">{{ query.startDate }}</div>
          <div class="calendar_name">{{ query.endDate }}</div>
        </div>
      </div>
      <i class="iconfont icon-icon-sousu search_icon" @click="handleSearch"></i>
    </div>
    <van-calendar
      v-model="calendarModel"
      @confirm="onConfirm"
      color="#1989fa"
      :min-date="minDate"
      :max-date="maxDate"
      type="range"
    />
    <div class="list_wrap" >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
        :error.sync="error"
      >
        <div>
        <van-swipe-cell v-for="(item, index) in list" :key="index">
          <div class="item" @click="detail(item)">
            <div class="item_con"></div>
            <div class="item_top">
              <div style="color:#000" class="white">昵称：{{item.customerName}}</div>
              <div style="color:#000;margin-left:10px" >手机号：{{item.phone}}</div>
            </div>
            <div class="item_top">
            <div style="color:#000">是否完成：{{item.isFinish == true ? '已完成' : '未完成'}}</div>
            <div style="color:#000;margin-left:10px" >重要程度： {{item.importantTypeText }} </div>
            </div>
            <div class="item_top">
              <div style="color:#000"  class="white">预约日期： {{item.appointmentDate ? $moment(item.appointmentDate).format("YYYY-MM-DD") : ''}}</div>
              <div style="color:#000;margin-left:10px" class="white">预约医院：{{item.appointmentHospitalName}} </div>
            </div>
            <div class="item_top">
              <div style="color:#000" class="white"> 跟进咨询：{{item.consultation}}</div>
              <div style="color:#000;margin-left:10px" >助理：{{item.createByEmpName}} </div>
            </div>
            <div class="remark">
                备注：{{item.remark}}
            </div>
        </div>   
        </van-swipe-cell>
        </div>
      </van-list>

      <van-popup
            v-model="detailModel"
            position="bottom"
            class="dispatch_content"
            round
            style="padding:30px 10px"
          >
            <div class="text">
              预约时间：{{$moment(detailInfo.appointmentDate).format("YYYY-MM-DD HH:mm")}}
            </div>
            <div class="text">
              预约医院：{{detailInfo.appointmentHospitalName}}
            </div>
            <div class="text" >
              备注：{{detailInfo.remark}}
            </div>
            <div class="text" >
              跟进咨询：{{detailInfo.consultation}}
            </div>
            <div class="img_con">
              
              <span  class="text" >顾客照片：</span>
              <viewer v-if="detailInfo.customerPic1"  baseLayerPicker ="true" >
                <img :src="detailInfo.customerPic1" alt=""  class="img" >
              </viewer>
              <viewer v-if="detailInfo.customerPic2"  baseLayerPicker ="true" >
                <img :src="detailInfo.customerPic2" alt=""  class="img" >
              </viewer>
              <viewer v-if="detailInfo.customerPic3"  baseLayerPicker ="true" >
                <img :src="detailInfo.customerPic3" alt=""  class="img" >
              </viewer>
            </div>
            <div class="bottom2">
              <van-button
                round
                block
                type="default"
                class="button"
                @click="detailModel=false"
                style="height:35px"
                >取消</van-button
              >
            </div>
          </van-popup>
    </div>

  </div>
</template>
<script>
import * as api from "@/api/order.js";
export default {
  components: {},
  data() {
    return {
      calendarModel: false,
      minDate: new Date(2020, 1, 1),
      maxDate: new Date(2028, 1, 1),
      // 搜索字段
      query: {
        keyWord:"",
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        startDate: sessionStorage.getItem("reservation_startDate") ? sessionStorage.getItem("reservation_startDate") : this.$moment(new Date()).format("YYYY-MM-DD"),
        endDate: sessionStorage.getItem("reservation_endDate") ? sessionStorage.getItem("reservation_endDate") : this.$moment(new Date()).format("YYYY-MM-DD"),
      },
      list: [],
      loading: false,
      finished: false,
      error: false,
      // 滚动位置
      scrollTop:0,
      // 
      detailModel:false,
      detailInfo:{}
      }
  },
  created() {

  },
  methods: {
    calendarClick() {
      this.calendarModel = true;
      // this.defaultDate = [this.query.startDate,this.query.endDate]
    },
    // 日期搜索
    onConfirm(value) {
      this.query.startDate = this.$moment(value[0]).format("YYYY-MM-DD");
      this.query.endDate = this.$moment(value[1]).format("YYYY-MM-DD");
      sessionStorage.setItem("reservation_startDate", this.query.startDate);
      sessionStorage.setItem("reservation_endDate", this.query.endDate);
      this.calendarModel = false;
      this.query.pageNum = 1;
    },

    // 关键字搜索
    blurInput(value) {
      this.query.keyWord = value;
    },
    // 搜索
    handleSearch() {
      this.list = [];
      this.query.pageNum = 1;
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    detail(value){
      this.detailModel = true
      this.detailInfo = value
    },
    // 获取客户预约日程的数据
    getCustomerAppointmentSchedule() {
      const { keyWord,pageNum, pageSize,startDate,endDate} = this.query;
      const data = {
        pageNum,
        pageSize,
        appointmentType:2,
        liveAnchorId:this.$route.query.liveAnchorBaseId,
        startDate,
        endDate,
        keyWord
      };
      api.getCustomerAppointmentSchedule(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customerAppointmentScheduleInfo;
          this.list = [...this.list, ...list];
          this.query.pageNum++;
          this.loading = false;
          if (this.list.length === totalCount) {
            this.finished = true;
          }
        }
      }).catch(() => {
          this.error = true;
        });
    },
    

    onLoad() {
      this.getCustomerAppointmentSchedule();
    },
  },
  beforeRouteEnter(to, from, next) {
    // console.log("beforeRouteEnter")
    if (from.path === "/personal") {
      sessionStorage.removeItem("reservation_startDate");
      sessionStorage.removeItem("reservation_endDate");
    }
    next();
  },

};
</script>
<style lang="less" scoped>
// /deep/.van-list{
//   min-height: calc(100vh - 100px); overflow: hidden;
// }

.content{
  background: #C7DBFF;
  width: 100%;
  // height: 100vh;
}
.white{
    width: 50%;
    overflow: hidden; /*超出隐藏*/
            text-overflow: ellipsis;/*隐藏后添加省略号*/
            white-space: nowrap;/*强制不换行*/
}
.text{
  font-size: 14px;
  margin-bottom: 10px;
}
.search_content {
  width: 100%;
  height: 55px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background: #8ab4fe;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;
  .search_icon {
    font-size: 28px;
    color: #fff;
  }
  .calendar_name {
    font-size: 12px;
    color: #fff;
    margin-left: 5px;
  }
  .calendar_con {
    width: 120px;
    display: flex;
    align-items: center;
    margin-left: 5px;
  }
}
.search {
  width: 60%;
  height: 35px;
  line-height: 35px;
  background: #f5f5f5;
  border-radius: 10px;
  border: none;
  padding: 0 10px;
}
.search_icon {
  font-size: 25px;
  color: #fff;
}

.list_wrap {
  margin-top: 55px;
  .item {
    width: 96%;
    background: #E9F3FF;
    border-radius: 10px;
    margin: 15px auto 0;
    color: #565151;
    font-size: 13px;
    padding: 10px;
    box-sizing: border-box;
    .item_con{
    //   background-image: url('../../../../assets/right.png');
    //   background-size: 100% 100%;
    //   background-repeat: no-repeat no-repeat ;
    //   position: fixed;
    //   right: 20px;
    //   top: 35px;
    //   width: 90px;
    //   height: 70px;
    }
    .remark{
        width: 100%;
        overflow: hidden; /*超出隐藏*/
        text-overflow: ellipsis;/*隐藏后添加省略号*/
        white-space: nowrap;/*强制不换行*/
        color: #000;
        margin-bottom: 5px;
    }
    .item_top{
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      color: #000;
      .hospital_con{
            display: flex;
            width: 187px;
            .hospital{
              width: 77%;
            overflow: hidden; /*超出隐藏*/
            text-overflow: ellipsis;/*隐藏后添加省略号*/
            white-space: nowrap;/*强制不换行*/
            color: #000;
          }
          .hospital2{
            width: 65%;
            overflow: hidden; /*超出隐藏*/
            text-overflow: ellipsis;/*隐藏后添加省略号*/
            white-space: nowrap;/*强制不换行*/
            color: #000;
          }
          }
      
    }
    .item_center{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 7px 0;
      .item_right{
        width: 70%;
        flex:1;
        .right_content{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .nickname_con{
            display: flex;
            .nickname{
                width: 100px ;
                overflow: hidden; /*超出隐藏*/
                text-overflow: ellipsis;/*隐藏后添加省略号*/
                white-space: nowrap;/*强制不换行*/
              }
          }
          .ip_con{
            margin-left: 10px;
            display: flex;
              .ip{
                width: 100px ;
                overflow: hidden; /*超出隐藏*/
                text-overflow: ellipsis;/*隐藏后添加省略号*/
                white-space: nowrap;/*强制不换行*/
              }
          }
          
        }
        
      }
      .hospital_con{
            display: flex;
            .hospital{
              width: 70%;
            overflow: hidden; /*超出隐藏*/
            text-overflow: ellipsis;/*隐藏后添加省略号*/
            white-space: nowrap;/*强制不换行*/
          }
          }
      
      
    }
    .item_bottom{
      display: flex;
      justify-content: space-between;
      // .nickname_con{
      //   display: flex;
      //   .nickname{
      //       width: 130px ;
      //       overflow: hidden; /*超出隐藏*/
      //       text-overflow: ellipsis;/*隐藏后添加省略号*/
      //       white-space: nowrap;/*强制不换行*/

      //     }
      // }
      .nickname_con{
        display: flex;
        width: 48%;
        .nickname{
          width: 100px;
          overflow: hidden; /*超出隐藏*/
          text-overflow: ellipsis;/*隐藏后添加省略号*/
          white-space: nowrap;/*强制不换行*/
        }
        .nick_title2{
          width: 120px;
          overflow: hidden; /*超出隐藏*/
          text-overflow: ellipsis;/*隐藏后添加省略号*/
          white-space: nowrap;/*强制不换行*/
        }
        
      }
    }
  }
  .nodata{
    display: flex;
    text-align: center;
}
}
.bottom{
        display: flex;
        margin-top: 20px;
        .button{
            width: 40%;
            height: 42px;
            margin:0 auto
        }
    }
    .bottom2{
      width: 40%;
      height: 30px;
      margin: 0 auto;
    }
    .img_con{
      display: flex;
      margin: 10px 0;
      .img{
        width: 50px;
        height: 50px;
      }
    }
</style>
