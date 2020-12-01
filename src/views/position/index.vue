<template>
  <div class="app-container">
    <el-card>
      <h3>账户持仓列表</h3>

      <el-table :data="compareData" stripe border>
        <el-table-column prop="account" label="账户" align="center" />
        <el-table-column prop="time_point" label="时间" align="center" />
        <el-table-column prop="trade_pair" label="交易对" align="center" />
        <el-table-column prop="pos_amount" label="持仓数量" align="center" />
        <el-table-column prop="strong" label="强平价" align="center" />

        <el-table-column label="操作" align="center" min-width="150">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              @click="editSetting(scope.$index, scope.row)"
              size="mini"
              >修改</el-button
            >
            <!-- 删除按钮 -->
            <el-button
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
    </el-card>

    <el-dialog
      title="修改账户"
      :visible.sync="editDialog"
      width="60%"
      :before-close="handleClose"
    >
      <el-form ref="form" label-width="120px" v-model="user">
        <el-form-item label="账户:">
          <el-input
            placeholder="请输入账户"
            v-model="user.account"
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

        <el-form-item label="交易对:">
          <el-input
            placeholder="请输入交易对"
            v-model="user.trade_pair"
            style="width: 85%;"
          />
        </el-form-item>

        <el-form-item label="持仓数量:">
          <el-input
            placeholder="请输入持仓数量"
            v-model="user.pos_amount"
            style="width: 85%;"
          />
        </el-form-item>

        <el-form-item label="强平价:">
          <el-input
            placeholder="请输入强平价"
            v-model="user.strong"
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
    </el-dialog>

    <el-dialog
      title="新增账户"
      :visible.sync="addDialog"
      width="60%"
      :before-close="handleClose"
    >
      <el-form ref="form" label-width="100px" v-model="addUserData">
        <el-form-item label="账户:">
          <el-input
            placeholder="请输入账户"
            v-model="addUserData.account"
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

        <el-form-item label="交易对:">
          <el-input
            placeholder="请输入交易对"
            v-model="addUserData.trade_pair"
            style="width: 85%;"
          />
        </el-form-item>

        <el-form-item label="持仓数量:">
          <el-input
            placeholder="请输入持仓数量"
            v-model="addUserData.pos_amount"
            style="width: 85%;"
          />
        </el-form-item>

        <el-form-item label="强平价:">
          <el-input
            placeholder="请输入强平价"
            v-model="addUserData.strong"
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
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Overview",
  data() {
    return {
      compareData: [
        {
          id: "11",
          account: "huobi_6309",
          time_point: "2020-11-16 10:00:00",
          trade_pair: "BTC_USDT",
          pos_amount: "100",
          strong: "16000"
        },
        {
          id: "22",
          account: "huobi_6309",
          time_point: "2020-11-16 10:00:00",
          trade_pair: "ETH_USDT",
          pos_amount: "100",
          strong: "500"
        },
        {
          id: "33",
          account: "okex_6309",
          time_point: "2020-11-16 10:00:00",
          trade_pair: "BTC_USDT",
          pos_amount: "100",
          strong: "16000"
        },
        {
          id: "44",
          account: "okex_6309",
          time_point: "2020-11-16 10:00:00",
          trade_pair: "ETH_USDT",
          pos_amount: "100",
          strong: "500"
        }
      ],
      addDialog: false,
      editDialog: false,
      user: {},
      editIndex: "",
      accountList: [],
      addUserData: {
        account: "",
        time_point: "",
        trade_pair: "",
        pos_amount: "",
        strong: ""
      }
    }
  },
  methods: {
    editSetting(index, row) {
      this.editDialog = true;
      this.user = row;
      this.editIndex = index;
    },

    deleteSetting(index, row) {
      this.$confirm("此操作将删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.compareData.splice(index, 1);
        this.$message({
          showClose: true,
          message: "删除成功",
          type: "success"
        });
      });
    },
    handleClose(done) {
      done();
    },
    handleEditUser() {
      this.compareData.splice(this.editIndex, 1, this.user);
      this.$message({ showClose: true, message: "修改成功", type: "success" });
      this.editDialog = false;
    },
    dialogSetting() {
      this.addDialog = true;
    },
    handleAddUser() {
      let strDate = dateFormat(
        "YYYY-mm-dd HH:MM:SS",
        this.addUserData.time_point
      );
      this.addUserData.time_point = strDate;
      this.compareData.push(this.addUserData);
      this.addDialog = false;
      this.addUserData = {};
      this.$message({ showClose: true, message: "添加成功", type: "success" });
    }
  }
};

function dateFormat(fmt, time_point) {
  let ret;
  const opt = {
    "Y+": time_point.getFullYear().toString(), // 年
    "m+": (time_point.getMonth() + 1).toString(), // 月
    "d+": time_point.getDate().toString(), // 日
    "H+": time_point.getHours().toString(), // 时
    "M+": time_point.getMinutes().toString(), // 分
    "S+": time_point.getSeconds().toString() // 秒
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}
</script>

<style scoped></style>
