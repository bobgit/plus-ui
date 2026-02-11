import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { FulfillmentTaskVO, FulfillmentTaskForm, FulfillmentTaskQuery } from '@/api/ecom/fulfillmentTask/types';

/**
 * 查询履约单列表
 * @param query
 * @returns {*}
 */

export const listFulfillmentTask = (query?: FulfillmentTaskQuery): AxiosPromise<FulfillmentTaskVO[]> => {
  return request({
    url: '/ecom/fulfillmentTask/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询履约单详细
 * @param fulfillmentTaskId
 */
export const getFulfillmentTask = (fulfillmentTaskId: string | number): AxiosPromise<FulfillmentTaskVO> => {
  return request({
    url: '/ecom/fulfillmentTask/' + fulfillmentTaskId,
    method: 'get'
  });
};

/**
 * 新增履约单
 * @param data
 */
export const addFulfillmentTask = (data: FulfillmentTaskForm) => {
  return request({
    url: '/ecom/fulfillmentTask',
    method: 'post',
    data: data
  });
};

/**
 * 修改履约单
 * @param data
 */
export const updateFulfillmentTask = (data: FulfillmentTaskForm) => {
  return request({
    url: '/ecom/fulfillmentTask',
    method: 'put',
    data: data
  });
};

/**
 * 删除履约单
 * @param fulfillmentTaskId
 */
export const delFulfillmentTask = (fulfillmentTaskId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/fulfillmentTask/' + fulfillmentTaskId,
    method: 'delete'
  });
};
