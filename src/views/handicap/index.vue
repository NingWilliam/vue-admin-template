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
      var hand = this.$echarts.init(document.getElementById("myhand"));
      var option = {
        angleAxis: {},
        radiusAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四"],
          z: 10
        },
        polar: {},
        series: [
          {
            type: "bar",
            data: [1, 2, 3, 4],
            coordinateSystem: "polar",
            name: "A",
            stack: "a"
          },
          {
            type: "bar",
            data: [2, 4, 6, 8],
            coordinateSystem: "polar",
            name: "B",
            stack: "a"
          },
          {
            type: "bar",
            data: [1, 2, 3, 4],
            coordinateSystem: "polar",
            name: "C",
            stack: "a"
          }
        ],
        legend: {
          show: true,
          data: ["A", "B", "C"]
        }
      };
      window.onresize = myhand.resize;
      hand.setOption(option);
    }
  }
};
</script>

<style scoped></style>
