<template>
  <form class="row g-5 px-5">
    <div class="col-12">
      <label class="form-label">用户名</label>
      <input type="text" class="form-control" placeholder="请输入用户名" id="username" :value="username"
        @input="$emit('update:username', $event.target.value)">
    </div>
    <div class="col-12">
      <label class="form-label">邮箱</label>
      <input type="email" class="form-control" placeholder="请输入邮箱" id="email" :value="email"
        @input="$emit('update:email', $event.target.value)">
    </div>

    <div class="col-12">
      <label class="form-label">密码</label>
      <input type="password" class="form-control" placeholder="密码" id="pwd" :value="pwd"
        @input="$emit('update:pwd', $event.target.value)">
    </div>
    <div class="col-12">
      <label class="form-label">确认密码</label>
      <input type="password" class="form-control" placeholder="密码" id="cpwd" :value="cpwd"
        @input="$emit('update:cpwd', $event.target.value)">
    </div>
    <div class="col-12">
      <button type="submit" class="btn btn-primary" @click.prevent="$emit('signup')">注册</button>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'Signup',
    props: {
      username: String,
      email: String,
      pwd: String,
      cpwd: String
    },
    emits: ['update:username', 'update:email', 'update:pwd', 'update:cpwd', 'signup'],
  }
</script>

<style>
</style>
