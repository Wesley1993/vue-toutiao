/**
 * 文章相关接口
 */

import request from '@/utils/request'

/**
 * 获取文章列表
 * @status {status} 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
 * @channel_id {} 频道 id，不传为全部
 * @begin_pubdate 起始时间，不传就不限定开始时间
 * @end_pubdate 截止时间，不传就不限定结束时间
 * @page 页数，默认1
 * @per_page 每页数量，默认每页10条
 */
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}

/**
 * 获取文章频道
 */
export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

/**
 * 删除文章
 * @target {*} 文章id
 */
export const deleteArticle = (articleId) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

/**
 * 新建文章
 * @param data 文章相关数据
 * @param draft 是否为草稿
 * @returns {AxiosPromise}
 */
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft // 是否为草稿 true为草稿
    },
    data
  })
}

/**
 * 编辑文章
 * @param articleId
 * @param data
 * @param draft
 * @returns {AxiosPromise}
 */
export const updateArticle = (articleId, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft // 是否为草稿 true为草稿
    }
  })
}

/**
 * 获取文章
 * @param articleId
 * @param data
 * @param draft
 * @returns {AxiosPromise}
 */
export const getArticle = (articleId) => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
