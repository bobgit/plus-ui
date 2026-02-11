import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { LegalResponsibilityVO, LegalResponsibilityForm, LegalResponsibilityQuery } from '@/api/ecom/legalResponsibility/types';

/**
 * 查询法律责任列表
 * @param query
 * @returns {*}
 */

export const listLegalResponsibility = (query?: LegalResponsibilityQuery): AxiosPromise<LegalResponsibilityVO[]> => {
  return request({
    url: '/ecom/legalResponsibility/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询法律责任详细
 * @param responsibilityId
 */
export const getLegalResponsibility = (responsibilityId: string | number): AxiosPromise<LegalResponsibilityVO> => {
  return request({
    url: '/ecom/legalResponsibility/' + responsibilityId,
    method: 'get'
  });
};

/**
 * 新增法律责任
 * @param data
 */
export const addLegalResponsibility = (data: LegalResponsibilityForm) => {
  return request({
    url: '/ecom/legalResponsibility',
    method: 'post',
    data: data
  });
};

/**
 * 修改法律责任
 * @param data
 */
export const updateLegalResponsibility = (data: LegalResponsibilityForm) => {
  return request({
    url: '/ecom/legalResponsibility',
    method: 'put',
    data: data
  });
};

/**
 * 删除法律责任
 * @param responsibilityId
 */
export const delLegalResponsibility = (responsibilityId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/legalResponsibility/' + responsibilityId,
    method: 'delete'
  });
};
