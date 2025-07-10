<template>
  <div class="content">
    <div class="anchor">客户信息</div>
    <div>
      <van-field
        v-model="form.customerName"
        label="客户昵称"
        placeholder="请输入客户昵称"
        class="customer_content"
        @input="customerNameInput"
      />
      <!-- @input="phoneInput" -->
      <van-field
        v-model="form.phone"
        label="手机号"
        placeholder="请输入手机号"
        class="customer_content"
        maxlength="11"
        disabled
      />
      <van-field
        v-model="form.province"
        label="省份"
        placeholder="请输入省份"
        class="customer_content"
        @input="provinceInput"
      />
      <van-field
        v-model="form.city"
        label="城市"
        placeholder="请输入城市"
        class="customer_content"
        @input="cityInput"
      />
      <van-field
        v-model="form.sex"
        label="性别"
        disabled
        placeholder="请选择性别"
        class="customer_content"
        @click="model.sexModel = true"
      />
      <van-field
        v-model="form.birthday"
        label="生日"
        disabled
        placeholder="请选择生日"
        class="customer_content"
        @click="model.birthdayModel = true"
      />
      <van-field
        v-model="form.occupation"
        label="职业"
        placeholder="请输入职业"
        class="customer_content"
        @input="occupationInput"
      />
      <van-field
        v-model="form.wechatNumber"
        label="微信备注"
        placeholder="请输入微信备注"
        class="customer_content"
        @input="wechatNumberInput"
      />
      <div class="switch_content">
          <van-cell center title="是否为日不落直播"  class="switch_con">
              <van-switch v-model="form2.isRiBuLuoLiving" size="24" />
          </van-cell>
      </div>
      <div class="customer_img">顾客照片</div>
      <div  class="img_content">
        <div v-for="(item,index) in form2.imgList" :key="index" style="display:flex;">
          <div class="img_item">
            <viewer v-if="item"  baseLayerPicker ="true" >
              <img :src="item" alt=""  class="img" >
              </viewer>
            <span class="opacity_con"  @click="deletClick(index)">x</span>
          </div>
        </div>
        <van-uploader :after-read="afterReadClick" :max-count="1" :max-size="5 * 1024 * 1024" @oversize="onOversize" :before-read="beforeRead" v-if="form2.imgList.length<5"/>
      </div>
    </div>
    <div>
      <van-popup v-model="model.sexModel" round position="bottom">
        <van-picker
          show-toolbar
          :columns="list.sexListName"
          @cancel="model.sexModel = false"
          @confirm="sexListConfirm"
        />
      </van-popup>
      <!-- 年月日选择 -->
      <!-- <van-popup
        v-model="model.birthdayModel"
        position="bottom"
        style="height: 50%"
        round
      >
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择生日"
          :min-date="minDate"
          :max-date="maxDate"
          :show-toolbar="true"
          @cancel="model.birthdayModel = false"
          @confirm="confirmFn"
        />
      </van-popup> -->
      <!-- 日期选择 -->
      <van-calendar
        v-model="model.birthdayModel"
        @confirm="onConfirm"
        color="#1989fa"
        :min-date="minDate"
        :max-date="maxDate"
      />
      
    </div>
    <div class="bottom">
      <van-button round block type="info" class="button" @click="prevStep"
        >上一步</van-button
      >
      <van-button round block type="info" class="button" @click="nextStep"
        >下一步</van-button
      >
    </div>
  </div>
