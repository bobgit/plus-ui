import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { UserAddressVO, UserAddressForm, UserAddressQuery } from '@/api/ecom/userAddress/types';

/**
 * 查询用户地址关联列表
 * @param query
 * @returns {*}
 */

export const listUserAddress = (query?: UserAddressQuery): AxiosPromise<UserAddressVO[]> => {
  return request({
    url: '/ecom/userAddress/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询用户地址关联详细
 * @param userAddressId
 */
export const getUserAddress = (userAddressId: string | number): AxiosPromise<UserAddressVO> => {
  return request({
    url: '/ecom/userAddress/' + userAddressId,
    method: 'get'
  });
};

/**
 * 新增用户地址关联
 * @param data
 */
export const addUserAddress = (data: UserAddressForm) => {
  return request({
    url: '/ecom/userAddress',
    method: 'post',
    data: data
  });
};

/**
 * 修改用户地址关联
 * @param data
 */
export const updateUserAddress = (data: UserAddressForm) => {
  return request({
    url: '/ecom/userAddress',
    method: 'put',
    data: data
  });
};

/**
 * 删除用户地址关联
 * @param userAddressId
 */
export const delUserAddress = (userAddressId: string | number | Array<string | number>) => {
  return request({
    url: '/ecom/userAddress/' + userAddressId,
    method: 'delete'
  });
};
