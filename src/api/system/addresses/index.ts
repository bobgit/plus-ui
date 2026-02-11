import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { AddressesVO, AddressesForm, AddressesQuery } from '@/api/system/addresses/types';

/**
 * 查询国际地址列表
 * @param query
 * @returns {*}
 */

export const listAddresses = (query?: AddressesQuery): AxiosPromise<AddressesVO[]> => {
  return request({
    url: '/system/addresses/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询国际地址详细
 * @param addressId
 */
export const getAddresses = (addressId: string | number): AxiosPromise<AddressesVO> => {
  return request({
    url: '/system/addresses/' + addressId,
    method: 'get'
  });
};

/**
 * 新增国际地址
 * @param data
 */
export const addAddresses = (data: AddressesForm) => {
  return request({
    url: '/system/addresses',
    method: 'post',
    data: data
  });
};

/**
 * 修改国际地址
 * @param data
 */
export const updateAddresses = (data: AddressesForm) => {
  return request({
    url: '/system/addresses',
    method: 'put',
    data: data
  });
};

/**
 * 删除国际地址
 * @param addressId
 */
export const delAddresses = (addressId: string | number | Array<string | number>) => {
  return request({
    url: '/system/addresses/' + addressId,
    method: 'delete'
  });
};
