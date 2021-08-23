<template>
  <div class="col-md-5 ms-sm-auto col-lg-7 px-md-4 mt-3">
    <MessageInfo :msgid="msgid" :date="message_date" :msg="msg" :username="username" :reference="reference"
      :refmessage="refmessage" @route-message="routeMessage" />
    <div class="row">
      <p class="text-start fs-5 border-bottom boder-2">评论</p>
    </div>
    <div v-if="comment.length!==0">
      <Comment v-for="item in comment" :key="item.id" :comid="item.id" :date="item.comment_date"
        :msg="item.comment_info" :username="item.user.username"></Comment>
    </div>
  </div>
  <div class="col-md-5 ms-sm-auto col-lg-4 bg-light">
    <Put v-model:info="info" @put="post" msg="评论" note="发布" />
  </div>
</template>

<script>
  import Comment from '@/components/Comment.vue'
  import Put from '@/components/Put.vue'
  import MessageInfo from '@/components/MessageInfo.vue'
  export default {
    name: 'Message',
    inject: ['reload'],
    data() {
      return {
        msg: "",
        msgid: 0,
        message_date: [
          [],
          []
        ],
        username: "",
        refmessage: {},
        reference: false,
        comment: [],
        commcount: 0,
        info: "",
      }
    },
    created() {
      var messageID = this.$store.state.message.messageID
      var api = '/api/weibo/' + messageID + '/';
      this.axios
        .get(api, {
          params: {
            embed: "owner.name",
          }
        })
        .then(response => {
          if (response.data.work === true) {
            this.$nextTick(function() {
              this.msg = response.data.data.info
              this.msgid = response.data.data.id
              this.message_date = response.data.data.message_date
              this.username = response.data.data.owner.username
              this.reference = response.data.ref
              this.commcount = response.data.data.comment_count
              if (response.data.ref) {
                this.refmessage = response.data.data.reference
              }
              if (response.data.data.comment_count !== 0) {
                api = api + 'comment/';
                this.axios
                  .get(api)
                  .then(responsecom => {
                    if (responsecom.data.work === true) {
                      this.$nextTick(function() {
                        this.comment = responsecom.data.data
                      })
                    }
                  })
              }
              console.log(this.username)
            })
          }
        })
    },
    methods: {
      routeMessage() {
        if (this.reference) {
          var obj = {
            messageID: this.refmessage.id,
          };
          this.$store.commit('changeMessage', obj);
          this.reload();
        }
      },
      post() {
        var data = {
          comment_info: this.info
        };
        var messageID = this.$store.state.message.messageID;
        var api = '/api/weibo/' + messageID + '/comment/';
        this.axios
          .post(api, data)
          .then(response => {
            if (response.data.work === true) {
              console.log(response)
              this.$message.success({
                message: '发布成功'
              });
              this.info = "";
              this.reload();
              // this.$router.push('/refresh')
              // this.$router.push('/message')
            }
          })
      }
    },
    components: {
      Comment,
      Put,
      MessageInfo
    }
  }
</script>

<style>
</style>
