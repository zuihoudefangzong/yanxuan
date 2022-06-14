<template>
  <div>
    <div class="cate">
      <!-- left nav -->
      <ul class="cate-nav">
        <li
          class="cate-nav-item"
          v-for="item in categoryList"
          :key="item.id"
          :class="{ 'active': actived === item.id }"
          @click="select(item.id)"
        >{{item.name}}</li>
      </ul>

      <!-- right list -->
      <ul class="cate-list" v-if="categoryGroupList.length">
        <li
          class="cate-list-item"
          v-for="sub in categoryGroupList"
          :key="sub.id"
        >
          <div class="title">{{sub.name}}</div>
          <ul class="sub-item">
            <li
              class="sub-item-detail"
              v-for="item in sub.categoryList"
              :key="item.id"
              @click="getSubList(item.id)"
            >
              <img :src="item.bannerUrl" class="banner">
              <div class="name">{{item.name}}</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <nav-footer></nav-footer>
    <div class="loading-wrapper" v-show="visibleLoding"  >
      <loading></loading>
    </div>
  </div>
</template>

<script>
import NavFooter from '../components/NavFooter.vue'
import { API_CATE, API_CATE_SUB } from './api.config.js'
import Loading from '../components/Loading.vue'
export default {
  name: 'Category',
  components: { NavFooter, Loading },
  data () {
    return {
      categoryList: [], // 第一级分类list
      actived: 0, // 当前选中的分类
      categoryGroupList: [], // 第二级分类list
      visibleLoding: false
    }
  },
  methods: {
    async getCategory () {
      this.visibleLoding = true
      const { categoryList } = await this.$axios.get(API_CATE)
      this.categoryList = categoryList || []
      this.actived = categoryList[0].id
      this.visibleLoding = false
    },

    async getSubCategory (categoryId) {
      this.visibleLoding = true
      const {
        category: { categoryGroupList }
      } = await this.$axios.post(
        API_CATE_SUB,
        {
          categoryId
        }
      )
      this.categoryGroupList = categoryGroupList
      this.visibleLoding = false
    },
    select (id) {
      this.actived = id
    },
    getSubList (subId) {
      this.$router.push(`/cateDetail/${this.actived}/${subId}`)
    }
  },
  created () {
    this.getCategory()
  },
  watch: {
    actived (newVal) {
      this.getSubCategory(newVal)
    }
  }
}
</script>

<style lang="scss" scoped>
.cate {
  position: absolute;
  top: 0;
  right: 0;
  bottom: .96rem;
  left: 0;
  background-color: $colorA;
  display: flex;
  &-nav {
    width: 1.4rem;
    padding: .2rem 0;
    margin-right: 0.2rem;
    &-item {
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
      margin-top: 0.4rem;
      color: $colorC;
    }
    .active {
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 0.08rem;
        background-color: #ab2b2b;
      }
    }
  }
  &-list {
    flex: 1;
    overflow-y: scroll;
    padding: .2rem;
    border-left: 1px solid $colorE;
    &-item{
      margin-bottom: 0.3rem;
      .title {
        color: $colorC;
        font-weight: 700;
        border-bottom: 1PX solid $colorE;
      }
      .sub-item {
        display: flex;
        flex-wrap: wrap;
        &-detail {
          width: 1.4rem;
          margin: .4rem .4rem 0 0;
          text-align: center;
          .banner {
            width: 1.2rem;
            height: 1.2rem;
          }
          .name {
            font-size: $fontA;
          }
        }
      }
    }
  }
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
