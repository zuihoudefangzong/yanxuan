<template>
  <div>
    <header-comp></header-comp>
    <div class="item-list">
      <product
        v-for="item in itemList"
        :key="item.id"
        :item="item"

      ></product>
    </div>

  </div>
</template>

<script>
import { API_CATE_DETAIL } from './api.config.js'
import HeaderComp from '../components/Header'
import Product from '../components/Product'
export default {
  name: 'CategoryDetail',
  components: { HeaderComp, Product },
  data () {
    return {
      itemList: []
    }
  },
  methods: {
    async getCateDetil (cateId, subId) {
      const { itemList } = await this.$axios.post(
        API_CATE_DETAIL,
        {
          cateId,
          subId
        }
      )
      this.itemList = itemList
    }
  },
  created () {
    const { cateId, subId } = this.$route.params
    this.getCateDetil(cateId, subId)
  }
}
</script>

<style lang="scss" scoped>
.item-list {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 0.2rem;
}
</style>
