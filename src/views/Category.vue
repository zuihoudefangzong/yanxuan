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
            >
              <img :src="item.bannerUrl" class="banner">
              <div class="name">{{item.name}}</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from '../components/NavFooter.vue'
import { API_CATE, API_CATE_SUB } from './api.config.js'
export default {
  name: 'Category',
  components: { NavFooter },
  data () {
    return {
      categoryList: [], // 第一级分类list
      actived: 0, // 当前选中的分类
      categoryGroupList: []// 第二级分类list
    }
  },
  methods: {
    async getCategory () {
      const { categoryList } = await this.$axios.get(API_CATE)
      console.log(categoryList)
      this.categoryList = categoryList || []
    },

    async getSubCategory (categoryId) {
      const {
        category: { categoryGroupList }
      } = await this.$axios.post(
        API_CATE_SUB,
        {
          categoryId
        }
      )
      this.categoryGroupList = categoryGroupList
    },
    select (id) {
      this.actived = id
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
</style>
