import { mapGetters } from 'vuex';
<template>
  <div class="app-container">
    <!-- <el-dialog :title="editPK?'编辑账户':'新增账户'" :visible.sync="dialogAccount" fullscreen @close="cancelAccount">
      <el-form :model="accountInfo" label-width="100px">
        <el-form-item label="交易所"></el-form-item>
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
      </el-form> -->
      <el-card>
        <h3>账户列表</h3>
        <el-table v-loading="accountDetailList.length===0" :data="accountDetailList" stripe border>
          <el-table-column type="index" label="序号" align="center" width="60"/>
          <el-table-column prop="account_id" label="账户ID" align="center" min-width="150"/>
          <el-table-column prop="exchange" label="交易所" align="center" min-width="150"/>
          
        </el-table>
      </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as account from '@/api/account';
import { parseTime } from '@/utils';

export default {
  name: 'Account',
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'accountDetailList'
    ])
  },
};
</script>

<style scoped>

</style>
