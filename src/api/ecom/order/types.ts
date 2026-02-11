export interface OrderVO {
  /**
   * 订单ID
   */
  orderId: string | number;

  /**
   * 订单唯一号
   */
  orderSn: string;

  /**
   * 买家用户id
   */
  buyerUserId: string | number;

  /**
   * 参团记录ID
   */
  recordId: string | number;

  /**
   * 父订单ID
   */
  parentOrderId: string | number;

  /**
   * 公司ID
   */
  orgId: string | number;

  /**
   * 团长ID
   */
  leaderId: string | number;

  /**
   * 卖家ID
   */
  sellerUserId: string | number;

  /**
   * 产品业务类型
   */
  productType: string;

  /**
   * 扩展
   */
  extendJson: string;

  /**
   * 活动Id
   */
  activityId: string | number;

  /**
   * 活动产品Id
   */
  activityProductId: string | number;

  /**
   * 经营归属类型
   */
  ownerType: string;

  /**
   * 经营归属ID
   */
  ownerId: string | number;

  /**
   * 履约执行类型
   */
  fulfillmentType: string;

  /**
   * 履约执行ID
   */
  fulfillmentId: string | number;

  /**
   * 责任主体类型
   */
  responsibleType: string;

  /**
   * 责任主体ID
   */
  responsibleId: string | number;

  /**
   * 货币地区
   */
  currency: string;

  /**
   * 货币位置
   */
  locale: string;

  /**
   * 订单状态
   */
  orderStatus: string;

  /**
   * 支付状态
   */
  payStatus: string;

  /**
   * 支付金额
   */
  payAmount: number;

  /**
   * 支付时间
   */
  payTime: string;

  /**
   * 支付方式
   */
  payWay: string;

  /**
   * 买家留言
   */
  buyerMessage: string;

  /**
   * 自动确认天数
   */
  autoConfirmDays: number;

  /**
   * 确认收货时间
   */
  confirmTime: string;

  /**
   * 国家代码
   */
  countryCode: string;

  /**
   * 都道府县
   */
  administrativeArea: string;

  /**
   * 一级行政区
   */
  locality: string;

  /**
   * 二级行政区
   */
  dependentLocality: string;

  /**
   * 街道
   */
  streetDetail: string;

  /**
   * 邮编
   */
  postalCode: string;

  /**
   * 地址名
   */
  addressesName: string;

  /**
   * 电话
   */
  phone: string;

  /**
   * 其他附加信息
   */
  other: string;

  /**
   * 格式化地址
   */
  formattedAddress: string;

  /**
   * 语言类型
   */
  lang: string;

  /**
   * 纬度
   */
  latitude: number;

  /**
   * 经度
   */
  longitude: number;

  /**
   * 退款状态
   */
  refundStatus: string;

  /**
   * 退款金额
   */
  refundAmount: number;

  /**
   * 订单来源（小程序/H5/APP）
   */
  source: string;

  /**
   * 备注
   */
  remark: string;

}

export interface OrderForm extends BaseEntity {
  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 订单唯一号
   */
  orderSn?: string;

  /**
   * 买家用户id
   */
  buyerUserId?: string | number;

  /**
   * 参团记录ID
   */
  recordId?: string | number;

  /**
   * 父订单ID
   */
  parentOrderId?: string | number;

  /**
   * 公司ID
   */
  orgId?: string | number;

  /**
   * 团长ID
   */
  leaderId?: string | number;

  /**
   * 卖家ID
   */
  sellerUserId?: string | number;

  /**
   * 产品业务类型
   */
  productType?: string;

  /**
   * 扩展
   */
  extendJson?: string;

  /**
   * 活动Id
   */
  activityId?: string | number;

  /**
   * 活动产品Id
   */
  activityProductId?: string | number;

  /**
   * 经营归属类型
   */
  ownerType?: string;

  /**
   * 经营归属ID
   */
  ownerId?: string | number;

  /**
   * 履约执行类型
   */
  fulfillmentType?: string;

  /**
   * 履约执行ID
   */
  fulfillmentId?: string | number;

  /**
   * 责任主体类型
   */
  responsibleType?: string;

  /**
   * 责任主体ID
   */
  responsibleId?: string | number;

  /**
   * 货币地区
   */
  currency?: string;

  /**
   * 货币位置
   */
  locale?: string;

  /**
   * 订单状态
   */
  orderStatus?: string;

