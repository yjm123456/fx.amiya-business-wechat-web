<template>
  <div class="content">
    <div class="item" @click="recordApplicationclick">
      <i class="iconfont icon-weiwanchengpaidan icon_dispatch"></i>
      <span class="title">录单申请</span>
    </div>
    <div class="item" @click="$router.push('/mySubmit')">
      <i class="iconfont icon-weiwanchengpaidan icon_dispatch"></i>
      <span class="title">我提交的</span>
    </div>
    <div class="item" @click="$router.push('/myReceive')">
      <i class="iconfont icon-wanchengpaidan icon_dispatch"></i>
      <span class="title">我收到的</span>
    </div>

    <!-- 录单申请 -->
    <van-popup
      v-model="recordApplication"
      position="bottom"
      class="dispatch_content"
      round
      :close-on-click-overlay="false"
    >
      <van-field
        v-model="form.acceptByName"
        label="接收人"
        placeholder="请选择接收人"
        class="customer_content"
        disabled
      />
      <van-field
        v-model="form.phone"
        label="手机号"
        placeholder="请输入手机号"
        class="customer_content"
        disabled
        maxlength="11"
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
              <img :src="item" alt=""  class="img" >
              </viewer>
            <span class="opacity_con"  @click="deletClick(index)">x</span>
          </div>
        </div>
        <van-uploader :after-read="afterReadClick" :max-count="1" :max-size="5 * 1024 * 1024" @oversize="onOversize" :before-read="beforeRead" v-if="form.imgList.length<1"/>
      </div>
      <div class="bottom">
        <van-button round block type="default" class="button" @click="cancel"
          >取消</van-button
        >
        <van-button round block type="info" class="button" @click="submite"
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
  </div>
</template>
<script>
import * as api from "@/api/order.js";
import {processEnv} from "@/http/baseUrl";

export default {
  data() {
    return {
      processEnv,
      // 录单申请model
      recordApplication: false,
      form: {
        id: "",
        // acceptBy: 104,
        // acceptByName: "虞郑韡",
        acceptBy: null,
        acceptByName: "",
        // acceptBy: 220,
        // acceptByName: "张凌玥",
        // acceptBy: 1,
        // acceptByName: "管理员",
        phone: "",
        hospitalId: null,
        hospitalName: "",
        sendRemark: "",
        addWorkType:1,
        addWorkTypeName:'录单申请',
        // 截图
        imgList:[]
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
    };
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
    deletClick(index){
      this.form.imgList.splice(index, 1)
    },
    // 根据职位为客服主管获取录单人信息
    getPositionEm(){
      // console.log(processEnv.VUE_APP_BASE_URL)
      // 14是线上职位id 32是测试职位id
      const data = {
        positionId:processEnv.VUE_APP_BASE_URL == 'https://www.ameiyes.com' ? 14 : 32
      }
      api.getEmployeeByPositionId(data).then((res) => {
        if(res.code == 0){
          this.employeeList = [res.data.employee[0]]
          this.form.acceptBy = res.data.employee[0].id
          this.form.acceptByName = res.data.employee[0].name
        }
      })
    },
    // 判断是否是从录单那里跳转过来的
    recordApplicationclick(){
        if(this.$route.query.phone){
            this.recordApplication = true
            return
        }else{
            if(this.$route.query.checkStateText == '未审核'){
                this.$toast({
                    message: '该订单已在录单申请列表进行申请，请等待审核通过后录单！',
                    duration: 4000,
                    position: "center",
                });
                return
            }else if(this.$route.query.checkStateText == '审核通过'){
                this.$toast({
                    message: '该订单已在录单申请列表进行申请，请在【系统端】录单申请列表进行录单！',
                    duration: 4000,
                    position: "center",
                });
                return
            }else{
                this.$toast({
                    message: '请在录单页面发起录单申请！',
                    duration: 3000,
                    position: "center",
                });
            }
        }
    },
    cancel() {
      this.recordApplication = false;
      this.form.hospitalId = null
      this.form.hospitalName = ''
      this.form.sendRemark = ''
      this.form.imgList = []
    },
    submite() {
      const { acceptBy, hospitalId, phone,  sendRemark,addWorkType,imgList } = this.form;
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
        hospitalId: Number(hospitalId),
        acceptBy: Number(acceptBy),
        phone,
        sendRemark: sendRemark,
        addWorkType,
        picture:imgList.length == 0 || !imgList ? '' : imgList[0]
      };
      api.addContentPlatFormOrderAddWork(data).then((res) => {
        if (res.code === 0) {
          this.$toast("添加成功");
          this.cancel()
        } else {
          this.$toast(res.msg);
        }
      });
    },
    // 申请理由
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
      this.form.sendByName = value;
      this.sendByModel = false;
      this.searchKey2 = "";
      // 取id
      this.employee.map((item) => {
        if (item.name == value) {
          this.form.sendBy = item.id;
        }
      });
    },
  },
  created() {
    if(this.$route.query.phone){
        this.form.phone = this.$route.query.phone;
    }
    this.getHospitalInfo();
    this.getCustomerServiceNameList();
    this.getPositionEm()
  },
};
</script>

<style scoped lang="less">
.dispatch_content {
  height: 55%;
  color: #5492fe;
}
.content {
  width: 100%;
  height: 100vh;
  background: linear-gradient(#8ab4fe, #fff);
  padding-top: 30px;
  box-sizing: border-box;
  .item {
    width: 80%;
    height: 45px;
    line-height: 45px;
    background: #fff;
    border-radius: 30px;

    margin: 0 auto 30px;
    display: flex;
    align-items: center;
    color: #5492fe;
    .icon_dispatch {
      font-size: 32px;
      margin-left: -12px;
    }
    .title {
      font-size: 16px;
      margin-left: -34px;
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
}
</style>
