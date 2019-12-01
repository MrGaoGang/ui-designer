<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <PieChart></PieChart>
  </div>
</template>

<script>
import PieChart from "../@ui/pie-chart/index";
export default {
  name: "HelloWorld",
  components: {
    PieChart
  },
  props: {
    msg: String
  },
  data() {
    return {
      component: null
    };
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
