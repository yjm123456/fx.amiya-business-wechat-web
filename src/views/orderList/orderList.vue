<template>
  <div class="content" :style="{height:list.length < 4 ? '100vh' : 'auto'}">
    <div class="search_content">
        <van-field
            v-model="query.keyword"
            placeholder="请输入关键字"
            class="search"
            @input="blurInput"
        />

        <div class="calendar_con" @click="calendarModel = true">
            <i class="iconfont icon-rili search_icon"></i>
            <div>
            <div class="calendar_name">{{query.startDate}}</div>
            <div class="calendar_name">{{query.endDate}}</div>
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
    <div class="list_wrap">
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
          
            <div class="item">
              <div class="item_con"></div>
              <div class="item_top">
                <!-- <span class="copy" v-clipboard:copy="item.id" v-clipboard:success="onCopySuccess">复制</span> -->
                <div style="color:#000">订单：<span v-clipboard:copy="item.id" v-clipboard:success="onCopySuccess">{{item.id}}</span></div>
                <div class="item_type">状态：{{item.orderStatusText}}</div>
              </div>
              <div class="item_center">
                <van-image
                  width="50"
                  height="50"
                  :src="item.thumbPictureUrl"
                  style="margin:0 8px 0 0"
                />
                <div class="item_right">
                  <div class="right_content">
                    <div>归属客服：{{item.belongEmpName}}</div>
                    <div>平台：{{item.contentPlatformName	}}</div>
                  </div>
                  <div class="right_content">
                    <div class="nickname_con">客户：<div  class="nickname">{{item.customerName}}</div></div>
                    <div>{{item.city}}</div>
                  </div>
                  <div>手机：{{item.phone}}</div>
                </div>
              </div>
              <!-- <div class="item_bottom">
                <div class="nickname_con">主播IP：<div class="nickname">{{item.liveAnchorName}}</div></div>
                <div>主播微信号：{{item.liveAnchorWeChatNo}}</div>
              </div> -->
              <div class="item_bottom">
              <div class="nickname_con"><div class="nick_title">主播IP：</div> <div class="nickname">{{item.liveAnchorName}}</div></div>
              <div class="nickname_con"><div class="nick_title2">主播微信号：</div> <div class="nickname">{{item.liveAnchorWeChatNo}}</div></div>
            </div>
            </div>
            
          
          <template #right>
            <van-button square  color="linear-gradient(to bottom, #8ab4fe,#5492FE)" text="详情" @click="detailClick(item.id)"/>
            <van-button square color="linear-gradient(to bottom, #8ab4fe,#5492FE)" text="编辑" @click="editClick(item.id)"/>
          </template>
        </van-swipe-cell>
        </div>
      </van-list>
    </div>

    <!-- 订单详情 -->
    <detail />
    <!-- <van-loading size="24px" vertical text-color="#fff" color="#fff" style="height:100vh;padding:140px 0 0 0px;background:#C7DBFF;" v-if="list == [] || list.length==0">加载中...</van-loading> -->
  </div>
