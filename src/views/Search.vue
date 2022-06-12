<template>
  <div class="container">
    <!-- header -->
    <header class="header">
      <div class="search-input">
        <i class="iconfont icon-icon-test"></i>
        <!-- trim前后空格去掉 -->
        <input
          type="text"
          placeholder="请输入商品名称"
          v-model="keyword"
          @input="onInput"
          @keyup.enter="onEnter"
        >
        <i class="iconfont icon-shanchu" @click="close"></i>
      </div>
      <span class="cancel" @click="cancel">取消</span>
    </header>

    <!-- suggest搜索联想区域 -->
    <ul class="suggest"  v-show="isShowSuggest">
      <li
        class="suggest-item"
        v-for="(item,index) in suggestList"
        :key="index"
        @click="select(item)"
      >
        {{item}}
      </li>
    </ul>

    <!-- 历史记录search-history区域section -->
    <section class="search-history" v-show="!isShowSuggest && !isShowResult">
      <div class="history-title">
        <span>历史记录</span>
        <i class="iconfont icon-shanchu1"></i>
      </div>
    </section>

    <!-- search-result结果 -->
    <section class="result">
      <product
        v-for="(item,index) in resultList"
        :key="index"
        :item="item"
      >
      </product>
    </section>

    <div class="loading-wrapper" v-show="visibleLoding"  >
      <loading></loading>
    </div>
  </div>
</template>

<script>
import { API_SEARCH_COMPLETE, API_SEARCH } from './api.config'
import Product from '../components/Product.vue'
import Loading from '../components/Loading.vue'
export default {
  name: 'Search',
  data () {
    return {
      keyword: '', // search keyword
      timer: null, // search联想防抖timer
      suggestList: [], // search联想list
      resultList: [], // search结果result
      visibleLoding: false
    }
  },
  components: { Product, Loading },
  methods: {
    onInput () {
      // 防抖
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(async () => {
        const suggestList = await this.$axios.post(
          API_SEARCH_COMPLETE,
          { keywordPrefix: this.keyword }
        )
        console.log(suggestList)
        this.suggestList = suggestList
      }, 200)
    },

    // search接口
    async _getSearchResult (productName) {
      if (productName === '') return
      try {
        this.visibleLoding = true
        this.suggestList = [] // 置空就不显示联想结果
        const { directlyList } = await this.$axios.get(
          API_SEARCH,
          {
            params: { keyword: productName }
          }
        )
        this.resultList = directlyList || []
      } catch (error) {
        console.log(error)
      } finally {
        this.suggestList = [] // 置空就不显示联想结果
        this.visibleLoding = false
      }
    },
    onEnter () {
      this._getSearchResult(this.keyword)
    },
    select (productName) {
      this.keyword = productName
      this._getSearchResult(this.keyword)
    },
    // 点击小叉子的函数
    close () {
      this.keyword = ''
      this.suggestList = []
      this.resultList = []
    },
    cancel () {
      this.$router.push('/')
    }
  },
  computed: {
    isShowSuggest () { return this.suggestList.length },
    isShowResult () { return this.resultList.length }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: $colorA;
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
  background-color: $colorA;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .search-input {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $colorE;
    padding: 0 0.2rem;
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
  }
  .cancel {
    margin-left: 0.3rem;
  }
}

.search-history {
  margin-top: 0.8rem;
  background-color: $colorA;
  .history-title {
    font-size: $fontB;
    color: $colorD;
    .iconfont {
      color: $colorC;
      margin-left: .3rem;
    }
  }
}

.suggest {
  margin-top: 0.8rem;
  padding: 0.3rem;
  &-item {
    padding: .2rem 0;
    border-bottom: 1px solid $colorF;
  }
}

.result {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 0.8rem;
  padding: 0 0.2rem;
}
.loading-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: rgba(153, 153, 153, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
