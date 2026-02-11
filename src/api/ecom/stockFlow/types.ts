export interface StockFlowVO {
  /**
   * 库存流水ID
   */
  stockFlowId: string | number;

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
   * 库存业务类型
   */
  stockBizType: string;

  /**
   * 业务ID
   */
  bizId: string | number;

  /**
   * 变化数量
   */
  changeQty: number;

  /**
   * 之前数量
   */
  beforeQty: number;

  /**
   * 之后数量
   */
  afterQty: number;

  /**
   * 库存类型
   */
  stockType: string;

  /**
   * 备注
   */
  remark: string;

}

export interface StockFlowForm extends BaseEntity {
  /**
   * 库存流水ID
   */
  stockFlowId?: string | number;

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
   * 库存业务类型
   */
  stockBizType?: string;

  /**
   * 业务ID
   */
  bizId?: string | number;

  /**
   * 变化数量
   */
  changeQty?: number;

  /**
   * 之前数量
   */
  beforeQty?: number;

  /**
   * 之后数量
   */
  afterQty?: number;

  /**
   * 库存类型
   */
  stockType?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface StockFlowQuery extends PageQuery {

  /**
   * 库存流水ID
   */
  stockFlowId?: string | number;

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
   * 库存业务类型
   */
  stockBizType?: string;

  /**
   * 业务ID
   */
  bizId?: string | number;

  /**
   * 变化数量
   */
  changeQty?: number;

  /**
   * 之前数量
   */
  beforeQty?: number;

  /**
   * 之后数量
   */
  afterQty?: number;

  /**
   * 库存类型
   */
  stockType?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
