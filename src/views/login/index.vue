<template>
  <div class="container">
    <el-card class="my-card">
      <img alt src="../../assets/images/logo_index.png" />
      <!-- 因为要提交表单数据所以要绑定元素 -->
      <!-- 验证规则  :rules     -->
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            placeholder="请输入验证码"
            style="width:235px;margin-right:10px;"
            v-model="loginForm.code"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <!-- :value="true"  为trun时时默认选中 -->
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login()" style="width:100%" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  // 只要在组件中必须使用data函数
  data () {
    const checkMobile = (rule, value, callback) => {
      // 校验手机号
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('输入正确的手机号'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },

      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, triggin: 'blue' }
        ],
        code: [
          { required: true, message: '验证码', trigger: 'blur' },
          { len: 6, message: '验证码输入有误', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // login () {
    //   // 对表单进行校验
    //   this.$refs.loginForm.validate(valid => {
    //     if (valid) {
    //       console.log('校验成功')
    //     }
    //   })
    // }
    login () {
      // 对表单进行校验
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 如果成功就请求登录接口
          this.$http
            .post('/authorizations', this.loginForm)
            .then(res => {
              // 响应对象  包含相应主
              // console.log(res.data)
              // 存储用户信息
              store.setUser(res.data.data)
              // 跳转到首页
              this.$router.push('/home')
            })
            .catch(err => {
              console.log(err)
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .my-card {
    position: absolute;
    width: 400px;
    height: 330px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      margin: 0 auto;
      width: 250px;
      margin-bottom: 10px;
    }
  }
}
</style>
