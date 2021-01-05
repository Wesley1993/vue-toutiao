<template>
  <div class="publish-container">
    <el-card class="filter-card">
      <div class="clearfix" slot="header">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="article" label-width="40px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
<!--          <el-input type="textarea" v-model="article.content"></el-input>-->
          <el-tiptap v-model="article.content" :extensions="extensions" lang="zh" height="400"></el-tiptap>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择">
            <el-option
              v-for="(item, index) in channels"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  getArticleChannels,
  addArticle,
  getArticle,
  updateArticle
} from '@/api/article'
import {
  ElementTiptap, // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Preview,
  CodeBlock,
  HorizontalRule
} from 'element-tiptap'
// import element-tiptap 样式
import 'element-tiptap/lib/index.css'
export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap
  },
  data () {
    return {
      channels: [], // 文章频道
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []
        },
        channel_id: null // 频道
      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new HorizontalRule(),
        new CodeBlock(),
        new Preview()
      ]
    }
  },
  created () {
    this.loadChannels()
    // 判断是否为修改文章
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  methods: {
    loadChannels () {
      getArticleChannels().then((res) => {
        console.log(res)
        this.channels = res.data.data.channels
      })
    },
    onPublish (draft = false) {
      const articleId = this.$route.query.id
      if (articleId) {
        updateArticle(articleId, this.article, draft).then(res => {
          console.log(res)
          // 处理响应结果
          this.$message({
            message: `${draft ? '存入草稿' : '编辑'}成功`,
            type: 'success'
          })
        })
      } else {
        addArticle(this.article, draft).then(res => {
          console.log(res)
          // 处理响应结果
          this.$message({
            message: `${draft ? '存入草稿' : '发布'}成功`,
            type: 'success'
          })
        })
      }
    },
    loadArticle () {
      getArticle(this.$route.query.id).then(res => {
        this.article = res.data.data
      })
    }
  }
}
</script>

<style scoped>

</style>
