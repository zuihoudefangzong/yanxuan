<template>
  <svg class="li-icon" @click="$emit('click', $event)">
    <!-- 要改变svg的颜色 用css3的fill就可 -->
    <use :xlink:href="`#i-${name}`"></use>
  </svg>
</template>

<script>
// 直接import会直接运行
import './svg'
export default {
  name: 'liIcon',
  // 组件之间传参
  // 假如用户没
  props: ['name']
}
</script>

<style lang="scss" scoped>
.li-icon {
  // 让icon大小 和字体宽高一样
  width: 1em; height: 1em;
  // 相对定位 距离原来自身位置往下走一点
  position: relative; top: 0.125em;
}
</style>
