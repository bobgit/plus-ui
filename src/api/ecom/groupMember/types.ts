export interface GroupMemberVO {
  /**
   * 团员ID
   */
  memberId: string | number;

  /**
   * 参团记录ID
   */
  recordId: string | number;

  /**
   * 用户ID
   */
  userId: string | number;

  /**
   * 订单ID
   */
  orderId: string | number;

  /**
   * 加入时间
   */
  joinTime: string;

  /**
   * 状态
   */
  status: string;

  /**
   * 备注
   */
  remark: string;

}

export interface GroupMemberForm extends BaseEntity {
  /**
   * 团员ID
   */
  memberId?: string | number;

  /**
   * 参团记录ID
   */
  recordId?: string | number;

  /**
   * 用户ID
   */
  userId?: string | number;

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 加入时间
   */
  joinTime?: string;

  /**
   * 状态
   */
  status?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface GroupMemberQuery extends PageQuery {

  /**
   * 参团记录ID
   */
  recordId?: string | number;

  /**
   * 用户ID
   */
  userId?: string | number;

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 加入时间
   */
  joinTime?: string;

  /**
   * 状态
   */
  status?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
