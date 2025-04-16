<template>
  <div class="content" :style="{ height: list.length < 4 ? '100vh' : 'auto' }">
    <div class="mc" v-if="isLoading"></div>
    <div class="search_content">
      <van-field
        v-model="query.keyword"
        placeholder="请输入关键字"
        class="search"
        @input="blurInput"
      />
      <div class="calendar_con" @click="calendarModel = true;">
        <i class="iconfont icon-rili search_icon"></i>
        <div>
          <div class="calendar_name">{{ query.startDate }}</div>
          <div class="calendar_name">{{ query.endDate }}</div>
        </div>
      </div>
      <i class="iconfont icon-icon-sousu search_icon" @click="handleSearch"></i>
      <!-- <i
        class="iconfont icon-jiahao search_icon add"
        @click="controlModel = true"
      ></i> -->
      <i
        class="iconfont icon-jiahao search_icon add"
        @click="$router.push('/addYellowCar')"
      ></i>
      
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
                <div>
                  <span>{{
                    $moment(item.recordDate).format("YYYY-MM-DD")
                  }}</span>
                  <span style="margin-left: 13px"
                    >订单：<span
                      v-clipboard:copy="item.id"
                      v-clipboard:success="onCopySuccess"
                      >{{ item.id }}</span
                    ></span
                  >
                </div>
                <div>
                  {{ item.emergencyLevelText }}
                </div>
              </div>
              <div class="item_justify">
                <div>渠道：{{ item.contentPlatFormName }}</div>
                <div>客户来源：{{ item.sourceText }}</div>
              </div>
              <div class="item_justify">
                <div>昵称：{{ item.customerNickName }}</div>
                <div>
                  类型：{{ item.shoppingCartRegistrationCustomerTypeText }}
                </div>
              </div>
              <div class="item_justify">
                <div>手机号：{{ item.hiddenPhone }}</div>
                <div>获客方式：{{ item.getCustomerTypeText }}</div>
              </div>
              <div class="item_justify">
                <div>下单金额：{{ item.price }}</div>
                <div>归属部门：{{ item.belongChannelName }}</div>
              </div>
              <div class="item_justify">
                <div>主播IP：{{ item.liveAnchorName }}</div>
                <div>创建人：{{ item.createBy }}</div>
              </div>
              <div class="item_justify">
                <div>指派：{{ item.assignEmpName }}</div>
                <div>微信号：{{ item.customerWechatNo }}</div>
              </div>
              <div class="item_justify">
                <div style="width:100%">备注：{{ item.remark }}</div>
              </div>
            </div>

            <template #right>
              <van-button
                square
                color="linear-gradient(to bottom, #8ab4fe,#5492FE)"
                text="指派"
                @click="employeeParams.id = item.id;assignModel = true"
              />
              <!-- <van-button
                square
                color="linear-gradient(to bottom, red,red)"
                text="删除"
                @click="deleteClick(item.id)"
              /> -->
            </template>
          </van-swipe-cell>
        </div>
      </van-list>
    </div>
    <!-- 指派弹出层 -->
    <van-popup
      v-model="assignModel"
      position="bottom"
      class="dispatch_content2"
      round
      :close-on-click-overlay="false"
    >
      <van-field
        v-model="employeeParams.assignByName"
        label="指派"
        disabled
        @click="employeeParams.employeeModel = true"
        placeholder="请选择指派"
        class="customer_content"
      />
      <div class="bottom">
        <van-button
          round
          block
          type="default"
          class="button"
          @click="employeeCancel"
          >取消</van-button
        >
        <van-button
          round
          block
          type="info"
          class="button"
          @click="employeeSubmite"
          :disabled="employeeParams.isEmployee == true"
        >
          {{ employeeParams.isEmployee == false ? "确认" : "加载中..." }}</van-button
        >
      </div>

      <!-- 指派  -->
      <van-popup
        v-model="employeeParams.employeeModel"
        round
        position="bottom"
      >
        <van-picker
          show-toolbar
          :columns="employeeParams.searchColumns4"
          @cancel="employeeParams.employeeModel = false"
          @confirm="employeeConfirm"
        >
          <template #title>
            <van-field
              v-model="employeeParams.searchKey4"
              placeholder="请输入员工进行搜索"
              clearable
              style="width: 200px"
            />
          </template>
        </van-picker>
      </van-popup>
    </van-popup>

  </div>
