<template>
  <div id="app">
    <!-- <h1>后台管理系统</h1> -->
    <!-- 路由出口 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      num: 1
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="less">
</style>
