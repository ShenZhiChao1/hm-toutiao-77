<template>
  <div class="my-image">
    <div @click="openDialog" class="img-btn">
      <img :src="value ||defaultImage " @click="openDialog()" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" title="选择封页" width="700px">
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="素材库" name="padd">
          <!-- 全部和收藏功能 -->
          <el-radio-group @change="collectChange" size="mini" v-model="reqParams.collect">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
            <!-- 获取图片功能 -->
          </el-radio-group>
          <div class="img-list">
            <div
              :class="{selected:selectedImageUrl===item.url}"
              :key="item.id"
              @click="selectedImage(item.url)"
              class="img-item"
              v-for="item in images"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页功能 -->
          <el-pagination
            :current-page="reqParams.page"
            :page-size="reqParams.per_page"
            :total="total"
            @current-change="changePager"
            background
            layout="prev, pager, next"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片">
          <el-upload
            :headers="uploadHeaders"
            :on-success="handleSuccess"
            :show-file-list="false"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            class="avatar-uploader"
            name="image"
          >
            <img :src="uploadImageUrl" class="avatar" v-if="uploadImageUrl" />
            <i class="el-icon-plus avatar-uploader-icon" v-else></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>

      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="confirmImage()" type="primary">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      selectedImageUrl: null,
      defaultImage,
      total: 0,
      images: [],
      // 控制对话框隐藏
      dialogVisible: false,
      activeName: 'padd',
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      uploadImageUrl: null
    }
  },
  methods: {
    // 确认图片
    confirmImage () {
      // 让图片按钮能够显示你选中的或者上传的图片地址。
      if (this.activeName === 'padd') {
        this.$emit('input', this.selectedImageUrl)
      } else {
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
    },
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
    },
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    openDialog () {
      this.dialogVisible = true
      // 清空之前选中或者上传的图片地址
      this.uploadImageUrl = null
      this.selectedImageUrl = null
      this.getImages()
    },
    collectChange () {
      this.reqParams.page = 1
      this.getImages()
    },

    // search () {
    //   this.reqParams.page = 1
    //   this.getImages()
    // }
    // 渲染页面
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      console.log(data)
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.my-image {
  display: inline-block;
  margin-left: 20px;
}
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
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
.img-list {
  margin-top: 10px;
}
.img-item {
  width: 145px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-bottom: 10px;
  margin-left: 15px;
  position: relative;
  &.selected {
    //这个是伪类
    &::after {
      content: '';
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/images/selected.png)
        no-repeat center / 50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
}
.my-image .el-dialog__body {
  padding-bottom: 0;
}
</style>
