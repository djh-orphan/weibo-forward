<template>
  <form class="row g-3 pt-5 px-2" style="position: fixed;">
    <div class="col-12">
      <label class="form-label">用户名</label>
      <input type="text" class="form-control" placeholder="请输入用户名" id="username" :value="username"
        @input="$emit('update:username', $event.target.value)">
    </div>
    <div class="col-12">
      <label class="form-label">密码</label>
      <input type="text" class="form-control" placeholder="密码" id="pwd" :value="pwd"
        @input="$emit('update:pwd', $event.target.value)">
    </div>
    <div class="col-md-9">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="gridCheck">
        <label class="form-check-label" for="gridCheck">
          记住我
        </label>
      </div>
    </div>
    <div class="col-md-3">
      <a class="link-primary" href="#"> 注册</a>
    </div>
    <div class="col-12">
      <button type="submit" class="btn btn-primary" @click="login">登录</button>
    </div>
  </form>
</template>
<script>
  export default {
    name: 'Login',
    props: {
      username: String,
      pwd: String
    },
    emits: ['update:username', 'update:pwd'],
    methods: {
      login() {
        var userinfo = {
          username: this.username,
          pwd: this.pwd,
          signup: false
        };
        this.axios
          .post('/api/login/', userinfo)
          .then(response => {
            console.log(response)
            if (response.data.message !== undefined) {
              if (response.data.message.indexOf("wrong pwd") !== -1) {
                alert("密码错误！！")
                return
              }
              if (response.data.message.indexOf("please signup") !== -1) {
                alert("用户不存在，请注册！")
                return
              }
            }
            alert(response.data.username)
          })
      }
    }
  }
</script>
<style>
</style>
