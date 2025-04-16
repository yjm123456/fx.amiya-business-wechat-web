<template>
  <div class="content" :style="{ height: list.length < 4 ? '100vh' : 'auto' }">
    <div class="search_content">
      <van-field
        v-model="query.keyword"
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
    <!-- :default-date="defaultDate"  -->
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
                <div style="color: #000">
                  派单编号：<span>{{ item.id }}</span
                  >
                </div>
                <div class="item_type">状态：{{ item.orderStatusText }}</div>
              </div>
              <div class="item_center">
                <!-- <van-image
                width="50"
                height="50"
                :src="item.thumbPictureUrl"
                style="margin:0 8px 0 0"
                
              /> -->
                <img
                  :src="item.thumbPictureUrl"
                  alt=""
                  style="width: 50px; height: 50px; margin: 0 8px 0 0"
                />
                <div class="item_right">
                  <div class="right_content">
                    <div class="nickname_con">
                      客户：
                      <div class="nickname">{{ item.customerName }}</div>
                    </div>
                    <div>
                      {{ item.isToHospital == true ? "已到院" : "未到院" }}
                    </div>
                    <!-- <div>
                    <van-radio-group :v-model="item.isToHospital == true ? '1' : '2'" direction="horizontal" >
                      <van-radio :name="item.isToHospital == true ? '1' : '2'" icon-size="12px" checked-color="#fff" disabled>{{item.isToHospital == true ? '已到院' : '未到院'}}</van-radio>
                    </van-radio-group>
                  </div> -->
                  </div>
                  <div class="right_content">
                    <div>手机：{{ item.phone }}</div>
                    <div>面诊：{{ item.consultatioType }}</div>
                  </div>
                  <div class="right_content">
                    <div>平台：{{ item.contentPlatFormName }}</div>
                    <!-- <div>重单深度：{{item.isRepeatProfundityOrder == true ? '可深度' : '不可深度'	}}</div> -->
                    <div>成交金额：{{ item.dealAmount }}</div>
                  </div>
                  <div class="right_content">
                    <div>{{ item.isOldCustomer }}</div>
                    <div>{{ item.isMainHospital == true ? '主派医院' : '次派医院' }}</div>
                    <!-- <div>
                    <van-radio-group :v-model="item.isOldCustomer" direction="horizontal" >
                      <van-radio :name="item.isOldCustomer" icon-size="12px" checked-color="#fff" disabled>{{item.isOldCustomer}}</van-radio>
                    </van-radio-group>
                  </div> -->
                  </div>
                  <div class="hospital_con">
                    派单医院：
                    <div class="hospital">{{ item.sendHospital }}</div>
                  </div>
                </div>
              </div>
              <div class="item_bottom">
                <div class="nickname_con">
                  <div class="nick_title">主播IP：</div>
                  <div class="nickname">{{ item.liveAnchorName }}</div>
                </div>
                <div class="nickname_con">
                  <div class="nick_title2">主播微信号：</div>
                  <div class="nickname">{{ item.liveAnchorWeChatNo }}</div>
                </div>
              </div>
            </div>

            <template #right>
              <van-button
                square
                color="linear-gradient(to bottom, #8ab4fe,#5492FE)"
                text="确认"
                @click="affirm(item)"
              />
              <van-button
                square
                color="linear-gradient(to bottom, #8ab4fe,#5492FE)"
                text="详情"
                @click="detailClick(item.orderId)"
              />
            </template>
          </van-swipe-cell>
        </div>
      </van-list>
    </div>

    <!-- 订单详情 -->
    <detail />
  </div>
