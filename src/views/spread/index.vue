import echarts from 'echarts';
<template>
  <div>
    <h3>价差图</h3>
    <el-card>
      <div id="myChart" style="width:100%;height:500px"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  data() {
    return {};
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "red"
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["BTC"]
        },
        xAxis: [
          {
            type: "category",
            name: "时间间隔",
            data: [
              1,
              4,
              7,
              28,
              91
            ],
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "价差",
            min: 0,
            max: 0.025,
            interval: 0.005
          }
        ],
        series: [
          {
            name: "BTC",
            type: "line",
            data: [
              "0",
              "0.009950",
              "0.009852",
              "0.019417",
              "0.019048"
            ]
          }
        ]
      };
      window.onresize = myChart.resize;
      myChart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
/* .MyAchievement {
  display: flex;
  flex-direction: column;
  padding: 0px 90px;
}
.MyAchievement .MyAchievement-echart {
  width: 80%;
  height: 570px;
  border-radius: 10px;
  border: 1px solid #d3d9e9;
  box-shadow: 4px 6px 10px -2px #d3d9e9;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
.MyAchievement-echart .echart-title {
  width: 80%;
  height: 70px;
  background-color: #00abf7;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: 26px;
  color: #fff;
  text-align: center;
  line-height: 75px;
}
.MyAchievement-echart .echart-content {
  width: 80%;
  height: 500px;
  display: flex;
  // align-items: center;
  justify-content: center;
}
.echart-content #myChart {
  margin-top: 35px;
} */
</style>
