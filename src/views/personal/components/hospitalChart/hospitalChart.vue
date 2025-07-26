<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '150px' }"></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "../theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    performance: Array,
  },
  data() {
    return {
      myChart: "",

      order: [],
      legendList: [],
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
      let legend = this.legendList.map((_) => _.name);
      let option = {
        // title: {
        //   text: "业绩占比",
        //   x: "center",
        // },
        tooltip: {
          trigger: "item",
          //   formatter: "{b} : {c} ({d}%)",
          formatter: "{b} : {d}%",
        },
        //     legend: {
        //       orient: "vertical",
        //       right: "right",
        //       data: legend,
        //       x:"125",
        //       y:"35",
        //       margin: [20, 20, 20, 20],
        //       formatter: function(name){
        // 　　　　return name.length>9?name.substr(0,9)+"...":name;
        // 　　}
        // },
        legend: [
          legend[0] ? {
            data: [legend[0]],
            y: "25",
            x: "140",
            formatter: function (name) {
              return   name.length > 9 ? name.substr(0, 9) + "..." : name ;
            },
          }: '',
          legend[1] ? {
            data: [legend[1]],
            y: "45",
            x: "140",
            formatter: function (name) {
              return  name.length > 9 ? name.substr(0, 9) + "..." : name ;
            },
          }:'',
          legend[2] ? {
            data: [legend[2]],
            y: "65",
            x: "140",
            formatter: function (name) {
              return  name ? name.length > 9 ? name.substr(0, 9) + "..." : name : '';
            },
          } : '',
          
          legend[3] ? {
            data: [legend[3]],
            y: "85",
            x: "140",
            formatter: function (name) {
              return  name ? name.length > 9 ? name.substr(0, 9) + "..." : name : '';
            },
          } : '',
          legend[4] ? {
            data: [legend[4]],
            y: "105",
            x: "140",
            formatter: function (name) {
              return  name ? name.length > 9 ? name.substr(0, 9) + "..." : name : '';
            },
          } : '',
          
        ],
        grid: {
          containLabel: true,
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            data: this.order,
            center: ["20%", "50%"],
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
            // color: [
            //     new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //         { offset: 0, color: "#FF0000" },
            //         { offset: 1, color: "#c31c1c" }
            //     ]),
            //     new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //         { offset: 0, color: "#ff6600" },
            //         { offset: 1, color: "#bb5f21" }
            //     ]),
            //     new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //         { offset: 0, color: "#FFB22A" },
            //         { offset: 1, color: "#B8801F" }
            //     ]),
            //     new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //         { offset: 0, color: "#21D4AD " },
            //         { offset: 1, color: "#20BA9E " }
            //     ]),
            //     new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //         { offset: 0, color: "#EE2C68" },
            //         { offset: 1, color: "#D3245B" }
            //     ]),
            //     new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //         { offset: 0, color: "#26DCF9" },
            //         { offset: 1, color: "#23B9DA" }
            //     ]),
            // ]
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
  watch: {
    performance: {
      handler(value) {
        this.order = value ? value.map((item) => {
          // 多个板块调用
          // 自播达人 医生板块
          if(item.totalAchievementRatio){
            return {
              name: item.hospitalName,
              value: item.totalAchievementRatio,
            };
          }else{
            // 合作达人
            return {
              name: item.hospitalName,
              value: item.performanceRatio,
            };
          }
          
        }) : [];
        if(this.order.length == 1){
          this.legendList = [this.order[0]];
        }else if(this.order.length == 2){
          this.legendList = [this.order[0], this.order[1]];
        }else if (this.order.length ==3){
          this.legendList = [this.order[0], this.order[1], this.order[2]];
        }else if (this.order.length ==4){
          this.legendList = [this.order[0], this.order[1], this.order[2], this.order[3]];
        }else if (this.order.length >=5){
          this.legendList = [this.order[0], this.order[1], this.order[2], this.order[3], this.order[4]];
        }
        this.$nextTick(() => {
          this.myEcharts();
        });
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  padding-top: 20px;
  box-sizing: border-box;
}
</style>
