<template>
  <div :id="msgid" class="position-relative ">
    <div class="row p-3 mb-3 border-bottom boder-5">
      <div class="col-12 pr-3">
        <p class="fs-6 text-start text-wrap fw-bold">
          {{username}}:
        </p>
        <p class="fs-6 text-bottom mr-3 text-start fw-light" style="color: #6C757D;">
          {{caldate}}
        </p>
      </div>
      <div class="col-12 p-2">
        <p class="text-wrap text-break fs-5 text-start fw-normal lh-base font-monospace">
          {{msg}}
        </p>
      </div>
      <div class="row border-top pt-3 border-bottom boder-2" v-if="reference===true">
        <div class="col-12">
          <p class='text-wrap fs-6 fw-normal lh-base font-monospace'>
            转发{{refmessage.owner.username}}的微博:
          </p><br />
          <p class="fs-6 text-bottom mr-3 text-start fw-light" style="color: #6C757D;">
            {{calrefdate}}
          </p>
        </div>
        <div class="col-12">
          <p class="text-wrap fs-5 text-break text-start fw-normal lh-base font-monospace">
            {{refmessage.info}}
          </p>
        </div>
        <div class="col-6 pt-3 text-start">
          <p class="fs-6 text-bottom text-start fw-light" style="color: #6C757D;">
            评论数:{{refmessage.comment_count}}
          </p>
        </div>
        <div class="col-6 pt-3 text-end">
          <a type="button" @click="$emit('routeMessage')" class="link-primary" >查看更多>></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MessageInfo',
    inject: ['reload'],
    props: {
      msgid: Number,
      date: Array,
      msg: String,
      username: String,
      reference: Boolean,
      refmessage: Object
    },
    emits: ["routeMessage"],
    data() {
      return {
        messageID: this.msgid,
      }
    },
    computed: {
      caldate() {
        return this.prefix(this.date[0][0], 4) +
          "-" + this.prefix(this.date[0][1], 2) +
          "-" + this.prefix(this.date[0][2], 2) +
          " " + this.prefix(this.date[1][0], 2) +
          ":" + this.prefix(this.date[1][1], 2) +
          ":" + this.prefix(this.date[1][2], 2)
      },
      calrefdate() {
        return this.prefix(this.refmessage.message_date[0][0], 4) +
          "-" + this.prefix(this.refmessage.message_date[0][1], 2) +
          "-" + this.prefix(this.refmessage.message_date[0][2], 2) +
          " " + this.prefix(this.refmessage.message_date[1][0], 2) +
          ":" + this.prefix(this.refmessage.message_date[1][1], 2) +
          ":" + this.prefix(this.refmessage.message_date[1][2], 2)
      },
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
