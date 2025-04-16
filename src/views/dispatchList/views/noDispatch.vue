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
                <div style="color: #000">
                  订单：<span
                    v-clipboard:copy="item.orderId"
                    v-clipboard:success="onCopySuccess"
                    >{{ item.orderId }}</span
                  >
                </div>
                <!-- <div class="item_type">状态：{{item.orderStatusText}}</div> -->
              </div>
              <div class="item_center">
                <van-image
                  width="50"
                  height="50"
                  :src="item.thumbPictureUrl"
                  style="margin: 0 8px 0 0"
                />
                <div class="item_right">
                  <div class="hospital_con">
                    客户：
                    <div class="hospital">{{ item.customerName }}</div>
                  </div>
                  <div class="right_content">
                    <div>手机：{{ item.phone }}</div>
                  </div>
                  <div class="hospital_con">
                    预约门店：
                    <div class="hospital">{{ item.appointmentHospital }}</div>
                  </div>
                  <div class="right_content">
                    <div>面诊：{{ item.consultationTypeText }}</div>
                    <div class="ip_con">
                      主播IP：<span class="ip">{{ item.liveAnchorName }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <template #right>
              <van-button
                square
                color="linear-gradient(to bottom, #8ab4fe,#5492FE)"
                text="派单"
                @click="dispatchClick(item.orderId)"
              />
              <van-button
                square
                color="linear-gradient(to bottom, #8ab4fe,#5492FE)"
                text="详情"
                @click="detailClick(item.orderId)"
              />
            </template>
          </van-swipe-cell>

          <!-- 派单弹出层 -->
          <van-popup
            v-model="dispatchModel"
            position="bottom"
            class="dispatch_content"
            round
            :close-on-click-overlay="false"
          >
            <van-field
              v-model="form.hospitalName"
              label="主派单医院"
              disabled
              @click="hospitalIdModel = true"
              placeholder="请选择主派单医院"
              class="customer_content"
            />
            <van-cell center title="是否选择推单平台" class="customer_content" style="padding-bottom:20px ">
                <van-switch v-model="form.isPushOrderPlatform" size="24" class="switch_icon" />
                
            </van-cell>
            <div style="font-size:12px;color:red;position:relative;left:100px;top:-20px;left:20px">若未找到推单平台则需手动关闭此按钮</div>
            <van-field
              v-model="form.thirdPartContentplatformInfoName"
              label="推单平台"
              disabled
              @click="thirdPartContentplatformInfoIdModel = true"
              placeholder="请选择推单平台"
              class="customer_content"
              v-if="form.isPushOrderPlatform == true"
              style="padding-bottom:15px"
            />
            <!-- !form.hospitalName && thirdPartContentplatformInfo == [] || thirdPartContentplatformInfo.length==0 -->
            <div style="font-size:12px;color:red;position:relative;left:100px;top:-17px" v-if="form.isPushOrderPlatform == true && !form.hospitalName">请选择主派医院</div>
            <van-cell center title="是否指定医生账号" class="customer_content" >
                <van-switch v-model="form.isSpecifyHospitalEmployee" size="24" class="switch_icon" :disabled="!form.hospitalName" @click="isSpecifyHospitalEmployeeClick(form.isSpecifyHospitalEmployee)"/>
            </van-cell>
            <van-field
              v-model="form.hospitalEmployeeName"
              label="医生账号"
              disabled
              @click="hospitalEmployeeModel = true"
              placeholder="请选择医生账号"
              class="customer_content"
              v-if="form.isSpecifyHospitalEmployee == true"
            />
            <van-field
              v-model="form.hospitalName2"
              label="次派单医院"
              disabled
              @click="hospitalIdModel2 = true"
              placeholder="请选择次派单医院"
              class="customer_content"
            />
            <van-field
              v-model="form.sendByName"
              label="派单人员"
              disabled
              @click="sendByModel = true"
              placeholder="请选择派单人员"
              class="customer_content"
            />
            <van-field
              v-model="form.remark"
              label="派单留言"
              placeholder="请输入派单留言"
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
                :disabled="isDispatch == true"
                > {{isDispatch == false ? '确认' : '加载中...'}}</van-button
              >
            </div>
          </van-popup>

          <!-- 派单医院  -->
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
          <!-- 推单平台  -->
          <van-popup v-model="thirdPartContentplatformInfoIdModel" round position="bottom">
            <van-picker
              show-toolbar
              :columns="searchColumns5"
              @cancel="thirdPartContentplatformInfoIdModel = false"
              @confirm="thirdPartContentplatformInfoIdConfirm"
            >
              <!-- 添加模糊搜素 -->
              <template #title>
                <van-field
                  v-model="searchKey5"
                  placeholder="请输入推单平台搜索"
                  clearable
                  style="width: 200px"
                />
              </template>
            </van-picker>
          </van-popup>
          <!-- 指定医院  -->
          <van-popup v-model="hospitalEmployeeModel" round position="bottom">
            <van-picker
              show-toolbar
              :columns="searchColumns4"
              @cancel="hospitalEmployeeModel = false"
              @confirm="hospitalEmployeeConfirm"
            >
              <!-- 添加模糊搜素 -->
              <template #title>
                <van-field
                  v-model="searchKey4"
                  placeholder="请输入医院进行搜索"
                  clearable
                  style="width: 200px"
                />
              </template>
            </van-picker>
          </van-popup>
          <!-- 次派医院 -->
          <van-popup v-model="hospitalIdModel2" round position="bottom">
            <van-picker
              show-toolbar
              :columns="searchColumns3"
              @cancel="hospitalIdModel2 = false"
              @confirm="hospitalIdConfirm2"
            >
              <!-- 添加模糊搜素 -->
              <template #title>
                <van-field
                  v-model="searchKey3"
                  placeholder="请输入医院进行搜索"
                  clearable
                  style="width: 200px"
                />
              </template>
            </van-picker>
          </van-popup>
          <!-- 派单人员 -->
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
                  placeholder="请输入派单人员进行搜索"
                  clearable
                  style="width: 200px"
                />
              </template>
            </van-picker>
          </van-popup>
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
  inject: ["reload"],
  data() {
    return {
      // 医院模糊搜索
      searchKey: "",
      searchColumns: [],
      // 次派医院
      searchKey3: "",
      searchColumns3: [],
      //指定医院
      searchKey4: "",
      searchColumns4: [],
      //推单平台
      searchKey5: "",
      searchColumns5: [],
      // 客服模糊搜索
      searchKey2: "",
      searchColumns2: [],
      calendarModel: false,
      minDate: new Date(2020, 1, 1),
      maxDate: new Date(2028, 1, 1),
      // 搜索字段
      query: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        keyword: "",
        startDate: sessionStorage.getItem("nodis_startDate")
          ? sessionStorage.getItem("nodis_startDate")
          : this.$moment().startOf("month").format("YYYY-MM-DD"),
        endDate: sessionStorage.getItem("nodis_endDate")
          ? sessionStorage.getItem("nodis_endDate")
          : this.$moment(new Date()).format("YYYY-MM-DD"),
      },
      list: [],
      loading: false,
      finished: false,
      error: false,
      startDate: "",
      endDate: "",

      // 派单model
      dispatchModel: false,

      form: {
        //主派单医院
        hospitalId: null,
        hospitalName: null,
        // 次派单医院
        hospitalId2: null,
        hospitalName2: null,
        // 订单号
        orderId: "",
        // 是否明确时间
        isUncertainDate: false,
        // 预约到院日期
        appointmentDate: "",
        // 备注
        remark: "",
        // 派单人员
        sendBy: null,
        sendByName: "",
        // 是否为指定医院账户
        isSpecifyHospitalEmployee:false,
        // 医院账户
        hospitalEmployeeId:null,
        hospitalEmployeeName:'',
        // 是否选择推单平台
        isPushOrderPlatform:true,
        // 推单平台
        thirdPartContentplatformInfoId:'',
        thirdPartContentplatformInfoName:'',
        // 派单编号
        dispatchId:null
      },
      //医院model
      hospitalIdModel: false,
      hospitalIdModel2: false,
      hospitalEmployeeModel:false,
      // 推单平台
      thirdPartContentplatformInfoIdModel:false,
      
      hospitalName: [],
      // 派单人员
      sendByModel: false,
      sendByName: [],

      // 滚动位置
      scrollTop: 0,
      // 派单时加载中
      isDispatch:false,
      // 医院账户
      hospitalIdList:[],
      hospitalIdListName:[],
      // 推单平台
      thirdPartContentplatformInfo:[],
      thirdPartContentplatformInfoNameList:[],
    };
  },

  methods: {
    // 根据主派医院查询推单平台
    getValidKeyAndValue() {
      const data = {
        hospitalId:this.form.hospitalId
      }
      api.ContentPlateFormSendOrderValidKeyAndValue(data).then((res) => {
        if (res.code == 0) {
          const {thirdPartContentplatformInfo} = res.data
          this.form.thirdPartContentplatformInfoName = thirdPartContentplatformInfo.length == 0 ||  thirdPartContentplatformInfo == [] ? '' : thirdPartContentplatformInfo[0].name 
          this.form.thirdPartContentplatformInfoId = thirdPartContentplatformInfo.length == 0 ||  thirdPartContentplatformInfo == [] ? '' :  thirdPartContentplatformInfo[0].id 
          this.thirdPartContentplatformInfo = thirdPartContentplatformInfo
          let thirdPartContentplatformInfoNameList = [];
          this.thirdPartContentplatformInfo.map((item) => {
            thirdPartContentplatformInfoNameList.push(item.name);
          });
          this.thirdPartContentplatformInfoNameList = thirdPartContentplatformInfoNameList;
          this.searchColumns5 = thirdPartContentplatformInfoNameList;
          
        }
      });
    },
    // 根据订单号获取派单编号
    getsendOrderInfoList(){
      const data = {
        contentPlatformId:this.form.orderId,
        pageNum:1,
        pageSize:10
      }
      api.sendOrderInfoList(data).then(res=>{
        if(res.code === 0){
          const {list} =res.data.sendOrderInfoList
          this.form.dispatchId = list.length == 0 || list == [] ? null :  list[0].id
          // 是否为推单打开时 调用推单接口 
          if(this.form.isPushOrderPlatform == true) {
            this.pushOrders()
          }else{
            this.form = {};
          }
        }
      })
    },
    // 推单
    pushOrders() {
      const {thirdPartContentplatformInfoId, dispatchId,orderId,hospitalId,} = this.form
      const data = {
        thirdPartContentplatformInfoId: thirdPartContentplatformInfoId,
        hospitalId: hospitalId,
        orderId: orderId,
        sendOrderId: dispatchId,
        YWLX: 'P',
      };
      
      api.getIsRepeateByHospitalIdAndThirdPartIdToLangZi(data).then((res) => {
        if (res.code == 0) {
          this.form = {};
          this.$toast({
            content: res.data.hospitalContentplatformCode.remsg,
            duration: 3,
          });
        } else {
          setTimeout(() => {
            this.flag = false;
          }, 3000);
        }
      });
    },
    // 是否指定医院
    isSpecifyHospitalEmployeeClick(value){
         if(value == true){
          this.getByHospitalIdList()
          
        }else{
          this.form.hospitalEmployeeId = null
          this.form.hospitalEmployeeName = ''
          this.form.isSpecifyHospitalEmployee == false
        }
        // // 是否选择推单平台
        // if(this.form.hospitalId){
        //   this.getValidKeyAndValue()
        // }
    },
    // 根据医院获取医院账户
    getByHospitalIdList(){
      this.form.hospitalEmployeeId = null
      this.form.hospitalEmployeeName = ''
      const data = {
        hospitalId:this.form.hospitalId
      }
      api.getByHospitalIdList(data).then(res=>{
        if(res.code == 0){
          this.hospitalIdList = res.data.employee
          let hospitalIdListName = [];
          this.hospitalIdList.map((item) => {
            hospitalIdListName.push(item.name);
          });
          this.hospitalIdListName = hospitalIdListName;
           this.searchColumns4 = hospitalIdListName;
          }
      })
    },
    calendarClick() {
      this.calendarModel = true;
      // this.defaultDate = [this.query.startDate,this.query.endDate]
    },
    dispatchClick(value) {
      // this.$toast("系统正在维护中，请稍后！");
      // return;
      this.dispatchModel = true;
      this.form.orderId = value;
    },
    cancel() {
      this.form = {};
      this.dispatchModel = false;
      this.form.isPushOrderPlatform = true
    },
    submite() {
      const { hospitalId, sendBy, orderId, remark ,hospitalId2,isSpecifyHospitalEmployee,hospitalEmployeeId,isPushOrderPlatform,thirdPartContentplatformInfoId} = this.form;
      console.log(isPushOrderPlatform,thirdPartContentplatformInfoId)
      if (!hospitalId) {
        this.$toast("请选择派单医院");
        return;
      }
      if(isSpecifyHospitalEmployee == true &&  !hospitalEmployeeId){
        this.$toast("请选择指定医院");
        return;
      }
      if (isPushOrderPlatform == true &&  thirdPartContentplatformInfoId == '') {
        this.$toast("请选择推单平台");
        return;
      }
      if (!sendBy) {
        this.$toast("请选择派单人员");
        return;
      }
      
      const data = {
        orderId,
        hospitalId: Number(hospitalId),
        sendBy: Number(sendBy),
        remark,
        isUncertainDate: false,
        appointmentDate: null,
        otherHospitalId:Number(hospitalId2) ? [Number(hospitalId2)] : [],
        isSpecifyHospitalEmployee,
        hospitalEmployeeId:isSpecifyHospitalEmployee == true ? hospitalEmployeeId : 0
      };
      
      // api.ContentPlateFormOrder(data).then((res) => {
      //   if (res.code === 0) {
      //     this.$toast("派单成功");
      //     this.form = {};
      //     this.dispatchModel = false;
      //     // this.getunContentPlatFormSendOrderList();
      //     setTimeout(()=>{
      //       this.$router.push('/dispatched')
      //     },2000)
          
      //   } else {
      //     this.$toast(res.msg);
      //   }
      // });
      if([Number(hospitalId2)] == [] || [Number(hospitalId2)].length == 0){
              this.flag = true;
              this.isDispatch = true
              api.ContentPlateFormOrder(data).then((res) => {
                if (res.code === 0) {
                  this.$toast("派单成功");
                  // this.form = {};
                  this.getsendOrderInfoList()
                  this.dispatchModel = false;
                  this.isDispatch = false
                  // this.getunContentPlatFormSendOrderList();
                  setTimeout(()=>{
                    this.$router.push('/dispatched')
                  },2000)
                } else {
                  this.$toast(res.msg);
                  setTimeout(()=>{
                    this.isDispatch = false
                  })
                }
              });
              return
            }else{
                for(var i = 0;i<[Number(hospitalId2)].length;i++){
                  if([Number(hospitalId2)][i] == hospitalId){
                    let hostpital = this.hospitalInfo.find(item=>item.id == hospitalId).name
                    // this.$Message.warning( hostpital+ '已存在于主派医院中，请勿重复选择')
                     this.$toast( hostpital+ '已存在于主派医院中，请勿重复选择')
                   break
                  }else{
                    this.flag = true;
                    this.isDispatch = true
                    api.ContentPlateFormOrder(data).then((res) => {
                      if (res.code === 0) {
                        this.$toast("派单成功");
                        // this.form = {};
                        this.getsendOrderInfoList()
                        this.dispatchModel = false;
                        this.isDispatch = false
                        // this.getunContentPlatFormSendOrderList();
                        setTimeout(()=>{
                          this.$router.push('/dispatched')
                        },2000)
                        
                      } else {
                        this.$toast(res.msg);
                        setTimeout(()=>{
                          this.isDispatch = false
                        })
                      }
                    });
                    return
                  }
                }
            }
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
        this.searchColumns3 = hospitalName;
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

    // 医院确认弹窗
    hospitalIdConfirm(value) {
      this.form.hospitalName = value;
      this.hospitalIdModel = false;
      this.searchKey = "";
      // this.searchColumns = [];
      // 取id
      this.hospitalInfo.map((item) => {
        if (item.name == value) {
          this.form.hospitalId = item.id;
        }
      });
      this.getByHospitalIdList()
      this.getValidKeyAndValue()
    },
    // 推单平台
    thirdPartContentplatformInfoIdConfirm(value){
      this.form.thirdPartContentplatformInfoName = value;
      this.thirdPartContentplatformInfoIdModel = false;
      this.searchKey5 = "";
      // this.searchColumns = [];
      // 取id
      this.thirdPartContentplatformInfoIdList.map((item) => {
        if (item.name == value) {
          this.form.thirdPartContentplatformInfoId = item.id;
        }
      });
    },
    // 指定医院
    hospitalEmployeeConfirm(value){
      this.form.hospitalEmployeeName = value;
      this.hospitalEmployeeModel = false;
      this.searchKey4 = "";
      // this.searchColumns = [];
      // 取id
      this.hospitalIdList.map((item) => {
        if (item.name == value) {
          this.form.hospitalEmployeeId = item.id;
        }
      });
    },
    // 次派医院确认弹窗
    hospitalIdConfirm2(value) {
      this.form.hospitalName2 = value;
      this.hospitalIdModel2 = false;
      this.searchKey3 = "";
      // this.searchColumns3 = [];
      // 取id
      this.hospitalInfo.map((item) => {
        if (item.name == value) {
          this.form.hospitalId2 = item.id;
        }
      });
    },
    // 派单人员确认弹窗
    sendByConfirm(value) {
      this.form.sendByName = value;
      this.sendByModel = false;
      this.searchKey2 = "";
      // this.searchColumns2 = [];
      // 取id
      this.employee.map((item) => {
        if (item.name == value) {
          this.form.sendBy = item.id;
        }
      });
    },

    // 派单留言
    remarkInput(value) {
      this.form.remark = value;
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
      sessionStorage.setItem("nodis_startDate", this.query.startDate);
      sessionStorage.setItem("nodis_endDate", this.query.endDate);
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
    //   this.getunContentPlatFormSendOrderList()
    // },

    // 获取未派单订单
    getunContentPlatFormSendOrderList() {
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
            liveAnchorId: null,
            consultationEmpId: null,
            contentPlateFormId: "",
            employeeId:sessionStorage.getItem("employeeId"),
            orderStatus: null,
            orderSource: -1,
          };
          api.unContentPlatFormSendOrderList(data).then((res) => {
              if (res.code === 0) {
                const { list, totalCount } = res.data.unSendOrder;
                this.list = [...this.list, ...list];
                this.query.pageNum++;
                this.loading = false;
                if (this.list.length === totalCount) {
                  this.finished = true;
                }
                resolve();
              }
            }).catch(() => {
              this.error = true;
            });
            return
        } else {
          // 管理员登录
          const data = {
            startDate: startDate ? startDate : null,
            endDate: endDate ? endDate : null,
            keyword: keyword,
            pageNum,
            pageSize,
            liveAnchorId: null,
            consultationEmpId: null,
            contentPlateFormId: "",
            employeeId: -1,
            orderStatus: null,
            orderSource: -1,
          };
          api.unContentPlatFormSendOrderList(data).then((res) => {
              if (res.code === 0) {
                const { list, totalCount } = res.data.unSendOrder;
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
        sessionStorage.getItem("noDispatchPageNum") &&
        sessionStorage.getItem("noDispatchScrollTop")
      )
        return;
      this.getunContentPlatFormSendOrderList();
    },

    handleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    },

    // 滚动到之前位置
    async handleReturnScroll() {
      let scrollTop = sessionStorage.getItem("noDispatchScrollTop");
      let pageNum = sessionStorage.getItem("noDispatchPageNum");

      // 请求完毕之后会累加+ 不需要<=
      for (let i = 1; i < pageNum; i++) {
        await this.getunContentPlatFormSendOrderList();
      }

      // 滚动到之前的位置
      this.$nextTick(() => {
        // console.log(scrollTop,"scrollTop")
        document.documentElement.scrollTop = Number(scrollTop);
        // console.log(document.documentElement.scrollTop,"document.body.scrollTop")
        // 设置完毕删除session onLoad 哪里判断了 需要删除掉 下次滚动 onload才会滚动
        sessionStorage.removeItem("noDispatchScrollTop");
        sessionStorage.removeItem("noDispatchPageNum");
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    // console.log("beforeRouteEnter")
    if (from.path === "/dispatchList") {
      sessionStorage.removeItem("noDispatchScrollTop");
      sessionStorage.removeItem("noDispatchPageNum");
      sessionStorage.removeItem("nodis_startDate");
      sessionStorage.removeItem("nodis_endDate");
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
    sessionStorage.setItem("noDispatchScrollTop", this.scrollTop);
    sessionStorage.setItem("noDispatchPageNum", this.query.pageNum);
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
    // 次派医院
    //实时监听搜索输入内容
    searchKey3: function () {
      let key3 = String(this.searchKey3);
      key3 = key3.replace(/\s*/g, ""); //去除搜索内容中的空格
      const reg = new RegExp(key3, "ig"); //匹配规则-i：忽略大小写，g：全局匹配
      /* 进行筛选，将筛选后的数据放入新的数组中，‘name’键可根据需要搜索的key进行调整 */
      this.searchColumns3 = this.hospitalName.filter(
        (item) => item.match(reg) != null
      );
    },
    // 指定医院
    //实时监听搜索输入内容
    searchKey4: function () {
      let key4 = String(this.searchKey4);
      key4 = key4.replace(/\s*/g, ""); //去除搜索内容中的空格
      const reg = new RegExp(key4, "ig"); //匹配规则-i：忽略大小写，g：全局匹配
      /* 进行筛选，将筛选后的数据放入新的数组中，‘name’键可根据需要搜索的key进行调整 */
      this.searchColumns4 = this.hospitalIdListName.filter(
        (item) => item.match(reg) != null
      );
    },
    // 推单平台
    //实时监听搜索输入内容
    searchKey5: function () {
      let key5 = String(this.searchKey5);
      key5 = key5.replace(/\s*/g, ""); //去除搜索内容中的空格
      const reg = new RegExp(key5, "ig"); //匹配规则-i：忽略大小写，g：全局匹配
      /* 进行筛选，将筛选后的数据放入新的数组中，‘name’键可根据需要搜索的key进行调整 */
      this.searchColumns5 = this.thirdPartContentplatformInfoNameList.filter(
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
  height: 80%;
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
  .item_con {
    background-image: url("../../../assets/right.png");
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
    .item_center {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 7px 0;
      .item_right {
        width: 100%;
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
      .nickname_con {
        display: flex;
        .nickname {
          width: 130px;
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
