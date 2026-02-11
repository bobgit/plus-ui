import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { BrandVO, BrandForm, BrandQuery } from '@/api/ecom/brand/types';

/**
 * 查询商品品牌列表
 * @param query
 * @returns {*}
 */

export const listBrand = (query?: BrandQuery): AxiosPromise<BrandVO[]> => {
  return request({
    url: '/ecom/brand/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询商品品牌详细
 * @param brandId
 */
export const getBrand = (brandId: string | number): AxiosPromise<BrandVO> => {
  return request({
    url: '/ecom/brand/' + brandId,
    method: 'get'
  });
};

/**
 * 新增商品品牌
 * @param data
 */
export const addBrand = (data: BrandForm) => {
  return request({
    url: '/ecom/brand',
    method: 'post',
    data: data
  });
};

/**
 * 修改商品品牌
 * @param data
 */
export const updateBrand = (data: BrandForm) => {
  return request({
    url: '/ecom/brand',
    method: 'put',
    data: data
  });
};

/**
 * 删除商品品牌
 * @param brandId
 */
export const delBrand = (brandId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/brand/' + brandId,
    method: 'delete'
  });
};
