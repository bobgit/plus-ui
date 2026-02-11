import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { OrderItemVO, OrderItemForm, OrderItemQuery } from '@/api/ecom/orderItem/types';

/**
 * 查询订单明细列表
 * @param query
 * @returns {*}
 */

export const listOrderItem = (query?: OrderItemQuery): AxiosPromise<OrderItemVO[]> => {
  return request({
    url: '/ecom/orderItem/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询订单明细详细
 * @param itemId
 */
export const getOrderItem = (itemId: string | number): AxiosPromise<OrderItemVO> => {
  return request({
    url: '/ecom/orderItem/' + itemId,
    method: 'get'
  });
};

/**
 * 新增订单明细
 * @param data
 */
export const addOrderItem = (data: OrderItemForm) => {
  return request({
    url: '/ecom/orderItem',
    method: 'post',
    data: data
  });
};

/**
 * 修改订单明细
 * @param data
 */
export const updateOrderItem = (data: OrderItemForm) => {
  return request({
    url: '/ecom/orderItem',
    method: 'put',
    data: data
  });
};

/**
 * 删除订单明细
 * @param itemId
 */
export const delOrderItem = (itemId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/orderItem/' + itemId,
    method: 'delete'
  });
};
