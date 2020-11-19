<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div class="clearfix" slot="header">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 列表筛选项 -->
      <el-form :model="article" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="article.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel" placeholder="请选择">
            <el-option label="前端" value="shanghai"></el-option>
            <el-option label="IOS" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="article.date"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 数据列表 -->
    <el-card class="table-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 {{ totalCount }} 条结果：
      </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column prop="cover" label="封面">
          <template slot-scope="scope">
            <el-image
              class="article-cover"
              :src="scope.row.cover.images[0]"
              v-if="scope.row.cover.images[0]"
            ></el-image>
            <el-image
              class="article-cover"
              src="http://be-toutiao-web.itheima.net/img/error.3f7b1f94.gif"
              v-else
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="statusType[scope.row.status].statusTag">{{
              statusType[scope.row.status].text
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
        <el-table-column prop="option" label="操作">
          <template slot-scope="scope">
            <el-button
              type="success"
              icon="el-icon-edit"
              circle
              @click="$router.push('/publish?id=' + scope.row.id.toString())"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="onDeleteArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        :page-size="per_page"
        background
        layout="prev, pager, next"
        :total="totalCount"
        @current-change="onChangePage"
      >
      </el-pagination>
    </el-card>
    <!-- 分页 -->
  </div>
</template>

<script>
import { deleteArticle, getArticles } from '@/api/article'

export default {
  name: 'ArticlePage',
  components: {},
  props: {},
  data () {
    return {
      article: {
        status: 5,
        region: '',
        date: ''
      },
      tableData: [],
      totalCount: 0, // 总数
      per_page: 20, // 每页数量
      statusType: [
        {
          status: 0, text: '草稿', statusTag: 'info'
        },
        {
          status: 1, text: '待审核', statusTag: ''
        },
        {
          status: 2, text: '审核通过', statusTag: 'success'
        },
        {
          status: 3, text: '审核失败', statusTag: 'warning'
        },
        {
          status: 4, text: '已删除', statusTag: 'danger'
        }
      ],
      loading: true
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadAllArticle()
  },
  mounted () {},
  methods: {
    onSubmit (data) {
      console.log(data)
    },
    loadAllArticle (page = 1) {
      getArticles({ page, per_page: this.per_page }).then(res => {
        console.log(res)
        const { results, total_count: totalCount } = res.data.data
        this.tableData = res.data.data.results
        this.totalCount = totalCount
        this.loading = false
      })
    },
    onChangePage (page) {
      this.loading = true
      this.loadAllArticle(page)
    },
    onDeleteArticle (target) {
      this.$confirm('确定要删除吗?', '删除文章提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(target)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}

</script>

<style lang="less" scoped>
.filter-card {
  margin-bottom: 30px;
}
.pagination {
  margin-top: 20px;
  text-align: right;
}
.article-cover {
  width: 60px;
}
</style>
