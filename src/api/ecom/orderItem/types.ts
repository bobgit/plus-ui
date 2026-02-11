export interface OrderItemVO {
  /**
   * 明细ID
   */
  itemId: string | number;

  /**
   * 订单ID
   */
  orderId: string | number;

  /**
   * 活动商品ID
   */
  activityProductId: string | number;

  /**
   * SPU ID
   */
  spuId: string | number;

  /**
   * SKU ID
   */
  skuId: string | number;

  /**
   * spu名称
   */
  spuName: string;

  /**
   * 商品名称
   */
  skuName: string;

  /**
   * 商品图片
   */
  skuImage: string;

  /**
   * 商品图片Url
   */
  skuImageUrl: string;
  /**
   * 活动Id
   */
  activityId: string | number;

  /**
   * 经营归属类型
   */
  ownerType: string;

  /**
   * 经营归属ID
   */
  ownerId: string | number;

  /**
   * 单价
   */
  price: number;

  /**
   * 数量
   */
  quantity: number;

  /**
   * 小计
   */
  totalAmount: number;

  /**
   * 退款状态
   */
  refundStatus: string;

  /**
   * 退款金额
   */
  refundAmount: number;

  /**
   * 备注
   */
  remark: string;

}

export interface OrderItemForm extends BaseEntity {
  /**
   * 明细ID
   */
  itemId?: string | number;

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 活动商品ID
   */
  activityProductId?: string | number;

  /**
   * SPU ID
   */
  spuId?: string | number;

  /**
   * SKU ID
   */
  skuId?: string | number;

  /**
   * spu名称
   */
  spuName?: string;

  /**
   * 商品名称
   */
  skuName?: string;

  /**
   * 商品图片
   */
  skuImage?: string;

  /**
   * 活动Id
   */
  activityId?: string | number;

  /**
   * 经营归属类型
   */
  ownerType?: string;

  /**
   * 经营归属ID
   */
  ownerId?: string | number;

  /**
   * 单价
   */
  price?: number;

  /**
   * 数量
   */
  quantity?: number;

  /**
   * 小计
   */
  totalAmount?: number;

  /**
   * 退款状态
   */
  refundStatus?: string;

  /**
   * 退款金额
   */
  refundAmount?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface OrderItemQuery extends PageQuery {

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 活动商品ID
   */
  activityProductId?: string | number;

  /**
   * SPU ID
   */
  spuId?: string | number;

  /**
   * SKU ID
   */
  skuId?: string | number;

  /**
   * spu名称
   */
  spuName?: string;

  /**
   * 商品名称
   */
  skuName?: string;

  /**
   * 商品图片
   */
  skuImage?: string;

  /**
   * 活动Id
   */
  activityId?: string | number;

  /**
   * 经营归属类型
   */
  ownerType?: string;

  /**
   * 经营归属ID
   */
  ownerId?: string | number;

  /**
   * 单价
   */
  price?: number;

  /**
   * 数量
   */
  quantity?: number;

  /**
   * 小计
   */
  totalAmount?: number;

  /**
   * 退款状态
   */
  refundStatus?: string;

  /**
   * 退款金额
   */
  refundAmount?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}
