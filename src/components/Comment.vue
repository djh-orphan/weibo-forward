<template>
  <div :id="comid" class="position-relative ">
    <div class="row bg-light p-3 mb-3 border-bottom boder-5">
      <div class="col-3 pr-3">
        <p class="fs-6 text-start text-wrap fw-bold">
          {{username}}:
        </p>
      </div>
      <div class="col-9 pl-3">
        <p class="text-wrap fs-5 fw-normal lh-base font-monospace">
          {{msg}}
        </p>
      </div>
      <div class="col-12">
        <p class="fs-6 text-bottom text-end fw-light" style="color: #6C757D;">
          {{caldate}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Comment',
    props: {
      comid: Number,
      date: Array,
      msg: String,
      username: String,
    },
    computed: {
      caldate() {
        return this.prefix(this.date[0][0], 4) +
          "-" + this.prefix(this.date[0][1], 2) +
          "-" + this.prefix(this.date[0][2], 2) +
          " " + this.prefix(this.date[1][0], 2) +
          ":" + this.prefix(this.date[1][1], 2) +
          ":" + this.prefix(this.date[1][2], 2)
      }
    },
    methods: {
      prefix(num, length) {
        return (Array(length).join('0') + num).slice(-length);
      }
    }
  }
</script>

<style>
</style>
