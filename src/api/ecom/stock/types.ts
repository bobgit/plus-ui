export interface StockVO {
  /**
   * 库存ID
   */
  stockId: string | number;

  /**
   * sku Id
   */
  skuId: string | number;

  /**
   * 经营归属类型
   */
  ownerType: string;

  /**
   * 经营归属ID
   */
  ownerId: string | number;

  /**
   * 库存所在类型
   */
  locationType: string;

  /**
   * 库存所在地ID
   */
  locationAddressId: string | number;

  /**
   * 物理存在的总数
   */
  stockTotal: number;

  /**
   * 可卖库存
   */
  stockAvailable: number;

  /**
   * 未完成履约
   */
  stockLocked: number;

  /**
   * 安全库存
   */
  safetyStock: number;

  /**
   * 状态
   */
  status: string;

  /**
   * 备注
   */
  remark: string;

}

export interface StockForm extends BaseEntity {
  /**
   * 库存ID
   */
  stockId?: string | number;

  /**
   * sku Id
   */
  skuId?: string | number;

  /**
   * 经营归属类型
   */
  ownerType?: string;

  /**
   * 经营归属ID
   */
  ownerId?: string | number;

  /**
   * 库存所在类型
   */
  locationType?: string;

  /**
   * 库存所在地ID
   */
  locationAddressId?: string | number;

  /**
   * 物理存在的总数
   */
  stockTotal?: number;

  /**
   * 可卖库存
   */
  stockAvailable?: number;

  /**
   * 未完成履约
   */
  stockLocked?: number;

  /**
   * 安全库存
   */
  safetyStock?: number;

  /**
   * 状态
   */
  status?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface StockQuery extends PageQuery {

  /**
   * sku Id
   */
  skuId?: string | number;

  /**
   * 经营归属类型
   */
  ownerType?: string;

  /**
   * 经营归属ID
   */
  ownerId?: string | number;

  /**
   * 库存所在类型
   */
  locationType?: string;

  /**
   * 库存所在地ID
   */
  locationAddressId?: string | number;

  /**
   * 物理存在的总数
   */
  stockTotal?: number;

  /**
   * 可卖库存
   */
  stockAvailable?: number;

  /**
   * 未完成履约
   */
  stockLocked?: number;

  /**
   * 安全库存
   */
  safetyStock?: number;

  /**
   * 状态
   */
  status?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
