<template>
  <div class="whole_con"  :style="{height:params.active ==0 || params.active ==3 ? 'auto' : '100vh'}">
    <!-- 时间筛选 -->
    <div class="top">
      <div class="top_bg">
        <div class="title">{{ title }}</div>
        <div @click="timeClick" class="time_con">
          <span class="time">{{ time }}</span>
          <i class="iconfont icon-xiangxia icon_xia" style="margin-top:2px"></i>
        </div>
      </div>
      
    </div>

    <!-- 内容 -->
    <div>
      <!-- 业绩看板 -->
      <performanceDashboard :commerceParams="commerceParams" :params="params"/>
      <!-- 折线图 -->
      <lines :brokenLineData="commerceParams.brokenLineData" />
    </div>

    <!-- 时间弹窗 -->
    <van-popup v-model="timeModel" position="bottom" style="height: 50%" round>
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title="选择年月"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="timeModel = false"
        @confirm="timeConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import * as api from "@/api/order.js";

import lines from "../components/line.vue";
import performanceDashboard from "../components/performanceDashboard.vue";
export default {
  props: {
    params: Object,
    contentPalteForms: Array,
    liveAnchorBaseInfos: Array,
  },
  components: {
    lines,
    performanceDashboard,
  },
  data() {
    return {
      time: this.$moment().format("YYYY-MM"),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2026, 10, 1),
      currentDate: this.$moment().format("YYYY-MM"),
      timeModel: false,

      title: "抖音整体",
      // 主播
      liveAnchorId: "",
      // 平台
      contentPlatformId: "",
      // 接口数据
      commerceParams: {
        // 获取GMV看板数据
        gmvData: {},
        // 业绩趋势
        brokenLineData: {},
      },
    };
  },
  methods: {
    timeClick() {
      this.currentDate = new Date(this.$moment(this.time).format("YYYY-MM-DD"));
      this.timeModel = true;
    },
    timeConfirm(value) {
      this.time = this.$moment(value).format("YYYY-MM");
      this.timeModel = false;
      this.gmvData();
      this.gmvDataBrokenLineData();
    },

    // 获取GMV看板
    gmvData() {
      let str = String(this.$moment(this.time).format("MM"));
      let month = str.substr(str.length - 1, 1);
      if (!this.time) {
        this.$toast("请选择日期");
        return;
      }
      const data = {
        year: this.$moment(this.time).format("YYYY")
          ? this.$moment(this.time).format("YYYY")
          : null,
        month:
          Number(this.$moment(this.time).format("MM")) >= 10
            ? this.$moment(this.time).format("MM")
            : month,
        contentPlatformId: this.contentPlatformId,
        liveAnchorId: this.liveAnchorId,
      };
      api.gmvData(data).then((res) => {
        if (res.code === 0) {
          this.commerceParams.gmvData = res.data.gmvData;
        }
      });
    },
    // 获取业绩趋势
    gmvDataBrokenLineData() {
      let str = String(this.$moment(this.time).format("MM"));
      let month = str.substr(str.length - 1, 1);
      if (!this.time) {
        this.$toast("请选择日期");
        return;
      }
      const data = {
        year: this.$moment(this.time).format("YYYY")
          ? this.$moment(this.time).format("YYYY")
          : null,
        month:
          Number(this.$moment(this.time).format("MM")) >= 10
            ? this.$moment(this.time).format("MM")
            : month,
        contentPlatformId: this.contentPlatformId,
        liveAnchorId: this.liveAnchorId,
      };
      api.gmvDataBrokenLineData(data).then((res) => {
        if (res.code === 0) {
          this.commerceParams.brokenLineData = res.data.brokenLineData;
        }
      });
    },
  },
  created() {
    // this.gmvData()
    // this.gmvDataBrokenLineData()
  },
  watch: {
    params: {
      handler(value) {
        const { active, contentPalteForms, liveAnchorBaseInfos } = value;
        if (active == 0) {
          this.title = "抖音整体";
          if (contentPalteForms.length >0) {
            this.contentPlatformId = contentPalteForms.find((item) => item.name == "抖音").id;
            this.gmvData();
            this.gmvDataBrokenLineData();
          }
          this.liveAnchorId = "";
        } else if (active == 1) {
          this.title = "抖音刀刀组";
          if (contentPalteForms) {
            this.contentPlatformId = contentPalteForms.find((item) => item.name == "抖音").id;
          }
          if (liveAnchorBaseInfos) {
            this.liveAnchorId = liveAnchorBaseInfos.find((item) => item.name == "刀刀").id;
          }
        } else if (active == 2) {
          this.title = "抖音吉娜组";
          if (contentPalteForms) {
            this.contentPlatformId = contentPalteForms.find((item) => item.name == "抖音").id;
          }
          if (liveAnchorBaseInfos) {
            this.liveAnchorId = liveAnchorBaseInfos.find((item) => item.name == "吉娜").id;
          }
        } else if (active == 3) {
          this.title = "视频号整体";
          if (contentPalteForms) {
            this.contentPlatformId = contentPalteForms.find((item) => item.name == "视频号").id;
          }
          this.liveAnchorId = "";
        } else if (active == 4) {
          this.title = "视频号刀刀组";
          if (contentPalteForms) {
            this.contentPlatformId = contentPalteForms.find((item) => item.name == "视频号").id;
          }
          if (liveAnchorBaseInfos) {
            this.liveAnchorId = liveAnchorBaseInfos.find((item) => item.name == "刀刀").id;
          }
        } else if (active == 5) {
          this.title = "视频号吉娜组";
          if (contentPalteForms) {
            this.contentPlatformId = contentPalteForms.find((item) => item.name == "视频号").id;
          }
          if (liveAnchorBaseInfos) {
            this.liveAnchorId = liveAnchorBaseInfos.find((item) => item.name == "吉娜").id;
          }
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="less">
.whole_con {
  width: 100%;
  // height: 100vh;
  padding-left: 90px;
  box-sizing: border-box;
 background:#C0D6FE;
  padding-bottom: 20px;
  .top {
    padding-top: 20px;
    .top_bg{
      height: 30px;
      background: linear-gradient(#6398f8,#4980e6);
      width: 90%;
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #fff;
      margin: 0 auto;
      align-items: center;
      border-radius: 5px;
      padding: 0 10px;
      
      .time {
        text-align: right;
        line-height:20px;
       }
       .icon_xia {
        font-size: 20px;
      }
    }
    
  }
}
</style>
