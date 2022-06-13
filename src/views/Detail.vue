<template>
    <div>
      <header-comp></header-comp>
    </div>
</template>

<script>
import { API_PRODUCT_DETAIL } from './api.config'
import HeaderComp from '../components/Header.vue'
export default {
  name: 'Detail',
  components: { HeaderComp },
  created () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      console.log(this.$route.params.id)
      const res = await this.$axios.get(
        API_PRODUCT_DETAIL,
        {
          params: { id: this.$route.params.id }
        }
      )
      console.log(res)
    }
  }
}
</script>
