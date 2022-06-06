<template>
  <footer class="nav">
    <router-link to="/" class="nav-item">
      <i class="iconfont icon-shouye"></i>
      <div>首页</div>
    </router-link>
    <router-link to="/category" class="nav-item">
      <i class="iconfont icon-shouye"></i>
      <div>分类</div>
    </router-link>
    <router-link to="/cart" class="nav-item">
      <i class="iconfont icon-gouwuchekong"></i>
      <div>购物车</div>
    </router-link>
    <router-link to="/profile" class="nav-item">
      <i class="iconfont icon-gerenyonghutouxiang"></i>
      <div>个人</div>
    </router-link>
  </footer>
</template>

<script>
export default { name: 'NavFooter' }
</script>

<style lang="scss" scoped>
.nav{
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;
  // height: 0.97rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $colorA;
  border: 1px solid #d9d9d9;
  // 设置了行高的话 当前font-size乘以1.4倍
  // 后面所以子元素每个字体的行高都继承了
  line-height: 1.4;
  &-item{
    // width平均分
    flex: 1;
    text-align: center;
    // router-lick default 渲染a标签 点击的虚线
    outline: none;
    >.iconfont {
      font-size: $fontD;
      color: $colorF;
    }
    >div {
      color: $colorF;
    }
  }
  // router-link标签点击会添加的类名
  .router-link-exact-active{
    div {
      color: $colorB;
    }
    // router-lick default 渲染a标签
    // a标签的蓝色highlight-color
    &:active {
      -webkit-tap-highlight-color: transparent;
    }
    .iconfont {
      color: $colorB;
    }
  }
}
</style>
