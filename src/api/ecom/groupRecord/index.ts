import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { GroupRecordVO, GroupRecordForm, GroupRecordQuery } from '@/api/ecom/groupRecord/types';

/**
 * 查询团购参团记录列表
 * @param query
 * @returns {*}
 */

export const listGroupRecord = (query?: GroupRecordQuery): AxiosPromise<GroupRecordVO[]> => {
  return request({
    url: '/ecom/groupRecord/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询团购参团记录详细
 * @param recordId
 */
export const getGroupRecord = (recordId: string | number): AxiosPromise<GroupRecordVO> => {
  return request({
    url: '/ecom/groupRecord/' + recordId,
    method: 'get'
  });
};

/**
 * 新增团购参团记录
 * @param data
 */
export const addGroupRecord = (data: GroupRecordForm) => {
  return request({
    url: '/ecom/groupRecord',
    method: 'post',
    data: data
  });
};

/**
 * 修改团购参团记录
 * @param data
 */
export const updateGroupRecord = (data: GroupRecordForm) => {
  return request({
    url: '/ecom/groupRecord',
    method: 'put',
    data: data
  });
};

/**
 * 删除团购参团记录
 * @param recordId
 */
export const delGroupRecord = (recordId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/groupRecord/' + recordId,
    method: 'delete'
  });
};
