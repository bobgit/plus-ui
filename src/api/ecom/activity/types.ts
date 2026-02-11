export interface ActivityVO {
  /**
   * 活动ID
   */
  activityId: string | number;

  /**
   * 活动名称
   */
  activityName: string;

  /**
   * 活动类型
   */
  activityType: string;

  /**
   * 活动封面图
   */
  coverImage: string;

  /**
   * 活动封面图Url
   */
  coverImageUrl: string;
  /**
   * 活动详情图
   */
  activityImage: string;

  /**
   * 分享标题
   */
  shareTitle: string;

  /**
   * 分享描述
   */
  shareDescription: string;

  /**
   * 开始时间
   */
  startTime: string;

  /**
   * 结束时间
   */
  endTime: string;

  /**
   * 成功团购次数
   */
  successCount: number;

  /**
   * 活动状态
   */
  status: string;

  /**
   * 审核状态
   */
  auditStatus: string;

  /**
   * 备注
   */
  remark: string;

}

export interface ActivityForm extends BaseEntity {
  /**
   * 活动ID
   */
  activityId?: string | number;

  /**
   * 活动名称
   */
  activityName?: string;

  /**
   * 活动类型
   */
  activityType?: string;

  /**
   * 活动封面图
   */
  coverImage?: string;

  /**
   * 活动详情图
   */
  activityImage?: string;

  /**
   * 分享标题
   */
  shareTitle?: string;

  /**
   * 分享描述
   */
  shareDescription?: string;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 结束时间
   */
  endTime?: string;

  /**
   * 成功团购次数
   */
  successCount?: number;

  /**
   * 活动状态
   */
  status?: string;

  /**
   * 审核状态
   */
  auditStatus?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface ActivityQuery extends PageQuery {

  /**
   * 活动名称
   */
  activityName?: string;

  /**
   * 活动类型
   */
  activityType?: string;

  /**
   * 活动封面图
   */
  coverImage?: string;

  /**
   * 活动详情图
   */
  activityImage?: string;

  /**
   * 分享标题
   */
  shareTitle?: string;

  /**
   * 分享描述
   */
  shareDescription?: string;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 结束时间
   */
  endTime?: string;

  /**
   * 成功团购次数
   */
  successCount?: number;

  /**
   * 活动状态
   */
  status?: string;

  /**
   * 审核状态
   */
  auditStatus?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
