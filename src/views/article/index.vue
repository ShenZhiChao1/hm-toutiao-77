<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <div>
        <el-form label-width="80px" size="small">
          <el-form-item label="状态：">
            <el-radio-group v-model="reqParams.status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核成功</el-radio>
              <el-radio :label="3">审核失败</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道：">
            <el-select clearable placeholder="请选择" v-model="reqParams.channel_id">
              <el-option
                :key="item.id"
                :label="item.name"
                :value="item.id"
                v-for="item in channelOptions"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期：">
            <el-date-picker
              @change="changeData"
              end-placeholder="结束日期"
              range-separator="至"
              start-placeholder="开始日期"
              type="daterange"
              v-model="dateArr"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button @click="search()" type="primary">筛选</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card>
      <div class="clearfix" slot="header">根据筛选条件共查询到{{total}}条结果:</div>
      <el-table :data="articles" style="width: 100%">
        <el-table-column label="封面" prop="img">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:100px;height:75px; ">
              <div class="image-slot" slot="error">
                <img alt src="../../assets/images/error.gif" style="width:100px;height:75px" />
              </div>
            </el-image>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.status===0">草稿</el-tag>
            <el-tag type="info" v-if="scope.row.status===1">待审核</el-tag>
            <el-tag type="info" v-if="scope.row.status===2">审核通过</el-tag>
            <el-tag type="info" v-if="scope.row.status===3">审核失败</el-tag>
            <el-tag type="info" v-if="scope.row.status===4">删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row.id)" circle icon="el-icon-edit" plain type="primary"></el-button>
            <el-button @click="del(scope.row.id)" icon="el-icon-delete" plain type="danger"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div style="text-align:center; margin-bottom:20px">
        <el-pagination
          :current-page="reqParams.page"
          :page-size="reqParams.per_page"
          :total="total"
          @current-change="NewCreated"
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 使用自己组件 -->
    <!-- v-model 背后 :value  @input -->
    <my-channel v-model="reqParams.channel_id"></my-channel>
  </div>
</template>

<script>
import MyBread from '@/components/my-bread'
// import { generateKeyPairSync } from 'crypto'
export default {
  components: { MyBread },
  // created () {
  //   this.$http
  //     .get('http://ttapi.research.itcast.cn/mp/v1_0/articles')
  //     .then(res => console.log(res.data))
  // }
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdte: null,
        page: 1,
        per_page: 20
      },
      // 频道下拉
      channelOptions: [],
      // 日期管理
      dateArr: [],

      // 文章类表数据
      articles: [],
      // 总条数
      total: 0
    }
  },
  // computed计算属性使用场景：当需要一个新数据，需要依赖data中的数据，
  // watch侦听器的使用场景：当你需要监听某一个数据的改变，去做一些开销较大的操作，比如异步操作
  watch: {
    'reqParams.channel_id': function (newVal, oldVal) {
      if (newVal === '') {
        this.reqParams.channel_id = null
      }
    }
  },
  created () {
    // 获取频道下拉选项数据
    this.getChannelOptions()
    // 获取文章列表
    this.getArticles()
  },

  methods: {
    edit (id) {
      this.$router.push('/publish?id=' + id)
    },
    del (id) {
      this.$confirm('干 你要将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`articles/${id}`)
          // 删除成功
          this.$message.success('删除成功')
          this.getArticles()
        })
        .catch(() => {})
    },

    // 日期选择后的事件
    changeData (dateArr) {
      // 严谨一些 清空数据考虑在内
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选函数
    search () {
      this.reqParams.page = 1
      this.getArticles()
    },
    // 改变分页事件
    NewCreated (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    async getArticles () {
      // axios get传参  url?key=value&key1=value1 ... 麻烦
      // axios get传参  第二传参是对象 {params:指定传参对象}  发请求的时候自动拼接地址栏后
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // 列表数据
      this.articles = data.results
      // 总条数
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.el-card {
  margin-bottom: 20px;
}
</style>
