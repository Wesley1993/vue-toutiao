<template>
  <div class="login-contianer">
    <!--
      el-form 表单组件
      每个表单项都必须使用el-form-item组件包裹
       -->
    <div class="login-head"></div>
    <!--
      配置form表单验证
      1、必须给el-form组件绑定model 为表单数据对象
      2、给需要验证的表单项el-form-item绑定prop属性
         注意：prop属性需要指定表单对象中的数据名称
      3、给el-form组件的rules属性配置验证规则

      手动触发表单验证
      1、给el-form设置ref 起个名字（随便起名，不要重复即可）
      2、通过ref获取el-from组件，调用组件的方法validate进行验证
     -->
    <el-form
      class="login-form"
      ref="login-form"
      :model="user"
      :rules="formRules"
    >
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree"
          >我已阅读并同意用户协议和隐私条款</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          :loading="loginLoading"
          @click="onLogin"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810', // 验证码
        agree: true // 是否同意协议的选中状态
      },
      loginLoading: false, // 登录按钮loading状态
      formRules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'change' },
          { pattern: /^1[3|4|5|6|7|8|9]\d{9}$/, message: '请输入正确的手机号', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'change' }
        ],
        agree: [
          {
            // 自定义校验规则
            // 验证通过 callback()
            // 验证失败 callback(new Error('错误消息'))
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      // 表单验证,validate方法是异步验证
      this.$refs['login-form'].validate(valid => {
        // 如果表单验证失败，停止请求提交
        if (!valid) {
          // eslint-disable-next-line no-useless-return
          return
        }

        // 验证通过，请求登录
        this.login()
      })
    },
    login () {
      // 验证通过，提交表单
      this.loginLoading = true
      login(this.user)
        .then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '恭喜你登录成功！'
          })
          // close loading
          this.loginLoading = false
          this.$router.push({ name: 'home' })
        })
        .catch(err => {
          this.$message.error('登录失败')
          // close loading
          this.loginLoading = false
          console.log('登录失败', err)
        })
      // 处理后端响应结果 成功 or 失败
      console.log('submit!')
    }
  }
}
</script>

<style lang="less" scoped>
.login-contianer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-size: cover;
  background: url("./login_bg.jpg") no-repeat center;
  .login-head {
    min-width: 300px;
    height: 57px;
    padding: 20px 50px;
    background: #fff url("./logo_index.png") no-repeat center;
  }
  .login-form {
    background-color: #fff;
    padding: 0 50px;
    min-width: 300px;
    .login-btn {
      width: 100%;
    }
  }
}
</style>
