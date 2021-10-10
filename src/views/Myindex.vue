<template>
  <div class="col-md-5 ms-sm-auto col-lg-7 px-md-4 mt-3">
    <div v-if="message.length!==0">
      <SingleWeibo v-for="item in message" :key="item.id" :msgid="item.id" :date="item.message_date" :msg="item.info"
        :user="item.owner" :commcount="item.comment_count" :reference="item.ref" :refmessage="item.reference">
      </SingleWeibo>
    </div>
  </div>
  <div class="col-md-5 ms-sm-auto col-lg-4 bg-light">
    <Put v-model:info="info" @put="post" msg="发布微博" note="发布" />
  </div>
</template>

<script>
  import Put from '@/components/Put.vue'
  import SingleWeibo from '@/components/SingleWeibo.vue'
  import {
    ElMessage
  } from "element-plus";
  export default {
    name: 'Myindex',
    inject: ['reload'],
    data: function() {
      return {
        info: "",
        message: []
      }
    },
    created() {
      this.axios
        .get('/api/weibo/', {
          params: {
            embed: "owner.name",
            sort: "-message-date"
          },
        })
        .then(response => {
          // console.log(response)
          if (response.data.work === true) {
            this.message = response.data.data
            ElMessage.success("微博列表加载成功");
          } else {
            alert("加载信息失败")
          }
        })
    },
    methods: {
      post() {
        var data = {
          info: this.info
        };
        this.axios
          .post('/api/weibo/', data)
          .then(response => {
            if (response.data.work === true) {
              ElMessage.success("您的微博已发布");
              this.info = "";
              this.reload();
            }
          })
      },
    },
    components: {
      Put,
      SingleWeibo,
    }
  }
</script>
