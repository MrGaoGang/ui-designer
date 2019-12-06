<template>
  <div>
    <i-input v-model="config.chartName" placeholder="Enter something..." />
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Object, default: () => {} }
  },
  data() {
    return {
      config: {
        chartName: "折线图"
      }
    };
  },
  watch: {
    config: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$emit("input", val);
      }
    }
  },
  created() {
    if (this.value && Object.keys(this.value).length > 0) {
      this.config = this.value;
    }
  }
};
</script>

<style></style>
