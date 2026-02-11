import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { OrgVO, OrgForm, OrgQuery } from '@/api/system/org/types';

/**
 * 查询机构组织公司列表
 * @param query
 * @returns {*}
 */

export const listOrg = (query?: OrgQuery): AxiosPromise<OrgVO[]> => {
  return request({
    url: '/system/org/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询机构组织公司详细
 * @param orgId
 */
export const getOrg = (orgId: string | number): AxiosPromise<OrgVO> => {
  return request({
    url: '/system/org/' + orgId,
    method: 'get'
  });
};

/**
 * 新增机构组织公司
 * @param data
 */
export const addOrg = (data: OrgForm) => {
  return request({
    url: '/system/org',
    method: 'post',
    data: data
  });
};

/**
 * 修改机构组织公司
 * @param data
 */
export const updateOrg = (data: OrgForm) => {
  return request({
    url: '/system/org',
    method: 'put',
    data: data
  });
};

/**
 * 删除机构组织公司
 * @param orgId
 */
export const delOrg = (orgId: string | number | Array<string | number>) => {
  return request({
    url: '/system/org/' + orgId,
    method: 'delete'
  });
};
