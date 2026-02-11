export interface OrgVO {
  /**
   * 机构组织公司ID
   */
  orgId: string | number;

  /**
   * 机构组织公司编码
   */
  orgCode: string;

  /**
   * 机构组织公司完整编码
   */
  orgFullCode: string;

  /**
   * 机构组织公司名称
   */
  orgName: string;

  /**
   * 机构组织公司类型
   */
  orgType: string;

  /**
   * 业务类型
   */
  capabilityType: string;

  /**
   * 负责人
   */
  principal: string;

  /**
   * 联系电话
   */
  phone: string;

  /**
   * 邮箱
   */
  email: string;

  /**
   * LOGO
   */
  logo: number;

  /**
   * 简介
   */
  description: string;

  /**
   * 营业时间
   */
  businessHours: string;

  /**
   * 配送范围
   */
  deliveryRadius: number;

  /**
   * 主体状态
   */
  orgStatus: string;

  /**
   * 父级机构
   */
  parentId: string | number;

  /**
   * 管理员用户ID
   */
  userId: string | number;

  /**
   * 管理员用户名
   */
  username: string;

  /**
   * 格式化地址
   */
  formattedAddress: string;

  /**
   * 纬度
   */
  latitude: number;

  /**
   * 经度
   */
  longitude: number;

  /**
   * 国际化地址
   */
  addressId: string | number;

  /**
   * 备注
   */
  remark: string;

  /**
   * 营业状态
   */
  operationStatus: string;

}

export interface OrgForm extends BaseEntity {
  /**
   * 机构组织公司ID
   */
  orgId?: string | number;

  /**
   * 机构组织公司编码
   */
  orgCode?: string;

  /**
   * 机构组织公司完整编码
   */
  orgFullCode?: string;

  /**
   * 机构组织公司名称
   */
  orgName?: string;

  /**
   * 机构组织公司类型
   */
  orgType?: string;

  /**
   * 业务类型
   */
  capabilityType?: string;

  /**
   * 负责人
   */
  principal?: string;

  /**
   * 联系电话
   */
  phone?: string;

  /**
   * 邮箱
   */
  email?: string;

  /**
   * LOGO
   */
  logo?: number;

  /**
   * 简介
   */
  description?: string;

  /**
   * 营业时间
   */
  businessHours?: string;

  /**
   * 配送范围
   */
  deliveryRadius?: number;

  /**
   * 主体状态
   */
  orgStatus?: string;

  /**
   * 父级机构
   */
  parentId?: string | number;

  /**
   * 管理员用户ID
   */
  userId?: string | number;

  /**
   * 管理员用户名
   */
  username?: string;

  /**
   * 格式化地址
   */
  formattedAddress?: string;

  /**
   * 纬度
   */
  latitude?: number;

  /**
   * 经度
   */
  longitude?: number;

  /**
   * 国际化地址
   */
  addressId?: string | number;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 营业状态
   */
  operationStatus?: string;

}

export interface OrgQuery extends PageQuery {

  /**
   * 机构组织公司编码
   */
  orgCode?: string;

  /**
   * 机构组织公司完整编码
   */
  orgFullCode?: string;

  /**
   * 机构组织公司名称
   */
  orgName?: string;

  /**
   * 机构组织公司类型
   */
  orgType?: string;

  /**
   * 业务类型
   */
  capabilityType?: string;

  /**
   * 负责人
   */
  principal?: string;

  /**
   * 联系电话
   */
  phone?: string;

  /**
   * 邮箱
   */
  email?: string;

  /**
   * LOGO
   */
  logo?: number;

  /**
   * 简介
   */
  description?: string;

  /**
   * 营业时间
   */
  businessHours?: string;

  /**
   * 配送范围
   */
  deliveryRadius?: number;

  /**
   * 主体状态
   */
  orgStatus?: string;

  /**
   * 父级机构
   */
  parentId?: string | number;

  /**
   * 管理员用户ID
   */
  userId?: string | number;

  /**
   * 管理员用户名
   */
  username?: string;

  /**
   * 格式化地址
   */
  formattedAddress?: string;

  /**
   * 纬度
   */
  latitude?: number;

  /**
   * 经度
   */
  longitude?: number;

  /**
   * 国际化地址
   */
  addressId?: string | number;

  /**
   * 营业状态
   */
  operationStatus?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