</template>
<script>
import * as api from "@/api/order.js";
import detail from "../../detail/detail.vue";
export default {
  components: { detail },
  data() {
    return {
      defaultDate: [],
      radio: "1",
      calendarModel: false,
      minDate: new Date(2020, 1, 1),
      maxDate: new Date(2028, 1, 1),
      // 搜索字段
      query: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        keyword: "",
        startDate: sessionStorage.getItem("dis_startDate")
          ? sessionStorage.getItem("dis_startDate")
          : this.$moment(new Date()).format("YYYY-MM-DD"),
        endDate: sessionStorage.getItem("dis_endDate")
          ? sessionStorage.getItem("dis_endDate")
          : this.$moment(new Date()).format("YYYY-MM-DD"),
      },
      list: [],
      loading: false,
      finished: false,
      error: false,
      startDate: "",
      endDate: "",

      // 滚动位置
      scrollTop: 0,
    };
  },

  methods: {
    calendarClick() {
      this.calendarModel = true;
      // this.defaultDate = [this.query.startDate,this.query.endDate]
    },
    affirm(value) {
      // this.$toast("系统正在维护中，请稍后！");
      // return;
      if (value.orderStatusText == "重单-不可深度") {
        this.$toast("你当前状态是重单-不可深度，不能点击确认！");
        return;
      }
      this.$router.push({
        path: "/deal",
        query: {
          consultatioType: value.consultatioType,
          orderId: value.orderId,
          encryptPhone:value.encryptPhone,
          sendOrderId:value.id,
          sendHospital:value.sendHospitalId,
          sendHospitalName:value.sendHospital,
        },
      });
    },

    // 订单详情
    detailClick(value) {
      api.getByidContentPlateFormOrder(value).then((res) => {
        if (res.code === 0) {
          // this.detailIfon = res.data.orderInfo
          this.$router.push({
            path: "/detail",
            query: {
              orderInfo: res.data.orderInfo,
            },
          });
        } else {
          this.$toast(res.msg);
        }
      });
    },

    // 复制
    onCopySuccess() {
      this.$toast("复制成功");
    },

    // 日期搜索
    onConfirm(value) {
      // this.list = []
      // this.calendarModel = false;
      // this.query.startDate = this.$moment(value[0]).format("YYYY-MM-DD")
      // this.query.endDate = this.$moment(value[1]).format("YYYY-MM-DD")
      // this.query.pageNum = 1
      // this.finished = false;
      // this.loading = true;
      // this.onLoad();
      this.query.startDate = this.$moment(value[0]).format("YYYY-MM-DD");
      this.query.endDate = this.$moment(value[1]).format("YYYY-MM-DD");
      sessionStorage.setItem("dis_startDate", this.query.startDate);
      sessionStorage.setItem("dis_endDate", this.query.endDate);
      this.calendarModel = false;
      this.query.pageNum = 1;
    },

    // 关键字搜索
    blurInput(value) {
      // this.list = []
      // this.query.keyword = value
      // this.query.pageNum = 1
      // this.finished = false;
      // this.loading = true;
      // this.onLoad();
      this.query.keyword = value;
    },
    // 搜索
    handleSearch() {
      this.list = [];
      this.query.pageNum = 1;
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    // 搜索icon
    // searchClick(){
    //   this.finished = false;
    //   this.loading = true;
    //   this.getContentPlateFormSendOrder()
    // },

    // 获取已派单订单
    getContentPlateFormSendOrder() {
      return new Promise((resolve) => {
        const { pageNum, pageSize, keyword, startDate, endDate } = this.query;
        // // 客服登录
        if ( sessionStorage.getItem("isCustomerService") == "true" && sessionStorage.getItem("isDirector") == "false" ) {
          const data = {
            startDate: startDate ? startDate : null,
            endDate: endDate ? endDate : null,
            keyword: keyword,
            pageNum,
            pageSize,
            belongMonth: null,
            minAddOrderPrice: null,
            maxAddOrderPrice: null,
            liveAnchorId: null,
            consultationEmpId: null,
            // employeeId:-1,
            sendBy: null,
            isAcompanying: null,
            isOldCustomer: null,
            commissionRatio: null,
            orderStatus: null,
            contentPlatFormId: "",
            hospitalId: 0,
            IsToHospital: null,
            toHospitalStartDate: null,
            toHospitalEndDate: null,
            toHospitalType: null,
            orderSource: -1,
          };
          api.ContentPlateFormSendOrder(data).then((res) => {
              if (res.code === 0) {
                const { list, totalCount } = res.data.sendOrders;
                this.list = [...this.list, ...list];
                this.query.pageNum++;
                this.loading = false;
                if (this.list.length === totalCount) {
                  this.finished = true;
                }
                resolve();
              }
            })
            .catch(() => {
              this.error = true;
            });
          return;
        } else {
          const data = {
            startDate: startDate ? startDate : null,
            endDate: endDate ? endDate : null,
            keyword: keyword,
            pageNum,
            pageSize,
            belongMonth: null,
            minAddOrderPrice: null,
            maxAddOrderPrice: null,
            liveAnchorId: null,
            consultationEmpId: null,
            employeeId: -1,
            sendBy: null,
            isAcompanying: null,
            isOldCustomer: null,
            commissionRatio: null,
            orderStatus: null,
            contentPlatFormId: "",
            hospitalId: 0,
            IsToHospital: null,
            toHospitalStartDate: null,
            toHospitalEndDate: null,
            toHospitalType: null,
            orderSource: -1,
          };
          api.ContentPlateFormSendOrder(data).then((res) => {
              if (res.code === 0) {
                const { list, totalCount } = res.data.sendOrders;
                this.list = [...this.list, ...list];
                this.query.pageNum++;
                this.loading = false;
                if (this.list.length === totalCount) {
                  this.finished = true;
                }
                resolve();
              }
            })
            .catch(() => {
              this.error = true;
            });
          return
        }
      });
    },

    onLoad() {
      if (
        sessionStorage.getItem("dispatchPageNum") &&
        sessionStorage.getItem("dispatchScrollTop")
      )
        return;
      this.getContentPlateFormSendOrder();
    },

    handleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    },
    // 滚动到之前位置
    async handleReturnScroll() {
      let scrollTop = sessionStorage.getItem("dispatchScrollTop");
      let pageNum = sessionStorage.getItem("dispatchPageNum");

      // 请求完毕之后会累加+ 不需要<=
      for (let i = 1; i < pageNum; i++) {
        await this.getContentPlateFormSendOrder();
      }

      // 滚动到之前的位置
      this.$nextTick(() => {
        // console.log(scrollTop,"scrollTop")
        document.documentElement.scrollTop = Number(scrollTop);
        // console.log(document.documentElement.scrollTop,"document.body.scrollTop")
        // 设置完毕删除session onLoad 哪里判断了 需要删除掉 下次滚动 onload才会滚动
        sessionStorage.removeItem("dispatchScrollTop");
        sessionStorage.removeItem("dispatchPageNum");
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    // console.log("beforeRouteEnter")
    if (from.path === "/dispatchList") {
      sessionStorage.removeItem("dispatchScrollTop");
      sessionStorage.removeItem("dispatchPageNum");
      sessionStorage.removeItem("dis_startDate");
      sessionStorage.removeItem("dis_endDate");
    }
    next();
  },
  async mounted() {
    // console.log("mounted")
    this.handleReturnScroll();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    sessionStorage.setItem("dispatchScrollTop", this.scrollTop);
    sessionStorage.setItem("dispatchPageNum", this.query.pageNum);
  },
};
</script>
<style lang="less" scoped>
// /deep/.van-list{
//   min-height: calc(100vh - 100px); overflow: hidden;
// }
.content {
  background: #c7dbff;
  width: 100%;
  // height: 100vh;
}
/deep/.van-swipe-cell__right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
/deep/ .van-button,
.van-button--info,
.van-button--normal,
.van-button--square {
  margin: 5px 0;
}
/deep/ .van-radio__label--disabled {
  color: #fff;
}
.dispatch_content {
  height: 43%;
  color: #5492fe;
}
.customer_content {
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid #bbd3ff;
  padding: 10px 0;
  box-sizing: border-box;
  /deep/.van-cell__title,
  .van-field__label {
    width: 70px;
    color: #5492fe;
  }
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
    background: #e9f3ff;
    border-radius: 10px;
    margin: 15px auto 0;
    color: #565151;
    font-size: 13px;
    padding: 10px;
    box-sizing: border-box;
    .item_con {
      background-image: url("../../../assets/right.png");
      background-size: 100% 100%;
      background-repeat: no-repeat no-repeat;
      position: fixed;
      right: 20px;
      top: 80px;
      width: 90px;
      height: 70px;
    }
    .item_top {
      display: flex;
      justify-content: space-between;
      .copy {
        background: #f5f5f5;
        border-radius: 10px;
        padding: 0 6px;
        box-sizing: border-box;
        color: #5492fe;
      }
      .item_type {
        width: 100px;
        overflow: hidden; /*超出隐藏*/
        text-overflow: ellipsis; /*隐藏后添加省略号*/
        white-space: nowrap; /*强制不换行*/
        color: #5492fe;
      }
    }
    .item_center {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 7px 0;
      .item_right {
        width: 70%;
        flex: 1;
        .right_content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .nickname_con {
            display: flex;
            .nickname {
              width: 100px;
              overflow: hidden; /*超出隐藏*/
              text-overflow: ellipsis; /*隐藏后添加省略号*/
              white-space: nowrap; /*强制不换行*/
            }
          }
          .ip_con {
            margin-left: 10px;
            display: flex;
            .ip {
              width: 100px;
              overflow: hidden; /*超出隐藏*/
              text-overflow: ellipsis; /*隐藏后添加省略号*/
              white-space: nowrap; /*强制不换行*/
            }
          }
        }
      }
      .hospital_con {
        display: flex;
        .hospital {
          width: 70%;
          overflow: hidden; /*超出隐藏*/
          text-overflow: ellipsis; /*隐藏后添加省略号*/
          white-space: nowrap; /*强制不换行*/
        }
      }
    }
    .item_bottom {
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
      .nickname_con {
        display: flex;
        width: 48%;
        .nickname {
          width: 100px;
          overflow: hidden; /*超出隐藏*/
          text-overflow: ellipsis; /*隐藏后添加省略号*/
          white-space: nowrap; /*强制不换行*/
        }
        .nick_title2 {
          width: 120px;
          overflow: hidden; /*超出隐藏*/
          text-overflow: ellipsis; /*隐藏后添加省略号*/
          white-space: nowrap; /*强制不换行*/
        }
      }
    }
  }
  .nodata {
    display: flex;
    text-align: center;
  }
}
.bottom {
  display: flex;
  margin-top: 20px;
  .button {
    width: 40%;
    height: 42px;
    margin: 0 auto;
  }
}
</style>