</template>
<script>
import * as api from "@/api/order.js";
import * as smallYellowCarRegistrationApi from "@/api/smallYellowCarRegistration.js";
import { Dialog } from 'vant';
export default {
  components: {},
  inject: ["reload"],
  data() {
    return {
      // 页面加载
      isLoading:false,
      currentDate: this.$moment().format("YYYY-MM-DD"),
      minDate: new Date(2020, 1, 1),
      maxDate: new Date(2028, 1, 1),
      calendarModel: false,
      // 搜索字段
      query: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        keyword: "",
        startDate: sessionStorage.getItem("smallYellowCarRegistration_startDate") ? sessionStorage.getItem("smallYellowCarRegistration_startDate") : this.$moment().startOf("month").format("YYYY-MM-DD"),
        endDate: sessionStorage.getItem("smallYellowCarRegistration_endDate") ? sessionStorage.getItem("smallYellowCarRegistration_endDate") : this.$moment(new Date()).format("YYYY-MM-DD"),
        liveAnchorBaseId:null
      },
      list: [],
      loading: false,
      finished: false,
      error: false,
      startDate: "",
      endDate: "",
      // 指派model
      assignModel:false,
      // //  登记时间相关数据
      recordDateParams: {
        recordDateModel: false,
      },
      // 获取所有员工 指派功能
      employeeParams:{
        employeeModel:false,
        employeeList:[],
        employeeListName:[],
        id:'',
        assignBy:null,
        assignByName:'',
        // 员工筛选搜索
        searchKey4: "",
        searchColumns4: [],
        isEmployee:false
      },
     
    };
  },

  methods: {
    // // 获取当天时间
    recordDateClick() {
      var myDate = new Date();
      this.recordDateParams.recordDateModel = true;
      this.currentDate = new Date(this.$moment(myDate).format("YYYY-MM-DD"));
    },
    // 登记时间弹窗确认方法
    confirmFn(value) {
      this.form.recordDate = this.$moment(value).format("YYYY-MM-DD");
      this.recordDateParams.recordDateModel = false;
    },
    
    // 获取所有员工
    getEmployeeList(){
      api.customerServiceNameList().then((res) => {
        if(res.code === 0){
          const {employee} = res.data
          this.employeeParams.employeeList = employee
          this.employeeParams.employeeListName = employee.map((item) => item.name)
          this.employeeParams.searchColumns4 = employee.map((item) => item.name)
        }
      })
    },
    // 取消 指派功能
    employeeCancel(){
      this.assignModel = false
      this.employeeParams.employeeModel=false
      this.employeeParams.id=''
      this.employeeParams.assignBy=null
      this.employeeParams.assignByName=''
      this.employeeParams.searchKey4=''
      this.employeeParams.isEmployee=false
    },
    // 指派功能 确认按钮
    employeeSubmite(){
      const data = {
        id:this.employeeParams.id,
        assignBy:Number(this.employeeParams.assignBy),

      }
      this.employeeParams.isEmployee = true
      smallYellowCarRegistrationApi.ShoppingCartRegistrationAssign(data).then(res=>{
        if(res.code == 0){
          this.employeeParams.isEmployee = false
          this.employeeParams.employeeModel = false
          this.$toast('指派成功！') 
          // 刷新列表
          // parent.location.reload();
          this.handleSearch()
          this.employeeCancel()
        }  else if (res.code == -1){
            this.$toast(res.msg);
            this.employeeParams.isEmployee = false
        }else {
          this.$toast(res.msg);
          setTimeout(()=>{
            this.employeeParams.isEmployee = false
          })
        }
      })
    },
    // 指派功能 指派人确认按钮
    employeeConfirm(value){
      this.employeeParams.assignByName = value;
      this.employeeParams.employeeModel = false;
      this.employeeParams.assignBy = this.employeeParams.employeeList.find((item) => value == item.name).id;
    },
    
    dispatchClick(value) {
      // this.$toast("系统正在维护中，请稍后！");
      // return;
      this.controlModel = true;
      this.form.orderId = value;
    },
    cancel() {
      this.controlModel = false;
      this.form = {};
      this.imgList = []
      this.$set(this, 'imgList', []); // 使用 Vue.set 强制更新视图
      this.$set(this, 'imgList2', []); // 使用 Vue.set 强制更新视图
      this.form.recordDate=this.$moment().format("YYYY-MM-DD")
      this.form.emergencyLevel=0
      this.form.emergencyLevelName='三级线索'
    },

    // 删除
    deleteClick(value){
      Dialog.confirm({
        title: '删除弹窗',
        message: '确认要删除吗？',
      })
        .then(() => {
          smallYellowCarRegistrationApi.deleteShoppingCartRegistration(value).then((res) => {
            if (res.code === 0) {
              this.$toast('删除成功！')
              // 刷新列表
              // parent.location.reload();
              this.handleSearch()
            } else if (res.code == -1){
              this.$toast(res.msg);
            }
          })
        })
        .catch(() => {
          // on cancel
        });
      
    },
    // 复制
    onCopySuccess() {
      this.$toast("复制成功");
    },

    // 日期搜索
    onConfirm(value) {
      this.query.startDate = this.$moment(value[0]).format("YYYY-MM-DD");
      this.query.endDate = this.$moment(value[1]).format("YYYY-MM-DD");
      sessionStorage.setItem("smallYellowCarRegistration_startDate", this.query.startDate);
      sessionStorage.setItem("smallYellowCarRegistration_endDate", this.query.endDate);
      this.calendarModel = false;
      this.query.pageNum = 1;
    },

    // 关键字搜索
    blurInput(value) {
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
    // 获取小黄车订单列表
    getShoppingCartRegistrationClick() {
      return new Promise((resolve) => {
        const { pageNum, pageSize, keyword, startDate, endDate} = this.query;
        // 有按钮权限只能查看当前登录id 和 isDirector == false
        const currentRole = JSON.parse(sessionStorage.getItem("permissions"));
        // 查看特定主播 按钮权限
        let isShow = currentRole.some((ele) => {
          return "fx.amiya.permission.SELECT_SPEC_LIVEANCHOR".includes(ele);
        });
        
        // 是否为管理员
        let isDirector = sessionStorage.getItem("isDirector")
        // 登陆账号id
        let employeeId = sessionStorage.getItem("employeeId")
        console.log(isShow,isDirector)
        const data = {
          startDate: startDate ? startDate : null,
          endDate: endDate ? endDate : null,
          keyword: keyword,
          pageNum,
          pageSize,
          createBy: isDirector == 'false'  ? employeeId : null,
          assignEmpId: 0,
          baseLiveAnchorId:isShow == true ? sessionStorage.getItem("liveAnchorBaseId") : null,
        };
        this.isLoading = true
        this.$toast.loading({
            message: '数据正在努力加载中，请耐心等待',
            position: "center",
        });
        smallYellowCarRegistrationApi.getShoppingCartRegistration(data).then((res) => {
            if (res.code === 0) {
              this.isLoading = false
              const { list, totalCount } = res.data.shoppingCartRegistrationInfo;
              this.list = [...this.list, ...list];
              this.query.pageNum++;
              this.loading = false;
              if (this.list.length === totalCount) {
                this.finished = true;
              }
              resolve();
            }else{
              setTimeout(()=>{
                this.isLoading = false
              },3000)
            }
          })
          .catch(() => {
            this.error = true;
          });
      });
    },

    onLoad() {
      if (sessionStorage.getItem("smallYellowCarRegistrationPageNum") && sessionStorage.getItem("smallYellowCarRegistrationScrollTop"))
        return;
      this.getShoppingCartRegistrationClick();
    },

    handleScroll() {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    },

    // 滚动到之前位置
    async handleReturnScroll() {
      let scrollTop = sessionStorage.getItem("smallYellowCarRegistrationScrollTop");
      let pageNum = sessionStorage.getItem("smallYellowCarRegistrationPageNum");

      // 请求完毕之后会累加+ 不需要<=
      for (let i = 1; i < pageNum; i++) {
        await this.getShoppingCartRegistrationClick();
      }

      // 滚动到之前的位置
      this.$nextTick(() => {
        // console.log(scrollTop,"scrollTop")
        document.documentElement.scrollTop = Number(scrollTop);
        // console.log(document.documentElement.scrollTop,"document.body.scrollTop")
        // 设置完毕删除session onLoad 哪里判断了 需要删除掉 下次滚动 onload才会滚动
        sessionStorage.removeItem("smallYellowCarRegistrationScrollTop");
        sessionStorage.removeItem("smallYellowCarRegistrationPageNum");
      });
    },

  },
  beforeRouteEnter(to, from, next) {
    // console.log("beforeRouteEnter")
    if (from.path === "/smallYellowCarRegistration") {
      sessionStorage.removeItem("smallYellowCarRegistrationScrollTop");
      sessionStorage.removeItem("smallYellowCarRegistrationPageNum");
      sessionStorage.removeItem("smallYellowCarRegistration_startDate");
      sessionStorage.removeItem("smallYellowCarRegistration_endDate");
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
    sessionStorage.setItem("smallYellowCarRegistrationScrollTop", this.scrollTop);
    sessionStorage.setItem("smallYellowCarRegistrationPageNum", this.query.pageNum);
  },

  created() {
    window.scrollTo(0, 0); // 将页面滚动到左上角，即顶部
    this.getEmployeeList()
  },
  watch: {
    //实时监听搜索输入内容
    "employeeParams.searchKey4": function () {
      let key = String(this.employeeParams.searchKey4);
      key = key.replace(/\s*/g, ""); //去除搜索内容中的空格
      const reg = new RegExp(key, "ig"); //匹配规则-i：忽略大小写，g：全局匹配
      /* 进行筛选，将筛选后的数据放入新的数组中，‘name’键可根据需要搜索的key进行调整 */
      this.employeeParams.searchColumns4 =
        this.employeeParams.employeeListName.filter(
          (item) => item.match(reg) != null
        );
    },
  },
};
</script>
<style lang="less" scoped>
// /deep/.van-list{
//   min-height: calc(100vh - 100px); overflow: hidden;
// }
.mc{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0 ;
        left: 0;
        background: #000;
        opacity: 0.3;
        z-index: 999;
    }
/deep/ .van-popup__close-icon--top-right{
  top: 5px;
  right: 9px;
}
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
.dispatch_content {
  // height:70%;
  // color: #5492fe;
  position: fixed; /* 固定位置 */
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden; /* 防止滚动传递 */
  background-color: rgba(0, 0, 0, 0.2); /* 半透明背景 */
  display: flex;
  align-items: center;
  justify-content: center;
  .scroll{
    height:100%;
    color: #5492fe;
    background-color: #fff; /* 弹窗背景色 */
    padding: 20px; /* 内边距 */
    overflow-y: auto; /* 内容超出时显示垂直滚动条 */
    width: 100%;
  }
}
.dispatch_content2 {
  height: 21%;
  color: #5492fe;
  // margin-bottom: 42px;
  padding-top: 12px;
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
  /deep/ .van-switch {
    display: flex;
  }
}
.content_pic{
  width: 90%;
  margin-left: 5%;
  box-sizing: border-box;
  border-bottom: 1px solid #bbd3ff;
  
  /deep/ .van-cell{
    padding: 10px 0;
  }
  .img_content{
    /deep/.van-uploader__upload {
      width:50px;
      height:50px;
    }
    display: flex;
    .img_item{
      position:relative;
      margin-right:5px;
      .img{
        width:50px;
        height:50px;
      }
      .opacity_con{
        background:#000;
        position:absolute;
        right:0;
        top:0;
        opacity:0.2;
        padding:1px 4px;
        box-sizing:border-box;
        color:#fff
      }
    }
  }
  .customer_img{
    font-size: 13px;
    color: #5492fe;
    margin: 10px 0;
  }
}

.switch_content{
        width: 90%;
        justify-content: center;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #bbd3ff;
        color: #5492fe;
        margin-left: 5%;
        /deep/ .van-cell{
          padding: 10px 0;
        }
         /deep/.van-cell__title,
          .van-field__label {
            width: 70px;
            color: #5492fe;
            padding: 0;
          }
          /deep/ .van-switch {
            display: flex;
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
  .add {
    margin-left: 10px;
    font-size: 26px;
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
  width: 52%;
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
  .item_con {
    background-image: url("../../assets/right.png");
    background-size: 100% 100%;
    background-repeat: no-repeat no-repeat;
    position: fixed;
    right: 20px;
    top: 25px;
    width: 90px;
    height: 70px;
  }
  .item {
    width: 96%;
    background: #e9f3ff;
    border-radius: 10px;
    margin: 15px auto 0;
    color: #565151;
    font-size: 13px;
    padding: 10px;
    box-sizing: border-box;
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
        color: #5492fe;
      }
    }
    .item_justify {
      width: 100%;
      display: flex;
      justify-content: space-between;
      div {
        width: 49%;
        text-align: start;
        overflow: hidden; /*超出隐藏*/
        text-overflow: ellipsis; /*隐藏后添加省略号*/
        white-space: nowrap; /*强制不换行*/
        margin: 0 5px;
      }
    }
    .remark {
      width: 100%;
      overflow: hidden; /*超出隐藏*/
      text-overflow: ellipsis; /*隐藏后添加省略号*/
      white-space: nowrap; /*强制不换行*/
      margin-left: 5px;
    }
  }
  .nodata {
    display: flex;
    text-align: center;
  }
}
.bottom {
  display: flex;
  margin: 20px 0;
  width: 100%;
  .button {
    width: 40%;
    height: 42px;
    margin: 0 auto;
  }
}
</style>
