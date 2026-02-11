export interface ActivityAttributesVO {
  /**
   * 属性ID
   */
  attrId: string | number;

  /**
   * 活动ID
   */
  activityId: string | number;

  /**
   * 属性键
   */
  attrKey: string;

  /**
   * 属性值
   */
  attrValue: string;

  /**
   * 属性类型
   */
  attrType: string;

}

export interface ActivityAttributesForm extends BaseEntity {
  /**
   * 属性ID
   */
  attrId?: string | number;

  /**
   * 活动ID
   */
  activityId?: string | number;

  /**
   * 属性键
   */
  attrKey?: string;

  /**
   * 属性值
   */
  attrValue?: string;

  /**
   * 属性类型
   */
  attrType?: string;

}

export interface ActivityAttributesQuery extends PageQuery {

  /**
   * 活动ID
   */
  activityId?: string | number;

  /**
   * 属性键
   */
  attrKey?: string;

  /**
   * 属性值
   */
  attrValue?: string;

  /**
   * 属性类型
   */
  attrType?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
