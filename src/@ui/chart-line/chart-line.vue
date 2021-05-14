<template>
  <div class="line-chart">
    <div ref="chartRef" class="line-chart-main"></div>
  </div>
</template>

<script>
let echarts = require("echarts");
import elementResize from "element-resize-detector"; // 尺寸监听组件

export default {
  props: {
    chartName: String
  },
  data() {
    return {
      chart: null,
      // 指定图表的配置项和数据
      option: {
        title: {
          text: this.chartName
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    };
  },
  watch: {
    chartName(val) {
      this.option.title.text = val;
      this.chart && this.chart.setOption(this.option);
    }
  },
  updated() {
    this.chart && this.chart.resize();
  },
  mounted() {
    let myChart = echarts.init(this.$refs.chartRef);
    this.chart = myChart;
    this.chart.setOption(this.option);
    const elementResizer = elementResize({
      strategy: "scroll", // <- 推荐监听滚动，提升性能
      callOnAdd: true // 添加侦听器时是否应调用,默认true
    });
    elementResizer.listenTo(this.$refs.chartRef, () => {
      this.chart.resize(); // 当元素尺寸发生改变是会触发此事件，刷新图表
    });
  },
  beforeDestroy() {
    this.chart = null;
  }
};
</script>

<style lang="less" scoped>
.line-chart {
  width: 100%;
  height: 100%;
  &-main {
    width: 100%;
    height: 100%;
    min-height: 200px;
  }
}
</style>
