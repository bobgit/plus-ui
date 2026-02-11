import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ProductSkuAttributesVO, ProductSkuAttributesForm, ProductSkuAttributesQuery } from '@/api/ecom/productSkuAttributes/types';

/**
 * 查询商品SKU属性列表
 * @param query
 * @returns {*}
 */

export const listProductSkuAttributes = (query?: ProductSkuAttributesQuery): AxiosPromise<ProductSkuAttributesVO[]> => {
  return request({
    url: '/ecom/productSkuAttributes/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询商品SKU属性详细
 * @param skuAttrId
 */
export const getProductSkuAttributes = (skuAttrId: string | number): AxiosPromise<ProductSkuAttributesVO> => {
  return request({
    url: '/ecom/productSkuAttributes/' + skuAttrId,
    method: 'get'
  });
};

/**
 * 新增商品SKU属性
 * @param data
 */
export const addProductSkuAttributes = (data: ProductSkuAttributesForm) => {
  return request({
    url: '/ecom/productSkuAttributes',
    method: 'post',
    data: data
  });
};

/**
 * 修改商品SKU属性
 * @param data
 */
export const updateProductSkuAttributes = (data: ProductSkuAttributesForm) => {
  return request({
    url: '/ecom/productSkuAttributes',
    method: 'put',
    data: data
  });
};

/**
 * 删除商品SKU属性
 * @param skuAttrId
 */
export const delProductSkuAttributes = (skuAttrId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/productSkuAttributes/' + skuAttrId,
    method: 'delete'
  });
};
