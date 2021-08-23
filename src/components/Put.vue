<template>
  <form class="row g-3 pt-5 px-2">
    <div class="col-12 form-floating">
      <textarea class="form-control pt-5" placeholder="Leave a comment here" id="floatingTextarea2"
        style="height: 100px" :value="info" @input="$emit('update:info', $event.target.value)"></textarea>
      <label class="pb-1" for="floatingTextarea2">{{msg}}</label>
    </div>
    <div class="col-12 text-right">
      <button type="submit" class="btn btn-primary" @click.prevent="$emit('put')">{{note}}</button>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'Put',
    props: {
      info: String,
      msg: String,
      note: String
    },
    emits: ['update:info', 'put'],
  }
</script>

<style>
</style>
