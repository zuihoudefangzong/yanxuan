<template>
  <div class="regist">
    <form-comp
      formType="regist"
      @onClick="onRegist"
    ></form-comp>
  </div>
</template>

<script>
import FormComp from '../components/Form.vue'
import { API_USER_REGIST } from './api.config.js'
export default {
  name: 'Regist',
  components: { FormComp },
  methods: {
    async onRegist (info) {
      const { code, msg } = await this.$axios.post(
        API_USER_REGIST,
        {
          info
        }
      )
      alert(msg)
      if (code === 1) { // 注册成功
        this.$router.push('/profile/login')
      }
    }
  }
}
</script>
