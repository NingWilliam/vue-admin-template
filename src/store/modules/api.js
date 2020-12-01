import { getAccountList } from '@/api/account'

const state = {
    accountList: [],
    accountDetailList: []
}

const mutations = {
    SET_ACCOUNT_LIST: (state, accountList) => {
        state.accountList = accountList
    },
    SET_ACCOUNT_DETAIL_LIST: (state, accountDetailList) => {
        state.accountDetailList = accountDetailList
    },
    CLEAR_ACCOUNT_DATA: (state) => {
        state.accountList = []
        state.accountDetailList = []
    }
}

const actions = {
    set_account_list({ commit }) {
        return new Promise((resolve, reject) => {
            // 获取账户列表信息
            getAccountList().then(res => {
                const accountList = []
                res.data.forEach(item => {
                    accountList.push(item.account_id)
                })
                commit('SET_ACCOUNT_LIST', accountList)
                commit('SET_ACCOUNT_DETAIL_LIST', res.data)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    clear_account_data({ commit }) {
        // 清除account_list数据
        commit('CLEAR_ACCOUNT_DATA')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
