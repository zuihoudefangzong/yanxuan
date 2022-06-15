<template>
  <div class="container">
    <header-comp></header-comp>
    <div class="yanxuan">
      <img src="../assets/img/yanxuan.png">
      <router-view></router-view>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import HeaderComp from '../components/Header.vue'
import NavFooter from '../components/NavFooter.vue'
export default {
  name: 'Profile',
  components: { HeaderComp, NavFooter }
}
</script>

<style lang="scss" scoped>
.container {
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
