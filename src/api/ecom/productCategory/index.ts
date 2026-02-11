import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ProductCategoryVO, ProductCategoryForm, ProductCategoryQuery } from '@/api/ecom/productCategory/types';

/**
 * 查询商品分类列表
 * @param query
 * @returns {*}
 */

export const listProductCategory = (query?: ProductCategoryQuery): AxiosPromise<ProductCategoryVO[]> => {
  return request({
    url: '/ecom/productCategory/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询商品分类详细
 * @param categoryId
 */
export const getProductCategory = (categoryId: string | number): AxiosPromise<ProductCategoryVO> => {
  return request({
    url: '/ecom/productCategory/' + categoryId,
    method: 'get'
  });
};

/**
 * 新增商品分类
 * @param data
 */
export const addProductCategory = (data: ProductCategoryForm) => {
  return request({
    url: '/ecom/productCategory',
    method: 'post',
    data: data
  });
};

/**
 * 修改商品分类
 * @param data
 */
export const updateProductCategory = (data: ProductCategoryForm) => {
  return request({
    url: '/ecom/productCategory',
    method: 'put',
    data: data
  });
};

/**
 * 删除商品分类
 * @param categoryId
 */
export const delProductCategory = (categoryId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/productCategory/' + categoryId,
    method: 'delete'
  });
};
