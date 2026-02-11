export interface FulfillmentTaskVO {
  /**
   * 履约单ID
   */
  fulfillmentTaskId: string | number;

  /**
   * 订单ID
   */
  orderId: string | number;

  /**
   * 订单明细ID
   */
  orderItemId: string | number;

  /**
   * 履约方式类型
   */
  fulfillmentType: string;

  /**
   * 履约方式Id
   */
  fulfillmentId: string | number;

  /**
   * 履约责任归属
   */
  responsibleType: string;

  /**
   * 履约责任归属ID
   */
  responsibleId: string | number;

  /**
   * 物流公司
   */
  logisticsCompany: string;

  /**
   * 物流公司ID
   */
  logisticsNo: string;

  /**
   * 骑手ID
   */
  riderId: string | number;

  /**
   * 自提码
   */
  pickupCode: string;

  /**
   * 验证码
   */
  verifyCode: string;

  /**
   * 优先级别
   */
  priority: number;

  /**
   * 履约状态
   */
  fulfillmentStatus: string;

  /**
   * 分配时间
   */
  assignTime: string;

  /**
   * 开始时间
   */
  startTime: string;

  /**
   * 完成时间
   */
  completeTime: string;

  /**
   * 取消时间
   */
  cancelTime: string;

  /**
   * 备注
   */
  remark: string;

}

export interface FulfillmentTaskForm extends BaseEntity {
  /**
   * 履约单ID
   */
  fulfillmentTaskId?: string | number;

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 订单明细ID
   */
  orderItemId?: string | number;

  /**
   * 履约方式类型
   */
  fulfillmentType?: string;

  /**
   * 履约方式Id
   */
  fulfillmentId?: string | number;

  /**
   * 履约责任归属
   */
  responsibleType?: string;

  /**
   * 履约责任归属ID
   */
  responsibleId?: string | number;

  /**
   * 物流公司
   */
  logisticsCompany?: string;

  /**
   * 物流公司ID
   */
  logisticsNo?: string;

  /**
   * 骑手ID
   */
  riderId?: string | number;

  /**
   * 自提码
   */
  pickupCode?: string;

  /**
   * 验证码
   */
  verifyCode?: string;

  /**
   * 优先级别
   */
  priority?: number;

  /**
   * 履约状态
   */
  fulfillmentStatus?: string;

  /**
   * 分配时间
   */
  assignTime?: string;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 完成时间
   */
  completeTime?: string;

  /**
   * 取消时间
   */
  cancelTime?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface FulfillmentTaskQuery extends PageQuery {

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 订单明细ID
   */
  orderItemId?: string | number;

  /**
   * 履约方式类型
   */
  fulfillmentType?: string;

  /**
   * 履约方式Id
   */
  fulfillmentId?: string | number;

  /**
   * 履约责任归属
   */
  responsibleType?: string;

  /**
   * 履约责任归属ID
   */
  responsibleId?: string | number;

  /**
   * 物流公司
   */
  logisticsCompany?: string;

  /**
   * 物流公司ID
   */
  logisticsNo?: string;

  /**
   * 骑手ID
   */
  riderId?: string | number;

  /**
   * 自提码
   */
  pickupCode?: string;

  /**
   * 验证码
   */
  verifyCode?: string;

  /**
   * 优先级别
   */
  priority?: number;

  /**
   * 履约状态
   */
  fulfillmentStatus?: string;

  /**
   * 分配时间
   */
  assignTime?: string;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 完成时间
   */
  completeTime?: string;

  /**
   * 取消时间
   */
  cancelTime?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