</template>
<script>
import * as api from "@/api/order.js";
import detail from "../detail/detail.vue"
export default {
  components: {detail},
  inject: ["reload"],
  data() {
    return {
        calendarModel:false,
        minDate: new Date(2020, 1, 1),
        maxDate: new Date(2028, 1, 1),
      // 搜索字段
      query: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        keyword:'',
        startDate:sessionStorage.getItem('orderList_startDate') ? sessionStorage.getItem('orderList_startDate') :  this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: sessionStorage.getItem('orderList_endDate') ? sessionStorage.getItem('orderList_endDate') : this.$moment(new Date()).format("YYYY-MM-DD"),
      },
      list: [],
      loading: false,
      finished: false,
      error: false,
      startDate:'',
      endDate:'',

      // 滚动位置
      scrollTop:0
    };
  },
  
  methods: {
    // 编辑
    editClick(id){
      api.byIdContentPlateFormOrder(id).then(res=>{
          if(res.code === 0){
              this.$router.push({path:'/editRecording',query:{orderInfo:res.data.orderInfo}})
          }else{
            this.$toast(res.msg);
          }
      })
    },
    // 订单详情
    detailClick(value){
      api.getByidContentPlateFormOrder(value).then((res) => {
        if(res.code === 0){
          this.$router.push({
            path:'/detail',
            query:{
              orderInfo:res.data.orderInfo
            }
          })
        }else{
          this.$toast(res.msg);
        }
      })
    },

    // 复制
    onCopySuccess(){
      this.$toast("复制成功");
    },

    // 日期搜索
    onConfirm(value) {
      this.query.startDate = this.$moment(value[0]).format("YYYY-MM-DD")
      this.query.endDate = this.$moment(value[1]).format("YYYY-MM-DD")
      sessionStorage.setItem('orderList_startDate',this.query.startDate)
      sessionStorage.setItem('orderList_endDate',this.query.endDate)
      this.calendarModel = false
      this.query.pageNum = 1 
    },

    // 关键字搜索
    blurInput(value){
        this.query.keyword = value
        
    },
    // 搜索
    handleSearch() {
      this.list=[]
      this.query.pageNum = 1 
      this.finished = false;
      this.loading = true;
      // this.getcontentPlateFormOrderLlistWithPage();
      this.onLoad()
    },

    // 获取今日到院订单
    getcontentPlateFormOrderLlistWithPage() {
      // console.log(this.query.pageNum)
      return new Promise(resolve=> {
        const { pageNum, pageSize ,keyword,startDate,endDate} = this.query;
        const data = {
          startDate: startDate ? startDate : null,
          endDate: endDate ? endDate : null,
          keyword: keyword,
          pageNum,
          pageSize,
          liveAnchorId:null,
          belongMonth:null,
          minAddOrderPrice:null,
          maxAddOrderPrice:null,
          appointmentHospital:null,
          consultationType:null,
          hospitalDepartmentId:null,
          orderStatus:null,
          contentPlateFormId:'',
          belongEmpId:null,
          orderSource:-1
        };
        api.contentPlateFormOrderLlistWithPage(data).then((res) => {
          if (res.code === 0) {
            const { list, totalCount } = res.data.contentPlatFormOrder;
            this.list = [...this.list, ...list];
            this.query.pageNum++;
            this.loading = list.length == 0 || list ==[] ? null : false;
            if (this.list.length === totalCount) {
              this.finished = true;
            }
            resolve()
          }
        }).catch(() => {
            this.error = true;
          });;
        })
    },

    onLoad() {
      if(sessionStorage.getItem("orderListPageNum") && sessionStorage.getItem("orderListScrollTop")) return;
      this.getcontentPlateFormOrderLlistWithPage();
    },
    

     handleScroll () {
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    },

    // 滚动到之前位置
    async handleReturnScroll() {
      let scrollTop = sessionStorage.getItem("orderListScrollTop")
      let pageNum = sessionStorage.getItem("orderListPageNum")
      
      // 请求完毕之后会累加+ 不需要<= 
      for(let i = 1; i < pageNum; i++) {
        await this.getcontentPlateFormOrderLlistWithPage()
      }

      // 滚动到之前的位置
      this.$nextTick(()=> {
        // console.log(scrollTop,"scrollTop")
        document.documentElement.scrollTop = Number(scrollTop);
        // console.log(document.documentElement.scrollTop,"document.body.scrollTop")
              // 设置完毕删除session onLoad 哪里判断了 需要删除掉 下次滚动 onload才会滚动
      sessionStorage.removeItem("orderListScrollTop")
      sessionStorage.removeItem("orderListPageNum")
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    // console.log("beforeRouteEnter")
    if(from.path === '/workbench') {
      sessionStorage.removeItem("orderListScrollTop")
      sessionStorage.removeItem("orderListPageNum")
      sessionStorage.removeItem("orderList_startDate")
      sessionStorage.removeItem("orderList_endDate")
    }
    next(); 
  },
  async mounted() {
    // console.log("mounted")
    this.handleReturnScroll();
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
      window.removeEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    sessionStorage.setItem("orderListScrollTop", this.scrollTop)
    sessionStorage.setItem("orderListPageNum",this.query.pageNum)
    
  }
}
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
/deep/.van-swipe-cell__right{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
/deep/ .van-button,.van-button--info ,.van-button--normal ,.van-button--square{
  margin: 5px 0;
}
.search_content{
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
    .search_icon{
        font-size: 28px;
        color: #fff;
    }
    .calendar_name{
        font-size: 12px;
        color: #fff;
        margin-left: 5px;
    }
    .calendar_con{
        width: 120px;
        display: flex;
        align-items: center;
        margin-left: 5px;
    }
}
.search{
    width: 60%;
    height: 35px;
    line-height: 35px;
    background: #f5f5f5;
    border-radius: 10px;
    border: none;
    padding: 0 10px;
}
.search_icon{
  font-size: 25px;
  color: #fff;
}

.list_wrap {
    margin-top: 55px;
    .item_con{
      background-image: url('../../assets/right.png');
      background-size: 100% 100%;
      background-repeat: no-repeat no-repeat ;
      position: fixed;
      right: 20px;
      top: 30px;
      width: 90px;
      height: 70px;
    }
  .item {
    width: 96%;
    background: #E9F3FF;
    border-radius: 10px;
    margin: 15px auto 0;
    color: #565151;
    font-size: 13px;
    padding: 10px;
    box-sizing: border-box;
    
    .item_top{
      display: flex;
      justify-content: space-between;
      .copy{
        background: #f5f5f5;
        border-radius: 10px;
        padding: 0 6px;
        box-sizing: border-box;
        color: #5492FE;
      }
      .item_type{
        width: 100px ;
        color: #5492FE;
        overflow: hidden; /*超出隐藏*/
        text-overflow: ellipsis;/*隐藏后添加省略号*/
        white-space: nowrap;/*强制不换行*/
      }
    }
    .item_center{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 7px 0;
      .item_right{
        width: 100%;
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
    // .item_bottom{
    //   display: flex;
    //   justify-content: space-between;
    //   .nickname_con{
    //     display: flex;
    //     .nickname{
    //         width: 130px ;
    //         overflow: hidden; /*超出隐藏*/
    //         text-overflow: ellipsis;/*隐藏后添加省略号*/
    //         white-space: nowrap;/*强制不换行*/

    //       }
    //   }
    // }
    // .item_type{
    //   text-align: right;
    //   margin-bottom: 10px;
    //   font-size: 14px;
    //   padding-top: 10px;
    // }
    // .item_order{
    //   display: flex;
    //   font-size: 13px;
    //   align-items: center;
    //   .copy{
    //     background: #f5f5f5;
    //     border-radius: 10px;
    //     padding: 0 6px;
    //     box-sizing: border-box;
    //     color: #5492FE;
    //   }
    // }
   
  }
  .nodata{
    display: flex;
    text-align: center;
}
}
</style>
