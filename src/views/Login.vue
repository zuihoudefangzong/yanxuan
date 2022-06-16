<template>
  <div class="regist">
    <form-comp
      @onClick="onLogin"
    ></form-comp>
  </div>
</template>

<script>
import FormComp from '../components/Form'
import { API_USER_LOGIN } from './api.config.js'
export default {
  components: { FormComp },
  methods: {
    async onLogin ({ username, password }) {
      const { code, msg, user } = await this.$axios.post(
        API_USER_LOGIN,
        { username, password }
      )
      // session:服务端 VS cookie:客户端
      if (code === 1) {
        console.log(user)
        // 保存用户信息到vuex
        this.$store.commit('setUserinfo', user)
        // 返回上一页
        this.$router.go(-1)
      }
      console.log(msg)
    }
  }
}
</script>
