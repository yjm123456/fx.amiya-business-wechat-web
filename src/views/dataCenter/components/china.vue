<template>
  <div class="wrapper">
    <div ref="china" :style="{ width: '100%', height: '310px',}"></div>
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
    
  },
  mounted(){
 let myChart = echarts.init(this.$refs.china)
            let option;
            var data = this.list
            option = {
                tooltip: {
                    trigger: 'item'
                },
                // //左侧小导航图标
                // visualMap: {
                //     show: true,
                //     x: 'left',
                //     y: 'center',
                //     splitList: [
                //         { start: 1, end: 500 }, { start: 500, end: 1000 },
                //         { start: 1000, end: 1500 }, { start: 1500, end: 2000 },
                //         { start: 2000, end: 2500 }, { start: 2500, },
                //     ],
                //     color: [
                //         '#ffb43d',
                //         '#5475f5',
                //         '#85daef',
                //         '#9feaa5',
                //         '#74e2ca',
                //         '#0074bc'],// e6ac53 '#9fb5ea'
                //     textStyle: {
                //         color: '#black'
                //     }
                // },
                geo: {
                    map: 'china',
                    aspectScale: 0.75,
                    layoutCenter: ["50%", "61.5%"], //地图位置
                    layoutSize: '120%',
                    roam: false, //关闭缩放
                    itemStyle: {
                        normal: {
                            borderColor: 'rgba(147, 235, 248, 1)',
                            borderWidth: 0.5,
                            color: {
                                type: 'linear-gradient',
                                x: 0,
                                y: 1500,
                                x2: 2500,
                                y2: 0,
                                colorStops: [{
                                    offset: 0,
                                    color: '#009DA1' // 0% 处的颜色
 
                                }, {
                                    offset: 1,
                                    color: '#005B9E' // 50% 处的颜色
 
                                }],
                                global: true // 缺省为 false
 
                            },
                            opacity: 0.5,
                        },
                        emphasis: {
                            areaColor: '#2a333d'
                        }
                    },
                    regions: [{
                        name: '南海诸岛',
                        show:false,
                        value:0,
                        itemStyle: {
                            // areaColor: 'rgba(0, 10, 52, 1)',
                            // borderColor: 'rgba(0, 10, 52, 1)',
                            normal: {
                                opacity: 0, // 设置为透明
                                label: {
                                    show: false
                                }
                            }
                        },
                        // emphasis: {
                        //     areaColor: 'rgba(0, 10, 52, 1)',
                        //     borderColor: 'rgba(0, 10, 52, 1)'
                        // }
                    }],
                    z: 2
                },
                series: [{
                    name: '',
                    type: 'map',
                    map: 'china',
                    label: {
                        show: true,
                        color: 'black',
                        fontSize: 8
                    },
                    aspectScale: 0.75,
                    layoutCenter: ["50%", "60%"], //地图位置
                    layoutSize: '118%',
                    roam: false, //关闭缩放
                    itemStyle: {
                        normal: {
                            borderColor: 'rgba(147, 235, 248, 0.6)',
                            borderWidth: 0.8,
                            areaColor: {
                                type: 'linear-gradient',
                                x: 0,
                                y: 1200,
                                x2: 1000,
                                y2: 0,
                                colorStops: [{
                                    offset: 0,
                                    color: '#009DA1' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#005B9E' // 50% 处的颜色
                                }],
                                global: true // 缺省为 false
                            },
                        },
                        emphasis: {
                            areaColor: 'rgba(147, 235, 248, 0)'
                        }
                    },
                    zlevel: 1,
                    data: data
                }],
            };
            //地图点击事件,根据点击某个省份计算出这个省份的数据
            myChart.on('click', (params) => {
                console.log(params);
               
            });
            myChart.setOption(option);
  },
  beforeDestroy() {
    off(window, "resize", this.myChart.resize);
  },
  watch:{
    // proportion(value){
    //   this.order = value.map((item) => {
    //     return {
    //       name: item.name,
    //       value: item.value,
    //     };
    //   });
    //   this.$nextTick(() => {
    //     this.myEcharts();
    //   });
    // }
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
