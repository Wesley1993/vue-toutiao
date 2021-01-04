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
      <el-form label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择">
            <el-option
              v-for="(item, index) in channels"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="date"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadArticle(page)">筛选</el-button>
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
              v-if="scope.row.cover.images[0]"
              class="article-cover"
              :src="scope.row.cover.images[0]"
            ></el-image>
            <el-image
              v-else
              class="article-cover"
              src="http://be-toutiao-web.itheima.net/img/error.3f7b1f94.gif"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="statusType[scope.row.status].statusTag">{{
                statusType[scope.row.status].text
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
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
              plain
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
import { deleteArticle, getArticles, getArticleChannels } from '@/api/article'

export default {
  name: 'ArticlePage',
  components: {},
  props: {},
  data () {
    return {
      channels: [], // 文章频道
      tableData: [],
      totalCount: 0, // 总数
      per_page: 10, // 每页数量
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
      loading: true,
      status: null, // 文章状态
      channelId: null, // 频道
      date: '', // 日期
      page: 1 // 当前页面
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticleChannels()
    this.loadArticle()
  },
  mounted () {
  },
  methods: {
    // 获取文章频道
    loadArticleChannels () {
      getArticleChannels().then(res => {
        console.log(res)
        this.channels = res.data.data.channels
      })
    },
    // 加载文章列表
    loadArticle (page = 1) {
      getArticles({
        page,
        per_page: this.per_page,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.date ? this.date[0] : null,
        end_pubdate: this.date ? this.date[1] : null
      }).then(res => {
        console.log(res)
        const { results, total_count: totalCount } = res.data.data
        this.tableData = results
        this.totalCount = totalCount
        this.loading = false
      })
    },
    // 列表页码改变
    onChangePage (page) {
      this.loading = true
      this.page = page
      this.loadArticle(page)
    },
    // 删除文章
    onDeleteArticle (articleId) {
      console.log(articleId)
      this.$confirm('确认删除吗?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(articleId.toString()).then(res => {
          console.log(res)
          this.loadArticle(this.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
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
  width: 150px;
  height: 100%;
}
</style>
