<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <div>
        <el-table :data="comments">
          <el-table-column label="标题" prop="title"></el-table-column>
          <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
          <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="toggleStatus(scope.row)"
                size="small"
                type="success"
                v-if="!scope.row.comment_status"
              >打开评论</el-button>
              <el-button @click="toggleStatus(scope.row)" size="small" type="danger" v-else>关闭评论</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        :total="total"
        @current-change="changePager"
        background
        layout="prev, pager, next"
        v-if="total > reqParams.per_page"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 评论信息
      comments: [],
      // 参数
      reqParams: {
        per_page: 20,
        page: 1,
        response_type: 'comment'
      },

      // 总条数
      total: 0
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    // 切换  打开  关闭 评论功能
    async toggleStatus (row) {
      const {
        data: { data }
      } = await this.$http.put(`comments/status?article_id=${row.id}`, {
        allow_comment: !row.comment_status
      })
      this.$message.success(
        data.allow_comment ? '打开评论成功' : '关闭评论成功'
      )
      row.comment_status = data.allow_comment
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    },
    async getComments () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      console.log(data)
      this.comments = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
</style>
