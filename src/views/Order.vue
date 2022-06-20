<template>
  <div>order</div>
</template>

<script>
export default {
  created () {
    const { orderNo } = this.$route.params
    console.log(orderNo)
  }
}
</script>
