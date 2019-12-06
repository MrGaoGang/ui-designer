<template>
  <div class="home">
    <div class="component">
      <chart-line v-bind="chartProps"></chart-line>
    </div>
    <div class="props">
      <chart-line-props v-model="chartProps"></chart-line-props>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ChartLine from "../@ui/chart-line/index";
import ChartLineProps from "../@ui/chart-line/props";

export default {
  name: "home",
  components: {
    ChartLine,
    ChartLineProps
  },
  data() {
    return {
      chartProps: {}
    };
  }
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
  .component {
    flex: 1;
  }
  .props {
    width: 250px;
  }
}
</style>