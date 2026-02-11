export interface RefundVO {
  /**
   * 退款ID
   */
  refundId: string | number;

  /**
   * 订单ID
   */
  orderId: string | number;

  /**
   * 订单明细ID
   */
  orderItemId: string | number;

  /**
   * 退款类型
   */
  refundType: string;

  /**
   * 退款金额
   */
  refundAmount: number;

  /**
   * 退款原因
   */
  refundReason: string;

  /**
   * 退款描述
   */
  refundDesc: string;

  /**
   * 退款状态
   */
  refundStatus: string;

  /**
   * 逆向结算
   */
  reverseSettlement: string;

  /**
   * 逆向库存
   */
  reverseStock: string;

  /**
   * 审核人员
   */
  auditBy: number;

  /**
   * 审核时间
   */
  auditTime: string;

  /**
   * 备注
   */
  remark: string;

}

export interface RefundForm extends BaseEntity {
  /**
   * 退款ID
   */
  refundId?: string | number;

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 订单明细ID
   */
  orderItemId?: string | number;

  /**
   * 退款类型
   */
  refundType?: string;

  /**
   * 退款金额
   */
  refundAmount?: number;

  /**
   * 退款原因
   */
  refundReason?: string;

  /**
   * 退款描述
   */
  refundDesc?: string;

  /**
   * 退款状态
   */
  refundStatus?: string;

  /**
   * 逆向结算
   */
  reverseSettlement?: string;

  /**
   * 逆向库存
   */
  reverseStock?: string;

  /**
   * 审核人员
   */
  auditBy?: number;

  /**
   * 审核时间
   */
  auditTime?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface RefundQuery extends PageQuery {

  /**
   * 退款ID
   */
  refundId?: string | number;

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 订单明细ID
   */
  orderItemId?: string | number;

  /**
   * 退款类型
   */
  refundType?: string;

  /**
   * 退款金额
   */
  refundAmount?: number;

  /**
   * 退款原因
   */
  refundReason?: string;

  /**
   * 退款描述
   */
  refundDesc?: string;

  /**
   * 退款状态
   */
  refundStatus?: string;

  /**
   * 逆向结算
   */
  reverseSettlement?: string;

  /**
   * 逆向库存
   */
  reverseStock?: string;

  /**
   * 审核人员
   */
  auditBy?: number;

  /**
   * 审核时间
   */
  auditTime?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
