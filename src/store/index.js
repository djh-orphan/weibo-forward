import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    user: {
      id: "",
      username: "",
      email: "",
      pwd: ""
    },
    message: {
      messageID: 0
    }
  },
  mutations: {
    changeuser(state, obj) {
      state.user.username = obj.username;
      state.user.email = obj.email;
      state.user.id = obj.id;
      state.user.pwd = obj.pwd;
    },
    changeMessage(state, obj) {
      state.message.messageID = obj.messageID;
    }
  },
  actions: {},
  modules: {}
})
