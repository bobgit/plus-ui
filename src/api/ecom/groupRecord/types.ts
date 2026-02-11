export interface GroupRecordVO {
  /**
   * 参团记录ID
   */
  recordId: string | number;

  /**
   * 活动商品ID
   */
  activityProductId: string | number;

  /**
   * 团长责任人ID
   */
  leaderId: string | number;

  /**
   * 当前参团人数
   */
  currentCount: number;

  /**
   * 目标成团人数
   */
  targetCount: number;

  /**
   * 成团状态
   */
  groupStatus: string;

  /**
   * 成团截止时间
   */
  expireTime: string;

  /**
   * 备注
   */
  remark: string;

}

export interface GroupRecordForm extends BaseEntity {
  /**
   * 参团记录ID
   */
  recordId?: string | number;

  /**
   * 活动商品ID
   */
  activityProductId?: string | number;

  /**
   * 团长责任人ID
   */
  leaderId?: string | number;

  /**
   * 当前参团人数
   */
  currentCount?: number;

  /**
   * 目标成团人数
   */
  targetCount?: number;

  /**
   * 成团状态
   */
  groupStatus?: string;

  /**
   * 成团截止时间
   */
  expireTime?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface GroupRecordQuery extends PageQuery {

  /**
   * 活动商品ID
   */
  activityProductId?: string | number;

  /**
   * 团长责任人ID
   */
  leaderId?: string | number;

  /**
   * 当前参团人数
   */
  currentCount?: number;

  /**
   * 目标成团人数
   */
  targetCount?: number;

  /**
   * 成团状态
   */
  groupStatus?: string;

  /**
   * 成团截止时间
   */
  expireTime?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
