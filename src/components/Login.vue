<template>
  <form class="row g-3 pt-5 px-2">
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
    <div class="col-9">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="gridCheck">
        <label class="form-check-label" for="gridCheck">
          记住我
        </label>
      </div>
    </div>
    <div class="col-3">
      <a class="link-primary" href="#"> 注册</a>
    </div>
    <div class="col-12">
      <button type="submit" class="btn btn-primary" @click.prevent="$emit('login')">登录</button>
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
    emits: ['update:username', 'update:pwd', 'login'],
  }
</script>
<style>
</style>
