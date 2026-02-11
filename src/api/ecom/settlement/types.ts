export interface SettlementVO {
  /**
   * 结算ID
   */
  settlementId: string | number;

  /**
   * 订单ID
   */
  orderId: string | number;

  /**
   * 订单明细ID
   */
  orderItemId: string | number;

  /**
   * 经营归属类型
   */
  ownerType: string;

  /**
   * 经营归属ID
   */
  ownerId: string | number;

  /**
   * 订单原价
   */
  orderAmount: number;

  /**
   * 实付金额
   */
  payAmount: number;

  /**
   * 平台服务费
   */
  platformFee: number;

  /**
   * 配送费
   */
  deliveryFee: number;

  /**
   * 抽佣
   */
  commissionFee: number;

  /**
   * 平台补贴
   */
  subsidyAmount: string | number;

  /**
   * 实际应结算
   */
  settlementAmount: number;

  /**
   * 结算批次
   */
  settlementBatchNo: string;

  /**
   * 结算周期时间
   */
  settlementTime: string;

  /**
   * 结算状态
   */
  status: string;

  /**
   * 备注
   */
  remark: string;

}

export interface SettlementForm extends BaseEntity {
  /**
   * 结算ID
   */
  settlementId?: string | number;

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 订单明细ID
   */
  orderItemId?: string | number;

  /**
   * 经营归属类型
   */
  ownerType?: string;

  /**
   * 经营归属ID
   */
  ownerId?: string | number;

  /**
   * 订单原价
   */
  orderAmount?: number;

  /**
   * 实付金额
   */
  payAmount?: number;

  /**
   * 平台服务费
   */
  platformFee?: number;

  /**
   * 配送费
   */
  deliveryFee?: number;

  /**
   * 抽佣
   */
  commissionFee?: number;

  /**
   * 平台补贴
   */
  subsidyAmount?: string | number;

  /**
   * 实际应结算
   */
  settlementAmount?: number;

  /**
   * 结算批次
   */
  settlementBatchNo?: string;

  /**
   * 结算周期时间
   */
  settlementTime?: string;

  /**
   * 结算状态
   */
  status?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface SettlementQuery extends PageQuery {

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 订单明细ID
   */
  orderItemId?: string | number;

  /**
   * 经营归属类型
   */
  ownerType?: string;

  /**
   * 经营归属ID
   */
  ownerId?: string | number;

  /**
   * 订单原价
   */
  orderAmount?: number;

  /**
   * 实付金额
   */
  payAmount?: number;

  /**
   * 平台服务费
   */
  platformFee?: number;

  /**
   * 配送费
   */
  deliveryFee?: number;

  /**
   * 抽佣
   */
  commissionFee?: number;

  /**
   * 平台补贴
   */
  subsidyAmount?: string | number;

  /**
   * 实际应结算
   */
  settlementAmount?: number;

  /**
   * 结算批次
   */
  settlementBatchNo?: string;

  /**
   * 结算周期时间
   */
  settlementTime?: string;

  /**
   * 结算状态
   */
  status?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
