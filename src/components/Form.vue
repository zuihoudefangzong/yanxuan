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

    <div v-show="formType === 'regist'">
      <!-- 获取 -->
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
    </div>

    <!-- back login or regist -->
    <div
      class="back"
      v-if="title && title.go"
      @click="$router.push(title.url)"
    >{{title.go}}</div>
    <!-- regist button or login button -->
    <div
      class="btn"
      v-if="title && title.btn"
      @click="onClick"
    >{{title.btn}}</div>
  </form>
</template>

<script>
import { API_USER_CODE } from '@/views/api.config.js'
// password MD5加密
import CryptoJS from 'crypto-js'
export default {
  data () {
    return {
      username: '',
      password: '',
      email: '',
      code: '',
      // 倒计时的timer
      // timer: null,
      // 倒计时
      statusMsg: ''
    }
  },
  props: {
    formType: {
      type: String,
      default: 'login'
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

    // 获取验证码
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
        alert(msg)
        let count = 60
        this.statusMsg = `${--count}秒后重发`
        const run = () => {
          // this.timer =
          setTimeout(() => {
            if (count <= 0) {
              // clearTimeout(this.timer)
              this.statusMsg = ''
              return
            }
            this.statusMsg = `${--count}秒后重发`
            run()
          }, 1000)
        }
        run()
      } else if (code === 0) {
        alert(msg)
      }
    },
    // 简单校验
    verifyForm () {
      let msg = ''
      if (this.username.trim() === '') {
        msg = '请输入用户名'
      } else if (this.password.trim() === '') {
        msg = '请输入密码'
      } else if (this.formType === 'regist' && this.email.trim() === '') {
        msg = '请输入邮箱'
      } else if (this.formType === 'regist' && this.code.trim() === '') {
        msg = '请输入验证码'
      }
      if (msg !== '') {
        alert(msg)
        return false
      }
      return true
    },
    onClick () {
      if (this.$data.password) {
        // password MD5
        this.$data.password = CryptoJS.MD5(this.$data.password).toString()
      }
      // 校验器
      this.verifyForm() && this.$emit('onClick', this.$data)
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
    },
    // computed title
    title () {
      // 可以区分开title btn的content url地址
      let data = {}
      if (this.formType === 'regist') {
        data = {
          go: '回到登录',
          btn: '注册',
          url: '/profile/login'
        }
      } else if (this.formType === 'login') {
        data = {
          go: '注册账号',
          btn: '登录',
          url: '/profile/regist'
        }
      }
      return data
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
