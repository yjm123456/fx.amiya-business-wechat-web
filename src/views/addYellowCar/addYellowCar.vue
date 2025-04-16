<template>
  <div class="content">
    <van-field
      v-model="form.recordDate"
      label="登记时间"
      disabled
      placeholder="请选择登记时间"
      class="customer_content"
      @click="recordDateClick"
    />
    <van-field
      v-model="form.belongChannelName"
      label="归属部门"
      disabled
      @click="
        belongChannelParams.belongChannelModel = true;
        form.source = null;
        form.sourceName = '';
      "
      placeholder="请选择归属部门"
      class="customer_content"
    />
    <van-field
      v-model="form.contentPlatFormName"
      label="渠道"
      disabled
      @click="
        contentPlatFormParams.contentPlatFormModel = true;
        form.liveAnchorId = null;
        form.liveAnchorName = '';
        form.source = null;
        form.sourceName = '';
      "
      placeholder="请选择渠道"
      class="customer_content"
    />
    <van-field
      v-model="form.liveAnchorName"
      label="主播IP"
      disabled
      @click="liveAnchorClick"
      placeholder="请选择主播IP"
      class="customer_content"
    />
    <van-field
      v-model="form.liveAnchorWechatNoName"
      label="主播微信号"
      disabled
      @click="liveAnchorWechatNoParams.liveAnchorWechatNoModel = true"
      placeholder="请选择主播微信号"
      class="customer_content"
    />
    <van-field
      v-model="form.customerNickName"
      label="客户昵称"
      placeholder="请输入客户昵称"
      class="customer_content"
      @input="customerNickNameInput"
    />
    <van-field
      v-model="form.phone"
      label="客户手机号"
      placeholder="请输入客户手机号"
      class="customer_content"
      @input="phoneInput"
      maxlength="11"
    />
    <van-field
      v-model="form.subPhone"
      label="辅助号码"
      placeholder="请输入辅助号码"
      class="customer_content"
      @input="subPhoneInput"
    />
    <van-field
      v-model="form.customerWechatNo"
      label="微信号"
      placeholder="请输入微信号"
      class="customer_content"
    />
    <van-field
      v-model="form.fromTitle"
      label="词条"
      placeholder="请输入词条"
      class="customer_content"
    />
    <van-field
      v-model="form.price"
      label="下单金额"
      placeholder="请输入下单金额"
      class="customer_content"
      @input="priceInput"
    />
    <van-field
      v-model="form.sourceName"
      label="客户来源"
      disabled
      @click="getcustomerSourceList"
      placeholder="请选择客户来源"
      class="customer_content"
    />
    <van-field
      v-model="form.productTypeName"
      label="产品类型"
      disabled
      @click="productTypeParams.productTypeModel = true"
      placeholder="请选择产品类型"
      class="customer_content"
      v-if="form.source == 6"
    />
    <van-field
      v-model="form.getCustomerTypeName"
      label="获客方式"
      disabled
      @click="getCustomerTypeParams.getCustomerTypeModel = true"
      placeholder="请选择获客方式"
      class="customer_content"
    />
    <van-field
      v-model="form.shoppingCartRegistrationCustomerTypeName"
      label="客户类型"
      disabled
      @click="
        shoppingCartRegistrationCustomerTypeParams.shoppingCartRegistrationCustomerTypeModel = true
      "
      placeholder="请选择客户类型"
      class="customer_content"
    />
    <van-field
      v-model="form.emergencyLevelName"
      label="重要程度"
      disabled
      @click="emergencyLevelParams.emergencyLevelModel = true"
      placeholder="请选择重要程度"
      class="customer_content"
    />
    <van-field
      v-model="form.assignEmpName"
      label="指派"
      disabled
      @click="assignEmpIdClick"
      placeholder="请选择指派"
      class="customer_content"
    />
    <van-field
      v-model="form.belongCompanyName"
      label="归属公司"
      disabled
      @click="belongCompanyParams.belongCompanyModel = true"
      placeholder="请选择归属公司"
      class="customer_content"
    />
    <div class="switch_content">
      <van-cell center title="是否为日不落数据" class="switch_con">
        <van-switch
          v-model="form.isRiBuLuoLiving"
          size="24"
          class="switch_icon"
        />
      </van-cell>
    </div>
    <van-field
      v-model="form.remark"
      label="备注"
      placeholder="请输入备注"
      class="customer_content"
      type="textarea"
      :rows="4"
    />
    <div class="content_pic">
      <div class="customer_img">线索截图</div>
      <div class="img_content">
        <div
          v-for="(item, index) in imgList"
          :key="index"
          style="display: flex"
        >
          <div class="img_item">
            <viewer v-if="item" baseLayerPicker="true">
              <img :src="item" alt="" class="img" />
            </viewer>
            <span class="opacity_con" @click="deletClick(index)">x</span>
          </div>
        </div>
        <van-uploader
          :after-read="afterReadClick"
          :max-count="1"
          :max-size="5 * 1024 * 1024"
          @oversize="onOversize"
          :before-read="beforeRead"
          v-if="imgList.length < 1"
        />
      </div>
    </div>
    <div class="switch_content">
      <van-cell center title="是否加v" class="switch_con">
        <van-switch
          v-model="form.IsAddWeChat"
          size="24"
          class="switch_icon"
          @change="IsAddWeChatChange"
        />
      </van-cell>
    </div>
    <div class="content_pic" v-if="form.IsAddWeChat == true">
      <div class="customer_img">加v截图</div>
      <div class="img_content">
        <div
          v-for="(item2, index) in imgList2"
          :key="index"
          style="display: flex"
        >
          <div class="img_item">
            <viewer v-if="item2" baseLayerPicker="true">
              <img :src="item2" alt="" class="img" />
            </viewer>
            <span class="opacity_con" @click="deletClick2(index)">x</span>
          </div>
        </div>
        <van-uploader
          :after-read="afterReadClick2"
          :max-count="1"
          :max-size="5 * 1024 * 1024"
          @oversize="onOversize2"
          :before-read="beforeRead2"
          v-if="imgList2.length < 1"
        />
      </div>
    </div>
    <div class="switch_content">
      <van-cell center title="是否面诊" class="switch_con">
        <van-switch
          v-model="form.isConsultation"
          size="24"
          class="switch_icon"
          @change="isConsultationChange"
        />
      </van-cell>
    </div>
    <van-field
      v-model="form.consultationDate"
      label="面诊时间"
      disabled
      placeholder="请选择面诊时间"
      class="customer_content"
      @click="recordDateClick2"
      v-if="form.isConsultation == true"
    />
    <div class="switch_content">
      <van-cell center title="是否退款" class="switch_con">
        <van-switch
          v-model="form.isReturnBackPrice"
          size="24"
          class="switch_icon"
          @change="isReturnBackPriceChange"
        />
      </van-cell>
    </div>
    <van-field
      v-model="form.refundTypeName"
      label="退款类型"
      disabled
      @click="refundTypeParams.refundTypeModel = true"
      placeholder="请选择退款类型"
      class="customer_content"
      v-if="form.isReturnBackPrice == true"
    />
    <van-field
      v-model="form.refundDate"
      label="退款时间"
      disabled
      placeholder="请选择退款时间"
      class="customer_content"
      @click="recordDateClick3"
      v-if="form.isReturnBackPrice == true"
    />
    <van-field
      v-model="form.refundReason"
      label="退款原因"
      placeholder="请输入退款原因"
      class="customer_content"
      type="textarea"
      :rows="4"
      :disabled="form.refundTypeName != '其他'"
      v-if="form.isReturnBackPrice == true"
    />
    <div class="switch_content">
      <van-cell center title="是否差评" class="switch_con">
        <van-switch
          v-model="form.isBadReview"
          size="24"
          class="switch_icon"
          @change="isBadReviewChange"
        />
      </van-cell>
    </div>
    <van-field
      v-model="form.badReviewDate"
      label="差评时间"
      disabled
      placeholder="请选择差评时间"
      class="customer_content"
      @click="recordDateClick4"
      v-if="form.isBadReview == true"
    />
    <van-field
      v-model="form.badReviewReason"
      label="差评原因"
      placeholder="请输入差评原因"
      class="customer_content"
      type="textarea"
      :rows="2"
      v-if="form.isBadReview == true"
    />
    <van-field
      v-model="form.badReviewContent"
      label="差评内容"
      placeholder="请输入差评内容"
      class="customer_content"
      type="textarea"
      :rows="2"
      v-if="form.isBadReview == true"
    />
    <div class="switch_content">
      <van-cell center title="是否追评" class="switch_con">
        <van-switch
          v-model="form.isReContent"
          size="24"
          class="switch_icon"
          @change="form.reContent = ''"
        />
      </van-cell>
    </div>
    <van-field
      v-model="form.reContent"
      label="追评内容"
      placeholder="请输入追评内容"
      class="customer_content"
      type="textarea"
      :rows="2"
      v-if="form.isReContent == true"
    />
    <div class="switch_content">
      <van-cell center title="是否重复下单" class="switch_con">
        <van-switch
          v-model="form.isRepeateCreateOrder"
          size="24"
          class="switch_icon"
        />
      </van-cell>
    </div>

    <div class="bottom">
      <van-button round block type="default" class="button" @click="cancel"
        >取消</van-button
      >
      <van-button
        round
        block
        type="info"
        class="button"
        @click="submite"
        :disabled="isDispatch == true"
      >
        {{ isDispatch == false ? "确认" : "加载中..." }}</van-button
      >
    </div>

    <!-- 登记时间 -->
    <van-popup
      v-model="recordDateParams.recordDateModel"
      position="bottom"
      style="height: 50%"
      round
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :show-toolbar="true"
        @cancel="recordDateParams.recordDateModel = false"
        @confirm="confirmFn"
      />
    </van-popup>
    <!-- 归属部门  -->
    <van-popup
      v-model="belongChannelParams.belongChannelModel"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="belongChannelParams.belongChannelListName"
        @cancel="belongChannelParams.belongChannelModel = false"
        @confirm="belongChannelConfirm"
      >
      </van-picker>
    </van-popup>
    <!-- 渠道  -->
    <van-popup
      v-model="contentPlatFormParams.contentPlatFormModel"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="contentPlatFormParams.contentPlatFormListName"
        @cancel="contentPlatFormParams.contentPlatFormModel = false"
        @confirm="contentPlatFormConfirm"
      >
      </van-picker>
    </van-popup>
    <!-- 主播IP  -->
    <van-popup
      v-model="liveAnchorParams.liveAnchorModel"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="liveAnchorParams.searchColumns"
        @cancel="liveAnchorParams.liveAnchorModel = false"
        @confirm="liveAnchorConfirm"
      >
        <template #title>
          <van-field
            v-model="liveAnchorParams.searchKey"
            placeholder="请输入主播IP进行搜索"
            clearable
            style="width: 200px"
          />
        </template>
      </van-picker>
    </van-popup>
    <!-- 主播微信号  -->
    <van-popup
      v-model="liveAnchorWechatNoParams.liveAnchorWechatNoModel"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="liveAnchorWechatNoParams.searchColumns2"
        @cancel="liveAnchorWechatNoParams.liveAnchorWechatNoModel = false"
        @confirm="liveAnchorWechatNoConfirm"
      >
        <template #title>
          <van-field
            v-model="liveAnchorWechatNoParams.searchKey2"
            placeholder="请输入主播IP进行搜索"
            clearable
            style="width: 200px"
          />
        </template>
      </van-picker>
    </van-popup>

    <!-- 客户来源 -->
    <van-popup v-model="sourceParams.sourceModel" round position="bottom">
      <van-picker
        show-toolbar
        :columns="sourceParams.sourceListName"
        @cancel="sourceParams.sourceModel = false"
        @confirm="sourceConfirm"
      >
      </van-picker>
    </van-popup>
    <!-- 产品类型 -->
    <van-popup
      v-model="productTypeParams.productTypeModel"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="productTypeParams.productTypeListName"
        @cancel="productTypeParams.productTypeModel = false"
        @confirm="productTypeConfirm"
      >
      </van-picker>
    </van-popup>
    <!-- 获客方式 -->
    <van-popup
      v-model="getCustomerTypeParams.getCustomerTypeModel"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="getCustomerTypeParams.getCustomerTypeListName"
        @cancel="getCustomerTypeParams.getCustomerTypeModel = false"
        @confirm="getCustomerTypeConfirm"
      >
      </van-picker>
    </van-popup>
    <!-- 归属公司 -->
    <van-popup
      v-model="belongCompanyParams.belongCompanyModel"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="belongCompanyParams.belongCompanyListName"
        @cancel="belongCompanyParams.belongCompanyModel = false"
        @confirm="belongCompanyConfirm"
      >
      </van-picker>
    </van-popup>
    <!-- 客户类型 -->
    <van-popup
      v-model="
        shoppingCartRegistrationCustomerTypeParams.shoppingCartRegistrationCustomerTypeModel
      "
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="
          shoppingCartRegistrationCustomerTypeParams.shoppingCartRegistrationCustomerTypeListName
        "
        @cancel="
          shoppingCartRegistrationCustomerTypeParams.shoppingCartRegistrationCustomerTypeModel = false
        "
        @confirm="shoppingCartRegistrationCustomerTypeConfirm"
      >
      </van-picker>
    </van-popup>
    <!-- 重要程度 -->
    <van-popup
      v-model="emergencyLevelParams.emergencyLevelModel"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="emergencyLevelParams.emergencyLevelListName"
        @cancel="emergencyLevelParams.emergencyLevelModel = false"
        @confirm="emergencyLevelConfirm"
      >
      </van-picker>
    </van-popup>
    <!-- 指派 -->
    <van-popup
      v-model="assignEmpIdParams.assignEmpIdModel"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="assignEmpIdParams.searchColumns3"
        @cancel="assignEmpIdParams.assignEmpIdModel = false"
        @confirm="assignEmpIdConfirm"
      >
        <template #title>
          <van-field
            v-model="assignEmpIdParams.searchKey3"
            placeholder="请输入指派人员进行搜索"
            clearable
            style="width: 200px"
          />
        </template>
      </van-picker>
    </van-popup>
    <!-- 面诊时间 -->
    <van-popup
      v-model="consultationParams.consultationModel"
      position="bottom"
      style="height: 50%"
      round
    >
      <van-datetime-picker
        v-model="currentDate2"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :show-toolbar="true"
        @cancel="consultationParams.consultationModel = false"
        @confirm="consultationDateClick"
      />
    </van-popup>
    <!-- 退款类型 -->
    <van-popup
      v-model="refundTypeParams.refundTypeModel"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="refundTypeParams.refundTypeListName"
        @cancel="refundTypeParams.refundTypeModel = false"
        @confirm="refundTypeConfirm"
      >
      </van-picker>
    </van-popup>
    <!-- 退款时间 -->
    <van-popup
      v-model="refundDateParams.refundDateModel"
      position="bottom"
      style="height: 50%"
      round
    >
      <van-datetime-picker
        v-model="currentDate3"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :show-toolbar="true"
        @cancel="refundDateParams.refundDateModel = false"
        @confirm="refundDateClick"
      />
    </van-popup>
    <!-- 差评时间 -->
    <van-popup
      v-model="badReviewDateParams.badReviewDateModel"
      position="bottom"
      style="height: 50%"
      round
    >
      <van-datetime-picker
        v-model="currentDate4"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :show-toolbar="true"
        @cancel="badReviewDateParams.badReviewDateModel = false"
        @confirm="badReviewDateClick"
      />
    </van-popup>
  </div>
