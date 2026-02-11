export interface OrderLogVO {
  /**
   * 订单变更动态日志ID
   */
  orderLogId: string | number;

  /**
   * 订单ID
   */
  orderId: string | number;

  /**
   * 订单事件类型
   */
  orderEventType: string;

  /**
   * 起始状态
   */
  fromStatus: string;

  /**
   * 终止状态
   */
  toStatus: string;

  /**
   * 改变原因
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

export interface OrderLogForm extends BaseEntity {
  /**
   * 订单变更动态日志ID
   */
  orderLogId?: string | number;

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 订单事件类型
   */
  orderEventType?: string;

  /**
   * 起始状态
   */
  fromStatus?: string;

  /**
   * 终止状态
   */
  toStatus?: string;

  /**
   * 改变原因
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

export interface OrderLogQuery extends PageQuery {

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 订单事件类型
   */
  orderEventType?: string;

  /**
   * 起始状态
   */
  fromStatus?: string;

  /**
   * 终止状态
   */
  toStatus?: string;

  /**
   * 改变原因
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
