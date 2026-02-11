import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { LogisticsHistoryVO, LogisticsHistoryForm, LogisticsHistoryQuery } from '@/api/ecom/logisticsHistory/types';

/**
 * 查询物流跟踪记录列表
 * @param query
 * @returns {*}
 */

export const listLogisticsHistory = (query?: LogisticsHistoryQuery): AxiosPromise<LogisticsHistoryVO[]> => {
  return request({
    url: '/ecom/logisticsHistory/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询物流跟踪记录详细
 * @param historyId
 */
export const getLogisticsHistory = (historyId: string | number): AxiosPromise<LogisticsHistoryVO> => {
  return request({
    url: '/ecom/logisticsHistory/' + historyId,
    method: 'get'
  });
};

/**
 * 新增物流跟踪记录
 * @param data
 */
export const addLogisticsHistory = (data: LogisticsHistoryForm) => {
  return request({
    url: '/ecom/logisticsHistory',
    method: 'post',
    data: data
  });
};

/**
 * 修改物流跟踪记录
 * @param data
 */
export const updateLogisticsHistory = (data: LogisticsHistoryForm) => {
  return request({
    url: '/ecom/logisticsHistory',
    method: 'put',
    data: data
  });
};

/**
 * 删除物流跟踪记录
 * @param historyId
 */
export const delLogisticsHistory = (historyId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/logisticsHistory/' + historyId,
    method: 'delete'
  });
};
