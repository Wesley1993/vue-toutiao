<template>
  <div id="app">
    <h1>后台管理系统</h1>
    <!-- 路由出口 -->
    <router-view />
    <el-button>默认按钮</el-button>
    <el-button type="danger">默认按钮</el-button>
    <el-input-number
      v-model="num"
      @change="handleChange"
      :min="1"
      :max="10"
      label="描述文字"
    ></el-input-number>
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
