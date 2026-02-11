import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StockVO, StockForm, StockQuery } from '@/api/ecom/stock/types';

/**
 * 查询通用库存列表
 * @param query
 * @returns {*}
 */

export const listStock = (query?: StockQuery): AxiosPromise<StockVO[]> => {
  return request({
    url: '/ecom/stock/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询通用库存详细
 * @param stockId
 */
export const getStock = (stockId: string | number): AxiosPromise<StockVO> => {
  return request({
    url: '/ecom/stock/' + stockId,
    method: 'get'
  });
};

/**
 * 新增通用库存
 * @param data
 */
export const addStock = (data: StockForm) => {
  return request({
    url: '/ecom/stock',
    method: 'post',
    data: data
  });
};

/**
 * 修改通用库存
 * @param data
 */
export const updateStock = (data: StockForm) => {
  return request({
    url: '/ecom/stock',
    method: 'put',
    data: data
  });
};

/**
 * 删除通用库存
 * @param stockId
 */
export const delStock = (stockId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/stock/' + stockId,
    method: 'delete'
  });
};
