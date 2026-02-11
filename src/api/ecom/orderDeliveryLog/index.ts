import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { OrderDeliveryLogVO, OrderDeliveryLogForm, OrderDeliveryLogQuery } from '@/api/ecom/orderDeliveryLog/types';

/**
 * 查询配送状态变更日志列表
 * @param query
 * @returns {*}
 */

export const listOrderDeliveryLog = (query?: OrderDeliveryLogQuery): AxiosPromise<OrderDeliveryLogVO[]> => {
  return request({
    url: '/ecom/orderDeliveryLog/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询配送状态变更日志详细
 * @param deliveryLogId
 */
export const getOrderDeliveryLog = (deliveryLogId: string | number): AxiosPromise<OrderDeliveryLogVO> => {
  return request({
    url: '/ecom/orderDeliveryLog/' + deliveryLogId,
    method: 'get'
  });
};

/**
 * 新增配送状态变更日志
 * @param data
 */
export const addOrderDeliveryLog = (data: OrderDeliveryLogForm) => {
  return request({
    url: '/ecom/orderDeliveryLog',
    method: 'post',
    data: data
  });
};

/**
 * 修改配送状态变更日志
 * @param data
 */
export const updateOrderDeliveryLog = (data: OrderDeliveryLogForm) => {
  return request({
    url: '/ecom/orderDeliveryLog',
    method: 'put',
    data: data
  });
};

/**
 * 删除配送状态变更日志
 * @param deliveryLogId
 */
export const delOrderDeliveryLog = (deliveryLogId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/orderDeliveryLog/' + deliveryLogId,
    method: 'delete'
  });
};
