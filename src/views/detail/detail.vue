<template>
  <div class="container" v-if="$route.query.orderInfo">
    <div class="step_con">
      <!-- $route.query.orderInfo.orderStatusText == '未派单' ? 0 : $route.query.orderInfo.orderStatusText == '已派单' ? 1 : $route.query.orderInfo.isToHospital == true ? 2 : $route.query.orderInfo.orderStatusText == '已成交' ?  3 : $route.query.orderInfo.orderStatusText == '已接单' ? 1 : $route.query.orderInfo.orderStatusText == '重单-不可深度' ? 2 : $route.query.orderInfo.orderStatusText == '重单-可深度' ? 2 : $route.query.orderInfo.orderStatusText == '未成交' ? 2 : 0 -->
      <van-steps
        :active="$route.query.orderInfo.orderStatusText == '已成交' ? 3 :  ($route.query.orderInfo.isToHospital == true || $route.query.orderInfo.orderStatusText == '重单-不可深度' || $route.query.orderInfo.orderStatusText == '未成交' ? 2 : ($route.query.orderInfo.orderStatusText == '已派单' || $route.query.orderInfo.orderStatusText == '已接单') ? 1 : 0)"
        active-color="#5492FE"
        style="border-radius: 10px"
      >
        <van-step>录单</van-step>
        <!-- 派单状态 -->
        <van-step>已派单</van-step>
        <!-- 到院状态 -->
        <van-step>已到院</van-step>
        <!-- 成交状态 -->
        <van-step>已成交</van-step>
      </van-steps>
    </div>
    <div class="content">
      <div class="order_con">
        <span class="orderid">订单编号：{{ $route.query.orderInfo.id }}</span>
        <span
          class="copy"
          v-clipboard:copy="$route.query.orderInfo.id"
          v-clipboard:success="onCopySuccess"
          >复制</span
        >
      </div>
      <div class="item">
        <div class="anchor">客户信息</div>
        <div class="item_w">
          <span>客户昵称：{{ $route.query.orderInfo.customerName }}</span>
        </div>
        <div class="item_w">
          <span>微信号：{{ $route.query.orderInfo.wechatNumber }}</span>
        </div>
        <div class="item_f">
          <span>手机号：{{ $route.query.orderInfo.phone }}</span>
          <span>性别：{{ $route.query.orderInfo.sex }}</span>
        </div>
        <div class="item_f">
          <span>生日：{{ $route.query.orderInfo.birthday }}</span>
          <span>职业：{{ $route.query.orderInfo.occupation }}</span>
        </div>

        <div class="item_f">
          <span>省份：{{ $route.query.orderInfo.province }}</span>
          <span>城市：{{ $route.query.orderInfo.city }}</span>
          
        </div>
        <div class="item_f">
          <span
            >新老客业绩：{{
              $route.query.orderInfo.isOldCustomer == true
                ? "老客业绩"
                : "新客业绩"
            }}</span
          >
          <span>获客方式：{{ $route.query.orderInfo.getCustomerTypeText }}</span>
        </div>
        <div class="item_f">
          <span>客户类型：{{ $route.query.orderInfo.customerTypeText }}</span>
          <span>客户来源：{{ $route.query.orderInfo.customerSourceText }}</span>
        </div>
        <div class="item_f">
          <span>归属部门：{{ $route.query.orderInfo.belongChannelText }}</span>
          <span>是否为日不落直播：{{ $route.query.orderInfo.isRiBuLuoLiving == true ? '是' : '否' }}</span>
        </div>

      </div>

      <div class="item">
        <div class="anchor">门店信息</div>
        <div class="item_w">
          <span
            >预约门店：{{
              $route.query.orderInfo.appointmentHospitalName
            }}</span
          >
        </div>
        <div class="item_w">
          <span>派单时间：{{ $route.query.orderInfo.sendDate ? this.$moment($route.query.orderInfo.sendDate).format("YYYY-MM-DD HH:mm:ss") : null }}</span>
        </div>
        <div class="item_w">
          <span>派单医院：{{ $route.query.orderInfo.sendHospitalName }}</span>
        </div>
        <div class="item_w">
          <span
            >是否到院：{{
              $route.query.orderInfo.isToHospital == true ? "已到院" : "未到院"
            }}</span
          >
        </div>
        <div class="item_w">
          <span>到院类型：{{ $route.query.orderInfo.toHospitalTypeText }}</span>
        </div>
        <div class="item_w">
          <span>到院时间：{{  $route.query.orderInfo.toHospitalDate ? this.$moment($route.query.orderInfo.toHospitalDate).format("YYYY-MM-DD HH:mm:ss") : null}}</span>
        </div>
        <div class="item_w">
          <span>成交时间：{{  $route.query.orderInfo.dealDate ? this.$moment($route.query.orderInfo.dealDate).format("YYYY-MM-DD HH:mm:ss") : null}}</span>
        </div>
        <div class="item_w">
          <span
            >到院医院：{{ $route.query.orderInfo.lastDealHospitalName }}</span
          >
        </div>
        <div class="item_w">
          <span>医院网咨人员：{{ $route.query.orderInfo.netWorkConsulationName }}</span>
        </div>
        <div class="item_w">
          <span>医院现场咨询人员：{{ $route.query.orderInfo.sceneConsulationName }}</span>
        </div>
      </div>

      <div class="item">
        <div class="anchor">主播客服信息</div>
        <div class="item_w">
          <span
            >主播平台：{{ $route.query.orderInfo.contentPlateFormName }}</span
          >
        </div>
        <div class="item_w">
          <span>主播账号：{{ $route.query.orderInfo.liveAnchorName }}</span>
        </div>
        <div class="item_w">
          <span
            >主播微信号：{{ $route.query.orderInfo.liveAnchorWeChatNo }}</span
          >
        </div>
        <div class="item_w">
          <span>归属客服：{{ $route.query.orderInfo.belongEmpName }}</span>
        </div>
        <div class="item_w">
          <span>辅助客服：{{ $route.query.orderInfo.supportEmpName }}</span>
        </div>
        <div class="item_w">
          <span>派单人：{{ $route.query.orderInfo.sendByName }}</span>
        </div>
      </div>

      <div class="item">
        <div class="anchor">交易信息</div>
        <div class="item_f">
          <span>科室：{{ $route.query.orderInfo.hospitalDepartmentName }}</span>
          <span>项目：{{ $route.query.orderInfo.goodsName }}</span>
        </div>
        <div class="item_f">
          <span>定金金额：{{ $route.query.orderInfo.depositAmount }}</span>
          <span>下单金额：{{ $route.query.orderInfo.addOrderPrice }}</span>
        </div>
        <div class="item_f">
          <span
            >归属月份：{{
              $route.query.orderInfo.belongMonth == 1 ? "历史" : "当月"
            }}</span
          >
          <span>订单类型：{{ $route.query.orderInfo.orderTypeText }}</span>
        </div>
        <div class="item_f">
          <span>订单状态：{{ $route.query.orderInfo.orderStatusText }}</span>
          <span>订单来源：{{ $route.query.orderInfo.orderSourceText }}</span>
        </div>
        <div class="item_f">
          <span>下单平台：{{ $route.query.orderInfo.contentPlateFormName }}</span>
          <span>成交金额：{{ $route.query.orderInfo.dealAmount }}</span>
        </div>
        <div class="item_f">
          <span
            >是否重单深度：{{
              $route.query.orderInfo.isRepeatProfundityOrder == true
                ? "可深度"
                : "不可深度"
            }}</span
          >
          <span
            >面诊类型：{{ $route.query.orderInfo.consultationTypeText }}</span
          >
        </div>
        <div class="item_f">
          <span>业绩类型：{{ $route.query.orderInfo.dealPerformanceTypeText }}</span>
          <span>归属公司：{{ $route.query.orderInfo.belongCompanyName }}</span>
        </div>
        <!-- <div class="item_w">
          <span
            >业绩类型：{{
              $route.query.orderInfo.dealPerformanceTypeText
            }}</span
          >
        </div> -->
        <div class="item_w">
          <span
            >三方单号：{{
              $route.query.orderInfo.otherContentPlatFormOrderId
            }}</span
          >
        </div>
        <div class="item_w">
          <span>
            主派咨询内容：{{ $route.query.orderInfo.consultingContent }}
            <span
              class="copy"
              v-clipboard:copy="'订单号：' + $route.query.orderInfo.id + ' ' + '咨询内容：' + $route.query.orderInfo.consultingContent"
              v-clipboard:success="onCopySuccess"
              v-if="$route.query.orderInfo.consultingContent"
              >复制</span
            >
          </span>
        </div>
        <div class="item_w">
          <span>
            次派咨询内容：{{ $route.query.orderInfo.consultingContent2 }}
            <span
              class="copy"
              v-clipboard:copy="'订单号：' + $route.query.orderInfo.id + ' ' + '咨询内容：' + $route.query.orderInfo.consultingContent2"
              v-clipboard:success="onCopySuccess"
              v-if="$route.query.orderInfo.consultingContent2"
              >复制</span
            >
          </span>
        </div>
        <div class="item_w">
          <span>备注：{{ $route.query.orderInfo.remark }}</span>
        </div>
        <div class="item_w">
          <span
            >后期项目铺垫：{{ $route.query.orderInfo.lateProjectStage }}</span
          >
        </div>
        <div class="item_w">
          <span>未派单原因：{{ $route.query.orderInfo.unSendReason }}</span>
        </div>
        <div class="item_w">
          <span>未成交原因：{{ $route.query.orderInfo.unDealReason }}</span>
        </div>
      </div>

      <div class="item">
        <div class="anchor">图片信息</div>
        <div class="item_img_con">
          <div class="item_img">
            成交凭证：<viewer
              v-if="$route.query.orderInfo.dealPictureUrl"
              baseLayerPicker="true"
            >
              <img
                :src="$route.query.orderInfo.dealPictureUrl"
                alt=""
                class="unImg"
              />
            </viewer>
          </div>
          <div class="item_img">
            未成交截图：<viewer
              v-if="$route.query.orderInfo.unDealPictureUrl"
              baseLayerPicker="true"
            >
              <img
                :src="$route.query.orderInfo.unDealPictureUrl"
                alt=""
                class="unImg"
              />
            </viewer>
          </div>
        </div>
      </div>

      <div class="item">
        <div class="anchor">财务信息</div>
        <div class="item_w">
          <span>审核时间：{{ $route.query.orderInfo.checkDate ? this.$moment($route.query.orderInfo.checkDate).format("YYYY-MM-DD HH:mm:ss") :null}}</span>
        </div>
        <div class="item_f">
          <span>审核人：{{ $route.query.orderInfo.checkByName }}</span>
          <span>审核状态：{{ $route.query.orderInfo.checkStateText }}</span>
        </div>
        <div class="item_f">
          <span>对账金额：{{ $route.query.orderInfo.checkPrice }}</span>
          <span>服务费合计：{{ $route.query.orderInfo.settlePrice }}</span>
        </div>
        <div class="item_f">
          <span
            >是否开票：{{
              $route.query.orderInfo.isCreateBill == true ? "已开票" : "未开票"
            }}</span
          >
        </div>
        <div class="item_w">
          <span>开票公司：{{ $route.query.orderInfo.createBillCompany }}</span>
        </div>
        <div class="item_f">
          <span
            >是否回款：{{
              $route.query.orderInfo.isReturnBackPrice == true
                ? "已回款"
                : "未回款"
            }}</span
          >
        </div>
        <div class="item_w">
          <span>回款时间：{{$route.query.orderInfo.returnBackDate ? this.$moment($route.query.orderInfo.returnBackDate).format("YYYY-MM-DD") :null}}</span>
        </div>
        <div class="item_w">
          <span>回款金额：{{ $route.query.orderInfo.returnBackPrice }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/order.js";

export default {
  props: {},
  components: {},
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    // 复制
    onCopySuccess() {
      this.$toast("复制成功");
    },
  },
  created() {
  },
};
</script>
<style scoped lang="less">
.container {
  width: 100%;
  height: 100vh;
  //   background: linear-gradient(#8ab4fe, #fff);
  background: #8ab4fe;
  padding-top: 20px;
  box-sizing: border-box;
  .content {
    height: 90%;
    overflow-y: scroll;
  }
  .step_con {
    width: 92%;
    background: #fff;
    border-radius: 10px;
    margin: 0 auto;
  }
  .item {
    width: 92%;
    background: #fff;
    // height: 350px;
    margin: 20px auto 0;
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
    .item_f {
      font-size: 13px;
      color: #5492fe;
      display: flex;
      justify-content: space-between;
      span {
        width: 50%;
        margin: 1px 0;
      }
    }
    .item_img_con {
      font-size: 13px;
      color: #5492fe;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item_img {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      span {
        width: 50%;
        margin: 1px 0;
      }
      .unImg {
        width: 40px;
        height: 40px;
      }
    }
    .item_w {
      font-size: 13px;
      color: #5492fe;
      display: flex;
      justify-content: space-between;
      span {
        width: 100%;
        margin: 1px 0;
      }
      .copy {
        background: #5492fe;
        border-radius: 10px;
        padding: 0 6px;
        box-sizing: border-box;
        color: #fff;
        margin-left: 10px;
      }
    }
    .item_s {
      font-size: 13px;
      color: #5492fe;
      display: flex;
      justify-content: space-between;
    }
  }
  .order_con {
    font-size: 13px;
    color: #5492fe;
    width: 92%;
    background: #fff;
    // height: 350px;
    margin: 20px auto 0;
    border-radius: 10px;
    box-shadow: 10px 10px 10px rgba(0, 0.5);
    padding: 10px;
    box-sizing: border-box;
    .orderid {
      border-left: 3px solid #eacebf;
      padding-left: 10px;
      box-sizing: border-box;
    }
    .copy {
      background: #5492fe;
      border-radius: 10px;
      padding: 0 6px;
      box-sizing: border-box;
      color: #fff;
      margin-left: 10px;
    }
  }
}
</style>
