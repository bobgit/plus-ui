export interface LogisticsHistoryVO {
  /**
   * 跟踪ID
   */
  historyId: string | number;

  /**
   * 订单ID
   */
  orderId: string | number;

  /**
   * 节点时间
   */
  nodeTime: string;

  /**
   * 节点状态
   */
  nodeStatus: string;

  /**
   * 节点位置JSON
   */
  nodeLocation: string;

  /**
   * 操作人
   */
  operator: string;

  /**
   * 备注
   */
  remark: string;

}

export interface LogisticsHistoryForm extends BaseEntity {
  /**
   * 跟踪ID
   */
  historyId?: string | number;

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 节点时间
   */
  nodeTime?: string;

  /**
   * 节点状态
   */
  nodeStatus?: string;

  /**
   * 节点位置JSON
   */
  nodeLocation?: string;

  /**
   * 操作人
   */
  operator?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface LogisticsHistoryQuery extends PageQuery {

  /**
   * 跟踪ID
   */
  historyId?: string | number;

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 节点时间
   */
  nodeTime?: string;

  /**
   * 节点状态
   */
  nodeStatus?: string;

  /**
   * 节点位置JSON
   */
  nodeLocation?: string;

  /**
   * 操作人
   */
  operator?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
