<template>
  <div class="right">
    <!-- 功能区 -->
    <Func />
    <!-- 网站链接 -->
    <Link />
  </div>
</template>

<script setup>
import Func from "@/views/Func/index.vue";
import Link from "@/components/Links.vue";
</script>

<style lang="scss" scoped>
.right {
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  @media (max-width: 720px) {
    width: 100%;
  }
}
</style>
