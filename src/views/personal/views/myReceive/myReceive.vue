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
            <div class="calendar_name">{{query.startDate}}</div>
            <div class="calendar_name">{{query.endDate}}</div>
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
          <div class="item">
            <div class="item_con"></div>
            <div class="item_top">
              <div style="color:#000">提交人：{{item.createByEmpName}}</div>
              <div style="color:#000">手机号：{{item.phone}}</div>
            </div>
            <div class="item_top">
              <div style="color:#000">归属客服：{{item.belongCustomerServiceName}}</div>
              <div class="hospital_con">医院：<div class="hospital">{{item.hospitalName}}</div></div>
            </div>
            <div class="item_top">
            <div style="color:#000">审核状态：{{item.checkStateText}}</div>
            <div class="hospital_con"><span style="width:68px">审核时间：</span><div class="hospital2">{{item.checkDate ? $moment(item.checkDate).format("YYYY-MM-DD HH:mm:ss") : ''}}</div></div>
            </div>
            <div class="remark">
                申请理由：{{item.sendRemark}}
            </div>
            <div class="remark">
                审核备注：{{item.checkRemark}}
            </div>
        </div>   

          <template #right>
            <van-button square color="linear-gradient(to bottom, #8ab4fe,#5492FE)" text="审核" @click="affirm(item)"/>
            <van-button square  color="linear-gradient(to bottom, #8ab4fe,#5492FE)" text="检索" @click="customerServeClick(item)"/>
          </template>
        </van-swipe-cell>
        
        <!-- 审核model -->
          <van-popup
            v-model="checkModel"
            position="bottom"
            class="dispatch_content"
            round
            :close-on-click-overlay="false"
            
          >
            <van-field
              v-model="form.checkStateName"
              label="审核状态"
              placeholder="请选择审核状态"
              class="customer_content"
              disabled
              @click="checkStateModel=true"
            />
            <van-field
              v-model="form.belongCustomerServiceIdName"
              label="归属客服"
              placeholder="请选择归属客服"
              class="customer_content"
              disabled
              @click="sendByModel=true"
            />
            <van-field
              v-model="form.hospitalName"
              label="医院"
              disabled
              @click="hospitalIdModel = true"
              placeholder="请选择医院"
              class="customer_content"
            />
            <van-field
              v-model="form.checkRemark"
              label="审核备注"
              placeholder="请输入审核备注"
              class="customer_content"
              @input="remarkInput"
              type="textarea"
              :rows="4"
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
          

          <!-- 审核状态-->
          <van-popup v-model="checkStateModel" round position="bottom">
            <van-picker
              show-toolbar
              :columns="checkStateList2"
              @cancel="checkStateModel = false"
              @confirm="checkStateConfirm"
            >
              <!-- 添加模糊搜素 -->
              <!-- <template #title>
                  <van-field
                      v-model="searchKey2"
                      placeholder="请输入派单人员进行搜索"
                      clearable
                      style="width:200px"
                  />
              </template> -->
            </van-picker>
          </van-popup>
          <!-- 医院  -->
          <van-popup v-model="hospitalIdModel" round position="bottom">
            <van-picker
              show-toolbar
              :columns="searchColumns"
              @cancel="hospitalIdModel = false"
              @confirm="hospitalIdConfirm"
            >
              <!-- 添加模糊搜素 -->
              <template #title>
                <van-field
                  v-model="searchKey"
                  placeholder="请输入医院进行搜索"
                  clearable
                  style="width: 200px"
                />
              </template>
            </van-picker>
          </van-popup>
          <!-- 客服人员 -->
          <van-popup v-model="sendByModel" round position="bottom">
            <van-picker
              show-toolbar
              :columns="searchColumns2"
              @cancel="sendByModel = false"
              @confirm="sendByConfirm"
            >
              <!-- 添加模糊搜素 -->
              <template #title>
                  <van-field
                      v-model="searchKey2"
                      placeholder="请输入归属客服进行搜索"
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
        defaultDate:[],
        radio:'1',
        calendarModel:false,
        minDate: new Date(2020, 1, 1),
        maxDate: new Date(2028, 1, 1),
      // 搜索字段
      query: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        keyWord:'',
        startDate:sessionStorage.getItem('myServe_startDate') ? sessionStorage.getItem('myServe_startDate') :   this.$moment(new Date()).format("YYYY-MM-DD"),
        endDate: sessionStorage.getItem('myServe_endDate') ? sessionStorage.getItem('myServe_endDate') : this.$moment(new Date()).format("YYYY-MM-DD"),
      },
      list: [],
      loading: false,
      finished: false,
      error: false,
      startDate:'',
      endDate:'',

      // 滚动位置
      scrollTop:0,

      // 审核model
      checkModel: false,
      form: {
        id: "",
        belongCustomerServiceId: null,
        belongCustomerServiceIdName: "",
        checkState: null,
        checkStateName: '',
        hospitalId: null,
        hospitalName: "",
        checkRemark: "",
      },

      // 医院模糊搜索
      searchKey: "",
      searchColumns: [],
      // 客服模糊搜索
      searchKey2: "",
      searchColumns2: [],
      // 客服
      sendByName: [],
      sendByModel: false,
      // 医院
      hospitalName: [],
      hospitalIdModel: false,
      // 审核状态
      checkStateModel:false,
      checkStateList: [
        {
          id: 2,
          name: "审核通过",
        },
        {
          id: 1,
          name: "审核不通过",
        },
      ],
      checkStateList2:["审核通过","审核不通过"]
    };
  },
  created() {
    this.getHospitalInfo();
    this.getCustomerServiceNameList();
  },
  watch: {
    //实时监听搜索输入内容
    searchKey: function () {
      let key = String(this.searchKey);
      key = key.replace(/\s*/g, ""); //去除搜索内容中的空格
      const reg = new RegExp(key, "ig"); //匹配规则-i：忽略大小写，g：全局匹配
      /* 进行筛选，将筛选后的数据放入新的数组中，‘name’键可根据需要搜索的key进行调整 */
      this.searchColumns = this.hospitalName.filter(
        (item) => item.match(reg) != null
      );
    },
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
    cancel() {
      this.form = {};
      this.checkModel = false;
    },
    submite() {
      const { belongCustomerServiceId, hospitalId,  id, checkRemark ,checkState} = this.form;
      if (!checkState) {
        this.$toast("请选择审核状态");
        return;
      }
      if (!belongCustomerServiceId) {
        this.$toast("请选择归属客服");
        return;
      }
      if (!hospitalId) {
        this.$toast("请选择医院");
        return;
      }
      const data = {
        id,
        hospitalId: Number(hospitalId),
        belongCustomerServiceId: Number(belongCustomerServiceId),
        checkRemark: checkRemark,
        checkState:checkState
      };
      api.ContentPlatFormOrderAddWorkcheck(data).then((res) => {
        if (res.code === 0) {
          this.$toast("审核成功");
          this.form = {};
          this.checkModel = false;
          parent.location.reload();
        } else {
          this.$toast(res.msg);
        }
      });
    },
    // 派单留言
    remarkInput(value) {
      this.form.checkRemark = value;
    },
    // 获取医院
    getHospitalInfo() {
      api.HospitalInfo().then((res) => {
        this.hospitalInfo = res.data.hospitalInfo;
        let hospitalName = [];
        this.hospitalInfo.map((item) => {
          hospitalName.push(item.name);
        });
        this.hospitalName = hospitalName;
        this.searchColumns = hospitalName;
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
    // 审核状态
    checkStateConfirm(value){
      this.form.checkStateName = value;
      this.checkStateModel = false;
      // 取id
      this.checkStateList.map((item) => {
        if (item.name == value) {
          this.form.checkState = item.id;
        }
      });
    },

    // 医院确认弹窗
    hospitalIdConfirm(value) {
      this.form.hospitalName = value;
      this.hospitalIdModel = false;
      this.searchKey = "";
      // 取id
      this.hospitalInfo.map((item) => {
        if (item.name == value) {
          this.form.hospitalId = item.id;
        }
      });
    },
    // 派单人员确认弹窗
    sendByConfirm(value) {
      this.form.belongCustomerServiceIdName = value;
      this.sendByModel = false;
      this.searchKey2 = "";
      // 取id
      this.employee.map((item) => {
        if (item.name == value) {
          this.form.belongCustomerServiceId = item.id;
        }
      });
    },
    editOrderClick(value) {
      this.checkModel = true;
      this.form.acceptBy = value.acceptBy;
      this.form.acceptByName = value.acceptByEmpName;
      this.form.phone = value.phone;
      this.form.id = value.id;
    },
    calendarClick(){
      this.calendarModel = true
      // this.defaultDate = [this.query.startDate,this.query.endDate]
    },
    affirm(value){
      this.checkModel = true
      this.form.id =value.id
    },
   
    // 查询归属客服
    customerServeClick(value){
      const data = {
        phone:value.phone
      }
      api.getCustomerServiceNameByPhone(data).then(res=>{
        if(res.code === 0){
            const { CustomerServiceNameByPhone } = res.data;
            if (CustomerServiceNameByPhone != "未绑定") {
              this.$toast({
                message:"该手机号 " + value.phone + " ,归属客服是 " + CustomerServiceNameByPhone,
                duration: 10000,
              });
            } else {
              this.$$toast(
                "该手机号未绑定归属客服！"
              );
            }
        }
      })
    },
    

    // 日期搜索
    onConfirm(value) {
      this.query.startDate = this.$moment(value[0]).format("YYYY-MM-DD")
      this.query.endDate = this.$moment(value[1]).format("YYYY-MM-DD")
      sessionStorage.setItem('myServe_startDate',this.query.startDate)
      sessionStorage.setItem('myServe_endDate',this.query.endDate)
      this.calendarModel = false
      this.query.pageNum = 1 
    },

    // 关键字搜索
    blurInput(value){
        this.query.keyWord = value
        
    },
    // 搜索
    handleSearch() {
      this.list=[]
      this.query.pageNum = 1 
      this.finished = false;
      this.loading = true;
      this.onLoad()
    },
    // 获取我收到的数据
    getContentPlatFormOrderAddWork() {
      const { pageNum, pageSize ,keyWord,startDate,endDate} = this.query;
      const data = {
        startDate: startDate ? startDate : null,
        endDate: endDate ? endDate : null,
        keyWord: keyWord,
        pageNum,
        pageSize,
        hospitalId:null,
        checkState:null,
        acceptBy: sessionStorage.getItem("employeeId"),

      };
      api.getContentPlatFormOrderAddWork(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrderAddWork;
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
      // if(sessionStorage.getItem("myReceivePageNum") && sessionStorage.getItem("myReceiveScrollTop")) return;
      this.getContentPlatFormOrderAddWork();
    },
    // handleScroll () {
    //     this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    // },
    // // 滚动到之前位置
    // async handleReturnScroll() {
    //   let scrollTop = sessionStorage.getItem("myReceiveScrollTop")
    //   let pageNum = sessionStorage.getItem("myReceivePageNum")
      
    //   // 请求完毕之后会累加+ 不需要<= 
    //   for(let i = 1; i < pageNum; i++) {
    //     await this.getContentPlatFormOrderAddWork()
    //   }

    //   // 滚动到之前的位置
    //   this.$nextTick(()=> {
    //     // console.log(scrollTop,"scrollTop")
    //     document.documentElement.scrollTop = Number(scrollTop);
    //     // console.log(document.documentElement.scrollTop,"document.body.scrollTop")
    //           // 设置完毕删除session onLoad 哪里判断了 需要删除掉 下次滚动 onload才会滚动
    //   sessionStorage.removeItem("myReceiveScrollTop")
    //   sessionStorage.removeItem("myReceivePageNum")
    //   })
    // }

  },
  beforeRouteEnter (to, from, next) {
      if(from.path === '/recordingApplicationList') {
        sessionStorage.removeItem("myServe_startDate")
        sessionStorage.removeItem("myServe_endDate")
      }
      next(); 
    },
//  beforeRouteEnter (to, from, next) {
//     // console.log("beforeRouteEnter")
//     if(from.path === '/myReceiveList') {
//       sessionStorage.removeItem("myReceiveScrollTop")
//       sessionStorage.removeItem("myReceivePageNum")
//       sessionStorage.removeItem("myServe_startDate")
//       sessionStorage.removeItem("myServe_endDate")
//     }
//     next(); 
//   },
//   async mounted() {
//     // console.log("mounted")
//     this.handleReturnScroll();
//     window.addEventListener('scroll', this.handleScroll)
//   },
//   beforeDestroy () {
//       window.removeEventListener('scroll', this.handleScroll)
//   },
//   destroyed() {
//     sessionStorage.setItem("myReceiveScrollTop", this.scrollTop)
//     sessionStorage.setItem("myReceivePageNum",this.query.pageNum)
    
//   }
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
/deep/.van-swipe-cell__right{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
/deep/ .van-button,.van-button--info ,.van-button--normal ,.van-button--square{
  margin: 5px 0;
}
/deep/ .van-radio__label--disabled{
  color: #fff;
}
.dispatch_content {
  height: 50%;
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
      background-image: url('../../../../assets/right.png');
      background-size: 100% 100%;
      background-repeat: no-repeat no-repeat ;
      position: fixed;
      right: 20px;
      top: 35px;
      width: 90px;
      height: 70px;
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
</style>
