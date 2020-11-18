<template>
  <el-container class="layout-container">
    <el-aside width="auto" class="aside">
      <app-aside class="aside-menu" :is-collapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i
            :class="{
              'el-icon-s-fold icon': isCollapse,
              'el-icon-s-unfold icon': !isCollapse,
            }"
            @click="isCollapse = !isCollapse"
          ></i>
          <span class="text">江苏传智播客科技教育有限公司</span>
        </div>
        <el-dropdown :hide-on-click="false" class="my-dropdown">
          <div>
            <img class="user-icon" :src="user.photo" alt="" />
            <span class="user-name"> {{ user.name }} </span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'

export default {
  name: 'Layout',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      user: {},
      isCollapse: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.aside {
  background-color: #CDD7E2;
  height: 100%;
  .aside-menu {
    height: 100%;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid #cccccc;
  div {
    display: flex;
    align-items: center;
    .icon {
      font-size: 24px;
      cursor: pointer;
    }
    .text {
      font-size: 16px;
      margin-left: 10px;
    }
  }
  .my-dropdown {
    .user-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .user-name {
      color: #333;
      margin-left: 5px;
      font-weight: 700;
    }
  }
}
.main {
  background-color: #E6EBF1;
}
</style>
