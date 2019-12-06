<template>
  <div>
    {{chartName||''}}
    <o-chart :data="normalData" :col-defs="normaColConfig" :tooltip="normalTootip">
      <o-line :axis="normaAxis" :position="'date*value'"></o-line>
    </o-chart>
  </div>
</template>

<script>
import { Chart, Line } from "oview";
import { LINE } from "./src/data";
export default {
  components: {
    "o-chart": Chart,
    "o-line": Line
  },
  props: {
    chartName: String
  },
  data() {
    return {
      normalData: LINE.lineNormal,
      normaColConfig: {
        //对每个字段配置
        //正常的折线图每一个字段的配置
        value: {
          tickCount: 5, //坐标点的个数
          min: 0
        },
        date: {
          type: "timeCat", //时间类型
          range: [0, 1],
          tickCount: 3 //坐标点的个数
        }
      },
      normalTootip: {
        //提示信息
        custom: true,
        showXTip: true,
        showYTip: true,
        snap: true,
        crosshairsType: "xy",
        crosshairsStyle: {
          lineDash: [2]
        }
      },
      normaAxis: [
        //必须传入array类型
        {
          //对date坐标轴配置
          fieldName: "date",
          label: function(text, index, total) {
            var textCfg = {};
            if (index === 0) {
              textCfg.textAlign = "left";
            } else if (index === total - 1) {
              textCfg.textAlign = "right";
            }
            return textCfg;
          }
        }
      ]
    };
  }
};
</script>
