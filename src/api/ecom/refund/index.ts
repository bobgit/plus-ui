import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { RefundVO, RefundForm, RefundQuery } from '@/api/ecom/refund/types';

/**
 * 查询退款列表
 * @param query
 * @returns {*}
 */

export const listRefund = (query?: RefundQuery): AxiosPromise<RefundVO[]> => {
  return request({
    url: '/ecom/refund/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询退款详细
 * @param refundId
 */
export const getRefund = (refundId: string | number): AxiosPromise<RefundVO> => {
  return request({
    url: '/ecom/refund/' + refundId,
    method: 'get'
  });
};

/**
 * 新增退款
 * @param data
 */
export const addRefund = (data: RefundForm) => {
  return request({
    url: '/ecom/refund',
    method: 'post',
    data: data
  });
};

/**
 * 修改退款
 * @param data
 */
export const updateRefund = (data: RefundForm) => {
  return request({
    url: '/ecom/refund',
    method: 'put',
    data: data
  });
};

/**
 * 删除退款
 * @param refundId
 */
export const delRefund = (refundId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/refund/' + refundId,
    method: 'delete'
  });
};
