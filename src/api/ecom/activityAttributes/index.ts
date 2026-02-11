import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ActivityAttributesVO, ActivityAttributesForm, ActivityAttributesQuery } from '@/api/ecom/activityAttributes/types';

/**
 * 查询活动属性列表
 * @param query
 * @returns {*}
 */

export const listActivityAttributes = (query?: ActivityAttributesQuery): AxiosPromise<ActivityAttributesVO[]> => {
  return request({
    url: '/ecom/activityAttributes/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询活动属性详细
 * @param attrId
 */
export const getActivityAttributes = (attrId: string | number): AxiosPromise<ActivityAttributesVO> => {
  return request({
    url: '/ecom/activityAttributes/' + attrId,
    method: 'get'
  });
};

/**
 * 新增活动属性
 * @param data
 */
export const addActivityAttributes = (data: ActivityAttributesForm) => {
  return request({
    url: '/ecom/activityAttributes',
    method: 'post',
    data: data
  });
};

/**
 * 修改活动属性
 * @param data
 */
export const updateActivityAttributes = (data: ActivityAttributesForm) => {
  return request({
    url: '/ecom/activityAttributes',
    method: 'put',
    data: data
  });
};

/**
 * 删除活动属性
 * @param attrId
 */
export const delActivityAttributes = (attrId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/activityAttributes/' + attrId,
    method: 'delete'
  });
};
