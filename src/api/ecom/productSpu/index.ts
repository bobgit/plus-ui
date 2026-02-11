import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ProductSpuVO, ProductSpuForm, ProductSpuQuery } from '@/api/ecom/productSpu/types';

/**
 * 查询SPU标准产品单元列表
 * @param query
 * @returns {*}
 */

export const listProductSpu = (query?: ProductSpuQuery): AxiosPromise<ProductSpuVO[]> => {
  return request({
    url: '/ecom/productSpu/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询SPU标准产品单元详细
 * @param spuId
 */
export const getProductSpu = (spuId: string | number): AxiosPromise<ProductSpuVO> => {
  return request({
    url: '/ecom/productSpu/' + spuId,
    method: 'get'
  });
};

/**
 * 新增SPU标准产品单元
 * @param data
 */
export const addProductSpu = (data: ProductSpuForm) => {
  return request({
    url: '/ecom/productSpu',
    method: 'post',
    data: data
  });
};

/**
 * 修改SPU标准产品单元
 * @param data
 */
export const updateProductSpu = (data: ProductSpuForm) => {
  return request({
    url: '/ecom/productSpu',
    method: 'put',
    data: data
  });
};

/**
 * 删除SPU标准产品单元
 * @param spuId
 */
export const delProductSpu = (spuId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/productSpu/' + spuId,
    method: 'delete'
  });
};
