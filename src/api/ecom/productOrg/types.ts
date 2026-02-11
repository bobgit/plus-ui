export interface ProductOrgVO {
  /**
   * 机构组织商品Id
   */
  orgProductId: string | number;

  /**
   * 机构组织ID
   */
  orgId: string | number;

  /**
   * 商品skuID
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
   * 过期时间
   */
  expireTime: string;

  /**
   * 活动商品标题
   */
  orgTitle: string;

  /**
   * 活动价格
   */
  orgPrice: number;

  /**
   * 活动配额库存
   */
  orgStock: number;

}

export interface ProductOrgForm extends BaseEntity {
  /**
   * 机构组织商品Id
   */
  orgProductId?: string | number;

  /**
   * 机构组织ID
   */
  orgId?: string | number;

  /**
   * 商品skuID
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
   * 过期时间
   */
  expireTime?: string;

  /**
   * 活动商品标题
   */
  orgTitle?: string;

  /**
   * 活动价格
   */
  orgPrice?: number;

  /**
   * 活动配额库存
   */
  orgStock?: number;

}

export interface ProductOrgQuery extends PageQuery {

  /**
   * 机构组织ID
   */
  orgId?: string | number;

  /**
   * 商品skuID
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
   * 过期时间
   */
  expireTime?: string;

  /**
   * 活动商品标题
   */
  orgTitle?: string;

  /**
   * 活动价格
   */
  orgPrice?: number;

  /**
   * 活动配额库存
   */
  orgStock?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}
