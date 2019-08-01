<template>
    <div class="container">
        <el-card class="my-card">
            <img src="../../assets/images/logo_index.png" alt="">
            <el-input class="my-text" v-model="input" placeholder="请输入内容"></el-input>
            <el-input class="my-code" placeholder="请输入验证码" v-model="input1" clearable></el-input>
             <el-button type="info" class="codes">验证码</el-button>
             <el-checkbox v-model="checked" class="yi">已同意</el-checkbox>
             <el-button type="success" class="success">登录</el-button>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      input1: '',
      checked: ''

    }
  }
}
</script>

<style scoped lang="less">
.container{
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(../../assets/images/login_bg.jpg) no-repeat center / cover

}
.my-card{
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-60%);
    img{
        display: block;
        width: 200px;
        margin: 0 auto;
    }
    .my-text{

       margin-top: 40px;

    }
    .my-code {
        width:60%;
        margin-top: 50px;
        margin-bottom: 25px;
    }
    .codes {
        font-size: 16px;
        background-color: skyblue;
        margin-left: 30px;

    }
    .success{
        margin-left: 30px;
        width: 80%;
        margin-top: 10px;
        font-size: 20px;
    }
}

</style>
