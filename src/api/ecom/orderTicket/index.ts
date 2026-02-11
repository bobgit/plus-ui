import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { OrderTicketVO, OrderTicketForm, OrderTicketQuery } from '@/api/ecom/orderTicket/types';

/**
 * 查询门票/服务专用列表
 * @param query
 * @returns {*}
 */

export const listOrderTicket = (query?: OrderTicketQuery): AxiosPromise<OrderTicketVO[]> => {
  return request({
    url: '/ecom/orderTicket/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询门票/服务专用详细
 * @param ticketId
 */
export const getOrderTicket = (ticketId: string | number): AxiosPromise<OrderTicketVO> => {
  return request({
    url: '/ecom/orderTicket/' + ticketId,
    method: 'get'
  });
};

/**
 * 新增门票/服务专用
 * @param data
 */
export const addOrderTicket = (data: OrderTicketForm) => {
  return request({
    url: '/ecom/orderTicket',
    method: 'post',
    data: data
  });
};

/**
 * 修改门票/服务专用
 * @param data
 */
export const updateOrderTicket = (data: OrderTicketForm) => {
  return request({
    url: '/ecom/orderTicket',
    method: 'put',
    data: data
  });
};

/**
 * 删除门票/服务专用
 * @param ticketId
 */
export const delOrderTicket = (ticketId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/orderTicket/' + ticketId,
    method: 'delete'
  });
};
