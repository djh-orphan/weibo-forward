<template>
  <div class="col-md-5 ms-sm-auto col-lg-7 col-sm-7 px-md-4 mt-3">
    <div v-if="message.length!==0">
      <SingleWeibo v-for="item in message" :key="item.id" :msgid="item.id" :date="item.message_date" :msg="item.info"
        :user="item.owner" :commcount="item.comment_count" :reference="item.ref" :refmessage="item.reference">
      </SingleWeibo>
    </div>
  </div>
  <div class="col-md-5 ms-sm-auto col-lg-4 bg-light col-sm-5">
    <Login v-model:username="userpeople.username" v-model:pwd="userpeople.pwd" @login="login" @signup="signup" />
  </div>
</template>

<script>
  // @ is an alias to /src
  import Login from '@/components/Login.vue'
  import SingleWeibo from '@/components/SingleWeibo.vue'
  import {
    ElMessage
  } from "element-plus";
  export default {
    name: 'Home',
    data: function() {
      return {
        userpeople: {
          id: 0,
          username: "",
          pwd: "",
          email: ""
        },
        message: []
      }
    },
    created() {
      this.axios
        .get('/api/weibo/top10', {
          params: {
            embed: "owner.name",
            sort: "-message-date"
          }
        })
        .then(response => {
          if (response.data.work === true) {
            this.message = response.data.data
            // ElMessage.success("ok");
          } else {
            alert("加载信息失败")
          }
        })
    },
    methods: {
      login() {
        var userinfo = {
          username: this.userpeople.username,
          pwd: this.userpeople.pwd,
          signup: false
        };
        this.axios
          .post('/api/login/', userinfo)
          .then(response => {
            // console.log(response)
            if (response.data.work === false) {
              if (response.data.message.indexOf("wrong pwd") !== -1) {
                ElMessage.error("密码错误，请重试");
              }
              if (response.data.message.indexOf("please signup") !== -1) {
                ElMessage.error("用户不存在，请注册");
              }
            } else {
              // alert(response.data.data.username)
              // this.userpeople.id = response.data.data.id;
              // this.userpeople.email = response.data.data.email;
              // this.userpeople.username = response.data.data.username;
              // this.$store.commit('changeuser', this.userpeople)
              ElMessage.success("登录成功");
              this.$router.push('/myindex')
            }
          })
      },
      signup() {
        this.$router.push('/signup')
      }
    },
    components: {
      Login,
      SingleWeibo,
    }
  }
</script>
