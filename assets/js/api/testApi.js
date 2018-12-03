import { testAxios } from '../axiosConfig'
let testApi = {
  // 加入团队
  addTeamUser(teamid) {
    return testAxios.get('/addTeamUser', {params: {teamid}})
  },
  // 获取团队列表
  getTeamList() {
    return testAxios.get('/getTeamList')
  },
  // 获取团队详情
  getTeamInfo(teamid) {
    return testAxios.get('/getTeamInfo', {params: {teamid}})
  },
  // 获取是否可以加入团队
  getIsAddTeam(teamid) {
    return testAxios.get('/getIsAddTeam', {params: {teamid}})
  }
}
export default testApi