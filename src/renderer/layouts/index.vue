<template>
  <div class="layout">
    <header>
      <jxHeader/>
    </header>
    <section class="content">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import jxHeader from './jxHeader'

export default {
  name: 'layouts',
  components: {
    jxHeader
  }
}
</script>

<style>
header {
  background-color: red;
}

.content {
  padding: 20px;
}
</style>
