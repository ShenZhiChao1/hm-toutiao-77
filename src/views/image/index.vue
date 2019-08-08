<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn_box">
        <el-radio-group @change="chargeCollect" size="small" v-model="reqParams.collect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="openDialog()" size="small" style="float:right" type="success">添加素材</el-button>
      </div>
      <div class="img_list">
        <div :key="item.id" class="img_item" v-for="item in images">
          <img :src="item.url" alt />
          <div class="foot" v-show="!reqParams.collect">
            <span
              :class="{selected:item.is_collected}"
              @click="toggleCollect(item)"
              class="el-icon-star-off"
            ></span>
            <span @click="deleteImage(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <el-pagination
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        :total="total"
        @current-change="changePager"
        background
        layout="prev, pager, next"
        v-if="total>reqParams.per_page"
      ></el-pagination>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" title="添加素材" width="300px">
      <el-upload
        :headers="uploadHeaders"
        :on-success="handleSuccess"
        :show-file-list="false"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        class="avatar-uploader"
        name="image"
      >
        <img :src="imageUrl" class="avatar" v-if="imageUrl" />
        <i class="el-icon-plus avatar-uploader-icon" v-else></i>
      </el-upload>
      <span>上传组件</span>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import MyBread from '@/components/my-bread'
import store from '@/store'
export default {
  // components: { MyBread },
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      // 上传组件的头部信息
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 删除
    deleteImage (id) {
      this.$confirm('老铁，此操作将永久删除该素材, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`user/images/${id}`)
          this.$message.success('删除成功')
          this.getImages()
        })
        .catch(() => {})
    },
    async toggleCollect (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // 提示
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      // 更新当前图片状态
      item.is_collected = data.collect
    },

    // 上传成功
    handleSuccess (res) {
      // 1. 获取图片地址显示img标签
      // console.log(res) res.data.url 图片地址
      this.imageUrl = res.data.url
      // 2. 提示上传成功
      this.$message.success('上传成功')
      // 3. 过2s后关闭对话框，更新列表
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    },
    openDialog () {
      this.imageUrl = null
      this.dialogVisible = true
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    chargeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })

      this.total = data.total_count
      this.images = data.results
    }
  }
}
</script>

<style scoped lang="less">
.img_list {
  margin-top: 20px;
  .img_item {
    width: 160px;
    height: 160px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .foot {
      position: absolute;
      width: 100%;
      height: 30px;
      line-height: 30px;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      text-align: center;
      span {
        margin: 0 20px;
        &.selected {
          color: red;
        }
      }
    }
  }
}
</style>
