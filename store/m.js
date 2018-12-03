export const state = () => ({
  // 窗体宽度
  windowWidth: 440
})

export const mutations = {
  SET_M(state, payload) {
    for (let item in payload) {
      state[item] = payload[item]
    }
  }
}
