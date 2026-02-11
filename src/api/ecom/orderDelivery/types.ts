export interface OrderDeliveryVO {
  /**
   * 订单配送Id
   */
  orderDeliveryId: string | number;

  /**
   * 订单ID
   */
  orderId: string | number;

  /**
   * 订单业务类型
   */
  orderType: string;

  /**
   * 骑手名字
   */
  riderName: string | number;

  /**
   * 骑手Id
   */
  riderId: string | number;

  /**
   * 骑手电话
   */
  riderPhone: string | number;

  /**
   * 距离目的
   */
  deliveryDistance: number;

  /**
   * 配送状态
   */
  deliveryStatus: string;

  /**
   * 期望时间
   */
  expectedTime: string;

  /**
   * 交付时间
   */
  actualTime: string;

  /**
   * 备注
   */
  remark: string;

}

export interface OrderDeliveryForm extends BaseEntity {
  /**
   * 订单配送Id
   */
  orderDeliveryId?: string | number;

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 订单业务类型
   */
  orderType?: string;

  /**
   * 骑手名字
   */
  riderName?: string | number;

  /**
   * 骑手Id
   */
  riderId?: string | number;

  /**
   * 骑手电话
   */
  riderPhone?: string | number;

  /**
   * 距离目的
   */
  deliveryDistance?: number;

  /**
   * 配送状态
   */
  deliveryStatus?: string;

  /**
   * 期望时间
   */
  expectedTime?: string;

  /**
   * 交付时间
   */
  actualTime?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface OrderDeliveryQuery extends PageQuery {

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 订单业务类型
   */
  orderType?: string;

  /**
   * 骑手名字
   */
  riderName?: string | number;

  /**
   * 骑手Id
   */
  riderId?: string | number;

  /**
   * 骑手电话
   */
  riderPhone?: string | number;

  /**
   * 距离目的
   */
  deliveryDistance?: number;

  /**
   * 配送状态
   */
  deliveryStatus?: string;

  /**
   * 期望时间
   */
  expectedTime?: string;

  /**
   * 交付时间
   */
  actualTime?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
