import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { GroupMemberVO, GroupMemberForm, GroupMemberQuery } from '@/api/ecom/groupMember/types';

/**
 * 查询拼团团员列表
 * @param query
 * @returns {*}
 */

export const listGroupMember = (query?: GroupMemberQuery): AxiosPromise<GroupMemberVO[]> => {
  return request({
    url: '/ecom/groupMember/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询拼团团员详细
 * @param memberId
 */
export const getGroupMember = (memberId: string | number): AxiosPromise<GroupMemberVO> => {
  return request({
    url: '/ecom/groupMember/' + memberId,
    method: 'get'
  });
};

/**
 * 新增拼团团员
 * @param data
 */
export const addGroupMember = (data: GroupMemberForm) => {
  return request({
    url: '/ecom/groupMember',
    method: 'post',
    data: data
  });
};

/**
 * 修改拼团团员
 * @param data
 */
export const updateGroupMember = (data: GroupMemberForm) => {
  return request({
    url: '/ecom/groupMember',
    method: 'put',
    data: data
  });
};

/**
 * 删除拼团团员
 * @param memberId
 */
export const delGroupMember = (memberId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/groupMember/' + memberId,
    method: 'delete'
  });
};
