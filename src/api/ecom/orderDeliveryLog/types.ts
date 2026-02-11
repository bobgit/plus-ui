export interface OrderDeliveryLogVO {
  /**
   * 配送日志Id
   */
  deliveryLogId: string | number;

  /**
   * 外卖配送Id
   */
  deliveryId: string | number;

  /**
   * 订单ID
   */
  orderId: string | number;

  /**
   * 起初状态
   */
  fromStatus: string;

  /**
   * 目前状态
   */
  toStatus: string;

  /**
   * 状态变更原因
   */
  changeReason: string;

  /**
   * 操作类型
   */
  operatorType: string;

  /**
   * 备注
   */
  remark: string;

}

export interface OrderDeliveryLogForm extends BaseEntity {
  /**
   * 配送日志Id
   */
  deliveryLogId?: string | number;

  /**
   * 外卖配送Id
   */
  deliveryId?: string | number;

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 起初状态
   */
  fromStatus?: string;

  /**
   * 目前状态
   */
  toStatus?: string;

  /**
   * 状态变更原因
   */
  changeReason?: string;

  /**
   * 操作类型
   */
  operatorType?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface OrderDeliveryLogQuery extends PageQuery {

  /**
   * 外卖配送Id
   */
  deliveryId?: string | number;

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 起初状态
   */
  fromStatus?: string;

  /**
   * 目前状态
   */
  toStatus?: string;

  /**
   * 状态变更原因
   */
  changeReason?: string;

  /**
   * 操作类型
   */
  operatorType?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
