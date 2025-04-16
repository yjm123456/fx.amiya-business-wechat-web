<template>
  <div class="content" :style="{ height: list.length < 5 ? '100vh' : 'auto' }">
    <div class="search_content">
      <van-field
        v-model="query.keyWord"
        placeholder="请输入关键字"
        class="search"
        @input="blurInput"
      />
      <div class="calendar_con" @click="calendarModel = true">
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
            <div class="item_center2">
                <div class="item_right">
                    <div class="item_list">
                        <div  class="item_time">建档时间：{{item.createDate ? $moment(new Date()).format("YYYY-MM-DD  HH:mm:ss") : ''}}</div>
                    </div>
                    <div class="item_list">
                        <div  class="item_i">手机：{{item.phone}}</div>
                        <div class="item_r">绑定客服：{{item.customerServiceName}}</div>
                    </div>
                    <div class="item_list">
                        <div  class="item_i">项目：{{item.firstProjectDemand}}</div>
                        <div  class="item_r">最新消费渠道：{{item.newContentPlatForm}}</div>
                    </div>
                </div>
            </div>
          </div>

            <template #right>
              <van-button
                square
                color="linear-gradient(to bottom, #8ab4fe,#5492FE)"
                text="改绑"
                @click="editOrderClick(item)"
              />
            </template>
          </van-swipe-cell>
          <!-- 改绑 -->
          <van-popup
            v-model="editOrderModel"
            position="bottom"
            class="dispatch_content"
            round
            :close-on-click-overlay="false"
          >
            <van-field
              v-model="form.customerServiceIdName"
              label="客服"
              disabled
              placeholder="请选择客服"
              class="customer_content"
              @click="sendByModel = true"
              style="padding-top:30px"
            />
            <div class="bottom">
              <van-button
                round
                block
                type="default"
                class="button"
                @click="cancel"
                >取消</van-button
              >
              <van-button
                round
                block
                type="info"
                class="button"
                @click="submite"
                >确认</van-button
              >
            </div>
          </van-popup>

         
          <!-- 客服人员 -->
          <van-popup v-model="sendByModel" round position="bottom">
            <van-picker
              show-toolbar
              :columns="searchColumns2"
              @cancel="sendByModel = false;searchColumns2=[];searchKey2=''"
              @confirm="sendByConfirm"
            >
              <!-- 添加模糊搜素 -->
              <template #title>
                <van-field
                    v-model="searchKey2"
                    placeholder="请输入客服进行搜索"
                    clearable
                    style="width:200px"
                />
            </template>
            </van-picker>
          </van-popup>
        </div>
      </van-list>
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
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        keyWord: "",
        startDate: sessionStorage.getItem("mySubmite_startDate")
          ? sessionStorage.getItem("mySubmite_startDate")
          : this.$moment(new Date()).format("YYYY-MM-DD"),
        endDate: sessionStorage.getItem("mySubmite_endDate")
          ? sessionStorage.getItem("mySubmite_endDate")
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

      // 改绑
      editOrderModel: false,
      form: {
        id: "",
        customerServiceId: null,
        customerServiceIdName: "",
        encryptPhoneList:[]
      },
      // 客服模糊搜索
      searchKey2: "",
      searchColumns2: [],
      // 客服
      sendByName: [],
      sendByModel: false,
      // 医院
      hospitalName: [],
      hospitalIdModel: false,

    };
  },
  created() {
    this.getCustomerServiceNameList();
  },
  watch: {
    searchKey2: function () {
      let key2 = String(this.searchKey2);
      key2 = key2.replace(/\s*/g, ""); //去除搜索内容中的空格
      const reg = new RegExp(key2, "ig"); //匹配规则-i：忽略大小写，g：全局匹配
      /* 进行筛选，将筛选后的数据放入新的数组中，‘name’键可根据需要搜索的key进行调整 */
      this.searchColumns2 = this.sendByName.filter(
        (item) => item.match(reg) != null
      );
    },
  },
  methods: {
    // 复制
    onCopySuccess(){
      this.$toast("复制成功");
    },
    cancel() {
      this.form = {};
      this.editOrderModel = false;
      this.query.pageNum = 1;
    },
    submite() {
      const { customerServiceId ,encryptPhoneList} = this.form;
      if (!customerServiceId) {
        this.$toast("请选择客服");
        return;
      }
      const data = {
        customerServiceId:Number(customerServiceId),
        encryptPhoneList:[encryptPhoneList]
      };
      api.updatePublicPoolPhone(data).then((res) => {
        if (res.code === 0) {
          this.$toast("改绑成功");
          this.form = {};
          this.editOrderModel = false;
          // 刷新列表
          parent.location.reload();
        } else {
          this.$toast(res.msg);
        }
      });
    },
    // 客服
    getCustomerServiceNameList() {
      api.customerServiceNameList().then((res) => {
        this.employee = res.data.employee;
        let sendByName = [];
        this.employee.map((item) => {
          sendByName.push(item.name);
        });
        this.sendByName = sendByName;
        this.searchColumns2 = sendByName;
      });
    },

    // 客服确认弹窗
    sendByConfirm(value) {
      this.form.customerServiceIdName = value;
      this.sendByModel = false;
      this.searchKey2 = "";
      
      // 取id
      this.employee.map((item) => {
        if (item.name == value) {
          this.form.customerServiceId = item.id;
        }
      });
    },
    // 改绑
    editOrderClick(value) {
        this.editOrderModel = true;
        this.form.encryptPhoneList = value.encryptPhone;
    },
    // 日期搜索
    onConfirm(value) {
      this.query.startDate = this.$moment(value[0]).format("YYYY-MM-DD");
      this.query.endDate = this.$moment(value[1]).format("YYYY-MM-DD");
      sessionStorage.setItem("mySubmite_startDate", this.query.startDate);
      sessionStorage.setItem("mySubmite_endDate", this.query.endDate);
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
      this.oldPageNum = 1;
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },

    // 获取内容平台订单
    getgetPublicPoolPhone() {
        const { pageNum, pageSize, keyWord, startDate, endDate } = this.query;
        const data = {
          startDate: startDate ? startDate : null,
          endDate: endDate ? endDate : null,
          keyWord: keyWord,
          pageNum,
          pageSize,
        };
        api.getPublicPoolPhone(data).then((res) => {
            if (res.code === 0) {
              const { list, totalCount } = res.data.getPublicPoolPhone
              this.list = [...this.list, ...list];
              this.query.pageNum++;
              this.loading =  false;
              if (this.list.length === totalCount) {
                this.finished = true;
              }
            }
          }).catch(() => {
          this.error = true;
        });
    },
    onLoad() {
      this.getgetPublicPoolPhone();
    },
  },
  beforeRouteEnter (to, from, next) {
  // console.log("beforeRouteEnter")
    if(from.path === '/editCustomer') {
      sessionStorage.removeItem("contenCustomer_startDate")
      sessionStorage.removeItem("contenCustomer_endDate")
    }
    next(); 
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
.dispatch_content {
  height: 43%;
  color: #5492fe;
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
  height: 30%;
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
      background-image: url("../../../../assets/right.png");
      background-size: 100% 100%;
      background-repeat: no-repeat no-repeat;
      position: fixed;
      right: 20px;
      top: 5px;
      width: 90px;
      height: 70px;
    }
    .remark {
      width: 100%;
      overflow: hidden; /*超出隐藏*/
      text-overflow: ellipsis; /*隐藏后添加省略号*/
      white-space: nowrap; /*强制不换行*/
      color: #000;
      margin-bottom: 5px;
    }
    .item_center2{
        width: 100%;
        display: flex;
        align-items: center;
        margin-top: 4px;
        .item_right{
            width: 100%;
            .item_list{
                display: flex;
                width:100%;
                justify-content: space-between;
                margin-bottom: 3px;
                .item_i,.item_r{
                    width: 49%;
                    overflow: hidden; /*超出隐藏*/
                    text-overflow: ellipsis; /*隐藏后添加省略号*/
                    white-space: nowrap; /*强制不换行*/
                }
                .item_r{
                    text-align: right;
                }
                .item_time{
                    width:70%;
                    overflow: hidden; /*超出隐藏*/
                    text-overflow: ellipsis; /*隐藏后添加省略号*/
                    white-space: nowrap; /*强制不换行*/
                }
                .item_hospital{
                    width:100%;
                    overflow: hidden; /*超出隐藏*/
                    text-overflow: ellipsis; /*隐藏后添加省略号*/
                    white-space: nowrap; /*强制不换行*/
                }
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
  margin-top: 50px;
  .button {
    width: 40%;
    height: 42px;
    margin: 0 auto;
  }
}
</style>
