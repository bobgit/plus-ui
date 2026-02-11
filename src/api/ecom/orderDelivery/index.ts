import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { OrderDeliveryVO, OrderDeliveryForm, OrderDeliveryQuery } from '@/api/ecom/orderDelivery/types';

/**
 * 查询订单配送专用列表
 * @param query
 * @returns {*}
 */

export const listOrderDelivery = (query?: OrderDeliveryQuery): AxiosPromise<OrderDeliveryVO[]> => {
  return request({
    url: '/ecom/orderDelivery/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询订单配送专用详细
 * @param orderDeliveryId
 */
export const getOrderDelivery = (orderDeliveryId: string | number): AxiosPromise<OrderDeliveryVO> => {
  return request({
    url: '/ecom/orderDelivery/' + orderDeliveryId,
    method: 'get'
  });
};

/**
 * 新增订单配送专用
 * @param data
 */
export const addOrderDelivery = (data: OrderDeliveryForm) => {
  return request({
    url: '/ecom/orderDelivery',
    method: 'post',
    data: data
  });
};

/**
 * 修改订单配送专用
 * @param data
 */
export const updateOrderDelivery = (data: OrderDeliveryForm) => {
  return request({
    url: '/ecom/orderDelivery',
    method: 'put',
    data: data
  });
};

/**
 * 删除订单配送专用
 * @param orderDeliveryId
 */
export const delOrderDelivery = (orderDeliveryId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/orderDelivery/' + orderDeliveryId,
    method: 'delete'
  });
};
