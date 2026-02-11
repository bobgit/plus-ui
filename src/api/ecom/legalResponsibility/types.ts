export interface LegalResponsibilityVO {
  /**
   * 法律责任ID
   */
  responsibilityId: string | number;

  /**
   * 订单ID
   */
  orderId: string | number;

  /**
   * 订单明细ID
   */
  orderItemId: string | number;

  /**
   * 履约单ID
   */
  fulfillmentTaskId: string | number;

  /**
   * 担责组织类型
   */
  responsibilityOrgType: string;

  /**
   * 担责组织ID
   */
  responsibilityOrgId: string | number;

  /**
   * 担责范围
   */
  responsibilityScope: string;

  /**
   * 有效时间
   */
  effectiveTime: string;

  /**
   * 是否冻结
   */
  frozen: string;

  /**
   * 备注
   */
  remark: string;

}

export interface LegalResponsibilityForm extends BaseEntity {
  /**
   * 法律责任ID
   */
  responsibilityId?: string | number;

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 订单明细ID
   */
  orderItemId?: string | number;

  /**
   * 履约单ID
   */
  fulfillmentTaskId?: string | number;

  /**
   * 担责组织类型
   */
  responsibilityOrgType?: string;

  /**
   * 担责组织ID
   */
  responsibilityOrgId?: string | number;

  /**
   * 担责范围
   */
  responsibilityScope?: string;

  /**
   * 有效时间
   */
  effectiveTime?: string;

  /**
   * 是否冻结
   */
  frozen?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface LegalResponsibilityQuery extends PageQuery {

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 订单明细ID
   */
  orderItemId?: string | number;

  /**
   * 履约单ID
   */
  fulfillmentTaskId?: string | number;

  /**
   * 担责组织类型
   */
  responsibilityOrgType?: string;

  /**
   * 担责组织ID
   */
  responsibilityOrgId?: string | number;

  /**
   * 担责范围
   */
  responsibilityScope?: string;

  /**
   * 有效时间
   */
  effectiveTime?: string;

  /**
   * 是否冻结
   */
  frozen?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
