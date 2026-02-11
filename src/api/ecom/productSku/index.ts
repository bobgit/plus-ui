import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ProductSkuVO, ProductSkuForm, ProductSkuQuery } from '@/api/ecom/productSku/types';

/**
 * 查询SKU库存单元列表
 * @param query
 * @returns {*}
 */

export const listProductSku = (query?: ProductSkuQuery): AxiosPromise<ProductSkuVO[]> => {
  return request({
    url: '/ecom/productSku/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询SKU库存单元详细
 * @param skuId
 */
export const getProductSku = (skuId: string | number): AxiosPromise<ProductSkuVO> => {
  return request({
    url: '/ecom/productSku/' + skuId,
    method: 'get'
  });
};

/**
 * 新增SKU库存单元
 * @param data
 */
export const addProductSku = (data: ProductSkuForm) => {
  return request({
    url: '/ecom/productSku',
    method: 'post',
    data: data
  });
};

/**
 * 修改SKU库存单元
 * @param data
 */
export const updateProductSku = (data: ProductSkuForm) => {
  return request({
    url: '/ecom/productSku',
    method: 'put',
    data: data
  });
};

/**
 * 删除SKU库存单元
 * @param skuId
 */
export const delProductSku = (skuId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/productSku/' + skuId,
    method: 'delete'
  });
};
