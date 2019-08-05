<template>
  <el-container class="wrapper">
    <el-aside :width="isCollapse?'64px':'200px'">
      <div :class="{miniLogo:isCollapse}" class="login"></div>
      <el-menu
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="$route.path"
        active-text-color="#ffd04b"
        background-color="#545c64"
        router
        text-color="#fff"
      >
        <!-- :default-active="$route.path"动态绑定激活的菜单 -->
        <!-- el-submenu   有子菜单的菜单项-->
        <!-- el-menu-item  没有子菜单的菜单项 -->
        <!-- 点击切换路径 index作为path进行路径跳转 -->
        <!-- default-active不能是死的，做法：获取当前的地址，设置给default-active  路径和菜单的index 的值一致 -->
        <el-menu-item index="/home">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span @click="toggleMenu()" class="el-icon-s-fold"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown class="my-dropdown">
          <span class="el-dropdown-link">
            <img :src="photo" alt />
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="setting()" icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item @click.native="logout()" icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'

export default {
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  created () {
    // 获取本地用户信息
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      store.clUser()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scopend lang='less'>
.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background: #002033;
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-left: 10px;
    }
    .my-dropdown {
      float: right;
      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .el-dropdown-link {
        font-weight: bold;
      }
    }
  }
}
.login {
  width: 100%;
  height: 60px;
  background: #002244 url(../../assets/images/logo_admin.png) no-repeat
    center/140px auto;
}
.el-menu {
  border-right: none;
}
.miniLogo {
  background-image: url(../../assets/images/logo_admin_01.png);
  background-size: 34px auto;
}
</style>
