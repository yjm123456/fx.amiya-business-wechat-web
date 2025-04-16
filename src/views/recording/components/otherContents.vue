<template>
  <div class="content">
    <div class="anchor">其他内容</div>
    <div>
      <van-field
        v-model="form.consultingContent"
        label="主派咨询内容"
        placeholder="请输入主派咨询内容"
        class="customer_content"
        @input="consultingContentInput"
        type="textarea"
        :rows="4"
      />
      <van-field
        v-model="form.consultingContent2"
        label="次派咨询内容"
        placeholder="请输入次派咨询内容"
        class="customer_content"
        @input="consultingContentInput2"
        type="textarea"
        :rows="4"
      />
      <van-field
        v-model="form.unSendReason"
        label="未派单原因"
        placeholder="请输入未派单原因"
        class="customer_content"
        @input="unSendReasonInput"
        type="textarea"
        :rows="4"
      />
      <van-field
        v-model="form.lateProjectStage"
        label="后期项目铺垫"
        placeholder="请输入后期项目铺垫"
        class="customer_content"
        @input="lateProjectStageInput"
        type="textarea"
        :rows="4"
      />
      <van-field
        v-model="form.remark"
        label="备注"
        placeholder="请输入备注"
        class="customer_content"
        @input="remarkInput"
        type="textarea"
        :rows="4"
      />
    </div>
    <div class="bottom">
      <van-button round block type="info" class="button" @click="prevStep"
        >上一步</van-button
      >
      <van-button round block type="info" class="button" @click="nextStep"
        >完成</van-button
      >
    </div>
  </div>
</template>
<script>
import * as api from "@/api/order.js";
export default {
  props: {
    active: Number,
    anchorCustomerServiceMessage: Object,
    message:Object
  },
  data() {
    return {
      // 用于页面展示
      form: {
        // 主派咨询内容
        consultingContent: "",
        consultingContent2: "",
        // 未派单原因
        unSendReason: "",
        // 后期铺垫
        lateProjectStage: "",
        // 备注
        remark: "",
      },
      
    };
  },
  methods: {
    prevStep() {
      this.$emit("edidActive4", {
        active: 2,
        anchorCustomerServiceMessage:{
            // 咨询内容
            consultingContent: "",
            consultingContent2: "",
            // 未派单原因
            unSendReason: "",
            // 后期铺垫
            lateProjectStage: "",
            // 备注
            remark: "",
        },
      });
      sessionStorage.setItem('otherForm',JSON.stringify(this.form))
    },
    nextStep() {
      this.$emit("edidActive4", {
        active: 4,
        anchorCustomerServiceMessage: this.form,
      });
      sessionStorage.setItem('otherForm',JSON.stringify(this.form))
      let anchorFormId = JSON.parse(sessionStorage.getItem('anchorFormId'))
      let orderFormId = JSON.parse(sessionStorage.getItem('orderFormId'))
      let customerFormId = JSON.parse(sessionStorage.getItem('customerFormId'))
      let otherForm = JSON.parse(sessionStorage.getItem('otherForm'))
      // console.log(anchorFormId,'客服主播')
      // console.log(orderFormId,'订单信息')
      // console.log(customerFormId,'客户信息')
      // console.log(otherForm,'其他信息')
      // const {anchorCustomerServiceMessage,customerMessage,orderMessage,otherContents} = this.message
      const data = {
        // 主播客服数据
        belongEmpId:Number(anchorFormId.belongEmpId),
        contentPlateFormId:anchorFormId.contentPlateFormId,
        goodsId:anchorFormId.goodsId,
        hospitalDepartmentId:anchorFormId.hospitalDepartmentId,
        liveAnchorId:Number(anchorFormId.liveAnchorId),
        liveAnchorWeChatNo:anchorFormId.liveAnchorWeChatNo,
        belongChannel:anchorFormId.belongChannel,
        // 客户信息
        birthday:customerFormId.birthday ? customerFormId.birthday : null,
        city:customerFormId.city,
        province:customerFormId.province,
        customerName:customerFormId.customerName,
        occupation:customerFormId.occupation,
        phone:customerFormId.phone,
        sex:customerFormId.sex,
        wechatNumber:customerFormId.wechatNumber,
        customerPictures:customerFormId.imgList,
        isRiBuLuoLiving:customerFormId.isRiBuLuoLiving,

        // 订单信息
        addOrderPrice:Number(orderFormId.addOrderPrice),
        appointmentHospitalId:Number(orderFormId.appointmentHospitalId),
        belongMonth:Number(orderFormId.belongMonth),
        consultationType:Number(orderFormId.consultationType),
        depositAmount:Number(orderFormId.depositAmount),
        orderSource:Number(orderFormId.orderSource),
        orderType:Number(orderFormId.orderType),
        getCustomerType:Number(orderFormId.getCustomerType),
        customerSource:Number(orderFormId.customerSource),
        customerType:Number(orderFormId.customerType),
        belongCompanyEnumId:Number(orderFormId.belongCompanyEnumId),
        // 其他内容
        consultingContent:otherForm.consultingContent,
        consultingContent2:otherForm.consultingContent2,
        lateProjectStage:otherForm.lateProjectStage,
        remark:otherForm.remark,
        unSendReason:otherForm.unSendReason,
        appointmentDate:null,
        consultationEmpId:null,
        acceptConsulting:''
      }
      api.contentPlateFormAddOrder(data).then((res) => {
        if(res.code === 0){
            this.$toast("录单成功");
            // this.$router.push('/orderList')
            this.$router.push('/noDispatch')
            sessionStorage.removeItem('anchorFormName')
            sessionStorage.removeItem('anchorFormId')
            sessionStorage.removeItem('orderFormName')
            sessionStorage.removeItem('orderFormId')
            sessionStorage.removeItem('customerFormName')
            sessionStorage.removeItem('customerFormId')
            sessionStorage.removeItem('otherForm')
            // 返回上一页面且刷新页面
            // this.$router.go(-1)
        }else{
            this.$toast(res.msg)
        }
      })
    },
    consultingContentInput(value) {
      this.form.consultingContent = value;
    },
    consultingContentInput2(value) {
      this.form.consultingContent2 = value;
    },
    unSendReasonInput(value) {
      this.form.unSendReason = value;
    },
    remarkInput(value) {
      this.form.remark = value;
    },
    lateProjectStageInput(value) {
      this.form.lateProjectStage = value;
    },
    
  },
  created() {
    let otherForm = JSON.parse(sessionStorage.getItem('otherForm'))
    if(otherForm){
        this.form.consultingContent = otherForm.consultingContent
        this.form.consultingContent2 = otherForm.consultingContent2
        this.form.unSendReason = otherForm.unSendReason
        this.form.lateProjectStage = otherForm.lateProjectStage
        this.form.remark = otherForm.remark
    }
  },
};
</script>

<style scoped lang="less">
.content {
  width: 92%;
  background: #fff;
  // height: 505px;
  margin: 20px auto 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 10px rgba(0, 0.5);
  padding: 10px;
  box-sizing: border-box;
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
      width: 90px;
      color: #5492fe;
    }
  }
  .bottom {
    display: flex;
    margin-top: 20px;
    .button {
      width: 40%;
      height: 42px;
      margin: 0 auto 20px;
    }
  }
}
</style>
