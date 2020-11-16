/**
 * 项目的启动入口
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载element组件库
import ElementUI from 'element-ui'

// 加载element组件库的样式
import 'element-ui/lib/theme-chalk/index.css'

// 加载全局样式文件
import './styles/index.less'

Vue.config.productionTip = false

// 全局注册element组件库
Vue.use(ElementUI)
// 创建vue根实例
// 把router 和store配置到根实例中
// 通过render方法把APP根组件渲染到#App入口节点

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
