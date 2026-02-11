import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ActivityVO, ActivityForm, ActivityQuery } from '@/api/ecom/activity/types';

/**
 * 查询活动列表
 * @param query
 * @returns {*}
 */

export const listActivity = (query?: ActivityQuery): AxiosPromise<ActivityVO[]> => {
  return request({
    url: '/ecom/activity/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询活动详细
 * @param activityId
 */
export const getActivity = (activityId: string | number): AxiosPromise<ActivityVO> => {
  return request({
    url: '/ecom/activity/' + activityId,
    method: 'get'
  });
};

/**
 * 新增活动
 * @param data
 */
export const addActivity = (data: ActivityForm) => {
  return request({
    url: '/ecom/activity',
    method: 'post',
    data: data
  });
};

/**
 * 修改活动
 * @param data
 */
export const updateActivity = (data: ActivityForm) => {
  return request({
    url: '/ecom/activity',
    method: 'put',
    data: data
  });
};

/**
 * 删除活动
 * @param activityId
 */
export const delActivity = (activityId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/activity/' + activityId,
    method: 'delete'
  });
};
