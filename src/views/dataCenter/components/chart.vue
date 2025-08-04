<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '150px' }"></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    proportion: Array,
  },
  data() {
    return {
      myChart: "",

      order: [],
    };
  },
  computed: {
    isCollapsed() {
      return this.$store.state.home.isCollapsed;
    },
  },
  watch: {
    isCollapsed(value) {
      setTimeout(() => {
        if (this.myChart) this.myChart.resize();
      }, 400);
    },
  },
  methods: {
    // 订单状态分布
    myEcharts() {
      let legend = this.order.map((_) => _.name);
      let option = {
        // title: {
        //   text: "业绩占比",
        //   x: "center",
        // },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        // legend: {
        //   orient: "vertical",
        //   right: "right",
        //   data: legend,
        // },
        legend:[{
				data:['自播达人','合作达人'],
                y:"35",
                x:'140'
			},{
				data:['医生业绩','其他业绩'],
				y:"85",
                x:'140'
			}],
        grid: {
          containLabel: true
        },
       
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            data: this.order,
            center: ['20%', '50%'],
            label: {
                show: false,
                fontSize: 12,
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#21D4AD " },
                { offset: 1, color: "#20BA9E " }
            ]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FFB22A" },
                { offset: 1, color: "#B8801F" }
            ]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#EE2C68" },
                { offset: 1, color: "#D3245B" }
            ]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#26DCF9" },
                { offset: 1, color: "#23B9DA" }
            ]),
            ]
            
          },
        ],
      };
      this.myChart = echarts.init(this.$refs.dom, "tdTheme");
      this.myChart.setOption(option);
      on(window, "resize", this.myChart.resize);
    },
  },
  beforeDestroy() {
    off(window, "resize", this.myChart.resize);
  },
  watch:{
    proportion(value){
      this.order = value.map((item) => {
        return {
          name: item.name,
          value: item.value,
        };
      });
      this.$nextTick(() => {
        this.myEcharts();
      });
    }
  }
};

</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  padding-top: 20px;
  box-sizing: border-box;
}
</style>
