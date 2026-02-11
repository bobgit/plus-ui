import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StockFlowVO, StockFlowForm, StockFlowQuery } from '@/api/ecom/stockFlow/types';

/**
 * 查询库存流水列表
 * @param query
 * @returns {*}
 */

export const listStockFlow = (query?: StockFlowQuery): AxiosPromise<StockFlowVO[]> => {
  return request({
    url: '/ecom/stockFlow/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询库存流水详细
 * @param stockFlowId
 */
export const getStockFlow = (stockFlowId: string | number): AxiosPromise<StockFlowVO> => {
  return request({
    url: '/ecom/stockFlow/' + stockFlowId,
    method: 'get'
  });
};

/**
 * 新增库存流水
 * @param data
 */
export const addStockFlow = (data: StockFlowForm) => {
  return request({
    url: '/ecom/stockFlow',
    method: 'post',
    data: data
  });
};

/**
 * 修改库存流水
 * @param data
 */
export const updateStockFlow = (data: StockFlowForm) => {
  return request({
    url: '/ecom/stockFlow',
    method: 'put',
    data: data
  });
};

/**
 * 删除库存流水
 * @param stockFlowId
 */
export const delStockFlow = (stockFlowId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/stockFlow/' + stockFlowId,
    method: 'delete'
  });
};
