<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>{{articleId?'修改文章':'发布文章'}}</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="100px">
        <el-form-item label="标题：">
          <el-input style="width:400px" v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <vue-editor v-model="articleForm.content"></vue-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group @change="changeType" v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 这个是上传图片
          -->
          <div v-if="articleForm.cover.type === 1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type === 3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <el-button @click="submit(false)" type="primary">发表</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button @click="update(false)" type="success">修改</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  components: {
    VueEditor
  },
  data () {
    return {
      articleForm: {
        title: null,
        content: null,

        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      }
    }
  },
  watch: {
    // 不仅仅是data中的数据才可以去监听 $route实例的数据
    $route () {
      if (!this.$route.query.id) {
        this.articleId = null
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },

  created () {
    // 获取地址栏传参
    this.articleId = this.$route.query.id
    // 判断如果有ID 修改文章  获取当前文章数据
    if (this.articleId) {
      this.getArticle()
    }
  },
  methods: {
    async update (draft) {
      await this.$http.put(`articles?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '修改存入草稿成功' : '文章修改成功')
      // 去除内容管理
      this.$router.push('/article')
    },
    // 获取数据
    async getArticle () {
      const {
        data: { data }
      } = await this.$http.get('articles/' + this.articleId)
      this.articleForm = data
    },
    changeType () {
      // 重置图片数据
      this.articleForm.cover.images = []
    },
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '文章存入草稿成功' : '文章发表成功')
      this.$router.push('/article')
    }
  }
}
</script>

<style scoped lang='less'>
.img-btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
