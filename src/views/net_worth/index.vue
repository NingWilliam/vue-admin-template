import { mapGetters } from 'vuex';
<template>
  <div class="app-container">
    <h3>账户净值详情</h3>
    <el-card>
      <h4>日期选择</h4>

      <!-- <el-form :inline="true" :model="worth" label-width="80px"> -->
      <el-form :inline="true">
        <el-form-item label="选择账户:">
          <el-select v-model="accountID" filterable placeholder="请选择账户">
            <el-option v-for="item in accountList" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>

        <el-form-item lanel="选择日期:">
          <el-date-picker
            v-model="date"
            type="daterange"
            align="right"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getAccountOverviewDetail">确定</el-button>
        </el-form-item>
      </el-form>

      <!-- <el-divider></el-divider>
      <div id="myChart" style="width:100%;height:500px"></div>
    </el-card> -->

    <el-divider/>
    <el-row v-loading="loading">
      <el-col v-if="hasNavData" :span="24">
        <highcharts :options="Options" />
      </el-col>
      <el-col v-else :span="24">
        <h3>账户净值图</h3>
          <div class="noNav">
            <p>{{ lastAccount }}当前净值暂无图表数据,请选择其他账户或其他日期</p>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// import echarts from "echarts";
import { getAccountOverviewDetail } from '@/api/account'
import { mapGetters } from 'vuex'

export default {
  name: "AccountDetail",
  data() {
    return {
      // worth: {
      //   select: "",
      //   date: ""
      // },
      loading: true,
      hasNavData: false, // 账户是否有净值数据
      accountID: '',
      date: '',
      lastAccount: '', //当前图表账户ID
      // netList: ["huobi_6309", "okex_6309"],

      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }]
      },

      Options: {
        chart: {
          type: 'spline'
        },
        credits: {
          enabled: false
        },
        title: {
          text: '账户净值图'
        },
        subtitle: { // 副标题
          text: ''
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: '时间'
          },
          dateTimeLabelFormats: {
            day: '%Y-%m-%d %m-%d'
          },
          crosshair: true
        },
        yAxis: {
          title: {
            text: '账户净值'
          }
        },
        tooltip: {
          shared: true
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            marker: {
              enabled: false /* 数据点是否显示*/
            }
          }
        },
        series: [{
          name: '账户净值',
          data: [[1591329600000, 1.1], [1591331400000, 1.3], [1591333200000, 1.2]]
        }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'accountList'
    ])
  },
  created() {
    const account_id = this.$route.query.account_id
    if (this.accountList.length === 0) {
      this.$store.dispatch('api/set_account_list').then(() => {
        this.accountID = account_id || this.accountList[0]
        this.getAccountOverviewDetail()
      })
    } else {
      this.accountID = account_id || this.accountList[0]
      this.getAccountOverviewDetail()
    }
  },
  methods: {
    getAccountOverviewDetail() {
      const account_id = this.accountID || this.accountList[0]
      let start_date = ''
      let end_date = ''
      if (this.date) {
        start_date = this.date[0]
        end_date = this.date[1]
      }
      this.loading = true
      this.hasNavData = false
      getAccountOverviewDetail(account_id, start_date, end_date).then(res => {
        if (res.data.length !== 0) {
          this.Options.series[0]['data'] = res.data
          this.hasNavData = true
        }
        this.loading = false
        this.lastAccount = this.accountID
      })
    }
  }
}
</script>

<style scoped>
.noNav {
  height: 250px;
  border: #DCDFE6 solid 1px;
  border-radius: 5px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  justify-items: center;
}

.noNav > p {
  white-space:normal;
  padding: 5px;
}
</style>


  // mounted() {
  //   this.draw();
  // },
  // methods: {
  //   // getNetWorth() {
  //   //   console.log(this.worth);
  //   // },
  //   // draw() {
  //   //   var base = +new Date(1968, 9, 3);
  //   //   var oneDay = 24 * 3600 * 1000;
  //   //   var date = [];

  //   //   var data = [Math.random() * 300];

  //   //   for (var i = 1; i < 20000; i++) {
  //   //     var now = new Date((base += oneDay));
  //   //     date.push(
  //   //       [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/")
  //   //     );
  //   //     data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
  //   //   }

  //   //   var option = {
  //   //     tooltip: {
  //   //       trigger: "axis",
  //   //       position: function(pt) {
  //   //         return [pt[0], "10%"];
  //   //       }
  //   //     },
  //   //     title: {
  //   //       left: "center",
  //   //       text: "大数据量面积图"
  //   //     },
  //   //     toolbox: {
  //   //       feature: {
  //   //         dataZoom: {
  //   //           yAxisIndex: "none"
  //   //         },
  //   //         restore: {},
  //   //         saveAsImage: {}
  //   //       }
  //   //     },
  //   //     xAxis: {
  //   //       type: "category",
  //   //       boundaryGap: false,
  //   //       data: date
  //   //     },
  //   //     yAxis: {
  //   //       type: "value",
  //   //       boundaryGap: [0, "100%"]
  //   //     },
  //   //     dataZoom: [
  //   //       {
  //   //         type: "inside",
  //   //         start: 0,
  //   //         end: 10
  //   //       },
  //   //       {
  //   //         start: 0,
  //   //         end: 10,
  //   //         handleIcon:
  //   //           "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
  //   //         handleSize: "80%",
  //   //         handleStyle: {
  //   //           color: "#fff",
  //   //           shadowBlur: 3,
  //   //           shadowColor: "rgba(0, 0, 0, 0.6)",
  //   //           shadowOffsetX: 2,
  //   //           shadowOffsetY: 2
  //   //         }
  //   //       }
  //   //     ],
  //   //     series: [
  //   //       {
  //   //         name: "模拟数据",
  //   //         type: "line",
  //   //         smooth: true,
  //   //         symbol: "none",
  //   //         sampling: "average",
  //   //         itemStyle: {
  //   //           color: "rgb(255, 70, 131)"
  //   //         },
  //   //         areaStyle: {
  //   //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //   //             {
  //   //               offset: 0,
  //   //               color: "rgb(255, 158, 68)"
  //   //             },
  //   //             {
  //   //               offset: 1,
  //   //               color: "rgb(255, 70, 131)"
  //   //             }
  //   //           ])
  //   //         },
  //   //         data: data
  //   //       }
  //   //     ]
  //   //   };

  //   //   window.onresize = myChart.resize;
  //   //   // myChart.setOption(option);
  //   // }
  // }