</template>
<script>
import * as api from "@/api/order.js";
// import upload from "@/components/upload/upload.vue"
export default {
  props: {
    active: Number,
    anchorCustomerServiceMessage: Object,
    message:Object
  },
  components:{
    // upload
  },
  data() {
    return {
      currentDate: "",
      minDate: new Date(2020, 1, 1),
      maxDate: new Date(2028, 1, 1),
      // 用于页面展示
      form: {
        // 客户昵称
        customerName: "",
        // 手机号
        phone: "",
        // 性别
        sex: "",
        // 生日
        birthday: "",
        // 职业
        occupation: "",
        // 微信备注
        wechatNumber: "",
        // 城市
        city: "",
        // 省份
        province:''
      },
      // 用于传给接口id
      form2: {
        // 客户昵称
        customerName: "",
        // 手机号
        phone: "",
        // 性别
        sex: "",
        // 生日
        birthday: "",
        // 职业
        occupation: "",
        // 微信备注
        wechatNumber: "",
        // 城市
        city: "",
        // 顾客图片
        imgList:[],
        // 是否为日不落直播
        isRiBuLuoLiving:false,
        // 省份
        province:''
        
      },
      
      // model
      model: {
        sexModel: false,
        birthdayModel: false,
        
      },
      // 用于页面展示数据
      list: {
        sexListName: ["男", "女"],
      },
    };
  },
  methods: {
    
    
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
      this.form2.imgList.splice(index, 1)
    },
    afterReadClick(file){
      // 此时可以自行将文件上传至服务器
      let content = file.file;
        let data = new FormData();
        data.append('uploadfile',content);
        api.upload(data).then(res=>{
          if(res.code == 0){
            this.form2.imgList.push(res.data.url)
            return
          }else if(res.code == 404){
            this.$toast("上传失败！");
            return
          }
        })
    },
    // onRead2(file) {
    //     let content = file.file;
    //     let data = new FormData();
    //     data.append('uploadfile',content);
    //     // api.upload(data).then(res=>{
    //     //   if(res.code == 0){
    //     //     console.log(res.data.url)
    //     //     this.fileList.push(res.data.url)
    //     //     this.imgList.push(res.data.url)
    //     //     // this.fileList.push(res.data.url)
    //     //   }
    //     // })
    //     this.$axios.post('https://www.ameiyes.com/fxopenoss/aliyunoss/uploadone',data).then(res=>{
    //       if(res.code === 0){
    //         console.log(res.data.url)
    //         this.fileList.push(res.data.url)
    //       }
    //     })
    // },
    prevStep() {
      this.$emit("edidActive3", {
        active: 1,
        // anchorCustomerServiceMessage: {
        //   // 客户昵称
        //   customerName: "",
        //   // 手机号
        //   phone: "",
        //   // 性别
        //   sex: "",
        //   // 生日
        //   birthday: "",
        //   // 职业
        //   occupation: "",
        //   // 微信备注
        //   wechatNumber: "",
        //   // 城市
        //   city: "",
        // },
      });
      sessionStorage.setItem('customerFormName',JSON.stringify(this.form))
      sessionStorage.setItem('customerFormId',JSON.stringify(this.form2))
    },
    nextStep() {
      const { customerName, phone, province,city ,sex} = this.form;

      if (!customerName) {
        this.$toast("请输入客户昵称");
        return;
      }
      if (!phone) {
        this.$toast("请输入手机号");
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        this.$toast("请输入正确的手机号");
        return false;
      }
      if (!province) {
        this.$toast("请输入省份");
        return;
      }
      if (!city) {
        this.$toast("请输入城市");
        return;
      }
      if (!sex) {
        this.$toast("请选择性别");
        return;
      }
      this.$emit("edidActive3", {
        active: 3,
        anchorCustomerServiceMessage: this.form2,
      });
      sessionStorage.setItem('customerFormName',JSON.stringify(this.form))
      sessionStorage.setItem('customerFormId',JSON.stringify(this.form2))
    },
    customerNameInput(value) {
      this.form.customerName = value;
      this.form2.customerName = value;
    },
    phoneInput(value) {
      this.form.phone = value;
      this.form2.phone = value;
    },
    sexListConfirm(value) {
      this.form.sex = value;
      this.form2.sex = value;
      this.model.sexModel = false;
    },
    occupationInput(value) {
      this.form.occupation = value;
      this.form2.occupation = value;
    },
    wechatNumberInput(value) {
      this.form.wechatNumber = value;
      this.form2.wechatNumber = value;
    },
    cityInput(value) {
      this.form.city = value;
      this.form2.city = value;
    },
    provinceInput(value) {
      this.form.province = value;
      this.form2.province = value;
    },
    // // 弹出时间选择框
    // showBirthFn() {
    //   this.model.birthdayModel = true;
    //   this.currentDate = new Date(this.form.birthday); // 设置data组件默认显示时间
    // },
    // // 时间选择
    // confirmFn() {
    //   const dateStr = this.$moment(this.currentDate).format("YYYY-MM-DD");
    //   console.log(dateStr);
    //   // 前端页面同步
    //   this.form.birthday = dateStr;
    //   this.form2.birthday = dateStr;
    //   // 时间选择器关闭
    //   this.model.birthdayModel = false;
    // },
    onConfirm(value) {
      this.form.birthday = this.$moment(value).format("YYYY-MM-DD");
      this.form2.birthday = this.$moment(value).format("YYYY-MM-DD");
      this.model.birthdayModel = false;
    },
  },
  mounted(){
    
  },
  created() {
    
    this.form.phone = this.$route.query.phone
    this.form2.phone = this.$route.query.phone
    let customerFormName = JSON.parse(sessionStorage.getItem('customerFormName'))
    let customerFormId = JSON.parse(sessionStorage.getItem('customerFormId'))
    if(customerFormName || customerFormId){
            this.form.customerName = customerFormName.customerName
            this.form.phone = customerFormName.phone
            this.form.sex = customerFormName.sex
            this.form.birthday = customerFormName.birthday
            this.form.occupation = customerFormName.occupation
            this.form.wechatNumber = customerFormName.wechatNumber
            this.form.city = customerFormName.city
            this.form.province = customerFormName.province

            this.form2.customerName = customerFormId.customerName
            this.form2.phone = customerFormId.phone
            this.form2.sex = customerFormId.sex
            this.form2.birthday = customerFormId.birthday
            this.form2.occupation = customerFormId.occupation
            this.form2.wechatNumber = customerFormId.wechatNumber
            this.form2.city = customerFormId.city
            this.form2.province = customerFormId.province
            this.form2.imgList = customerFormId.imgList
            this.form2.isRiBuLuoLiving = customerFormId.isRiBuLuoLiving
          
    }
    
  },
};
</script>

<style scoped lang="less">
/deep/.van-uploader__upload {
  width:50px;
  height:50px;
}
/deep/ .van-cell {
  padding: 10px 0;
}
/deep/.switch_con{
    width: 160px;
    color: #5492fe;
    // margin-left: -17px;
    display: flex;
    align-items: center;
}
.content {
  width: 92%;
  background: #fff;
  // height: 350px;
  margin: 20px auto 0;
  border-radius: 10px;
  box-shadow: 10px 10px 10px rgba(0, 0.5);
  padding: 10px;
  box-sizing: border-box;
  .switch_content{
        width: 100%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #bbd3ff;
        // padding: 10px 0;
        // box-sizing: border-box;
  }
  .img_content{
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
  .anchor {
    border-left: 3px solid #eacebf;
    font-size: 16px;
    font-weight: bold;
    padding-left: 5px;
    box-sizing: border-box;
    height: 17px;
    line-height: 17px;
    color: #5492fe;
    margin-bottom: 10px;
  }
  .customer_content {
    border-bottom: 1px solid #bbd3ff;
    padding: 10px 0;
    box-sizing: border-box;
    /deep/.van-cell__title,
    .van-field__label {
      width: 70px;
      color: #5492fe;
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
}
</style>
