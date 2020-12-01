import request from "@/utils/request";

// 获取账户列表
export function getAccountList() {
    return request.get('/accountInfo/')
}

// 获取账户概览
export function getAccountOverviewList() {
    return request.get('/accountOverview/')
}

// 获取账户持仓列表
export function getAccountHoldList(account_id) {
    return request.get('/accountHold/?account_id=${account_id}')
}

// 获取账户净值详情
export function getAccountOverviewDetail(account_id, start_date, end_date, only_record) {
    start_date = start_date || ''
    end_date = end_date || ''
    only_record = only_record || ''
        // return request.get('/accountOverview/11/?start_date=2020-11-20&end_date=2020-11-30&only_record=1/')
    return request.get('/accountOverview/${account_id}/?start_date=${start_date}&end_date=${end_date}&only_record=${only_record}')
}
