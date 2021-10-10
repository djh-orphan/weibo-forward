<template>
  <div class="col-md-10 ms-sm-auto col-lg-11 col-sm-12 p-5 mb-5">
    <Signup v-model:username="username" v-model:email="email" v-model:pwd="pwd" v-model:cpwd="cpwd" @signup="signup">
    </Signup>
  </div>
</template>

<script>
  import Signup from '@/components/Signup.vue'
  import {
    ElMessage
  } from "element-plus";
  export default {
    name: 'SignupView',
    data() {
      return {
        username: "",
        email: "",
        pwd: "",
        cpwd: ""
      }
    },
    methods: {
      signup() {
        if (this.pwd !== this.cpwd) {
          ElMessage.error("两次密码输入不一致 请重新输入");
          this.pwd = ""
          this.cpwd = ""
        } else {
          var user = {
            username: this.username,
            email: this.email,
            pwd: this.pwd,
            signup: true
          }
          this.axios
            .post('/api/signup/', user)
            .then(response => {
              if (response.data.work === true) {
                ElMessage.success("注册成功")
                this.$router.push('/home')
              } else {
                this.username = ""
                this.email = ""
                this.pwd = ""
                this.cpwd = ""
                ElMessage.error("该用户已存在 请重试")
              }
            })
        }
      }
    },
    components: {
      Signup
    }
  }
</script>

<style>
</style>
