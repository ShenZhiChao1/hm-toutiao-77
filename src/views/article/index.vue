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
            <el-select placeholder="请选择" v-model="reqParams.channel_id">
              <el-option
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-for="item in channelOptions"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期：">
            <el-date-picker
              end-placeholder="结束日期"
              range-separator="至"
              start-placeholder="开始日期"
              type="daterange"
              v-model="dateArr"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">筛选</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card>
      <div class="clearfix" slot="header">根据筛选条件共查询到0 条结果:</div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="封面" prop="images" width="180"></el-table-column>
        <el-table-column label="标题" prop="name" width="180"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="发布时间" prop="pubtime"></el-table-column>
        <el-table-column label="操作" prop="operation"></el-table-column>
      </el-table>
      <div style="text-align:center; margin-bottom:20px">
        <el-pagination :total="1000" layout="prev, pager, next"></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import MyBread from '@/components/my-bread'
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
        channel_id: null
      },
      channelOptions: [
        { value: 1, label: '前端开发' },
        { value: 2, label: '后端开发' }
      ],
      dateArr: [],
      tableData: [{}]
    }
  }
}
</script>

<style scoped lang='less'>
.el-card {
  margin-bottom: 20px;
}
</style>
