<template>
  <div class="container">
    <header-comp></header-comp>
    <div v-if="userinfo">
      <div class="userinfo">
        <div class="avatar">
          <img src="../assets/img/avatar-default.png" alt="">
        </div>
        <div class="username">{{userinfo.username}}</div>
      </div>

      <div class="menu">
        <div class="menu-item" @click="getMyorders">我的订单</div>
        <div class="menu-item" @click="logout">退出登录</div>
      </div>
    </div>
    <div v-else class="yanxuan">
      <img src="../assets/img/yanxuan.png">
      <router-view></router-view>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import HeaderComp from '../components/Header.vue'
import NavFooter from '../components/NavFooter.vue'
import { API_USER_LOGOUT } from './api.config.js'
export default {
  name: 'Profile',
  components: { HeaderComp, NavFooter },
  computed: {
    userinfo () { return this.$store.state.userinfo }
  },
  methods: {
    getMyorders () {
      this.$router.push('/myOrder')
    },
    logout () {
      this.$toast({
        btnShow: true,
        msg: '确认退出吗',
        callback: async () => {
          const res = await this.$axios.get(API_USER_LOGOUT)
          if (res.code === 1) {
            this.$store.commit('setUserinfo', null)
            this.$toast({
              msg: '退出成功'
            })
            // 刷新当前页面
            this.$router.go(0)
          } else {
            this.$toast({
              msg: '退出失败'
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .userinfo {
    margin-top: 0.88rem;
    background-image: url('../assets/img/profile-bg.png');
    padding: 0 0.2rem;
    display: flex;
    align-items: center;
    height: 2.2rem;
    .avatar {
      flex: 1;
      img {
        height: 1.6rem;
        border-radius: 50%;
      }
    }
    .username {
      flex: 2;
      font-size: $fontC;
      color: $colorA;
    }
  }
  .menu {
    &-item {
      height: 1rem;
      line-height: 1rem;
      background-color: $colorA;
      text-align: center;
      margin-top: 0.2rem;
    }
  }
  .yanxuan {
    text-align: center;
    padding: 1.66rem 0;
    margin-top: 0.88rem;
    img {
      width: 2.88rem;
    }
  }
}
</style>
