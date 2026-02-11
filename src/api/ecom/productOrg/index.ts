import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ProductOrgVO, ProductOrgForm, ProductOrgQuery } from '@/api/ecom/productOrg/types';

/**
 * 查询机构组织商品列表
 * @param query
 * @returns {*}
 */

export const listProductOrg = (query?: ProductOrgQuery): AxiosPromise<ProductOrgVO[]> => {
  return request({
    url: '/ecom/productOrg/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询机构组织商品详细
 * @param orgProductId
 */
export const getProductOrg = (orgProductId: string | number): AxiosPromise<ProductOrgVO> => {
  return request({
    url: '/ecom/productOrg/' + orgProductId,
    method: 'get'
  });
};

/**
 * 新增机构组织商品
 * @param data
 */
export const addProductOrg = (data: ProductOrgForm) => {
  return request({
    url: '/ecom/productOrg',
    method: 'post',
    data: data
  });
};

/**
 * 修改机构组织商品
 * @param data
 */
export const updateProductOrg = (data: ProductOrgForm) => {
  return request({
    url: '/ecom/productOrg',
    method: 'put',
    data: data
  });
};

/**
 * 删除机构组织商品
 * @param orgProductId
 */
export const delProductOrg = (orgProductId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/productOrg/' + orgProductId,
    method: 'delete'
  });
};