</template>
<script>
import * as api from "@/api/order.js";
import * as smallYellowCarRegistrationApi from "@/api/smallYellowCarRegistration.js";
import { Dialog } from "vant";
export default {
  components: {},
  inject: ["reload"],
  data() {
    return {
      currentDate: this.$moment().format("YYYY-MM-DD"),
      minDate: new Date(2020, 1, 1),
      maxDate: new Date(2028, 1, 1),
      // 面诊时间
      currentDate2: this.$moment().format("YYYY-MM-DD"),
      calendarModel: false,
      // 退款时间
      currentDate3: this.$moment().format("YYYY-MM-DD"),
      // 差评时间
      currentDate4: this.$moment().format("YYYY-MM-DD"),

      // 搜索字段
      query: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        keyword: "",
        startDate: sessionStorage.getItem("addYellowCar_startDate")
          ? sessionStorage.getItem("addYellowCar_startDate")
          : this.$moment().startOf("month").format("YYYY-MM-DD"),
        endDate: sessionStorage.getItem("addYellowCar_endDate")
          ? sessionStorage.getItem("addYellowCar_endDate")
          : this.$moment(new Date()).format("YYYY-MM-DD"),
      },
      list: [],
      loading: false,
      finished: false,
      error: false,
      startDate: "",
      endDate: "",
      // 指派model
      assignModel: false,

      form: {
        // 登记时间
        recordDate: this.$moment().format("YYYY-MM-DD"),
        // 归属部门
        belongChannel: null,
        belongChannelName: "",
        // 渠道
        contentPlatFormId: null,
        contentPlatFormName: "",
        // 主播IP
        liveAnchorId: null,
        liveAnchorName: "",
        // 主播微信号
        liveAnchorWechatNo: "",
        liveAnchorWechatNoName: "",
        // 客户昵称
        customerNickName: "",
        // 手机号
        phone: "",
        // 辅助号码
        subPhone: "",
        // 下单金额
        price: 0,
        // 客户来源
        source: null,
        sourceName: "",
        // 产品类型
        productType: null,
        productTypeName: "",
        // 获客方式
        getCustomerType: null,
        getCustomerTypeName: "",
        // 客户类型
        shoppingCartRegistrationCustomerType: null,
        shoppingCartRegistrationCustomerTypeName: "",
        // 重要程度
        emergencyLevel: 0,
        emergencyLevelName: "三级线索",
        // 是否为日不落
        isRiBuLuoLiving: false,
        // 备注
        remark: "",
        // 指派
        assignEmpId: null,
        assignEmpName: "",
        // 线索截图
        cluePicture: "",
        // 是否加v
        IsAddWeChat: false,
        // 加v截图
        addWechatPicture: "",
        // 是否面诊
        isConsultation: false,
        // 面诊时间
        consultationDate: "",
        // 是否退款
        isReturnBackPrice: false,
        // 退款类型
        refundType: null,
        refundTypeName: "",
        // 退款时间
        refundDate: "",
        // 退款原因
        refundReason: "",
        // 是否差评
        isBadReview: false,
        // 差评时间
        badReviewDate: "",
        // 差评原因
        badReviewReason: "",
        // 差评内容
        badReviewContent: "",
        // 是否追评
        isReContent: false,
        // 追评原因
        reContent: "",
        // 微信号
        customerWechatNo:'',
        // 词条
        fromTitle:'',
        // 是否重复下单
        isRepeateCreateOrder:false,
        // 归属公司
        belongCompany:null,
        belongCompanyName:null,

      },
      // 线索截图
      imgList: [],
      // 加v截图2
      imgList2: [],
      //  登记时间相关数据
      recordDateParams: {
        recordDateModel: false,
      },
      //  归属部门相关数据
      belongChannelParams: {
        belongChannelModel: false,
        belongChannelList: [],
        belongChannelListName: [],
      },
      //   渠道相关数据
      contentPlatFormParams: {
        contentPlatFormModel: false,
        contentPlatFormList: [],
        contentPlatFormListName: [],
      },
      //   主播IP相关数据
      liveAnchorParams: {
        liveAnchorModel: false,
        liveAnchorList: [],
        liveAnchorListName: [],
        // 主播IP筛选搜索
        searchKey: "",
        searchColumns: [],
      },
      //   主播微信号
      liveAnchorWechatNoParams: {
        liveAnchorWechatNoModel: false,
        liveAnchorWechatNoList: [],
        liveAnchorWechatNoListName: [],
        // 主播IP筛选搜索
        searchKey2: "",
        searchColumns2: [],
      },

      //   客户来源
      sourceParams: {
        sourceModel: false,
        sourceList: [],
        sourceListName: [],
      },
      //   产品类型
      productTypeParams: {
        productTypeModel: false,
        productTypeList: [],
        productTypeListName: [],
      },
      //   获客方式
      getCustomerTypeParams: {
        getCustomerTypeModel: false,
        getCustomerTypeList: [],
        getCustomerTypeListName: [],
      },
      // 归属公司
      belongCompanyParams:{
        belongCompanyModel: false,
        belongCompanyList: [],
        belongCompanyListName: [],
      },
      // 客户类型
      shoppingCartRegistrationCustomerTypeParams: {
        shoppingCartRegistrationCustomerTypeModel: false,
        shoppingCartRegistrationCustomerTypeList: [],
        shoppingCartRegistrationCustomerTypeListName: [],
      },
      // 重要程度
      emergencyLevelParams: {
        emergencyLevelModel: false,
        emergencyLevelList: [],
        emergencyLevelListName: [],
      },
      // 指派
      assignEmpIdParams: {
        assignEmpIdModel: false,
        assignEmpIdList: [],
        assignEmpIdListName: [],
        // 指派人员筛选搜索
        searchKey3: "",
        searchColumns3: [],
      },
      // 面诊时间
      consultationParams: {
        consultationModel: false,
      },
      // 退款类型
      refundTypeParams: {
        refundTypeModel: false,
        refundTypeListName: [
          "客户未接/拒接",
          "客户不需要",
          "客户错拍/多拍",
          "客户是同行",
          "客户不了解产品",
          "客户个人原因",
          "助理服务问题",
          "助理专业问题",
          "助理建议退款",
          "其他",
        ],
        refundTypeList: [
          {
            id: 1,
            name: "客户未接/拒接",
          },
          {
            id: 2,
            name: "客户不需要",
          },
          {
            id: 3,
            name: "客户错拍/多拍",
          },
          {
            id: 4,
            name: "客户是同行",
          },
          {
            id: 5,
            name: "客户不了解产品",
          },
          {
            id: 6,
            name: "客户个人原因",
          },
          {
            id: 7,
            name: "助理服务问题",
          },
          {
            id: 8,
            name: "助理专业问题",
          },
          {
            id: 9,
            name: "助理建议退款",
          },
          {
            id: 10,
            name: "其他",
          },
        ],
      },
      // 退款时间
      refundDateParams: {
        refundDateModel: false,
      },
      //  添加时加载
      isDispatch: false,
      // 差评时间
      badReviewDateParams: {
        badReviewDateModel: false,
      },
      // 获取所有员工 指派功能
      employeeParams: {
        employeeModel: false,
        employeeList: [],
        employeeListName: [],
        id: "",
        assignBy: null,
        assignByName: "",
        // 员工筛选搜索
        searchKey4: "",
        searchColumns4: [],
        isEmployee: false,
      },
    };
  },

  methods: {
    // 是否差评 关闭时清空差评原因和差评内容
    isBadReviewChange() {
      this.form.badReviewContent = "";
      this.form.badReviewReason = "";
      this.form.badReviewDate = "";
    },
    // 是否退款 关闭时清空退款类型和退款原因
    isReturnBackPriceChange() {
      this.form.refundType = null;
      this.form.refundTypeName = "";
      this.form.refundReason = "";
      this.from.refundDate = "";
    },
    // 是否面诊
    isConsultationChange() {
      this.form.consultationDate = "";
    },
    // 是否加v
    IsAddWeChatChange() {
      this.imgList2 = [];
      this.form.addWechatPicture = "";
    },
    // 线索截图
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
    deletClick(index) {
      this.imgList.splice(index, 1);
    },
    afterReadClick(file) {
      // 此时可以自行将文件上传至服务器
      let content = file.file;
      let data = new FormData();
      data.append("uploadfile", content);
      api.upload(data).then((res) => {
        if (res.code == 0) {
          this.imgList.push(res.data.url);
          this.form.cluePicture = res.data.url;
          return;
        } else if (res.code == 404) {
          this.$toast("上传失败！");
          return;
        }
      });
    },
    // 加v截图
    beforeRead2(file) {
      if (!/(jpg|jpeg|png|JPG|PNG)/i.test(file.type)) {
        this.$toast("请上传正确格式的图片！");
        return false;
      }
      return true;
    },
    onOversize2(file) {
      this.$toast("只能上传5M以内的图片！");
    },
    deletClick2(index) {
      this.imgList.splice(index, 1);
    },
    afterReadClick2(file) {
      // 此时可以自行将文件上传至服务器
      let content = file.file;
      let data = new FormData();
      data.append("uploadfile", content);
      api.upload(data).then((res) => {
        if (res.code == 0) {
          this.imgList2.push(res.data.url);
          this.form.addWechatPicture = res.data.url;
          return;
        } else if (res.code == 404) {
          this.$toast("上传失败！");
          return;
        }
      });
    },

    // 获取当天时间
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
    // 面诊时间获取当天时间
    recordDateClick2() {
      var myDate = new Date();
      this.consultationParams.consultationModel = true;
      this.currentDate2 = new Date(this.$moment(myDate).format("YYYY-MM-DD"));
    },
    // 面诊时间确认
    consultationDateClick(value) {
      this.form.consultationDate = this.$moment(value).format("YYYY-MM-DD");
      this.consultationParams.consultationModel = false;
    },
    //退款时间获取当天时间
    recordDateClick3() {
      var myDate = new Date();
      this.refundDateParams.refundDateModel = true;
      this.currentDate3 = new Date(this.$moment(myDate).format("YYYY-MM-DD"));
    },
    //退款时间确认
    refundDateClick(value) {
      this.form.refundDate = this.$moment(value).format("YYYY-MM-DD");
      this.refundDateParams.refundDateModel = false;
    },
    //差评时间获取当天时间
    recordDateClick4() {
      var myDate = new Date();
      this.badReviewDateParams.badReviewDateModel = true;
      this.currentDate4 = new Date(this.$moment(myDate).format("YYYY-MM-DD"));
    },
    //差评时间确认
    badReviewDateClick(value) {
      this.form.badReviewDate = this.$moment(value).format("YYYY-MM-DD");
      this.badReviewDateParams.badReviewDateModel = false;
    },
    // 获取部门数据
    getshoppingCartGetBelongChannelList() {
      api.shoppingCartGetBelongChannelList().then((res) => {
        if (res.code == 0) {
          const { belongChannelList } = res.data;
          this.belongChannelParams.belongChannelList = belongChannelList;
          this.belongChannelParams.belongChannelListName =
            belongChannelList.map((item) => item.name);
        }
      });
    },
    // 归属部门
    belongChannelConfirm(value) {
      this.form.belongChannelName = value;
      this.form.belongChannel = this.belongChannelParams.belongChannelList.find(
        (item) => value == item.name
      ).id;
      this.belongChannelParams.belongChannelModel = false;
    },
    // 获取渠道数据
    getcontentPlatFormValidList() {
      api.contentPlatFormValidList().then((res) => {
        if (res.code == 0) {
          const { contentPalteForms } = res.data;
          this.contentPlatFormParams.contentPlatFormList = contentPalteForms;
          this.contentPlatFormParams.contentPlatFormListName =
            contentPalteForms.map((item) => item.name);
        }
      });
    },
    // 渠道确认
    contentPlatFormConfirm(value) {
      this.form.contentPlatFormName = value;
      this.contentPlatFormParams.contentPlatFormModel = false;
      this.form.contentPlatFormId =
        this.contentPlatFormParams.contentPlatFormList.find(
          (item) => value == item.name
        ).id;
      this.getLiveAnchor();
    },
    // 主播IP根据渠道获取 判断是否选择渠道
    liveAnchorClick() {
      if (!this.form.contentPlatFormId) {
        this.$toast("请先选择渠道！");
        return;
      }
      this.liveAnchorParams.liveAnchorModel = true;
      this.form.source = null;
      this.form.sourceName = "";
    },
    // 获取获取主播
    getLiveAnchor(value) {
      const data = {
        contentPlatFormId: this.form.contentPlatFormId,
      };
      api.LiveAnchorvalidList(data).then((res) => {
        const { liveAnchors } = res.data;
        this.liveAnchorParams.liveAnchorList = liveAnchors;
        this.liveAnchorParams.liveAnchorListName = liveAnchors.map(
          (item) => item.name
        );
        this.liveAnchorParams.searchColumns = liveAnchors.map(
          (item) => item.name
        );
      });
    },
    // 获取获取微信号
    getLiveAnchorWechatInfo(value) {
      const data = {
        liveanchorId: "",
      };
      api.LiveAnchorWechatInfo(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchorWechatInfos } = res.data;
          this.liveAnchorWechatNoParams.liveAnchorWechatNoList =
            liveAnchorWechatInfos;
          this.liveAnchorWechatNoParams.liveAnchorWechatNoListName =
            liveAnchorWechatInfos.map((item) => item.name);
          this.liveAnchorWechatNoParams.searchColumns2 =
            liveAnchorWechatInfos.map((item) => item.name);
        }
      });
    },
    // 主播IP确认
    liveAnchorConfirm(value) {
      this.form.liveAnchorName = value;
      this.liveAnchorParams.liveAnchorModel = false;
      this.form.liveAnchorId = this.liveAnchorParams.liveAnchorList.find(
        (item) => value == item.name
      ).id;
      this.liveAnchorParams.searchKey = "";
      // 获取基础id 根据基础id查询指派人
      let liveAnchorBaseId = this.liveAnchorParams.liveAnchorList.find(
        (item) => this.form.liveAnchorId == item.id
      ).liveAnchorBaseId;
      this.getcustomerServiceNameList(liveAnchorBaseId);
    },
    // 主播微信号确认
    liveAnchorWechatNoConfirm(value) {
      this.form.liveAnchorWechatNoName = value;
      this.liveAnchorWechatNoParams.liveAnchorWechatNoModel = false;
      // this.form.liveAnchorWechatNo = this.liveAnchorWechatNoParams.liveAnchorWechatNoList.find((item) => value == item.name).id;
    },

    // 客户昵称
    customerNickNameInput(value) {
      this.form.customerNickName = value;
    },

    // 手机号
    phoneInput(value) {
      this.form.phone = value;
    },
    // 辅助号码
    subPhoneInput(value) {
      this.form.subPhone = value;
    },
    // 下单金额
    priceInput(value) {
      this.form.price = value;
    },
    // 客户来源
    getcustomerSourceList() {
      const { contentPlatFormId, belongChannel } = this.form;
      const data = {
        contentPlatFormId: contentPlatFormId,
        channel: belongChannel,
      };
      if (belongChannel == null) {
        this.$toast("请选择归属部门！");
        return;
      }
      if (!contentPlatFormId) {
        this.$toast("请选择主播平台！");
        return;
      }
      this.sourceParams.sourceModel = true;
      api.customerSourceList(data).then((res) => {
        if (res.code === 0) {
          const { sourceList } = res.data;
          this.sourceParams.sourceList = sourceList;
          this.sourceParams.sourceListName = sourceList.map(
            (item) => item.name
          );
        }
      });
    },
    // 客户来源确认
    sourceConfirm(value) {
      this.form.sourceName = value;
      this.sourceParams.sourceModel = false;
      this.form.source = this.sourceParams.sourceList.find(
        (item) => value == item.name
      ).id;
    },
    // 产品类型确认
    productTypeConfirm(value) {
      this.form.productTypeName = value;
      this.productTypeParams.productTypeModel = false;
      this.form.productType = this.productTypeParams.productTypeList.find(
        (item) => value == item.name
      ).id;
    },
    // 归属公司
    belongCompanyConfirm(value) {
      this.form.belongCompanyName = value;
      this.belongCompanyParams.belongCompanyModel = false;
      this.form.belongCompany =
        this.belongCompanyParams.belongCompanyList.find(
          (item) => value == item.name
        ).id;
    },
    // 获客方式确认
    getCustomerTypeConfirm(value) {
      this.form.getCustomerTypeName = value;
      this.getCustomerTypeParams.getCustomerTypeModel = false;
      this.form.getCustomerType =
        this.getCustomerTypeParams.getCustomerTypeList.find(
          (item) => value == item.name
        ).id;
    },
    // 客户类型确认
    shoppingCartRegistrationCustomerTypeConfirm(value) {
      this.form.shoppingCartRegistrationCustomerTypeName = value;
      this.shoppingCartRegistrationCustomerTypeParams.shoppingCartRegistrationCustomerTypeModel = false;
      this.form.shoppingCartRegistrationCustomerType =
        this.shoppingCartRegistrationCustomerTypeParams.shoppingCartRegistrationCustomerTypeList.find(
          (item) => value == item.name
        ).id;
    },
    // 重要程度确认
    emergencyLevelConfirm(value) {
      this.form.emergencyLevelName = value;
      this.emergencyLevelParams.emergencyLevelModel = false;
      this.form.emergencyLevel =
        this.emergencyLevelParams.emergencyLevelList.find(
          (item) => value == item.emergencyLevelText
        ).emergencyLevel;
    },
    // 指派确认
    assignEmpIdConfirm(value) {
      this.form.assignEmpName = value;
      this.assignEmpIdParams.assignEmpIdModel = false;
      this.form.assignEmpId = this.assignEmpIdParams.assignEmpIdList.find(
        (item) => value == item.name
      ).id;
    },
    // 退款类型
    refundTypeConfirm(value) {
      this.form.refundTypeName = value;
      this.refundTypeParams.refundTypeModel = false;
      this.form.refundType = this.refundTypeParams.refundTypeList.find(
        (item) => value == item.name
      ).id;
    },
    // 获取产品类型列表列表
    getshoppingCartTakeGoodsProductTypeList() {
      api.shoppingCartTakeGoodsProductTypeList().then((res) => {
        if (res.code === 0) {
          const { sourceList } = res.data;
          this.productTypeParams.productTypeList = sourceList;
          this.productTypeParams.productTypeListName = sourceList.map(
            (item) => item.name
          );
        }
      });
    },
    // 获客方式列表
    getShoppingCartGetCustomerTypeList() {
      api.shoppingCartGetCustomerType().then((res) => {
        if (res.code === 0) {
          const { typeList } = res.data;
          this.getCustomerTypeParams.getCustomerTypeList = typeList;
          this.getCustomerTypeParams.getCustomerTypeListName = typeList.map(
            (item) => item.name
          );
        }
      });
    },
    // 获客归属公司
    getBelongCompanyListClick() {
      smallYellowCarRegistrationApi.getBelongCompanyList().then((res) => {
        if (res.code === 0) {
          const { belongCompanyList } = res.data;
          this.belongCompanyParams.belongCompanyList = belongCompanyList;
          this.belongCompanyParams.belongCompanyListName = belongCompanyList.map(
            (item) => item.name
          );
        }
      });
    },
    // 获客客户类型列表
    getcustomerTypeList() {
      api.customerTypeList().then((res) => {
        if (res.code === 0) {
          const { sourceList } = res.data;
          this.shoppingCartRegistrationCustomerTypeParams.shoppingCartRegistrationCustomerTypeList =
            sourceList;
          this.shoppingCartRegistrationCustomerTypeParams.shoppingCartRegistrationCustomerTypeListName =
            sourceList.map((item) => item.name);
        }
      });
    },
    // 获客重要程度列表
    getemergencyLevels() {
      api.emergencyLevels().then((res) => {
        if (res.code === 0) {
          const { emergencyLevels } = res.data;
          this.emergencyLevelParams.emergencyLevelList = emergencyLevels;
          this.emergencyLevelParams.emergencyLevelListName =
            emergencyLevels.map((item) => item.emergencyLevelText);
        }
      });
    },
    // 指派人根据主播IP获取
    assignEmpIdClick() {
      if (!this.form.liveAnchorId) {
        this.$toast("请先选择主播IP！");
        return;
      }
      this.assignEmpIdParams.assignEmpIdModel = true;
    },
    // 根据主播id获取指派人列表
    getcustomerServiceNameList(value) {
      const data = {
        baseLiveAnchorId: value ? value : "",
      };
      api.customerServiceNameListByBaseLiveAnchorId(data).then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.assignEmpIdParams.assignEmpIdList = employee;
          this.assignEmpIdParams.assignEmpIdListName = employee.map(
            (item) => item.name
          );
          this.assignEmpIdParams.searchColumns3 = employee.map(
            (item) => item.name
          );
        }
      });
    },
    // 获取所有员工
    getEmployeeList() {
      api.customerServiceNameList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employeeParams.employeeList = employee;
          this.employeeParams.employeeListName = employee.map(
            (item) => item.name
          );
          this.employeeParams.searchColumns4 = employee.map(
            (item) => item.name
          );
        }
      });
    },
    // 提交
    submite() {
      const {
        belongChannel,
        contentPlatFormId,
        liveAnchorId,
        liveAnchorWechatNoName,
        customerNickName,
        price,
        phone,
        source,
        productType,
        getCustomerType,
        shoppingCartRegistrationCustomerType,
        emergencyLevel,
        subPhone,
        assignEmpId,
        isRiBuLuoLiving,
        remark,
        cluePicture,
        IsAddWeChat,
        addWechatPicture,
        isConsultation,
        consultationDate,
        isReturnBackPrice,
        refundTypeName,
        refundDate,
        refundReason,
        recordDate,
        isBadReview,
        badReviewDate,
        badReviewReason,
        badReviewContent,
        isReContent,
        reContent,
        customerWechatNo,
        fromTitle,
        isRepeateCreateOrder,
        belongCompany
      } = this.form;
      if (!recordDate) {
        this.$toast("请选择登记时间！");
        return;
      }
      if (belongChannel == null) {
        this.$toast("请选择归属部门！");
        return;
      }
      if (!contentPlatFormId) {
        this.$toast("请选择渠道！");
        return;
      }
      if (!liveAnchorId) {
        this.$toast("请选择主播IP！");
        return;
      }
      // if (!liveAnchorWechatNoName) {
      //   this.$toast("请选择微信号！");
      //   return;
      // }
      if (!customerNickName) {
        this.$toast("请输入客户昵称！");
        return;
      }
      if (!phone) {
        this.$toast("请输入手机号！");
        return;
      }
      if (!price) {
        this.$toast("请输入下单金额！");
        return;
      }
      if (source == null) {
        this.$toast("请选择客户来源！");
        return;
      }
      if (source == 6 && !productType) {
        this.$toast("请选择产品类型！");
        return;
      }
      if (getCustomerType == null) {
        this.$toast("请选择获客方式！");
        return;
      }
      if (shoppingCartRegistrationCustomerType == null) {
        this.$toast("请选择客户类型！");
        return;
      }
      if (emergencyLevel == null) {
        this.$toast("请选择重要程度！");
        return;
      }
      if (belongCompany == null) {
        this.$toast("请选择归属公司！");
        return;
      }
      if (isReturnBackPrice == true && !refundTypeName) {
        this.$toast("请选择退款类型！");
        return;
      }
      if (isReturnBackPrice == true && !refundDate) {
        this.$toast("请选择退款时间！");
        return;
      }
      if (isBadReview == true && !badReviewDate) {
        this.$toast("请选择差评时间！");
        return;
      }
      if (isBadReview == true && !badReviewReason) {
        this.$toast("请选择差评原因！");
        return;
      }
      if (isBadReview == true && !badReviewContent) {
        this.$toast("请选择差评内容！");
        return;
      }
      if (isReContent == true && !reContent) {
        this.$toast("请选择追评原因！");
        return;
      }

      const data = {
        recordDate: recordDate ? recordDate : null,
        belongChannel,
        contentPlatFormId,
        liveAnchorId,
        liveAnchorWechatNoName,
        customerNickName,
        phone,
        price,
        source,
        subPhone,
        getCustomerType,
        shoppingCartRegistrationCustomerType,
        emergencyLevel,
        productType: source == 6 ? productType : 0,
        assignEmpId,
        isRiBuLuoLiving,
        remark,
        cluePicture,
        IsAddWeChat,
        addWechatPicture,
        isConsultation,
        consultationDate: consultationDate ? consultationDate : null,
        isReturnBackPrice,
        refundReason:
          isReturnBackPrice == false
            ? ""
            : isReturnBackPrice == true && refundTypeName != "其他"
            ? refundTypeName
            : "其他：" + refundReason,
        refundDate: refundDate ? refundDate : null,
        isBadReview,
        badReviewDate: badReviewDate ? badReviewDate : null,
        badReviewReason,
        badReviewContent,
        isReContent,
        reContent,
        customerWechatNo,
        fromTitle,
        isRepeateCreateOrder,
        belongCompany
      };
      // if (phone) {
      //   if (!/^1[3456789]\d{9}$/.test(phone)) {
      //     this.$toast("请输入正确的手机号");
      //     return false;
      //   }
      // }
      this.isDispatch = true;
      smallYellowCarRegistrationApi
        .addShoppingCartRegistration(data)
        .then((res) => {
          if (res.code == 0) {
            this.$toast("添加成功！");
            // 确认按钮加载
            this.isDispatch = false;
            // 返回上一页面并清楚数据
            this.$router.go(-1);
            // window.location.href()
          } else if (res.code == -1) {
            this.$toast(res.msg);
            this.isDispatch = false;
          } else {
            this.$toast(res.msg);
            setTimeout(() => {
              this.isDispatch = false;
            });
          }
        });
    },
    // 取消 指派功能
    employeeCancel() {
      this.assignModel = false;
      this.employeeParams.employeeModel = false;
      this.employeeParams.id = "";
      this.employeeParams.assignBy = null;
      this.employeeParams.assignByName = "";
      this.employeeParams.searchKey4 = "";
      this.employeeParams.isEmployee = false;
    },
    // 指派功能 确认按钮
    employeeSubmite() {
      const data = {
        id: this.employeeParams.id,
        assignBy: Number(this.employeeParams.assignBy),
      };
      this.employeeParams.isEmployee = true;
      smallYellowCarRegistrationApi
        .ShoppingCartRegistrationAssign(data)
        .then((res) => {
          if (res.code == 0) {
            this.employeeParams.isEmployee = false;
            this.employeeParams.employeeModel = false;
            this.$toast("指派成功！");
            // 刷新列表
            parent.location.reload();
            this.employeeCancel();
          } else if (res.code == -1) {
            this.$toast(res.msg);
            this.employeeParams.isEmployee = false;
          } else {
            this.$toast(res.msg);
            setTimeout(() => {
              this.employeeParams.isEmployee = false;
            });
          }
        });
    },
    // 指派功能 指派人确认按钮
    employeeConfirm(value) {
      this.employeeParams.assignByName = value;
      this.employeeParams.employeeModel = false;
      this.employeeParams.assignBy = this.employeeParams.employeeList.find(
        (item) => value == item.name
      ).id;
    },
    cancel() {
      this.form = {};
      this.imgList = [];
      this.$set(this, "imgList", []); // 使用 Vue.set 强制更新视图
      this.$set(this, "imgList2", []); // 使用 Vue.set 强制更新视图
      this.form.recordDate = this.$moment().format("YYYY-MM-DD");
      this.form.emergencyLevel = 0;
      this.form.emergencyLevelName = "三级线索";
    },

    // 删除
    deleteClick(value) {
      Dialog.confirm({
        title: "删除弹窗",
        message: "确认要删除吗？",
      })
        .then(() => {
          smallYellowCarRegistrationApi
            .deleteShoppingCartRegistration(value)
            .then((res) => {
              if (res.code === 0) {
                this.$toast("删除成功！");
                // 刷新列表
                parent.location.reload();
              } else if (res.code == -1) {
                this.$toast(res.msg);
              }
            });
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
      sessionStorage.setItem("addYellowCar_startDate", this.query.startDate);
      sessionStorage.setItem("addYellowCar_endDate", this.query.endDate);
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
        const { pageNum, pageSize, keyword, startDate, endDate } = this.query;
        // 有按钮权限只能查看当前登录id 和 isDirector == false
        const currentRole = JSON.parse(sessionStorage.getItem("permissions"));
        // 查看特定主播 按钮权限
        let isShow = currentRole.some((ele) => {
          return "fx.amiya.permission.SELECT_SPEC_LIVEANCHOR".includes(ele);
        });
        // 是否为管理员
        let isDirector = sessionStorage.getItem("isDirector");
        // 登陆账号id
        let employeeId = sessionStorage.getItem("employeeId");
        const data = {
          startDate: startDate ? startDate : null,
          endDate: endDate ? endDate : null,
          keyword: keyword,
          pageNum,
          pageSize,
          orderSource: -1,
          createBy: isShow == true && isDirector == "false" ? employeeId : null,
        };
        smallYellowCarRegistrationApi
          .getShoppingCartRegistration(data)
          .then((res) => {
            if (res.code === 0) {
              const { list, totalCount } =
                res.data.shoppingCartRegistrationInfo;
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
      });
    },

    onLoad() {
      this.getShoppingCartRegistrationClick();
    },

    handleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    },
  },

  created() {
    this.getshoppingCartGetBelongChannelList();
    this.getcontentPlatFormValidList();
    this.getLiveAnchorWechatInfo();
    this.getshoppingCartTakeGoodsProductTypeList();
    this.getShoppingCartGetCustomerTypeList();
    this.getcustomerTypeList();
    this.getemergencyLevels();
    // this.getcustomerServiceNameList()
    this.getEmployeeList();
    this.getBelongCompanyListClick()
  },
  watch: {
    //实时监听搜索输入内容
    "liveAnchorParams.searchKey": function () {
      let key = String(this.liveAnchorParams.searchKey);
      key = key.replace(/\s*/g, ""); //去除搜索内容中的空格
      const reg = new RegExp(key, "ig"); //匹配规则-i：忽略大小写，g：全局匹配
      /* 进行筛选，将筛选后的数据放入新的数组中，‘name’键可根据需要搜索的key进行调整 */
      this.liveAnchorParams.searchColumns =
        this.liveAnchorParams.liveAnchorListName.filter(
          (item) => item.match(reg) != null
        );
    },
    //实时监听搜索输入内容
    "liveAnchorWechatNoParams.searchKey2": function () {
      let key = String(this.liveAnchorWechatNoParams.searchKey2);
      key = key.replace(/\s*/g, ""); //去除搜索内容中的空格
      const reg = new RegExp(key, "ig"); //匹配规则-i：忽略大小写，g：全局匹配
      /* 进行筛选，将筛选后的数据放入新的数组中，‘name’键可根据需要搜索的key进行调整 */
      this.liveAnchorWechatNoParams.searchColumns2 =
        this.liveAnchorWechatNoParams.liveAnchorWechatNoListName.filter(
          (item) => item.match(reg) != null
        );
    },
    //实时监听搜索输入内容
    "assignEmpIdParams.searchKey3": function () {
      let key = String(this.assignEmpIdParams.searchKey3);
      key = key.replace(/\s*/g, ""); //去除搜索内容中的空格
      const reg = new RegExp(key, "ig"); //匹配规则-i：忽略大小写，g：全局匹配
      /* 进行筛选，将筛选后的数据放入新的数组中，‘name’键可根据需要搜索的key进行调整 */
      this.assignEmpIdParams.searchColumns3 =
        this.assignEmpIdParams.assignEmpIdListName.filter(
          (item) => item.match(reg) != null
        );
    },
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
/deep/ .van-popup__close-icon--top-right {
  top: 5px;
  right: 9px;
}
.content {
  background: #fff;
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
  .scroll {
    height: 100%;
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
    width: 76px;
    color: #5492fe;
  }
  /deep/ .van-switch {
    display: flex;
  }
}
.content_pic {
  width: 90%;
  margin-left: 5%;
  box-sizing: border-box;
  border-bottom: 1px solid #bbd3ff;
  /deep/ .van-cell {
    padding: 10px 0;
  }
  .img_content {
    /deep/.van-uploader__upload {
      width: 50px;
      height: 50px;
    }
    display: flex;
    .img_item {
      position: relative;
      margin-right: 5px;
      .img {
        width: 50px;
        height: 50px;
      }
      .opacity_con {
        background: #000;
        position: absolute;
        right: 0;
        top: 0;
        opacity: 0.2;
        padding: 1px 4px;
        box-sizing: border-box;
        color: #fff;
      }
    }
  }
  .customer_img {
    font-size: 13px;
    color: #5492fe;
    margin: 10px 0;
  }
}

.switch_content {
  width: 90%;
  justify-content: center;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #bbd3ff;
  color: #5492fe;
  margin-left: 5%;
  /deep/ .van-cell {
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
  padding-bottom: 20px;
  box-sizing: border-box;
  width: 100%;
  .button {
    width: 40%;
    height: 42px;
    margin: 0 auto;
  }
}
</style>
