<template>
  <form class="form">
    <div class="form-item">
      <input type="text"
        placeholder="请输入用户名"
        v-model.trim="username"
      >
      <div class="clear"
        @click="clearUsername"
        v-show="isClearUsername"
      >
        <i class="iconfont icon-shanchu"></i>
      </div>
    </div>
    <!-- password -->
    <div class="form-item">
      <input type="password"
        placeholder="密码"
        v-model.trim="password"
      >
      <div
        class="clear"
        @click="clearPassword"
        v-show="isClearPassword"
      >
        <i class="iconfont icon-shanchu"></i>
      </div>
    </div>

    <div class="form-item">
      <input type="text"
        placeholder="邮箱账号"
        v-model.trim="email"
      >
      <div
        class="clear"
        @click="clearEmail"
        v-show="isClearEmail"
      >
        <i class="iconfont icon-shanchu"></i>
      </div>
    </div>

    <!-- 输入验证码 -->
    <div class="form-item">
      <input type="text"
        placeholder="请输入邮箱验证码"
        v-model.trim="code"
      >
      <div class="status-msg" @click="goCode" v-show="!isShowStatusMsg">获取验证码</div>
      <div class="status-msg" v-show="isShowStatusMsg"  @click="goCode">{{statusMsg}}</div>
    </div>

    <div class="back">回到登录</div>
    <div class="btn">注册</div>
  </form>
</template>

<script>
import { API_USER_CODE } from '@/views/api.config.js'
export default {
  data () {
    return {
      username: '',
      password: '',
      email: '',
      code: '',
      timer: null,
      statusMsg: ''
    }
  },
  methods: {
    clearUsername () {
      this.username = ''
    },
    clearPassword () {
      this.password = ''
    },
    clearEmail () {
      this.email = ''
    },
    async goCode () {
      if (!this.email) {
        alert('请填写邮箱地址')
        return
      }
      const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (!reg.test(this.email)) {
        alert('请填写正确的邮箱格式')
        return
      }
      // 开始请求
      const { code, msg } = await this.$axios.post(API_USER_CODE, {
        email: this.email
      })
      if (code === 1) {
        let count = 10
        this.statusMsg = `${--count}秒后重发`
        const run = () => {
          this.timer = setTimeout(() => {
            if (count <= 0 && this.timer) {
              clearTimeout(this.timer)
              this.statusMsg = ''
              return
            }
            this.statusMsg = `${--count}秒后重发`
            run()
          }, 1000)
        }
        run()
      }
      alert(msg)
    }
  },
  computed: {
    isClearUsername () {
      return this.username.length
    },
    isClearPassword () {
      return this.password.length
    },
    isClearEmail () {
      return this.email.length
    },
    isShowStatusMsg () {
      return this.statusMsg.length
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  padding: 0 .3rem;
  &-item {
    height: .96rem;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    input {
      flex: 1;
      border: none;
      outline: none;
      height: 100%;
    }
    .clear {
      width: .64rem;
      .iconfont {
        font-size: $fontC;
      }
    }
    .status-msg {
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: .08rem;
      // height: 100%;
      padding: .08rem .2rem;
    }

  }
  .back {
    margin: 0.3rem 0;
    color: #7f7f7f;
  }
  .btn {
    width: 6.72rem;
    margin: 0 auto;
    height: 0.96rem;
    line-height: 0.96rem;
    background-color: $colorB;
    color: $colorA;
    text-align: center;
    font-size: $fontB;
  }
}
</style>
