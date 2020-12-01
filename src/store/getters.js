const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    accountList: state => state / api / accountList,
    accountDetailList: state => state.api.accountDetailList
}
export default getters
