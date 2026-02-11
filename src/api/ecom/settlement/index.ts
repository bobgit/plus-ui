import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SettlementVO, SettlementForm, SettlementQuery } from '@/api/ecom/settlement/types';

/**
 * 查询结算列表
 * @param query
 * @returns {*}
 */

export const listSettlement = (query?: SettlementQuery): AxiosPromise<SettlementVO[]> => {
  return request({
    url: '/ecom/settlement/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询结算详细
 * @param settlementId
 */
export const getSettlement = (settlementId: string | number): AxiosPromise<SettlementVO> => {
  return request({
    url: '/ecom/settlement/' + settlementId,
    method: 'get'
  });
};

/**
 * 新增结算
 * @param data
 */
export const addSettlement = (data: SettlementForm) => {
  return request({
    url: '/ecom/settlement',
    method: 'post',
    data: data
  });
};

/**
 * 修改结算
 * @param data
 */
export const updateSettlement = (data: SettlementForm) => {
  return request({
    url: '/ecom/settlement',
    method: 'put',
    data: data
  });
};

/**
 * 删除结算
 * @param settlementId
 */
export const delSettlement = (settlementId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/settlement/' + settlementId,
    method: 'delete'
  });
};
