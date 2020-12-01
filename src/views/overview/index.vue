<template>
  <div class="app-container">
        <el-card>
          <h3>账户概览表</h3>
          <el-table :data="accountOverviewInfo" stripe border>
            <el-table-column prop="account_id" label="账户ID" align="center" min-width="80" />
            <el-table-column prop="time_point" label="时间" align="center" min-width="150" />
            <el-table-column prop="nav" label="净值" align="center" min-width="80" />

            <el-table-column label="操作" align="center" min-width="150">
              <template slot-scope="scope">
                <el-button type="primary" @click="getDetail(scope.row)">查看详情</el-button>
                <!-- 修改按钮 -->
                <!-- <el-button
                  type="primary"
                  @click="editSetting(scope.$index, scope.row)"
                  size="mini"
                  >修改</el-button
                > -->
                <!-- 删除按钮 -->
                <!-- <el-button
                  type="danger"
                  size="mini"
                  @click="deleteSetting(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <br />
          <el-button type="primary" @click="dialogSetting">新增账户</el-button>
        </el-card> -->

    <!-- <el-dialog
      title="修改账户"
      :visible.sync="editDialog"
      width="60%"
      :before-close="handleClose"
    >
      <el-form ref="form" label-width="120px" v-model="user">
        <el-form-item label="账户:">
          <el-input
            placeholder="请输入账户"
            v-model="user.account_id"
            style="width: 85%;"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="时间:">
          <el-input
            placeholder="请输入时间"
            v-model="user.time_point"
            style="width: 85%;"
          />
        </el-form-item>

        <el-form-item label="净值:">
          <el-input
            placeholder="请输入净值"
            v-model="user.nav"
            style="width: 85%;"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click="handleEditUser"
          >修 改</el-button
        >
        <el-button type="info" size="medium" @click="editDialog = false"
          >取 消</el-button
        >
      </span>
    </el-dialog> -->

    <!-- <el-dialog
      title="新增账户"
      :visible.sync="addDialog"
      width="60%"
      :before-close="handleClose"
    >
      <el-form ref="form" label-width="100px" v-model="addUserData">
        <el-form-item label="账户:">
          <el-input
            placeholder="请输入账户"
            v-model="addUserData.account_id"
            style="width: 85%;"
          />
        </el-form-item>

        <el-form-item label="时间:">
          <el-date-picker
            placeholder="请选择时间"
            v-model="addUserData.time_point"
            type="time_point"
            style="width: 85%;"
          />
        </el-form-item>

        <el-form-item label="净值:">
          <el-input
            placeholder="请输入净值"
            v-model="addUserData.nav"
            style="width: 85%;"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddUser">新 增</el-button>
        <el-button type="info" size="medium" @click="addDialog = false"
          >取 消</el-button
        >
      </span>
    </el-dialog> -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getAccountOverviewList } from '@/api/account'
export default {
  name: "Account",
  data() {
    return {
      accountOverviewInfo: [
        // {
        //   id: "11",
        //   account_id: "huobi_6309",
        //   time_point: "2020-11-16 10:00:00",
        //   nav: "0.98"
        // },
        // {
        //   id: "22",
        //   account_id: "okex_6309",
        //   time_point: "2020-11-16 10:00:00",
        //   nav: "0.97"
        // }
      ],
      // addDialog: false,
      // editDialog: false,
      // user: {},
      // editIndex: "",
      // accountList: [],
      // addUserData: {
      //   account_id: "",
      //   time_point: "",
      //   nav: ""
      // }
    }
  },
  created () {
    this.getAccountOverviewInfo()
  },
  methods: {
    getAccountOverviewInfo() {
      getAccountOverviewList().then(res => {
        this.accountOverviewInfo = res.data
      })
    },
    getDetail(row) {
      console.log(row);
    }
  }
  // methods: {
  //   editSetting(index, row) {
  //     this.editDialog = true;
  //     this.user = row;
  //     this.editIndex = index;
  //   },

  //   deleteSetting(index, row) {
  //     this.$confirm("此操作将删除该用户, 是否继续?", "提示", {
  //       confirmButtonText: "确定",
  //       cancelButtonText: "取消",
  //       type: "warning"
  //     }).then(() => {
  //       this.accountOverviewInfo.splice(index, 1);
  //       this.$message({
  //         showClose: true,
  //         message: "删除成功",
  //         type: "success"
  //       });
  //     });
  //   },
  //   handleClose(done) {
  //     done();
  //   },
  //   handleEditUser() {
  //     this.accountOverviewInfo.splice(this.editIndex, 1, this.user);
  //     this.$message({ showClose: true, message: "修改成功", type: "success" });
  //     this.editDialog = false;
  //   },
  //   dialogSetting() {
  //     this.addDialog = true;
  //   },
  //   handleAddUser() {
  //     let strDate = dateFormat(
  //       "YYYY-mm-dd HH:MM:SS",
  //       this.addUserData.time_point
  //     );
  //     this.addUserData.time_point = strDate;
  //     this.accountOverviewInfo.push(this.addUserData);
  //     this.addDialog = false;
  //     this.addUserData = {};
  //     this.$message({ showClose: true, message: "添加成功", type: "success" });
  //   }
  // }
};

// function dateFormat(fmt, time_point) {
//   let ret;
//   const opt = {
//     "Y+": time_point.getFullYear().toString(), // 年
//     "m+": (time_point.getMonth() + 1).toString(), // 月
//     "d+": time_point.getDate().toString(), // 日
//     "H+": time_point.getHours().toString(), // 时
//     "M+": time_point.getMinutes().toString(), // 分
//     "S+": time_point.getSeconds().toString() // 秒
//   };
//   for (let k in opt) {
//     ret = new RegExp("(" + k + ")").exec(fmt);
//     if (ret) {
//       fmt = fmt.replace(
//         ret[1],
//         ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
//       );
//     }
//   }
//   return fmt;
// }
</script>

<style scoped>

</style>
