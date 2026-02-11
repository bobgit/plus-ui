import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ProductActivityVO, ProductActivityForm, ProductActivityQuery } from '@/api/ecom/productActivity/types';

/**
 * 查询活动商品关联列表
 * @param query
 * @returns {*}
 */

export const listProductActivity = (query?: ProductActivityQuery): AxiosPromise<ProductActivityVO[]> => {
  return request({
    url: '/ecom/productActivity/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询活动商品关联详细
 * @param activityProductId
 */
export const getProductActivity = (activityProductId: string | number): AxiosPromise<ProductActivityVO> => {
  return request({
    url: '/ecom/productActivity/' + activityProductId,
    method: 'get'
  });
};

/**
 * 新增活动商品关联
 * @param data
 */
export const addProductActivity = (data: ProductActivityForm) => {
  return request({
    url: '/ecom/productActivity',
    method: 'post',
    data: data
  });
};

/**
 * 修改活动商品关联
 * @param data
 */
export const updateProductActivity = (data: ProductActivityForm) => {
  return request({
    url: '/ecom/productActivity',
    method: 'put',
    data: data
  });
};

/**
 * 删除活动商品关联
 * @param activityProductId
 */
export const delProductActivity = (activityProductId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/productActivity/' + activityProductId,
    method: 'delete'
  });
};
