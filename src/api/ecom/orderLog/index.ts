import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { OrderLogVO, OrderLogForm, OrderLogQuery } from '@/api/ecom/orderLog/types';

/**
 * 查询订单变更动态日志列表
 * @param query
 * @returns {*}
 */

export const listOrderLog = (query?: OrderLogQuery): AxiosPromise<OrderLogVO[]> => {
  return request({
    url: '/ecom/orderLog/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询订单变更动态日志详细
 * @param orderLogId
 */
export const getOrderLog = (orderLogId: string | number): AxiosPromise<OrderLogVO> => {
  return request({
    url: '/ecom/orderLog/' + orderLogId,
    method: 'get'
  });
};

/**
 * 新增订单变更动态日志
 * @param data
 */
export const addOrderLog = (data: OrderLogForm) => {
  return request({
    url: '/ecom/orderLog',
    method: 'post',
    data: data
  });
};

/**
 * 修改订单变更动态日志
 * @param data
 */
export const updateOrderLog = (data: OrderLogForm) => {
  return request({
    url: '/ecom/orderLog',
    method: 'put',
    data: data
  });
};

/**
 * 删除订单变更动态日志
 * @param orderLogId
 */
export const delOrderLog = (orderLogId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/orderLog/' + orderLogId,
    method: 'delete'
  });
};
