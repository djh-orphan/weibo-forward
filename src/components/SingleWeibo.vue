<template>
  <div :id="msgid" class="position-relative ">
    <div class="row bg-light p-3 mb-3 border-bottom boder-5">
      <div class="col-3 pr-3">
        <p class="fs-6 text-start text-break text-wrap fw-bold">
          {{username}}:
        </p>
      </div>
      <div class="col pl-3">
        <div class="row">
          <div class="col-12 d-md-block collapse">
            <p class="fs-6 text-bottom text-start fw-light" style="color: #6C757D;">
              {{caldate}}
            </p>
          </div>
          <div class="col-12">
            <p class="text-wrap text-break text-start fs-5 fw-normal lh-base font-monospace">
              {{msg}}
            </p>
          </div>
          <div class="row border-top pt-3 border-bottom boder-2" v-if="reference===true">
            <div class="col-5 text-start">
              <p class='text-wrap fs-6 fw-normal lh-base font-monospace'>
                转发{{refmessage.owner.username}}的微博:
              </p>
            </div>
            <div class="col-7 text-start">
              <p class='fs-6 text-bottom text-start fw-light' style="color: #6C757D;">
                {{calrefdate}}
              </p>
            </div>
            <div class="col-12">
              <p class="text-wrap fs-5 text-start text-break lh-base font-monospace">
                {{refmessage.info}}
              </p>
            </div>
            <div class="col-6">
              <p class="fs-6 text-bottom text-start fw-light" style="color: #6C757D;">
                评论数:{{refmessage.comment_count}}
              </p>
            </div>
          </div>
          <div class="col-6 pt-3">
            <p class="fs-6 text-bottom text-start fw-light" style="color: #6C757D;">
              评论数:{{commcount}}
            </p>
          </div>
          <div class="col-6 pt-3 text-end">
            <a type="button" @click="routeMessage" class="stretched-link">查看更多>></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SingleWeibo',
    props: {
      msgid: Number,
      date: Array,
      msg: String,
      user: Object,
      commcount: Number,
      reference: Boolean,
      refmessage: Object
    },
    data() {
      return {
        messageID: this.msgid,
        username: this.user.username
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
      routeMessage() {
        var obj = {
          messageID: this.messageID,
        };
        this.$store.commit('changeMessage', obj);
        this.$router.push('/message');
      },
      prefix(num, length) {
        return (Array(length).join('0') + num).slice(-length);
      }
    }
  }
</script>

<style>
</style>