  /**
   * 支付状态
   */
  payStatus?: string;

  /**
   * 支付金额
   */
  payAmount?: number;

  /**
   * 支付时间
   */
  payTime?: string;

  /**
   * 支付方式
   */
  payWay?: string;

  /**
   * 买家留言
   */
  buyerMessage?: string;

  /**
   * 自动确认天数
   */
  autoConfirmDays?: number;

  /**
   * 确认收货时间
   */
  confirmTime?: string;

  /**
   * 国家代码
   */
  countryCode?: string;

  /**
   * 都道府县
   */
  administrativeArea?: string;

  /**
   * 一级行政区
   */
  locality?: string;

  /**
   * 二级行政区
   */
  dependentLocality?: string;

  /**
   * 街道
   */
  streetDetail?: string;

  /**
   * 邮编
   */
  postalCode?: string;

  /**
   * 地址名
   */
  addressesName?: string;

  /**
   * 电话
   */
  phone?: string;

  /**
   * 其他附加信息
   */
  other?: string;

  /**
   * 格式化地址
   */
  formattedAddress?: string;

  /**
   * 语言类型
   */
  lang?: string;

  /**
   * 纬度
   */
  latitude?: number;

  /**
   * 经度
   */
  longitude?: number;

  /**
   * 退款状态
   */
  refundStatus?: string;

  /**
   * 退款金额
   */
  refundAmount?: number;

  /**
   * 订单来源（小程序/H5/APP）
   */
  source?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface OrderQuery extends PageQuery {

  /**
   * 订单唯一号
   */
  orderSn?: string;

  /**
   * 买家用户id
   */
  buyerUserId?: string | number;

  /**
   * 参团记录ID
   */
  recordId?: string | number;

  /**
   * 父订单ID
   */
  parentOrderId?: string | number;

  /**
   * 公司ID
   */
  orgId?: string | number;

  /**
   * 团长ID
   */
  leaderId?: string | number;

  /**
   * 卖家ID
   */
  sellerUserId?: string | number;

  /**
   * 产品业务类型
   */
  productType?: string;

  /**
   * 扩展
   */
  extendJson?: string;

  /**
   * 活动Id
   */
  activityId?: string | number;

  /**
   * 活动产品Id
   */
  activityProductId?: string | number;

  /**
   * 经营归属类型
   */
  ownerType?: string;

  /**
   * 经营归属ID
   */
  ownerId?: string | number;

  /**
   * 履约执行类型
   */
  fulfillmentType?: string;

  /**
   * 履约执行ID
   */
  fulfillmentId?: string | number;

  /**
   * 责任主体类型
   */
  responsibleType?: string;

  /**
   * 责任主体ID
   */
  responsibleId?: string | number;

  /**
   * 货币地区
   */
  currency?: string;

  /**
   * 货币位置
   */
  locale?: string;

  /**
   * 订单状态
   */
  orderStatus?: string;

  /**
   * 支付状态
   */
  payStatus?: string;

  /**
   * 支付金额
   */
  payAmount?: number;

  /**
   * 支付时间
   */
  payTime?: string;

  /**
   * 支付方式
   */
  payWay?: string;

  /**
   * 买家留言
   */
  buyerMessage?: string;

  /**
   * 自动确认天数
   */
  autoConfirmDays?: number;

  /**
   * 确认收货时间
   */
  confirmTime?: string;

  /**
   * 国家代码
   */
  countryCode?: string;

  /**
   * 都道府县
   */
  administrativeArea?: string;

  /**
   * 一级行政区
   */
  locality?: string;

  /**
   * 二级行政区
   */
  dependentLocality?: string;

  /**
   * 街道
   */
  streetDetail?: string;

  /**
   * 邮编
   */
  postalCode?: string;

  /**
   * 地址名
   */
  addressesName?: string;

  /**
   * 电话
   */
  phone?: string;

  /**
   * 其他附加信息
   */
  other?: string;

  /**
   * 格式化地址
   */
  formattedAddress?: string;

  /**
   * 语言类型
   */
  lang?: string;

  /**
   * 纬度
   */
  latitude?: number;

  /**
   * 经度
   */
  longitude?: number;

  /**
   * 退款状态
   */
  refundStatus?: string;

  /**
   * 退款金额
   */
  refundAmount?: number;

  /**
   * 订单来源（小程序/H5/APP）
   */
  source?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
