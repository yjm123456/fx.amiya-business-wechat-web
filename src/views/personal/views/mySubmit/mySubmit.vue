<template>
  <div class="content" :style="{ height: list.length < 5 ? '100vh' : 'auto' }">
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
                <div style="color: #000">手机号：{{ item.phone }}</div>
                <div class="hospital_con">
                  医院：
                  <div class="hospital">{{ item.hospitalName }}</div>
                </div>
              </div>
              <div class="item_top">
                <div style="color: #000">
                  审核状态：{{ item.checkStateText }}
                </div>
                <viewer v-if="item.picture"  baseLayerPicker ="true" >
                  <img :src="item.picture" alt=""  class="img" >
                </viewer>
               
              </div>
              <div class="item_top">
                <div class="hospital_con">
                  <span style="width:70px">审核时间：</span>
                  <div class="hospital2">
                    {{
                      item.checkDate
                        ? $moment(item.checkDate).format("YYYY-MM-DD HH:mm:ss")
                        : ""
                    }}
                  </div>
                </div>
              </div>
              <div class="remark">申请理由：{{ item.sendRemark }}</div>
              <div class="remark">申请备注：{{ item.checkRemark }}</div>
              
            </div>

            <template #right>
              <van-button
                square
                color="linear-gradient(to bottom, #8ab4fe,#5492FE)"
                text="编辑"
                @click="editOrderClick(item)"
                style="height:30px"
              />
              <van-button
                square
                color="linear-gradient(to bottom, #8ab4fe,#5492FE)"
                text="转移"
                @click="transferClick(item)"
                style="height:30px"
              />
              <!-- <van-button
                square
                color="linear-gradient(to bottom, #8ab4fe,#5492FE)"
                text="录单"
                @click="addOrder(item)"
              /> -->
              <van-button
                type="danger"
                text="作废"
                @click="deletClick(item)"
                style="height:30px"
              />
            </template>
          </van-swipe-cell>
          <!-- 修改录单 -->
          <van-popup
            v-model="editOrderModel"
            position="bottom"
            class="dispatch_content"
            round
            :close-on-click-overlay="false"
          >
            <van-field
              v-model="form.acceptByName"
              label="接收人"
              disabled
              placeholder="请选择接收人"
              class="customer_content"
            />
            <van-field
              v-model="form.phone"
              label="手机号"
              placeholder="请输入手机号"
              class="customer_content"
              disabled
            />
            <van-field
              v-model="form.addWorkTypeName"
              label="申请类型"
              disabled
              placeholder="请选择申请类型"
              class="customer_content"
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
              v-model="form.sendRemark"
              label="申请理由"
              placeholder="请输入申请理由"
              class="customer_content"
              @input="remarkInput"
              type="textarea"
              :rows="4"
            />
            <div class="customer_img">截图</div>
            <div  class="img_content">
              <div v-for="(item,index) in form.imgList" :key="index" style="display:flex;">
                <div class="img_item">
                  <viewer v-if="item"  baseLayerPicker ="true" >
                    <img :src="item" alt=""  class="img2" >
                    </viewer>
                  <span class="opacity_con"  @click="deletClick2(index)" >x</span>
                </div>
              </div>
              <van-uploader :after-read="afterReadClick" :max-count="1" :max-size="5 * 1024 * 1024" @oversize="onOversize" :before-read="beforeRead" v-if="form.imgList.length<1"/>
            </div>
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
                      placeholder="请输入接收人进行搜索"
                      clearable
                      style="width:200px"
                  />
              </template>
            </van-picker>
          </van-popup>

          <!-- 转移 -->
          <van-popup
            v-model="transferModel"
            position="bottom"
            class="transfer"
            round
            :close-on-click-overlay="false"
          >
            <van-field
              v-model="transferForm.acceptByName"
              label="接收人"
              disabled
              placeholder="请选择接收人"
              class="customer_content2"
              @click="sendByModel2 = true"
            />
            <div class="bottom2">
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
                @click="transferSubmite"
                >确认</van-button
              >
            </div>
          </van-popup>
          <!-- 所有客服人员 -->
          <van-popup v-model="sendByModel2" round position="bottom">
            <van-picker
              show-toolbar
              :columns="searchColumns3"
              @cancel="sendByModel2 = false"
              @confirm="sendByConfirm2"
            >
              <!-- 添加模糊搜素 -->
              <template #title>
                  <van-field
                      v-model="searchKey3"
                      placeholder="请输入接收人进行搜索"
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

      // 修改录单
      editOrderModel: false,
      form: {
        id: "",
        acceptBy: null,
        acceptByName: "",
        phone: "",
        hospitalId: null,
        hospitalName: "",
        sendRemark: "",
        addWorkType:null,
        addWorkTypeName:'',
        // 截图
        imgList:[]
      },
      // 医院模糊搜索
      searchKey: "",
      searchColumns: [],
      // 客服模糊搜索
      searchKey2: "",
      searchColumns2: [],
      //所有员工模糊搜索
      searchKey3: "",
      searchColumns3: [],
      // 客服
      sendByName: [],
      sendByModel: false,
      sendByModel2:false,
      // 所有员工
      sendByName2:[],
      // 医院
      hospitalName: [],
      hospitalIdModel: false,

      // 转移
      transferModel:false,
      transferForm:{
        id:'',
        acceptBy:null,
        acceptByName:'',
      },
      employee2:[]

    };
  },
  created() {
    this.getHospitalInfo();
    this.getCustomerServiceNameList();
    this.getEmployeeByPositionId()
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
    searchKey3: function () {
      let key3 = String(this.searchKey3);
      key3 = key3.replace(/\s*/g, ""); //去除搜索内容中的空格
      const reg = new RegExp(key3, "ig"); //匹配规则-i：忽略大小写，g：全局匹配
      /* 进行筛选，将筛选后的数据放入新的数组中，‘name’键可根据需要搜索的key进行调整 */
      console.log(this.sendByName2)
      this.searchColumns3 = this.sendByName2.filter(
        (item) => item.match(reg) != null
      );
    },
  },
  methods: {
    afterReadClick(file){
      // 此时可以自行将文件上传至服务器
      let content = file.file;
        let data = new FormData();
        data.append('uploadfile',content);
        api.upload(data).then(res=>{
          if(res.code == 0){
            this.form.imgList.push(res.data.url)
            return
          }else if(res.code == 404){
            this.$toast("上传失败！");
            return
          }
        })
    },
    beforeRead(file) {
      if (!/(jpg|jpeg|png|JPG|PNG)/i.test(file.type)) {
        this.$toast("请上传正确格式的图片！");
        return false;
      }
      return true;
    },
    onOversize(file) {
      this.$toast("只能上传5M以内的图片！");
    },
    deletClick2(index){
      this.form.imgList.splice(index, 1)
      console.log(this.form.imgList)
    },
    // 录单
    addOrder(value){
      this.$toast('请在系统端录单！')
    },
    // 转移
    transferClick(value){
      if(value.checkState == 2){
        this.$toast('该订单已通过审核，不能再次转移！')
        return
      }else{
        this.transferModel = true
        this.transferForm.id=value.id
        return
      }
      
    },
    // 转移确认
    transferSubmite(){
      const data ={
        id:this.transferForm.id,
        acceptBy:Number(this.transferForm.acceptBy)
      }
      api.updateAcceptBy(data).then(res=>{
        if(res.code == 0){
          this.cancel()
          this.$toast.success({
            message: "转移成功",
            duration: 5,
          });
          setTimeout(()=>{
            parent.location.reload();
          },2000)
        }
      })
    },
    // 作废
    deletClick(value) {
       if(value.checkState == 2){
        this.$toast('该订单已通过审核，不能作废订单！')
        return
      }
      this.$dialog
        .confirm({
          title: "作废提示",
          message: "是否确认作废？",
        })
        .then(() => {
          // on confirm
          api.deleteOrder(value.id).then((res) => {
            if (res.code === 0) {
              this.$toast.success({
                message: "作废成功",
                duration: 5,
              });
              setTimeout(()=>{
                parent.location.reload();
              },3000)
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    cancel() {
      this.form = {};
      this.editOrderModel = false;
      this.transferForm.acceptBy = null
      this.transferForm.acceptByName = ''
      this.transferModel = false
      this.form.imgList = []
    },
    submite() {
      const { acceptBy, hospitalId, phone, id, sendRemark,addWorkType,imgList } = this.form;
      if (!acceptBy) {
        this.$toast("请选择接收人");
        return;
      }
      if (!phone) {
        this.$toast("请输入手机号");
        return;
      }
      if (!hospitalId) {
        this.$toast("请选择医院");
        return;
      }
      const data = {
        id,
        hospitalId: Number(hospitalId),
        acceptBy: Number(acceptBy),
        phone,
        sendRemark: sendRemark,
        addWorkType,
        picture:imgList[0]
      };
      api.updateContentPlatFormOrderAddWork(data).then((res) => {
        if (res.code === 0) {
          this.$toast("修改成功");
          this.form = {};
          this.editOrderModel = false;
          parent.location.reload();
        } else {
          this.$toast(res.msg);
        }
      });
    },
    // 派单留言
    remarkInput(value) {
      this.form.sendRemark = value;
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
    // 获取所有员工
    getEmployeeByPositionId() {
      // 线上职位id
        // positionId:29
        // 测试1
        // positionId:1
      const data = {
        positionId:29
      }
      api.getEmployeeByPositionId(data).then((res) => {
        this.employee2 = res.data.employee;
        let sendByName2 = [];
        this.employee2.map((item) => {
          sendByName2.push(item.name);
        });
        this.sendByName2 = sendByName2;
        this.searchColumns3 = sendByName2;
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
    // 客服确认弹窗
    sendByConfirm(value) {
      this.transferForm.acceptByName = value;
      this.sendByModel = false;
      this.sendByModel2 = false;
      this.searchKey2 = "";
      this.searchKey3 = "";
      // 取id
      this.employee.map((item) => {
        if (item.name == value) {
          this.transferForm.acceptBy = item.id;
        }
      });
    },
    // 所有客服确认弹窗
    sendByConfirm2(value) {
      this.transferForm.acceptByName = value;
      this.sendByModel = false;
      this.sendByModel2 = false;
      this.searchKey2 = "";
      this.searchKey3 = "";
      // 取id
      this.employee2.map((item) => {
        if (item.name == value) {
          this.transferForm.acceptBy = item.id;
        }
      });
    },
    calendarClick() {
      this.calendarModel = true;
      // this.defaultDate = [this.query.startDate,this.query.endDate]
    },
    // 修改录单申请
    editOrderClick(value) {
      if(value.checkState == 2){
        this.$toast('该订单已通过审核，不能修改录单申请！')
        return
      }else{
        this.editOrderModel = true;
        this.form.acceptBy = value.acceptBy;
        this.form.acceptByName = value.acceptByEmpName;
        this.form.phone = value.phone;
        // 只要在企业微信修改录单申请 订单都改为录单申请 如需改绑请在系统端修改
        this.form.addWorkType = 1;
        this.form.addWorkTypeName = '录单申请';
        this.form.id = value.id;
        this.form.imgList = !value.picture ? [] : [value.picture];
      }
      
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

    // 获取我提交的数据
    getContentPlatFormOrderAddWorks() {
        const { pageNum, pageSize, keyWord, startDate, endDate } = this.query;
        const data = {
          startDate: startDate ? startDate : null,
          endDate: endDate ? endDate : null,
          keyWord: keyWord,
          pageNum,
          pageSize,
          hospitalId: null,
          checkState: null,
          createBy: sessionStorage.getItem("employeeId"),
        };
        api.getContentPlatFormOrderAddWork(data).then((res) => {
            if (res.code === 0) {
              const { list, totalCount } = res.data.contentPlatFormOrderAddWork;
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
      // if (sessionStorage.getItem("mySubmitPageNum") && sessionStorage.getItem("mySubmitScrollTop"))
      //   return;
      this.getContentPlatFormOrderAddWorks();
    },
    
    // handleScroll() {
    //   this.scrollTop =window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    // },

    // // 滚动到之前位置
    // async handleReturnScroll() {
    //   // let scrollTop = sessionStorage.getItem("mySubmitScrollTop");
    //   // let pageNum = sessionStorage.getItem("mySubmitPageNum");
    //   // console.log(pageNum);
    //   // 请求完毕之后会累加+ 不需要<=
    //   for (let i = 1; i < this.oldPageNum; i++) {
    //     await this.getContentPlatFormOrderAddWorks();
    //   }

    //   // 滚动到之前的位置
    //   this.$nextTick(() => {
    //     // console.log(scrollTop,"scrollTop")
    //     document.documentElement.scrollTop = Number(this.scrollTop);
    //     // console.log(document.documentElement.scrollTop,"document.body.scrollTop")
    //     // 设置完毕删除session onLoad 哪里判断了 需要删除掉 下次滚动 onload才会滚动
    //     sessionStorage.removeItem("mySubmitScrollTop");
    //     sessionStorage.removeItem("mySubmitPageNum");
    //   });
    // },
  },
  beforeRouteEnter (to, from, next) {
    // console.log("beforeRouteEnter")
      if(from.path === '/recordingApplicationList') {
        sessionStorage.removeItem("mySubmite_startDate")
        sessionStorage.removeItem("mySubmite_endDate")
      }
      next(); 
    },
  // beforeRouteEnter(to, from, next) {
  //   // console.log("beforeRouteEnter")
  //   if (from.path === "/recordingApplicationList") {
  //     sessionStorage.removeItem("mySubmitScrollTop");
  //     sessionStorage.removeItem("mySubmitPageNum");
  //     sessionStorage.removeItem("mySubmite_startDate");
  //     sessionStorage.removeItem("mySubmite_endDate");
  //   }
  //   next();
  // },
  // async mounted() {
  //   // console.log("mounted")
  //   window.addEventListener("scroll", this.handleScroll);
  // },
  // beforeDestroy() {
  //   window.removeEventListener("scroll", this.handleScroll);
  // },
  // destroyed() {
  //   debugger
  //   sessionStorage.setItem("mySubmitScrollTop", this.scrollTop);
  //   sessionStorage.setItem("mySubmitPageNum", this.query.pageNum);
  //   console.log(1111111)
  // },
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
.transfer{
  height: 30%;
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
  margin: 2px 0;
  height: 20px;
}
/deep/.van-button::before{
  height: 20px;
}
/deep/ .van-radio__label--disabled {
  color: #fff;
}

.dispatch_content {
  height: 65%;
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
.customer_content2 {
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid #bbd3ff;
  padding: 10px 0;
  box-sizing: border-box;
  margin-top: 20px;
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
   .customer_img{
    font-size: 14px;
    color: rgba(24, 23, 23, 0.685);
    margin: 10px 0;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .img_content{
    padding: 0 20px;
    box-sizing: border-box;
    .img_item{
      position:relative;
      margin-right:5px;
      .img2{
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
  .item {
    width: 96%;
    background: #e9f3ff;
    border-radius: 10px;
    margin: 15px auto 0;
    color: #565151;
    font-size: 13px;
    padding: 10px;
    box-sizing: border-box;
    .img{
      width: 40px;
      height: 40px;
      position: fixed;
      right: 20px;
    }
    .item_con {
      background-image: url("../../../../assets/right.png");
      background-size: 100% 100%;
      background-repeat: no-repeat no-repeat;
      position: fixed;
      right: 20px;
      top: 35px;
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
    .item_top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      color: #000;
      .hospital_con {
        display: flex;
        width: 187px;
        .hospital {
          width: 77%;
          overflow: hidden; /*超出隐藏*/
          text-overflow: ellipsis; /*隐藏后添加省略号*/
          white-space: nowrap; /*强制不换行*/
          color: #000;
        }
        .hospital2 {
          width: 65%;
          overflow: hidden; /*超出隐藏*/
          text-overflow: ellipsis; /*隐藏后添加省略号*/
          white-space: nowrap; /*强制不换行*/
          color: #000;
        }
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
.bottom2 {
  display: flex;
  margin-top: 60px;
  .button {
    width: 40%;
    height: 42px;
    margin: 0 auto;
  }
}
</style>
