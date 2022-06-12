<template>
  <div class="container">

    <!-- header -->
    <header class="header">
      <div class="search-input">
        <i class="iconfont icon-icon-test"></i>
        <input type="text" placeholder="请输入商品名称">
        <i class="iconfont icon-shanchu"></i>
        <span class="cancel">取消</span>
      </div>
    </header>

    <!-- suggest搜索联系区域 -->
    <section class="suggest"></section>

    <!-- 历史记录search-history区域section -->
    <section class="search-history">
      <div class="history-title">
        <span>历史记录</span>
        <i class="iconfont icon-shanchu1"></i>
      </div>
    </section>

    <!-- search-result结果 -->
    <section class="result"></section>
  </div>
</template>

<script>
export default {
  name: 'Search'
}
</script>

<style lang="scss" scoped>
.container {
  background: $colorA;
  padding: 0 .2rem;
}
// search header
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: .1rem .2rem;
  box-sizing: border-box;
  .search-input {
    display: flex;
    justify-content: center;
    align-items: center;
    .iconfont {
      font-size: $fontC;
      color: $colorC;
    }
    input {
      flex: 1;
      background-color: $colorE;
      margin: 0 .2rem;
      padding: .1rem .2rem;
      border: none;
      outline: none;

    }
    .cancel {
      margin-left: 0.3rem;
    }
  }

}

.search-history {
  margin-top: 0.8rem;
}
</style>
