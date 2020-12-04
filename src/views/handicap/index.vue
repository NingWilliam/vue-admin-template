<template>
  <div>
    <h3>盘口差</h3>
    <el-card>
      <div id="myhand" :style="{ width: '600px', height: '500px' }"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
    }
  }
};
</script>

<style scoped></style>
