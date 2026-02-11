export interface ProductActivityVO {
  /**
   * 关联ID
   */
  activityProductId: string | number;

  /**
   * 活动ID
   */
  activityId: string | number;

  /**
   * SPU ID
   */
  spuId: string | number;

  /**
   * SKU ID
   */
  skuId: string | number;

  /**
   * 活动所属类型
   */
  ownerType: string;

  /**
   * 活动所属ID
   */
  ownerId: string | number;

  /**
   * 履约类型
   */
  fulfillmentType: string;

  /**
   * 履约ID
   */
  fulfillmentId: string | number;

  /**
   * 活动商品标题
   */
  activityTitle: string;

  /**
   * 活动价格
   */
  activityPrice: number;

  /**
   * 活动配额库存
   */
  activityStock: number;

  /**
   * 最小成团人数
   */
  minGroupSize: number;

  /**
   * 最大成团人数
   */
  maxGroupSize: number;

  /**
   * 每人限购数量
   */
  limitPerUser: number;

  /**
   * 状态
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

export interface ProductActivityForm extends BaseEntity {
  /**
   * 关联ID
   */
  activityProductId?: string | number;

  /**
   * 活动ID
   */
  activityId?: string | number;

  /**
   * SPU ID
   */
  spuId?: string | number;

  /**
   * SKU ID
   */
  skuId?: string | number;

  /**
   * 活动所属类型
   */
  ownerType?: string;

  /**
   * 活动所属ID
   */
  ownerId?: string | number;

  /**
   * 履约类型
   */
  fulfillmentType?: string;

  /**
   * 履约ID
   */
  fulfillmentId?: string | number;

  /**
   * 活动商品标题
   */
  activityTitle?: string;

  /**
   * 活动价格
   */
  activityPrice?: number;

  /**
   * 活动配额库存
   */
  activityStock?: number;

  /**
   * 最小成团人数
   */
  minGroupSize?: number;

  /**
   * 最大成团人数
   */
  maxGroupSize?: number;

  /**
   * 每人限购数量
   */
  limitPerUser?: number;

  /**
   * 状态
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

export interface ProductActivityQuery extends PageQuery {

  /**
   * 活动ID
   */
  activityId?: string | number;

  /**
   * SPU ID
   */
  spuId?: string | number;

  /**
   * SKU ID
   */
  skuId?: string | number;

  /**
   * 活动所属类型
   */
  ownerType?: string;

  /**
   * 活动所属ID
   */
  ownerId?: string | number;

  /**
   * 履约类型
   */
  fulfillmentType?: string;

  /**
   * 履约ID
   */
  fulfillmentId?: string | number;

  /**
   * 活动商品标题
   */
  activityTitle?: string;

  /**
   * 活动价格
   */
  activityPrice?: number;

  /**
   * 活动配额库存
   */
  activityStock?: number;

  /**
   * 最小成团人数
   */
  minGroupSize?: number;

  /**
   * 最大成团人数
   */
  maxGroupSize?: number;

  /**
   * 每人限购数量
   */
  limitPerUser?: number;

  /**
   * 状态
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
