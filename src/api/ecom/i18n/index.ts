import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { I18nVO, I18nForm, I18nQuery } from '@/api/ecom/i18n/types';

/**
 * 查询商品分类列表
 * @param query
 * @returns {*}
 */

export const listI18n = (query?: I18nQuery): AxiosPromise<I18nVO[]> => {
  return request({
    url: '/ecom/i18n/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询商品分类详细
 * @param i18nId
 */
export const getI18n = (i18nId: string | number): AxiosPromise<I18nVO> => {
  return request({
    url: '/ecom/i18n/' + i18nId,
    method: 'get'
  });
};

/**
 * 新增商品分类
 * @param data
 */
export const addI18n = (data: I18nForm) => {
  return request({
    url: '/ecom/i18n',
    method: 'post',
    data: data
  });
};

/**
 * 修改商品分类
 * @param data
 */
export const updateI18n = (data: I18nForm) => {
  return request({
    url: '/ecom/i18n',
    method: 'put',
    data: data
  });
};

/**
 * 删除商品分类
 * @param i18nId
 */
export const delI18n = (i18nId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/i18n/' + i18nId,
    method: 'delete'
  });
};
